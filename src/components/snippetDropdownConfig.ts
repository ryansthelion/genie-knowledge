import type { SnippetPanelDomainId } from './domainPanelConfig';
import { SNIPPET_POPOVER_BY_ID, type SnippetPopoverConfig } from './snippetPopoverConfig';

/** Figma Dropdown Menu `9667:49361` — snippet list for multi-snippet Source pill. */
export type SnippetDropdownItem = {
  id: string;
  label: string;
  /** Opens Domain / Topic panel when the menu item is selected. */
  domainId?: SnippetPanelDomainId;
  /** Figma Experts menu `10677:9804` — xs circle avatar initials. */
  expertInitial?: string;
  expertAvatarBg?: string;
  /** Opens User Profile panel when the menu item is selected. */
  userId?: string;
};

export function expertInitialFromName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '?';
  return trimmed.charAt(0).toUpperCase();
}

export function getSnippetPopoverForDropdownItem(item: SnippetDropdownItem): SnippetPopoverConfig | undefined {
  return SNIPPET_POPOVER_BY_ID[item.id];
}

export const MULTI_SNIPPET_DROPDOWN_ITEMS: SnippetDropdownItem[] = [
  { id: 'pricing-disparity', label: 'Pricing disparity after FX adjustment' },
  { id: 'inventory-timing', label: 'Inventory timing' },
  { id: 'partner-door-mix', label: 'Partner door mix' },
  { id: 'emea-sell-through', label: 'EMEA sell-through toward NSO' },
];
