import { css } from '@emotion/react';
import { useDesignSystemTheme } from '@databricks/design-system';
import type { ThemeType } from '@databricks/design-system';
import { useCallback, useRef, useState } from 'react';
import { AiGradientLightbulbIcon } from './AiGradientIcon';
import {
  SnippetPopoverLayer,
  useAnchorSnippetPopover,
} from './knowledgeSnippetPopoverLayer';
import type { SnippetPopoverConfig } from './snippetPopoverConfig';
import { genieVar } from '../theme/genieSun';

const ICON_PX = 14;
const ROW_POPOVER_HOVER_DELAY_MS = 200;

export type ThinkingToolCallSnippetItem = {
  id: string;
  preview: string;
  categoryLabel: string;
  popover?: SnippetPopoverConfig;
};

function contentPanel(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
    alignItems: 'flex-start',
    width: '100%',
    padding: theme.spacing.sm,
    boxSizing: 'border-box',
  });
}

function snippetRow(theme: ThemeType, hovered: boolean) {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
    width: '100%',
    padding: theme.spacing.xs,
    margin: 0,
    border: 'none',
    borderRadius: theme.borders.borderRadiusSm,
    backgroundColor: hovered ? genieVar.actionDefaultBgHover : 'transparent',
    cursor: 'pointer',
    font: 'inherit',
    color: 'inherit',
    textAlign: 'left',
    boxSizing: 'border-box',
    transition: 'background-color 0.12s ease-out',
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.actionPrimaryBackgroundPress}`,
      outlineOffset: 0,
    },
  });
}

function snippetRowMain(theme: ThemeType) {
  return css({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    flex: '1 1 auto',
    minWidth: 0,
  });
}

function snippetPreview() {
  return css({
    flex: '1 1 auto',
    minWidth: 0,
    margin: 0,
    fontSize: 12,
    lineHeight: 1.4,
    fontWeight: 400,
    color: genieVar.textPrimary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  });
}

function categoryLabel() {
  return css({
    flexShrink: 0,
    margin: 0,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: 10,
    lineHeight: 1.4,
    fontWeight: 500,
    color: genieVar.textSecondary,
    whiteSpace: 'nowrap',
  });
}

function SnippetContentRow({
  item,
  onViewFullSnippet,
}: {
  item: ThinkingToolCallSnippetItem;
  onViewFullSnippet?: (snippetId: string) => void;
}) {
  const { theme } = useDesignSystemTheme();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  const {
    coords,
    placement,
    popoverMounted,
    popoverVisible,
    handlePointerEnter,
    handlePointerLeave,
    dismissPopover,
  } = useAnchorSnippetPopover({
    anchorRef,
    config: item.popover,
    hoverDelayMs: ROW_POPOVER_HOVER_DELAY_MS,
    placement: 'below-left',
    isEnabled: Boolean(item.popover),
  });

  const handleViewFullSnippet = useCallback(() => {
    dismissPopover();
    onViewFullSnippet?.(item.id);
  }, [dismissPopover, item.id, onViewFullSnippet]);

  const handleRowClick = useCallback(() => {
    dismissPopover();
    onViewFullSnippet?.(item.id);
  }, [dismissPopover, item.id, onViewFullSnippet]);

  return (
    <>
      <button
        ref={anchorRef}
        type="button"
        css={snippetRow(theme, hovered)}
        data-name=".Row"
        aria-label={item.preview}
        onClick={handleRowClick}
        onMouseEnter={() => {
          setHovered(true);
          handlePointerEnter();
        }}
        onMouseLeave={() => {
          setHovered(false);
          handlePointerLeave();
        }}
      >
        <span css={snippetRowMain(theme)}>
          <AiGradientLightbulbIcon size={ICON_PX} />
          <span css={snippetPreview()}>{item.preview}</span>
        </span>
        <span css={categoryLabel()}>{item.categoryLabel}</span>
      </button>
      {item.popover && popoverMounted ? (
        <SnippetPopoverLayer
          config={item.popover}
          coords={coords}
          placement={placement}
          visible={popoverVisible}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onViewFullSnippet={handleViewFullSnippet}
        />
      ) : null}
    </>
  );
}

/**
 * Figma snippet rows inside `10715:7283`.
 * @see https://www.figma.com/design/st5IOjhahvmvXyDbjvMpHB/Genie--Unified-Components-?node-id=10715-7275
 */
export function ThinkingToolCallSnippetContent({
  items,
  onViewFullSnippet,
}: {
  items: ThinkingToolCallSnippetItem[];
  onViewFullSnippet?: (snippetId: string) => void;
}) {
  const { theme } = useDesignSystemTheme();

  return (
    <div css={contentPanel(theme)} data-name="Tool Call/Content">
      {items.map((item) => (
        <SnippetContentRow key={item.id} item={item} onViewFullSnippet={onViewFullSnippet} />
      ))}
    </div>
  );
}
