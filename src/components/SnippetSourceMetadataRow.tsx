import { css } from '@emotion/react';
import { DashboardIcon, NewWindowIcon, Typography, useDesignSystemTheme } from '@databricks/design-system';
import type { ThemeType } from '@databricks/design-system';
import { useCallback, useState, type CSSProperties } from 'react';
import { genieVar } from '../theme/genieSun';
import { SnippetPopularIndicatorIcon } from './SnippetPopularIndicatorIcon';

type SourceRowInteraction = 'default' | 'hover' | 'press';

function sourceRowBackground(theme: ThemeType, interaction: SourceRowInteraction) {
  if (interaction === 'press') {
    return theme.colors.actionDefaultBackgroundPress;
  }
  if (interaction === 'hover') {
    return genieVar.actionDefaultBgHover;
  }
  return genieVar.backgroundPrimary;
}

function sourceRowStyles(theme: ThemeType, interaction: SourceRowInteraction) {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.spacing.sm,
    margin: 0,
    border: `1px solid ${genieVar.border}`,
    borderRadius: theme.borders.borderRadiusMd,
    backgroundColor: sourceRowBackground(theme, interaction),
    boxSizing: 'border-box',
    cursor: 'pointer',
    font: 'inherit',
    color: 'inherit',
    textAlign: 'left',
    transition: 'background-color 0.12s ease-out',
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.actionPrimaryBackgroundPress}`,
      outlineOffset: 2,
    },
  });
}

function dashboardAvatar(theme: ThemeType) {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: theme.borders.borderRadiusMd,
    backgroundColor: genieVar.bgSecondary,
    flexShrink: 0,
  });
}

export type SnippetSourceMetadataRowProps = {
  sourceName: string;
  sourceAuthor: string;
  /** Figma popover `8450:14345` omits the dashboard avatar tile. */
  showLeadingIcon?: boolean;
  onOpenSource?: () => void;
  iconStyle?: CSSProperties;
};

/** Figma source row — popover `9667:52686` / panel `9889:47480`. */
export function SnippetSourceMetadataRow({
  sourceName,
  sourceAuthor,
  showLeadingIcon = true,
  onOpenSource,
  iconStyle,
}: SnippetSourceMetadataRowProps) {
  const { theme } = useDesignSystemTheme();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const interaction: SourceRowInteraction = pressed ? 'press' : hovered ? 'hover' : 'default';
  const secondaryIcon = iconStyle ?? { fontSize: 16, color: theme.colors.textSecondary };

  const handleOpen = useCallback(() => {
    onOpenSource?.();
  }, [onOpenSource]);

  return (
    <button
      type="button"
      css={sourceRowStyles(theme, interaction)}
      data-name="Source"
      aria-label={`Open ${sourceName}`}
      onClick={handleOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <div css={css({ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, minWidth: 0, flex: 1 })}>
        {showLeadingIcon ? (
          <span css={dashboardAvatar(theme)}>
            <DashboardIcon style={{ fontSize: 16, color: theme.colors.textSecondary }} />
          </span>
        ) : null}
        <div css={css({ display: 'flex', flexDirection: 'column', minWidth: 0, alignItems: 'flex-start' })}>
          <div css={css({ display: 'flex', alignItems: 'center', gap: theme.spacing.xs, maxWidth: '100%' })}>
            <Typography.Text
              style={{
                marginBottom: 0,
                fontSize: 12,
                lineHeight: '16px',
                color: genieVar.textPrimary,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {sourceName}
            </Typography.Text>
            <SnippetPopularIndicatorIcon size={16} color={theme.colors.textSecondary} />
          </div>
          <Typography.Hint style={{ marginBottom: 0 }}>{sourceAuthor}</Typography.Hint>
        </div>
      </div>
      <NewWindowIcon style={{ ...secondaryIcon, flexShrink: 0 }} aria-hidden />
    </button>
  );
}
