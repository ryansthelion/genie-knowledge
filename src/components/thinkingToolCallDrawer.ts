import { css } from '@emotion/react';
import type { ThemeType } from '@databricks/design-system';
import { genieVar } from '../theme/genieSun';

/** Figma Tool Call `2104:4975` — collapsed header 32px. */
export const TOOL_CALL_HEADER_HEIGHT_PX = 32;

/** Figma expanded `.Tool call` `10715:7276` — search header 40px. */
export const TOOL_CALL_EXPANDED_HEADER_HEIGHT_PX = 40;

export type ToolCallInteractionState = 'default' | 'hover' | 'press';

export function toolCallCardOuter() {
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

function headerBackground(theme: ThemeType, interaction: ToolCallInteractionState) {
  if (interaction === 'press') return theme.colors.actionDefaultBackgroundPress;
  if (interaction === 'hover') return genieVar.actionDefaultBgHover;
  return genieVar.actionDefaultBgDefault;
}

/** Collapsed tool-call header — full border radius. */
export function toolCallCollapsedHeader(theme: ThemeType, interaction: ToolCallInteractionState) {
  return css({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    width: '100%',
    minHeight: TOOL_CALL_HEADER_HEIGHT_PX,
    height: TOOL_CALL_HEADER_HEIGHT_PX,
    padding: theme.spacing.sm,
    margin: 0,
    border: `1px solid ${genieVar.border}`,
    borderRadius: theme.borders.borderRadiusMd,
    backgroundColor: headerBackground(theme, interaction),
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

/** Expanded search tool-call header — Figma `10715:7276`. */
export function toolCallExpandedSearchHeader(theme: ThemeType, interaction: ToolCallInteractionState) {
  return css({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    width: '100%',
    minHeight: TOOL_CALL_EXPANDED_HEADER_HEIGHT_PX,
    height: TOOL_CALL_EXPANDED_HEADER_HEIGHT_PX,
    padding: theme.spacing.sm,
    margin: 0,
    border: 'none',
    borderBottom: `1px solid ${genieVar.border}`,
    borderTopLeftRadius: theme.borders.borderRadiusMd,
    borderTopRightRadius: theme.borders.borderRadiusMd,
    backgroundColor: headerBackground(theme, interaction),
    boxSizing: 'border-box',
    cursor: 'pointer',
    font: 'inherit',
    color: 'inherit',
    textAlign: 'left',
    overflow: 'hidden',
    flexShrink: 0,
    transition: 'background-color 0.12s ease-out',
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.actionPrimaryBackgroundPress}`,
      outlineOffset: -2,
    },
  });
}

export function toolCallHeaderTitle() {
  return css({
    flex: '0 1 auto',
    minWidth: 0,
    fontSize: 12,
    lineHeight: 1.4,
    fontWeight: 400,
    color: genieVar.textPrimary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
}
