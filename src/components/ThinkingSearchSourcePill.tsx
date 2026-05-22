import { css } from '@emotion/react';
import { GlobeIcon, UserBadgeIcon, useDesignSystemTheme } from '@databricks/design-system';
import type { ThemeType } from '@databricks/design-system';
import { useCallback, useRef, useState, type CSSProperties, type MouseEventHandler } from 'react';
import { AiGradientIcon, AiGradientLightbulbIcon } from './AiGradientIcon';
import { KnowledgeSnippetDropdownMenu } from './KnowledgeSnippetDropdownMenu';
import {
  SnippetPopoverLayer,
  useAnchorSnippetPopover,
} from './knowledgeSnippetPopoverLayer';
import { SnippetPillChrome, type SnippetPillVisualState } from './knowledgeSnippetPillCore';
import type { SnippetDropdownItem } from './snippetDropdownConfig';
import type { SnippetPanelDomainId } from './domainPanelConfig';
import { domainIdFromLabel } from './domainPanelConfig';
import type { SnippetPopoverConfig } from './snippetPopoverConfig';

const ICON_PX = 14;
const PILL_POPOVER_HOVER_DELAY_MS = 200;

export type ThinkingSearchSourceKind = 'snippets' | 'topics' | 'experts';

export type ThinkingSearchSourcePillProps = {
  label: string;
  kind: ThinkingSearchSourceKind;
  sourceMenu?: SnippetDropdownItem[];
  sourceMenuMaxVisibleItems?: number;
  sourcePopover?: SnippetPopoverConfig;
  onViewFullSnippet?: (snippetId?: string) => void;
  /** When set, click opens this handler instead of a snippet dropdown menu. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onTopicSelect?: (domainId: SnippetPanelDomainId) => void;
};

function sourceIcon(theme: ThemeType, kind: ThinkingSearchSourceKind): CSSProperties {
  return { fontSize: ICON_PX, color: theme.colors.textSecondary, flexShrink: 0 };
}

function SourceIcon({ kind, theme }: { kind: ThinkingSearchSourceKind; theme: ThemeType }) {
  if (kind === 'snippets') {
    return <AiGradientLightbulbIcon size={ICON_PX} />;
  }
  if (kind === 'topics') {
    return <AiGradientIcon icon={GlobeIcon} size={ICON_PX} aria-hidden />;
  }
  return <UserBadgeIcon style={sourceIcon(theme, kind)} aria-hidden />;
}

/** Figma Source `10677:7346` — inline pill in thinking search tool call. */
export function ThinkingSearchSourcePill({
  label,
  kind,
  sourceMenu,
  sourceMenuMaxVisibleItems,
  sourcePopover,
  onViewFullSnippet,
  onClick,
  onTopicSelect,
}: ThinkingSearchSourcePillProps) {
  const { theme } = useDesignSystemTheme();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const visual: SnippetPillVisualState = pressed ? 'press' : hovered ? 'hover' : 'default';

  const {
    coords,
    placement,
    popoverMounted,
    popoverVisible,
    handlePointerEnter: handlePopoverPointerEnter,
    handlePointerLeave: handlePopoverPointerLeave,
    dismissPopover,
  } = useAnchorSnippetPopover({
    anchorRef,
    config: sourcePopover,
    hoverDelayMs: PILL_POPOVER_HOVER_DELAY_MS,
    placement: 'below-left',
    isEnabled: !sourceMenu && !onClick,
  });

  const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      event.stopPropagation();
      onClick?.(event);
    },
    [onClick],
  );

  const handlePointerEnter = useCallback(() => {
    setHovered(true);
    handlePopoverPointerEnter();
  }, [handlePopoverPointerEnter]);

  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    setPressed(false);
    handlePopoverPointerLeave();
  }, [handlePopoverPointerLeave]);

  const handleViewFullSnippet = useCallback(() => {
    dismissPopover();
    onViewFullSnippet?.();
  }, [dismissPopover, onViewFullSnippet]);

  const handleMenuItemSelect = useCallback(
    (item: SnippetDropdownItem) => {
      if (kind !== 'topics' || !onTopicSelect) return;
      const domainId = item.domainId ?? domainIdFromLabel(item.label);
      if (domainId) onTopicSelect(domainId);
    },
    [kind, onTopicSelect],
  );

  const pillChrome = (
    <SnippetPillChrome
      ref={anchorRef}
      theme={theme}
      label={label}
      icon={<SourceIcon kind={kind} theme={theme} />}
      visual={visual}
      aria-label={label}
      aria-haspopup={sourceMenu && !onClick ? 'menu' : sourcePopover ? 'dialog' : undefined}
      aria-expanded={sourcePopover ? popoverMounted && popoverVisible : undefined}
      data-name="Source"
      onClick={onClick ? handleClick : undefined}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    />
  );

  return (
    <>
      {sourceMenu && !onClick ? (
        <KnowledgeSnippetDropdownMenu
          items={sourceMenu}
          maxVisibleItems={sourceMenuMaxVisibleItems}
          itemLayout={kind === 'topics' ? 'text' : kind === 'experts' ? 'expert' : 'snippet'}
          onItemSelect={kind === 'topics' ? handleMenuItemSelect : undefined}
          onViewFullSnippet={onViewFullSnippet}
        >
          {pillChrome}
        </KnowledgeSnippetDropdownMenu>
      ) : (
        pillChrome
      )}
      {sourcePopover && popoverMounted ? (
        <SnippetPopoverLayer
          config={sourcePopover}
          coords={coords}
          placement={placement}
          visible={popoverVisible}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onViewFullSnippet={handleViewFullSnippet}
        />
      ) : null}
    </>
  );
}

export function thinkingSearchSourcesRow() {
  return css({
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  });
}
