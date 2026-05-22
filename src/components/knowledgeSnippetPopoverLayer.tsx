import { css } from '@emotion/react';
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { genieSunRootAttributes } from '../theme/genieSun';
import { KnowledgeSnippetPopoverCard } from './KnowledgeSnippetPopoverCard';
import type { SnippetPopoverConfig } from './snippetPopoverConfig';

export const SNIPPET_POPOVER_OFFSET_PX = 4;
export const SNIPPET_POPOVER_FADE_IN_MS = 50;
export const SNIPPET_POPOVER_FADE_OUT_MS = 150;

export type SnippetPopoverCoords = { top: number; left: number };

export type SnippetPopoverPlacement = 'below-left' | 'right';

export function snippetPopoverCoordsForAnchor(
  anchorRect: DOMRect,
  placement: SnippetPopoverPlacement,
  anchorEl?: HTMLElement | null,
): SnippetPopoverCoords {
  if (placement === 'right') {
    const menuContent = anchorEl?.closest('[role="menu"]');
    const menuRect = menuContent?.getBoundingClientRect();
    const menuRight = menuRect?.right ?? anchorRect.right;
    return {
      top: anchorRect.top,
      left: menuRight + SNIPPET_POPOVER_OFFSET_PX,
    };
  }
  return {
    top: anchorRect.bottom + SNIPPET_POPOVER_OFFSET_PX,
    left: anchorRect.left,
  };
}

function popoverBridgeStyles(placement: SnippetPopoverPlacement) {
  if (placement === 'right') {
    return {
      content: '""',
      position: 'absolute' as const,
      left: -12,
      top: 0,
      width: 12,
      bottom: 0,
    };
  }
  return {
    content: '""',
    position: 'absolute' as const,
    top: -SNIPPET_POPOVER_OFFSET_PX,
    left: 0,
    right: 0,
    height: SNIPPET_POPOVER_OFFSET_PX,
  };
}

export function SnippetPopoverLayer({
  config,
  coords,
  placement,
  visible,
  onPointerEnter,
  onPointerLeave,
  onViewFullSnippet,
}: {
  config: SnippetPopoverConfig;
  coords: SnippetPopoverCoords;
  placement: SnippetPopoverPlacement;
  visible: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onViewFullSnippet?: () => void;
}) {
  const fadeMs = visible ? SNIPPET_POPOVER_FADE_IN_MS : SNIPPET_POPOVER_FADE_OUT_MS;

  return createPortal(
    <div
      {...genieSunRootAttributes}
      css={css({
        position: 'fixed',
        top: coords.top,
        left: coords.left,
        zIndex: 10001,
        pointerEvents: 'auto',
        opacity: visible ? 1 : 0,
        transition: `opacity ${fadeMs}ms ease-out`,
        '&::before': popoverBridgeStyles(placement),
      })}
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
    >
      <KnowledgeSnippetPopoverCard config={config} onViewFullSnippet={onViewFullSnippet} />
    </div>,
    document.body,
  );
}

export function useAnchorSnippetPopover({
  anchorRef,
  config,
  hoverDelayMs,
  placement,
  isEnabled = true,
}: {
  anchorRef: RefObject<HTMLElement | null>;
  config?: SnippetPopoverConfig;
  hoverDelayMs: number;
  placement: SnippetPopoverPlacement;
  isEnabled?: boolean;
}) {
  const showDelayRef = useRef<ReturnType<typeof setTimeout>>();
  const hideDelayRef = useRef<ReturnType<typeof setTimeout>>();
  const pointerInsideRef = useRef(false);

  const [popoverMounted, setPopoverMounted] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [coords, setCoords] = useState<SnippetPopoverCoords>({ top: 0, left: 0 });

  const clearTimers = useCallback(() => {
    if (showDelayRef.current) clearTimeout(showDelayRef.current);
    if (hideDelayRef.current) clearTimeout(hideDelayRef.current);
  }, []);

  const updateCoords = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    setCoords(snippetPopoverCoordsForAnchor(el.getBoundingClientRect(), placement, el));
  }, [anchorRef, placement]);

  const hidePopover = useCallback(() => {
    setPopoverVisible(false);
    hideDelayRef.current = setTimeout(() => setPopoverMounted(false), SNIPPET_POPOVER_FADE_OUT_MS);
  }, []);

  const showPopover = useCallback(() => {
    if (!config || !isEnabled) return;
    if (hideDelayRef.current) clearTimeout(hideDelayRef.current);
    updateCoords();
    setPopoverVisible(false);
    setPopoverMounted(true);
    requestAnimationFrame(() => setPopoverVisible(true));
  }, [config, isEnabled, updateCoords]);

  const handlePointerEnter = useCallback(() => {
    if (!config || !isEnabled) return;
    pointerInsideRef.current = true;
    if (hideDelayRef.current) clearTimeout(hideDelayRef.current);
    if (popoverMounted) {
      updateCoords();
      setPopoverVisible(true);
      return;
    }
    showDelayRef.current = setTimeout(() => {
      if (pointerInsideRef.current) showPopover();
    }, hoverDelayMs);
  }, [config, hoverDelayMs, isEnabled, popoverMounted, showPopover, updateCoords]);

  const handlePointerLeave = useCallback(() => {
    pointerInsideRef.current = false;
    if (showDelayRef.current) clearTimeout(showDelayRef.current);
    if (!popoverMounted) return;
    hidePopover();
  }, [hidePopover, popoverMounted]);

  useEffect(() => {
    if (!popoverMounted) return;
    updateCoords();
    window.addEventListener('scroll', updateCoords, true);
    window.addEventListener('resize', updateCoords);
    return () => {
      window.removeEventListener('scroll', updateCoords, true);
      window.removeEventListener('resize', updateCoords);
    };
  }, [popoverMounted, updateCoords]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const dismissPopover = useCallback(() => {
    clearTimers();
    setPopoverVisible(false);
    setPopoverMounted(false);
    pointerInsideRef.current = false;
  }, [clearTimers]);

  return {
    config,
    coords,
    placement,
    popoverMounted,
    popoverVisible,
    handlePointerEnter,
    handlePointerLeave,
    dismissPopover,
    updateCoords,
  };
}
