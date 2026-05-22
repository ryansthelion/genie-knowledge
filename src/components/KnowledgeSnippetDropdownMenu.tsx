import { css } from '@emotion/react';
import { DropdownMenu, LightbulbIcon, useDesignSystemTheme } from '@databricks/design-system';
import { useCallback, useRef, type ReactElement } from 'react';
import {
  SnippetPopoverLayer,
  useAnchorSnippetPopover,
} from './knowledgeSnippetPopoverLayer';
import { genieSunRootAttributes, genieVar } from '../theme/genieSun';
import {
  expertInitialFromName,
  getSnippetPopoverForDropdownItem,
  type SnippetDropdownItem,
} from './snippetDropdownConfig';

const MENU_ICON_PX = 16;
const MENU_ITEM_HOVER_DELAY_MS = 300;
/** Figma list item — 4px + 20px line + 4px vertical padding. */
export const SNIPPET_DROPDOWN_ITEM_ROW_HEIGHT_PX = 28;

/** Figma Experts row `10677:9805` — 20px avatar + 20px label. */
export const EXPERT_DROPDOWN_ITEM_ROW_HEIGHT_PX = 32;

const EXPERT_AVATAR_PX = 20;

/** Figma list item — 8px radius, icon + label; hover uses action default hover. */
const snippetItemStyles = css({
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

/** Figma Experts dropdown `10677:9804` — xs avatar + name. */
const expertItemStyles = css({
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

function expertMenuAvatar(initial: string, bg: string) {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: EXPERT_AVATAR_PX,
    height: EXPERT_AVATAR_PX,
    borderRadius: '50%',
    backgroundColor: bg,
    flexShrink: 0,
    fontSize: 11,
    fontWeight: 600,
    lineHeight: 1,
    color: '#fff',
  });
}

/** Figma Topics dropdown `10677:9748` — text-only row, no leading icon. */
const textItemStyles = css({
  display: 'flex',
  alignItems: 'center',
  padding: '4px 12px 4px 8px',
  borderRadius: 8,
  fontSize: 13,
  lineHeight: '20px',
  color: genieVar.textPrimary,
  cursor: 'pointer',
  outline: 'none',
  wordBreak: 'break-word',
  '&:hover, &:focus, &[data-highlighted]': {
    backgroundColor: genieVar.actionDefaultBgHover,
  },
});

function DropdownSnippetMenuItem({
  item,
  itemLayout,
  onSelect,
  onViewFullSnippet,
}: {
  item: SnippetDropdownItem;
  itemLayout: 'snippet' | 'text' | 'expert';
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
    isEnabled: itemLayout === 'snippet' && Boolean(popover),
  });

  const handleViewFullSnippet = useCallback(() => {
    dismissPopover();
    onViewFullSnippet?.();
  }, [dismissPopover, onViewFullSnippet]);

  if (itemLayout === 'text') {
    return (
      <DropdownMenu.Item ref={itemRef} css={textItemStyles} onSelect={onSelect}>
        {item.label}
      </DropdownMenu.Item>
    );
  }

  if (itemLayout === 'expert') {
    const initial = item.expertInitial ?? expertInitialFromName(item.label);
    const avatarBg = item.expertAvatarBg ?? '#5c6bc0';
    return (
      <DropdownMenu.Item ref={itemRef} css={expertItemStyles} onSelect={onSelect}>
        <span css={expertMenuAvatar(initial, avatarBg)} aria-hidden>
          {initial}
        </span>
        <span>{item.label}</span>
      </DropdownMenu.Item>
    );
  }

  return (
    <>
      <DropdownMenu.Item
        ref={itemRef}
        css={snippetItemStyles}
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

function menuListViewport(maxVisibleItems: number, itemLayout: 'snippet' | 'text' | 'expert') {
  const rowHeightPx =
    itemLayout === 'expert' ? EXPERT_DROPDOWN_ITEM_ROW_HEIGHT_PX : SNIPPET_DROPDOWN_ITEM_ROW_HEIGHT_PX;
  return css({
    maxHeight: maxVisibleItems * rowHeightPx,
    overflowY: 'auto',
    overflowX: 'hidden',
  });
}

export type KnowledgeSnippetDropdownMenuProps = {
  items: SnippetDropdownItem[];
  /** Fixed viewport height in rows; additional items scroll. */
  maxVisibleItems?: number;
  /** Snippet / topics / experts row layouts (`9667:49361`, `10677:9748`, `10677:9804`). */
  itemLayout?: 'snippet' | 'text' | 'expert';
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
  itemLayout = 'snippet',
  onItemSelect,
  onViewFullSnippet,
  children,
}: KnowledgeSnippetDropdownMenuProps) {
  const { theme } = useDesignSystemTheme();

  /** Figma Dropdown Menu `9667:49361` / Topics `10677:9748` / Experts `10677:9804`. */
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
          <div css={menuListViewport(maxVisibleItems, itemLayout)}>
            {items.map((item) => (
              <DropdownSnippetMenuItem
                key={item.id}
                item={item}
                itemLayout={itemLayout}
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
              itemLayout={itemLayout}
              onSelect={() => onItemSelect?.(item)}
              onViewFullSnippet={onViewFullSnippet}
            />
          ))
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
