import { css } from '@emotion/react';
import { GlobeIcon, Tag, useDesignSystemTheme } from '@databricks/design-system';
import type { TagColors, ThemeType } from '@databricks/design-system';
import { useState } from 'react';
import { genieVar } from '../theme/genieSun';
import type { DomainSnippetRow } from './domainPanelConfig';

const METADATA_ICON_PX = 14;

type CardInteraction = 'default' | 'hover' | 'press';

function snippetCardStyles(theme: ThemeType, interaction: CardInteraction) {
  const backgroundColor =
    interaction === 'press'
      ? theme.colors.actionDefaultBackgroundPress
      : interaction === 'hover'
        ? genieVar.actionDefaultBgHover
        : genieVar.actionDefaultBgDefault;

  return css({
    display: 'flex',
    width: '100%',
    margin: 0,
    padding: 'var(--genie-spacing-mid)',
    border: `1px solid ${genieVar.border}`,
    borderRadius: 'var(--genie-radius-lg)',
    backgroundColor,
    cursor: 'pointer',
    font: 'inherit',
    color: 'inherit',
    textAlign: 'left',
    boxSizing: 'border-box',
    transition: 'background-color 0.12s ease-out',
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.actionPrimaryBackgroundPress}`,
      outlineOffset: 2,
    },
  });
}

function snippetDescription() {
  return css({
    margin: 0,
    fontSize: 13,
    lineHeight: '20px',
    fontWeight: 600,
    color: genieVar.textPrimary,
    height: 40,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    wordBreak: 'break-word',
  });
}

function snippetTagStyles() {
  return css({
    alignSelf: 'flex-start',
    width: 'fit-content',
    maxWidth: '100%',
    marginRight: 0,
    borderRadius: 'var(--genie-radius-action)',
    height: 20,
    flexShrink: 0,
    '& > div': { borderRadius: 'inherit', height: '100%' },
    '& > div > div': { borderRadius: 'inherit' },
  });
}

function metadataRow() {
  return css({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    width: '100%',
  });
}

function metadataDot() {
  return css({
    fontSize: 12,
    lineHeight: '16px',
    color: genieVar.textSecondary,
    flexShrink: 0,
  });
}

function topicsLabel() {
  return css({
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 400,
    color: genieVar.textSecondary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
}

/** Figma Snippets card `10538:14897` in Context Card `10538:14873`. */
export function DomainPanelSnippetCard({
  snippet,
  onClick,
}: {
  snippet: DomainSnippetRow;
  onClick?: () => void;
}) {
  const { theme } = useDesignSystemTheme();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const interaction: CardInteraction = pressed ? 'press' : hovered ? 'hover' : 'default';

  return (
    <button
      type="button"
      css={snippetCardStyles(theme, interaction)}
      data-name="Snippets"
      aria-label={snippet.title}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <div css={css({ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', minWidth: 0 })}>
        <p css={snippetDescription()}>{snippet.description}</p>
        <div css={metadataRow()} data-name="metadata">
          <Tag color={snippet.tagColor as TagColors} css={snippetTagStyles()}>
            {snippet.tagLabel}
          </Tag>
          <span css={metadataDot()} aria-hidden>
            •
          </span>
          <span css={css({ display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0 })} data-name="label">
            <GlobeIcon
              style={{
                fontSize: METADATA_ICON_PX,
                color: theme.colors.textSecondary,
                flexShrink: 0,
                lineHeight: 0,
              }}
              aria-hidden
            />
            <span css={topicsLabel()}>{snippet.topicCount} topics</span>
          </span>
        </div>
      </div>
    </button>
  );
}
