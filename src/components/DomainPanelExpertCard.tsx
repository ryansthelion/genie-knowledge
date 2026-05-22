import { css } from '@emotion/react';
import { DataIcon, LightbulbIcon, StarFillIcon, useDesignSystemTheme } from '@databricks/design-system';
import type { ThemeType } from '@databricks/design-system';
import { useState } from 'react';
import { genieVar } from '../theme/genieSun';
import type { DomainExpert } from './domainPanelConfig';

const METADATA_ICON_PX = 14;
const STAR_COLOR = '#e5891d';

type CardInteraction = 'default' | 'hover' | 'press';

function expertCardStyles(theme: ThemeType, interaction: CardInteraction) {
  const bg =
    interaction === 'press'
      ? theme.colors.actionDefaultBackgroundPress
      : interaction === 'hover'
        ? genieVar.actionDefaultBgHover
        : genieVar.actionDefaultBgDefault;

  return css({
    display: 'flex',
    width: '100%',
    padding: theme.spacing.md,
    margin: 0,
    border: `1px solid ${genieVar.border}`,
    borderRadius: theme.borders.borderRadiusLg,
    backgroundColor: bg,
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

function expertName() {
  return css({
    margin: 0,
    fontSize: 13,
    lineHeight: '20px',
    fontWeight: 600,
    color: genieVar.textPrimary,
    whiteSpace: 'nowrap',
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

function metadataGroup() {
  return css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  });
}

function metadataText() {
  return css({
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 400,
    color: genieVar.textSecondary,
    whiteSpace: 'nowrap',
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

/** Figma expert card `10538:11372` / `User`. */
export function DomainPanelExpertCard({
  expert,
  onClick,
}: {
  expert: DomainExpert;
  onClick?: () => void;
}) {
  const { theme } = useDesignSystemTheme();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const interaction: CardInteraction = pressed ? 'press' : hovered ? 'hover' : 'default';

  return (
    <button
      type="button"
      css={expertCardStyles(theme, interaction)}
      data-name="User"
      aria-label={`View profile for ${expert.name}, ${expert.rating} rating`}
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
        <p css={expertName()}>{expert.name}</p>
        <div css={metadataRow()} data-name="metadata">
          <span css={metadataGroup()}>
            <span css={metadataText()}>{expert.rating.toFixed(1)}</span>
            <StarFillIcon
              style={{ fontSize: METADATA_ICON_PX, color: STAR_COLOR, flexShrink: 0, lineHeight: 0 }}
              aria-hidden
            />
          </span>
          <span css={metadataDot()} aria-hidden>
            •
          </span>
          <span css={metadataGroup()} data-name="label">
            <LightbulbIcon
              style={{ fontSize: METADATA_ICON_PX, color: theme.colors.textSecondary, flexShrink: 0 }}
              aria-hidden
            />
            <span css={metadataText()}>{expert.snippetCount} snippets</span>
          </span>
          <span css={metadataDot()} aria-hidden>
            •
          </span>
          <span css={metadataGroup()} data-name="label">
            <DataIcon
              style={{ fontSize: METADATA_ICON_PX, color: theme.colors.textSecondary, flexShrink: 0 }}
              aria-hidden
            />
            <span css={metadataText()}>{expert.assetCount} assets</span>
          </span>
        </div>
      </div>
    </button>
  );
}
