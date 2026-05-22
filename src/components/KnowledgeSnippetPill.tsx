import { LightbulbIcon, useDesignSystemTheme } from '@databricks/design-system';
import { AiGradientLightbulbIcon } from './AiGradientIcon';
import { useCallback, useRef, useState } from 'react';
import {
  SnippetPopoverLayer,
  useAnchorSnippetPopover,
} from './knowledgeSnippetPopoverLayer';
import {
  SnippetPillChrome,
  type SnippetPillVisualState,
} from './knowledgeSnippetPillCore';
import { KnowledgeSnippetDropdownMenu } from './KnowledgeSnippetDropdownMenu';
import type { SnippetPopoverConfig } from './snippetPopoverConfig';
import type { SnippetDropdownItem } from './snippetDropdownConfig';

/** Figma Source `3432:6834` — Type=Icon, 14px icon. */
const ICON_PX = 14;
const PILL_POPOVER_HOVER_DELAY_MS = 200;

export type KnowledgeSnippetPillIconTone = 'ai' | 'secondary';

export type KnowledgeSnippetPillProps = {
  label: string;
  /** Figma Source lightbulb — `ai` gradient (default) or `textSecondary` (e.g. thinking tool call). */
  iconTone?: KnowledgeSnippetPillIconTone;
  selected?: boolean;
  defaultSelected?: boolean;
  onSelectedChange?: (selected: boolean) => void;
  /** Figma Context Card `9667:52686` — shown 4px below on hover. */
  popover?: SnippetPopoverConfig;
  /** Opens Snippet Panel `9681:52819` from popover action. */
  onViewFullSnippet?: (snippetId?: string) => void;
  /** Figma Dropdown Menu `9667:49361` — opens on click (e.g. "+4 snippets"). */
  menu?: SnippetDropdownItem[];
  /** Scrollable menu viewport height in visible rows (e.g. 5 for long lists). */
  menuMaxVisibleItems?: number;
  onMenuItemSelect?: (item: SnippetDropdownItem) => void;
};

/**
 * Figma **Source** `3432:6834` (Type=Icon) — knowledge snippet count pill with lightbulb.
 * @see https://www.figma.com/design/st5IOjhahvmvXyDbjvMpHB/Genie--Unified-Components-?node-id=3432-6834
 */
export function KnowledgeSnippetPill({
  label,
  iconTone = 'ai',
  selected: selectedProp,
  defaultSelected = false,
  onSelectedChange,
  popover,
  onViewFullSnippet,
  menu,
  menuMaxVisibleItems,
  onMenuItemSelect,
}: KnowledgeSnippetPillProps) {
  const { theme } = useDesignSystemTheme();
  const anchorRef = useRef<HTMLButtonElement>(null);

  const [selectedUncontrolled, setSelectedUncontrolled] = useState(defaultSelected);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const isControlled = selectedProp !== undefined;
  const selected = isControlled ? selectedProp : selectedUncontrolled;
  const visual: SnippetPillVisualState = pressed ? 'press' : hovered ? 'hover' : 'default';

  const {
    coords,
    placement,
    popoverMounted,
    popoverVisible,
    handlePointerEnter: handlePopoverPointerEnter,
    handlePointerLeave: handlePopoverPointerLeave,
    dismissPopover,
  } = useAnchorSnippetPopover({
    anchorRef,
    config: popover,
    hoverDelayMs: PILL_POPOVER_HOVER_DELAY_MS,
    placement: 'below-left',
    isEnabled: !menu,
  });

  const handlePointerEnter = useCallback(() => {
    setHovered(true);
    handlePopoverPointerEnter();
  }, [handlePopoverPointerEnter]);

  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    setPressed(false);
    handlePopoverPointerLeave();
  }, [handlePopoverPointerLeave]);

  const toggleSelected = useCallback(() => {
    const next = !selected;
    if (!isControlled) {
      setSelectedUncontrolled(next);
    }
    onSelectedChange?.(next);
  }, [isControlled, onSelectedChange, selected]);

  const handleViewFullSnippet = useCallback(() => {
    dismissPopover();
    onViewFullSnippet?.();
  }, [dismissPopover, onViewFullSnippet]);

  const pillIcon =
    iconTone === 'secondary' ? (
      <LightbulbIcon
        style={{ fontSize: ICON_PX, color: theme.colors.textSecondary, flexShrink: 0 }}
        aria-hidden
      />
    ) : (
      <AiGradientLightbulbIcon size={ICON_PX} />
    );

  const pillChrome = (
    <SnippetPillChrome
      ref={anchorRef}
      theme={theme}
      label={label}
      icon={pillIcon}
      visual={visual}
      selected={menu ? false : selected}
      aria-pressed={menu ? undefined : selected}
      aria-label={label}
      aria-haspopup={menu ? 'menu' : popover ? 'dialog' : undefined}
      aria-expanded={popover ? popoverMounted && popoverVisible : undefined}
      onClick={menu ? undefined : toggleSelected}
      onMouseEnter={handlePointerEnter}
      onMouseLeave={handlePointerLeave}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    />
  );

  return (
    <>
      {menu ? (
        <KnowledgeSnippetDropdownMenu
          items={menu}
          maxVisibleItems={menuMaxVisibleItems}
          onItemSelect={onMenuItemSelect}
          onViewFullSnippet={onViewFullSnippet}
        >
          {pillChrome}
        </KnowledgeSnippetDropdownMenu>
      ) : (
        pillChrome
      )}
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
