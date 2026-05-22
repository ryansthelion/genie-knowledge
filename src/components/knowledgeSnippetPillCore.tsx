import { css } from '@emotion/react';
import type { ThemeType } from '@databricks/design-system';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { genieVar } from '../theme/genieSun';

/** Figma Source `3432:6834` — 24px pill, Du Bois/Hint label. */
export const SNIPPET_PILL_HEIGHT_PX = 24;

export type SnippetPillVisualState = 'default' | 'hover' | 'press';

export function snippetPillBackground(theme: ThemeType, visual: SnippetPillVisualState, selected: boolean) {
  if (selected || visual === 'hover' || visual === 'press') {
    return theme.colors.actionDefaultBackgroundPress;
  }
  return genieVar.actionDefaultBgHover;
}

export function snippetPillStyles(
  theme: ThemeType,
  visual: SnippetPillVisualState,
  selected: boolean,
  maxWidthPx?: number,
) {
  return css({
    display: 'inline-flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: 'fit-content',
    maxWidth: maxWidthPx ?? 160,
    gap: theme.spacing.xs,
    flexShrink: 0,
    height: SNIPPET_PILL_HEIGHT_PX,
    padding: `${theme.spacing.xs}px 6px`,
    margin: 0,
    border: 'none',
    borderRadius: theme.borders.borderRadiusFull,
    backgroundColor: snippetPillBackground(theme, visual, selected),
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

export function snippetPillLabel() {
  return css({
    flex: '0 0 auto',
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 400,
    color: genieVar.textSecondary,
    whiteSpace: 'nowrap',
  });
}

export type SnippetPillChromeProps = {
  theme: ThemeType;
  label: string;
  icon?: ReactNode;
  visual: SnippetPillVisualState;
  selected?: boolean;
  maxWidthPx?: number;
  'data-name'?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

/** Shared chrome for Figma Source `3432:6834` — with or without leading icon. */
export const SnippetPillChrome = forwardRef<HTMLButtonElement, SnippetPillChromeProps>(
  function SnippetPillChrome(
    {
      theme,
      label,
      icon,
      visual,
      selected = false,
      maxWidthPx,
      'data-name': dataName = 'Source',
      ...buttonProps
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        css={snippetPillStyles(theme, visual, selected, maxWidthPx)}
        data-name={dataName}
        {...buttonProps}
      >
        {icon}
        <span css={snippetPillLabel()}>{label}</span>
      </button>
    );
  },
);
