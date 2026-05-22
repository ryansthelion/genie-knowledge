import { css } from '@emotion/react';
import { Tag, Tooltip } from '@databricks/design-system';
import type { KnowledgeTagColor } from './knowledgeContextConfig';

/** Figma Tag hug — height 20px, fit-content width. */
function hugTagStyles() {
  return css({
    alignSelf: 'flex-start',
    width: 'fit-content',
    maxWidth: '100%',
    marginRight: 0,
    borderRadius: 'var(--genie-radius-action)',
    height: 20,
    '& > div': { borderRadius: 'inherit', height: '100%' },
    '& > div > div': { borderRadius: 'inherit' },
  });
}

export type KnowledgeSnippetTagProps = {
  label: string;
  color: KnowledgeTagColor;
  /** Figma Tooltip `9783:44978` — shown on hover, positioned left of the tag. */
  tooltip?: string;
  /** Raise above snippet popover portal (`z-index: 10000`). */
  tooltipZIndex?: number;
};

/**
 * Snippet context tag with optional left tooltip (Figma `9783:44978`).
 */
export function KnowledgeSnippetTag({ label, color, tooltip, tooltipZIndex = 10001 }: KnowledgeSnippetTagProps) {
  const tag = (
    <Tag color={color} css={hugTagStyles()}>
      {label}
    </Tag>
  );

  if (!tooltip) {
    return tag;
  }

  return (
    <Tooltip
      content={tooltip}
      side="left"
      align="center"
      sideOffset={4}
      maxWidth={280}
      zIndex={tooltipZIndex}
    >
      <span css={css({ display: 'inline-flex', width: 'fit-content', cursor: 'default' })}>{tag}</span>
    </Tooltip>
  );
}
