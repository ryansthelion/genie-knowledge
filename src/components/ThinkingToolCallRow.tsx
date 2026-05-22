import { css, keyframes } from '@emotion/react';
import {
  ChevronRightIcon,
  DashboardIcon,
  LightbulbIcon,
  Spinner,
  TableIcon,
  useDesignSystemTheme,
  WrenchIcon,
} from '@databricks/design-system';
import type { ThemeType } from '@databricks/design-system';
import { useCallback, useState, type CSSProperties, type ReactNode } from 'react';
import { genieVar } from '../theme/genieSun';

/** Figma collapsed Tool Call `2104:4975` — 32px row. */
const ROW_HEIGHT_PX = 32;
const ICON_PX = 14;

const shimmerSweep = keyframes({
  '0%': { transform: 'translateX(-100%)' },
  '100%': { transform: 'translateX(200%)' },
});

export type ThinkingToolCallVariant = 'default' | 'subagent' | 'search';

export type ThinkingToolCallRowProps = {
  title: string;
  matchPercent?: number;
  /** Figma expanded Body `9636:50141` — definition paragraph. */
  body?: string;
  /** Figma expanded Source pill `9636:50144`. */
  sourceLabel?: string;
  variant?: ThinkingToolCallVariant;
  assetName?: string;
  running?: boolean;
  defaultExpanded?: boolean;
  children?: ReactNode;
};

type InteractionState = 'default' | 'hover' | 'press';

function toolCallStack() {
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  });
}

/** Figma expanded Tool Calls `9636:50134`. */
function toolCallCardOuter() {
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 'var(--genie-radius-md)',
    border: `1px solid ${genieVar.border}`,
    backgroundColor: genieVar.backgroundPrimary,
    boxSizing: 'border-box',
  });
}

function collapsedRowStyles(theme: ThemeType, interaction: InteractionState, variant: ThinkingToolCallVariant) {
  const bg =
    interaction === 'press'
      ? theme.colors.actionDefaultBackgroundPress
      : interaction === 'hover'
        ? genieVar.actionDefaultBgHover
        : genieVar.actionDefaultBgDefault;

  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: variant === 'subagent' ? 'space-between' : undefined,
    gap: theme.spacing.xs,
    width: '100%',
    minHeight: ROW_HEIGHT_PX,
    height: ROW_HEIGHT_PX,
    padding:
      variant === 'subagent'
        ? `${theme.spacing.sm}px 10px ${theme.spacing.sm}px ${theme.spacing.sm}px`
        : theme.spacing.sm,
    margin: 0,
    border: `1px solid ${genieVar.border}`,
    borderRadius: theme.borders.borderRadiusMd,
    backgroundColor: bg,
    boxSizing: 'border-box',
    cursor: 'pointer',
    font: 'inherit',
    color: 'inherit',
    textAlign: 'left',
    overflow: 'hidden',
    transition: 'background-color 0.12s ease-out',
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.actionPrimaryBackgroundPress}`,
      outlineOffset: 2,
    },
  });
}

function expandedHeaderStyles(theme: ThemeType, interaction: InteractionState) {
  const bg =
    interaction === 'press'
      ? theme.colors.actionDefaultBackgroundPress
      : interaction === 'hover'
        ? genieVar.actionDefaultBgHover
        : genieVar.actionDefaultBgDefault;

  return css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    width: '100%',
    padding: theme.spacing.sm,
    margin: 0,
    border: 'none',
    borderBottom: `1px solid ${genieVar.border}`,
    borderTopLeftRadius: theme.borders.borderRadiusMd,
    borderTopRightRadius: theme.borders.borderRadiusMd,
    backgroundColor: bg,
    boxSizing: 'border-box',
    cursor: 'pointer',
    font: 'inherit',
    color: 'inherit',
    textAlign: 'left',
    transition: 'background-color 0.12s ease-out',
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.actionPrimaryBackgroundPress}`,
      outlineOffset: -2,
    },
  });
}

function expandedTitleRow() {
  return css({
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    minWidth: 0,
    width: '100%',
  });
}

function collapsedTitleText() {
  return css({
    flex: '1 1 auto',
    minWidth: 0,
    fontSize: 12,
    lineHeight: 1.4,
    fontWeight: 400,
    color: genieVar.textPrimary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  });
}

function expandedTitleText() {
  return css({
    flex: '1 1 auto',
    minWidth: 0,
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 600,
    color: genieVar.textPrimary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  });
}

function matchText() {
  return css({
    flexShrink: 0,
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 400,
    color: genieVar.textSecondary,
    whiteSpace: 'nowrap',
  });
}

function toolCallBody(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    alignItems: 'flex-start',
    width: '100%',
    padding: '12px',
    backgroundColor: genieVar.backgroundPrimary,
    boxSizing: 'border-box',
  });
}

function bodyDescription() {
  return css({
    margin: 0,
    width: '100%',
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 400,
    color: genieVar.textSecondary,
    wordBreak: 'break-word',
  });
}

function titleRowShimmer() {
  return css({
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    flex: '1 1 auto',
    minWidth: 0,
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: -48,
      width: 48,
      background: `linear-gradient(90deg, transparent 0%, ${genieVar.textSecondary} 50%, transparent 100%)`,
      opacity: 0.35,
      mixBlendMode: 'multiply',
      animation: `${shimmerSweep} 1.8s ease-in-out infinite`,
    },
  });
}

function sourcePill(theme: ThemeType) {
  return css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    flexShrink: 0,
    height: 24,
    padding: `${theme.spacing.xs}px 6px`,
    borderRadius: theme.borders.borderRadiusFull,
    backgroundColor: genieVar.bgSecondary,
    boxSizing: 'border-box',
  });
}

function sourcePillLabel() {
  return css({
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 400,
    color: genieVar.textSecondary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  });
}

function iconStyle(theme: ThemeType, kind: 'leading' | 'chevron' | 'source'): CSSProperties {
  const color =
    kind === 'leading' ? theme.colors.actionLinkDefault : theme.colors.textSecondary;
  return { fontSize: ICON_PX, color, flexShrink: 0 };
}

function CollapsedLeadingIcon({
  theme,
  variant,
  hovered,
}: {
  theme: ThemeType;
  variant: ThinkingToolCallVariant;
  hovered: boolean;
}) {
  if (hovered) {
    return <ChevronRightIcon style={iconStyle(theme, 'chevron')} aria-hidden />;
  }
  if (variant === 'subagent') {
    return <WrenchIcon style={iconStyle(theme, 'leading')} aria-hidden />;
  }
  return <LightbulbIcon style={iconStyle(theme, 'leading')} aria-hidden />;
}

function SourceBadge({ theme, label, icon }: { theme: ThemeType; label: string; icon: 'dashboard' | 'table' }) {
  const Icon = icon === 'dashboard' ? DashboardIcon : TableIcon;
  return (
    <span css={sourcePill(theme)} data-name="Source">
      <Icon style={iconStyle(theme, 'source')} aria-hidden />
      <span css={sourcePillLabel()}>{label}</span>
    </span>
  );
}

function useInteractionHandlers() {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const interaction: InteractionState = pressed ? 'press' : hovered ? 'hover' : 'default';

  const bind = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onMouseDown: () => setPressed(true),
    onMouseUp: () => setPressed(false),
  };

  return { hovered, interaction, bind };
}

/**
 * Figma collapsed `2104:4975` + expanded Tool Calls `9636:50134`.
 */
export function ThinkingToolCallRow({
  title,
  matchPercent,
  body,
  sourceLabel,
  variant = 'default',
  assetName = 'Asset name',
  running = false,
  defaultExpanded = false,
  children,
}: ThinkingToolCallRowProps) {
  const { theme } = useDesignSystemTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const { hovered, interaction, bind } = useInteractionHandlers();

  const hasExpandableContent = Boolean(body || children);
  const showMatch = matchPercent !== undefined;

  const toggle = useCallback(() => {
    if (!hasExpandableContent && variant === 'default') return;
    setExpanded((value) => !value);
  }, [hasExpandableContent, variant]);

  const matchNode = showMatch ? <span css={matchText()}>{matchPercent}% match</span> : null;

  if (expanded && hasExpandableContent && variant === 'default') {
    const titleNode =
      running ? (
        <span css={titleRowShimmer()} data-name="Row">
          <span css={expandedTitleText()}>{title}</span>
        </span>
      ) : (
        <span css={expandedTitleText()}>{title}</span>
      );

    return (
      <div css={toolCallCardOuter()} data-name="Tool Calls">
        <button
          type="button"
          css={expandedHeaderStyles(theme, interaction)}
          data-name=".Tool call"
          aria-expanded
          onClick={toggle}
          {...bind}
        >
          <span css={expandedTitleRow()} data-name="title">
            <LightbulbIcon style={iconStyle(theme, 'leading')} aria-hidden />
            {titleNode}
            {matchNode}
          </span>
        </button>
        <div css={toolCallBody(theme)} data-name="Body">
          {body ? <p css={bodyDescription()}>{body}</p> : null}
          {sourceLabel ? <SourceBadge theme={theme} label={sourceLabel} icon="dashboard" /> : null}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div css={toolCallStack()} data-name="Tool Calls">
      <button
        type="button"
        css={collapsedRowStyles(theme, interaction, variant)}
        data-name=".Tool call"
        aria-expanded={expanded}
        onClick={toggle}
        {...bind}
      >
        {variant === 'subagent' ? (
          <>
            <span css={css({ display: 'flex', alignItems: 'flex-start', gap: 4, flex: 1, minWidth: 0 })} data-name="LHS">
              <span css={css({ display: 'flex', alignItems: 'center', paddingTop: 3, flexShrink: 0 })} data-name="icon">
                <CollapsedLeadingIcon theme={theme} variant={variant} hovered={hovered} />
              </span>
              <span css={css({ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 })} data-name="Text">
                <span css={css({ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 })} data-name="Title">
                  <span css={collapsedTitleText()}>{title}</span>
                  <SourceBadge theme={theme} label={assetName} icon="table" />
                </span>
              </span>
            </span>
            <Spinner size="small" css={css({ flexShrink: 0, fontSize: ICON_PX })} data-name="Spinner" />
          </>
        ) : (
          <>
            <CollapsedLeadingIcon theme={theme} variant={variant} hovered={hovered} />
            <span css={collapsedTitleText()}>{title}</span>
            {matchNode}
          </>
        )}
      </button>
    </div>
  );
}
