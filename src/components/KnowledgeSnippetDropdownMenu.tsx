import { css } from '@emotion/react';
import { DropdownMenu, LightbulbIcon, useDesignSystemTheme } from '@databricks/design-system';
import { useCallback, useRef, type ReactElement } from 'react';
import {
  SnippetPopoverLayer,
  useAnchorSnippetPopover,
} from './knowledgeSnippetPopoverLayer';
import { genieSunRootAttributes, genieVar } from '../theme/genieSun';
import { getSnippetPopoverForDropdownItem, type SnippetDropdownItem } from './snippetDropdownConfig';

const MENU_ICON_PX = 16;
const MENU_ITEM_HOVER_DELAY_MS = 300;
/** Figma list item — 4px + 20px line + 4px vertical padding. */
export const SNIPPET_DROPDOWN_ITEM_ROW_HEIGHT_PX = 28;

/** Figma list item — 8px radius, icon + label; hover uses action default hover. */
const itemStyles = css({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  padding: '4px 12px 4px 8px',
  borderRadius: 8,
  fontSize: 13,
  lineHeight: '20px',
  color: genieVar.textPrimary,
  cursor: 'pointer',
  outline: 'none',
  '&:hover, &:focus, &[data-highlighted]': {
    backgroundColor: genieVar.actionDefaultBgHover,
  },
});

function DropdownSnippetMenuItem({
  item,
  onSelect,
  onViewFullSnippet,
}: {
  item: SnippetDropdownItem;
  onSelect?: () => void;
  onViewFullSnippet?: () => void;
}) {
  const { theme } = useDesignSystemTheme();
  const itemRef = useRef<HTMLDivElement>(null);
  const popover = getSnippetPopoverForDropdownItem(item);

  const {
    coords,
    placement,
    popoverMounted,
    popoverVisible,
    handlePointerEnter,
    handlePointerLeave,
    dismissPopover,
  } = useAnchorSnippetPopover({
    anchorRef: itemRef,
    config: popover,
    hoverDelayMs: MENU_ITEM_HOVER_DELAY_MS,
    placement: 'right',
  });

  const handleViewFullSnippet = useCallback(() => {
    dismissPopover();
    onViewFullSnippet?.();
  }, [dismissPopover, onViewFullSnippet]);

  return (
    <>
      <DropdownMenu.Item
        ref={itemRef}
        css={itemStyles}
        onSelect={onSelect}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
      >
        <LightbulbIcon
          style={{ fontSize: MENU_ICON_PX, color: theme.colors.textSecondary, flexShrink: 0 }}
          aria-hidden
        />
        <span>{item.label}</span>
      </DropdownMenu.Item>
      {popover && popoverMounted ? (
        <SnippetPopoverLayer
          config={popover}
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

function menuListViewport(maxVisibleItems: number) {
  return css({
    maxHeight: maxVisibleItems * SNIPPET_DROPDOWN_ITEM_ROW_HEIGHT_PX,
    overflowY: 'auto',
    overflowX: 'hidden',
  });
}

export type KnowledgeSnippetDropdownMenuProps = {
  items: SnippetDropdownItem[];
  /** Fixed viewport height in rows; additional items scroll. */
  maxVisibleItems?: number;
  onItemSelect?: (item: SnippetDropdownItem) => void;
  onViewFullSnippet?: () => void;
  children: ReactElement;
};

/**
 * Click-triggered snippet list menu for Source pills (e.g. "+4 snippets").
 * List items show Context Card `9667:52686` on hover (300ms), 4px to the right of item.
 * @see https://www.figma.com/design/st5IOjhahvmvXyDbjvMpHB/?node-id=9667-49361
 */
export function KnowledgeSnippetDropdownMenu({
  items,
  maxVisibleItems,
  onItemSelect,
  onViewFullSnippet,
  children,
}: KnowledgeSnippetDropdownMenuProps) {
  const { theme } = useDesignSystemTheme();

  /** Figma Dropdown Menu `9667:49361` — `Background/backgroundPrimary`. */
  const contentStyles = css({
    padding: 4,
    borderRadius: 12,
    backgroundColor: theme.colors.backgroundPrimary,
    border: `1px solid ${genieVar.border}`,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
  });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content
        {...genieSunRootAttributes}
        align="start"
        sideOffset={4}
        css={contentStyles}
        minWidth={0}
      >
        {maxVisibleItems ? (
          <div css={menuListViewport(maxVisibleItems)}>
            {items.map((item) => (
              <DropdownSnippetMenuItem
                key={item.id}
                item={item}
                onSelect={() => onItemSelect?.(item)}
                onViewFullSnippet={onViewFullSnippet}
              />
            ))}
          </div>
        ) : (
          items.map((item) => (
            <DropdownSnippetMenuItem
              key={item.id}
              item={item}
              onSelect={() => onItemSelect?.(item)}
              onViewFullSnippet={onViewFullSnippet}
            />
          ))
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
