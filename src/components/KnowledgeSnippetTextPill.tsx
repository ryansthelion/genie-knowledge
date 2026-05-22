import { css } from '@emotion/react';
import { useDesignSystemTheme } from '@databricks/design-system';
import { useState, type ReactNode } from 'react';
import {
  SnippetPillChrome,
  snippetPillLabel,
  snippetPillStyles,
  type SnippetPillVisualState,
} from './knowledgeSnippetPillCore';

export type KnowledgeSnippetTextPillProps = {
  label: string;
  maxWidthPx?: number;
  icon?: ReactNode;
  selected?: boolean;
  /** When false, renders a non-interactive pill (e.g. card metadata). Default true. */
  interactive?: boolean;
  onClick?: () => void;
};

/**
 * Figma Source `3432:6834` (text-only) — same pill as {@link KnowledgeSnippetPill} without icon.
 */
export function KnowledgeSnippetTextPill({
  label,
  maxWidthPx,
  icon,
  selected = false,
  interactive = true,
  onClick,
}: KnowledgeSnippetTextPillProps) {
  const { theme } = useDesignSystemTheme();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const visual: SnippetPillVisualState = pressed ? 'press' : hovered ? 'hover' : 'default';

  if (!interactive) {
    return (
      <span
        css={css([
          snippetPillStyles(theme, 'default', selected, maxWidthPx),
          { cursor: 'default', pointerEvents: 'none' },
        ])}
        data-name="Source"
        aria-hidden
      >
        {icon}
        <span css={snippetPillLabel()}>{label}</span>
      </span>
    );
  }

  return (
    <SnippetPillChrome
      theme={theme}
      label={label}
      icon={icon}
      visual={visual}
      selected={selected}
      maxWidthPx={maxWidthPx}
      aria-label={label}
      aria-pressed={selected}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    />
  );
}
