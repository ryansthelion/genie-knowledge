import { css } from '@emotion/react';
import type { ThemeType } from '@databricks/design-system';
import { genieVar } from '../theme/genieSun';

/** Du Bois / Ant Design default UI stack. */
export const DUBOIS_UI_FONT_FAMILY = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`;

export const CANVAS_MENU_PARAGRAPH = {
  fontSize: 13,
  lineHeight: '20px',
  fontWeight: 400,
  letterSpacing: 0,
  fontFamily: DUBOIS_UI_FONT_FAMILY,
} as const;

export const CANVAS_MENU_ICON_PX = 16;

export const FIGMA_SOURCE_AVATAR_IMG =
  'https://www.figma.com/api/mcp/asset/1e1c8c34-0110-4747-8067-baacb7a03ae7';

export const iconSm = { fontSize: 16 } as const;

export function canvasMenu(theme: ThemeType) {
  const padMid = theme.spacing.sm + theme.spacing.xs;
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: padMid,
    flexShrink: 0,
    width: '100%',
    ...CANVAS_MENU_PARAGRAPH,
  });
}

export function canvasHeaderButtonTypography(btnClass: string) {
  return css({
    [`& .${btnClass}`]: {
      fontSize: CANVAS_MENU_PARAGRAPH.fontSize,
      lineHeight: CANVAS_MENU_PARAGRAPH.lineHeight,
      fontWeight: CANVAS_MENU_PARAGRAPH.fontWeight,
      letterSpacing: CANVAS_MENU_PARAGRAPH.letterSpacing,
      fontFamily: CANVAS_MENU_PARAGRAPH.fontFamily,
    },
    [`& .${btnClass} .anticon`]: {
      fontSize: CANVAS_MENU_ICON_PX,
      lineHeight: 1,
    },
  });
}

export function layoutRoot(theme: ThemeType) {
  return css({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: '1 1 auto',
    minHeight: 0,
    width: '100%',
    backgroundColor: genieVar.bgSecondary,
    borderRight: `1px solid ${genieVar.border}`,
    fontFamily: DUBOIS_UI_FONT_FAMILY,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  });
}

export function bodyRow() {
  return css({
    display: 'flex',
    flex: '1 1 auto',
    minHeight: 0,
    width: '100%',
    overflow: 'hidden',
  });
}

export function mainColumn() {
  return css({
    flex: '1 1 auto',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  });
}

export function contentOuter(theme: ThemeType) {
  const hPad = theme.spacing.sm + theme.spacing.xs;
  return css({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    minHeight: 0,
    width: '100%',
    paddingLeft: hPad,
    paddingRight: hPad,
  });
}

export function mainScrollRegion(theme: ThemeType) {
  return css({
    flex: '1 1 auto',
    minHeight: 0,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  });
}

/** Chat column inside scroll — extra bottom padding so content clears the fixed prompt dock. */
export function chatScrollContent(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: 744,
    width: '100%',
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    minWidth: 0,
  });
}

export function chatColumn(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: 744,
    width: '100%',
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    minWidth: 0,
  });
}

export function promptDock(theme: ThemeType) {
  return css({
    flexShrink: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    paddingBottom: `calc(${theme.spacing.md}px + env(safe-area-inset-bottom, 0px))`,
    backgroundColor: genieVar.bgSecondary,
    zIndex: 2,
  });
}

export function promptInner() {
  return css({
    width: '100%',
    maxWidth: 744,
  });
}

export function userBubble(theme: ThemeType) {
  return css({
    alignSelf: 'flex-end',
    maxWidth: 600,
    width: '100%',
    backgroundColor: genieVar.actionDefaultBgHover,
    padding: `${theme.spacing.sm + theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.spacing.lg,
  });
}

export function responseBlock(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    alignItems: 'flex-start',
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    width: '100%',
    maxWidth: 744,
  });
}

export function numberedList(theme: ThemeType) {
  return css({
    margin: 0,
    paddingLeft: theme.spacing.lg,
    color: genieVar.textPrimary,
    fontSize: 15,
    lineHeight: '22px',
  });
}

export function promptCard(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    width: '100%',
    minHeight: 104,
    padding: theme.spacing.md,
    backgroundColor: genieVar.bgPrimary,
    border: `1px solid ${genieVar.border}`,
    borderRadius: theme.spacing.lg,
    boxShadow: genieVar.shadowMd,
  });
}

export function sourceChip(theme: ThemeType) {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: theme.borders.borderRadiusFull,
    backgroundColor: genieVar.bgSecondary,
    border: `2px solid ${genieVar.bgSecondary}`,
    marginRight: -4,
    flexShrink: 0,
  });
}

export const responseParagraphStyle = {
  marginBottom: 0,
  fontSize: 15,
  lineHeight: '22px',
} as const;

/** Figma Snippet Panel `9681:52819` width. */
export const SNIPPET_PANEL_WIDTH_PX = 400;

/** Inset from viewport right / bottom (Figma spacing-mid = 12px). */
export const SNIPPET_PANEL_INSET_PX = 12;

export const SNIPPET_PANEL_SLIDE_MS = 300;

export function snippetPanelShell(open: boolean) {
  const openWidth = SNIPPET_PANEL_WIDTH_PX + SNIPPET_PANEL_INSET_PX;
  return css({
    flexShrink: 0,
    boxSizing: 'border-box',
    width: open ? openWidth : 0,
    paddingRight: SNIPPET_PANEL_INSET_PX,
    paddingBottom: SNIPPET_PANEL_INSET_PX,
    overflow: 'hidden',
    transition: `width ${SNIPPET_PANEL_SLIDE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    minHeight: 0,
    display: 'flex',
  });
}
