import { css } from '@emotion/react';
import { DashboardIcon, TableIcon, useDesignSystemTheme } from '@databricks/design-system';
import type { ThemeType } from '@databricks/design-system';
import { useState, type ReactNode } from 'react';
import { genieVar } from '../theme/genieSun';
import type { DomainAssetRow } from './domainPanelConfig';

const TITLE_ICON_PX = 16;
const METADATA_SPACER_PX = 24;

type CardInteraction = 'default' | 'hover' | 'press';

function assetCardStyles(theme: ThemeType, interaction: CardInteraction) {
  const backgroundColor =
    interaction === 'press'
      ? theme.colors.actionDefaultBackgroundPress
      : interaction === 'hover'
        ? genieVar.actionDefaultBgHover
        : genieVar.backgroundPrimary;

  return css({
    display: 'flex',
    width: '100%',
    margin: 0,
    padding: 0,
    border: `1px solid ${genieVar.border}`,
    borderRadius: 'var(--genie-radius-lg)',
    backgroundColor,
    cursor: 'pointer',
    font: 'inherit',
    color: 'inherit',
    textAlign: 'left',
    boxSizing: 'border-box',
    overflow: 'hidden',
    transition: 'background-color 0.12s ease-out',
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.actionPrimaryBackgroundPress}`,
      outlineOffset: 2,
    },
  });
}

function assetTitle() {
  return css({
    margin: 0,
    fontSize: 13,
    lineHeight: '20px',
    fontWeight: 600,
    color: genieVar.textPrimary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  });
}

function metadataSegment() {
  return css({
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 400,
    color: genieVar.textSecondary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    maxWidth: '100%',
  });
}

function metadataRow() {
  return css({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 4,
    width: '100%',
    minWidth: 0,
  });
}

function AssetIcon({ iconKind }: { iconKind: DomainAssetRow['iconKind'] }) {
  const { theme } = useDesignSystemTheme();
  const style = { fontSize: TITLE_ICON_PX, color: theme.colors.textSecondary, flexShrink: 0, lineHeight: 0 };
  return iconKind === 'table' ? (
    <TableIcon style={style} aria-hidden />
  ) : (
    <DashboardIcon style={style} aria-hidden />
  );
}

/** Figma asset card `10538:14639` — Card / Content inside Context Card `10538:14615`. */
export function DomainPanelAssetCard({
  asset,
  onClick,
}: {
  asset: DomainAssetRow;
  onClick?: () => void;
}) {
  const { theme } = useDesignSystemTheme();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const interaction: CardInteraction = pressed ? 'press' : hovered ? 'hover' : 'default';

  const metadataParts: ReactNode[] = [
    <span key="path" css={metadataSegment()}>
      {asset.path} ·
    </span>,
    <span key="updated" css={metadataSegment()}>
      Updated {asset.updatedAgo} ·
    </span>,
    <span key="viewed" css={metadataSegment()}>
      Viewed {asset.viewedAgo}
    </span>,
  ];

  return (
    <button
      type="button"
      css={assetCardStyles(theme, interaction)}
      data-name="Card"
      aria-label={`Open ${asset.name}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <div
        css={css({
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          width: '100%',
          padding: 'var(--genie-spacing-mid)',
          boxSizing: 'border-box',
        })}
        data-name="Content"
      >
        <div
          css={css({ display: 'flex', alignItems: 'center', gap: 8, width: '100%', minWidth: 0 })}
          data-name="Title and actions container"
        >
          <div
            css={css({ display: 'flex', alignItems: 'center', gap: 8, flex: '1 1 auto', minWidth: 0 })}
            data-name="Icon and title"
          >
            <AssetIcon iconKind={asset.iconKind} />
            <div css={css({ display: 'flex', flexDirection: 'column', minWidth: 0, flex: '1 1 auto' })} data-name="Nameplate">
              <p css={assetTitle()}>{asset.name}</p>
            </div>
          </div>
        </div>
        <div css={css({ display: 'flex', alignItems: 'flex-start', width: '100%' })} data-name="Metadata container">
          <span css={css({ width: METADATA_SPACER_PX, flexShrink: 0 })} data-name="Spacer" aria-hidden />
          <div css={css({ flex: '1 1 auto', minWidth: 0 })} data-name="Metadata">
            <div css={metadataRow()} data-name="Row 1">
              {metadataParts}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
