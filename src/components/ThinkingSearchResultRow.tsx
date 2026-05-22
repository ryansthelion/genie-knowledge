import { css } from '@emotion/react';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
  useDesignSystemTheme,
} from '@databricks/design-system';
import type { ThemeType } from '@databricks/design-system';
import { useCallback, useState, type CSSProperties } from 'react';
import { enterFadeIn } from '../animations/enterFromBelow';
import {
  ThinkingSearchSourcePill,
  thinkingSearchSourcesRow,
  type ThinkingSearchSourceKind,
} from './ThinkingSearchSourcePill';
import {
  ThinkingToolCallSnippetContent,
  type ThinkingToolCallSnippetItem,
} from './ThinkingToolCallSnippetContent';
import {
  toolCallCardOuter,
  toolCallCollapsedHeader,
  toolCallExpandedSearchHeader,
  toolCallHeaderTitle,
} from './thinkingToolCallDrawer';
import type { SnippetPanelDomainId } from './domainPanelConfig';
import type { SnippetDropdownItem } from './snippetDropdownConfig';
import type { SnippetPopoverConfig } from './snippetPopoverConfig';
import { genieVar } from '../theme/genieSun';

const ICON_PX = 14;

export type ThinkingSearchSource = {
  id: string;
  label: string;
  kind: ThinkingSearchSourceKind;
  sourceMenu?: SnippetDropdownItem[];
  sourceMenuMaxVisibleItems?: number;
  sourcePopover?: SnippetPopoverConfig;
  onViewFullSnippet?: (snippetId?: string) => void;
};

export type ThinkingSearchResultRowProps = {
  title: string;
  sources?: ThinkingSearchSource[];
  sourceLabel?: string;
  sourceMenu?: SnippetDropdownItem[];
  sourceMenuMaxVisibleItems?: number;
  sourcePopover?: SnippetPopoverConfig;
  onViewFullSnippet?: (snippetId?: string) => void;
  onDomainSelect?: (domainId: SnippetPanelDomainId) => void;
  /** Figma `10692:13402` — rows shown when the header is expanded. */
  contentItems?: ThinkingToolCallSnippetItem[];
  defaultExpanded?: boolean;
  showTopicsSource?: boolean;
  showExpertsSource?: boolean;
  animateSourceFades?: boolean;
};

function iconStyle(theme: ThemeType, kind: 'search' | 'chevron'): CSSProperties {
  const color = kind === 'search' ? theme.colors.actionLinkDefault : theme.colors.textSecondary;
  return { fontSize: ICON_PX, color, flexShrink: 0 };
}

function HeaderSources({
  sources,
  showTopicsSource,
  showExpertsSource,
  animateSourceFades,
  onViewFullSnippet,
  onExpandToolCall,
  onDomainSelect,
}: {
  sources: ThinkingSearchSource[];
  showTopicsSource: boolean;
  showExpertsSource: boolean;
  animateSourceFades: boolean;
  onViewFullSnippet?: (snippetId?: string) => void;
  onExpandToolCall?: () => void;
  onDomainSelect?: (domainId: SnippetPanelDomainId) => void;
}) {
  return (
    <div
      css={thinkingSearchSourcesRow()}
      data-name="Sources"
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      {sources.map((source) => {
        if (source.kind === 'topics' && !showTopicsSource) return null;
        if (source.kind === 'experts' && !showExpertsSource) return null;

        const fadeIn =
          animateSourceFades && (source.kind === 'topics' || source.kind === 'experts');

        return (
          <span
            key={source.id}
            css={fadeIn ? enterFadeIn() : undefined}
            data-name={`Source/${source.kind}`}
          >
            <ThinkingSearchSourcePill
              label={source.label}
              kind={source.kind}
              sourceMenu={source.sourceMenu}
              sourceMenuMaxVisibleItems={source.sourceMenuMaxVisibleItems}
              sourcePopover={source.sourcePopover}
              onViewFullSnippet={onViewFullSnippet}
              onTopicSelect={onDomainSelect}
              onClick={
                source.kind === 'snippets' && onExpandToolCall
                  ? () => onExpandToolCall()
                  : undefined
              }
            />
          </span>
        );
      })}
    </div>
  );
}

/**
 * Figma collapsed `2104:4975`, expanded `10715:7275`.
 * @see https://www.figma.com/design/st5IOjhahvmvXyDbjvMpHB/Genie--Unified-Components-?node-id=10715-7275
 */
export function ThinkingSearchResultRow({
  title,
  sources,
  sourceLabel,
  sourceMenu,
  sourceMenuMaxVisibleItems,
  sourcePopover,
  onViewFullSnippet,
  onDomainSelect,
  contentItems = [],
  defaultExpanded = false,
  showTopicsSource = true,
  showExpertsSource = true,
  animateSourceFades = false,
}: ThinkingSearchResultRowProps) {
  const { theme } = useDesignSystemTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const interaction = pressed ? 'press' : hovered ? 'hover' : 'default';
  const hasContent = contentItems.length > 0;

  const resolvedSources: ThinkingSearchSource[] =
    sources ??
    (sourceLabel
      ? [
          {
            id: 'snippets',
            label: sourceLabel,
            kind: 'snippets',
            sourceMenu,
            sourceMenuMaxVisibleItems,
            sourcePopover,
            onViewFullSnippet,
          },
        ]
      : []);

  const toggle = useCallback(() => {
    if (!hasContent) return;
    setExpanded((value) => !value);
  }, [hasContent]);

  const expandToolCall = useCallback(() => {
    if (!hasContent) return;
    setExpanded(true);
  }, [hasContent]);

  const headerBody = (
    <>
      {expanded ? (
        <ChevronDownIcon style={iconStyle(theme, 'chevron')} aria-hidden data-name="chevronDownIcon" />
      ) : hovered ? (
        <ChevronRightIcon style={iconStyle(theme, 'chevron')} aria-hidden data-name="chevronRightIcon" />
      ) : (
        <SearchIcon style={iconStyle(theme, 'search')} aria-hidden data-name="searchIcon" />
      )}
      <span css={toolCallHeaderTitle()}>{title}</span>
      {resolvedSources.length > 0 ? (
        <HeaderSources
          sources={resolvedSources}
          showTopicsSource={showTopicsSource}
          showExpertsSource={showExpertsSource}
          animateSourceFades={animateSourceFades}
          onViewFullSnippet={onViewFullSnippet}
          onExpandToolCall={expandToolCall}
          onDomainSelect={onDomainSelect}
        />
      ) : null}
    </>
  );

  if (expanded && hasContent) {
    return (
      <div css={toolCallCardOuter()} data-name="Tool Call/Content">
        <button
          type="button"
          css={toolCallExpandedSearchHeader(theme, interaction)}
          data-name=".Tool call"
          aria-expanded
          onClick={toggle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            setPressed(false);
          }}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
        >
          {headerBody}
        </button>
        <ThinkingToolCallSnippetContent
          items={contentItems}
          onViewFullSnippet={onViewFullSnippet ? (snippetId) => onViewFullSnippet(snippetId) : undefined}
        />
      </div>
    );
  }

  return (
    <div css={css({ width: '100%' })} data-name=".Tool call">
      <button
        type="button"
        css={toolCallCollapsedHeader(theme, interaction)}
        aria-expanded={false}
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setPressed(false);
        }}
        onMouseDown={() => setPressed(true)}
        onMouseUp={() => setPressed(false)}
      >
        {headerBody}
      </button>
    </div>
  );
}
