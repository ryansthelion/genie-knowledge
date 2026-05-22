import { SNIPPET_POPOVER_BY_ID, type SnippetPopoverConfig } from './snippetPopoverConfig';

/** Figma Dropdown Menu `9667:49361` — snippet list for multi-snippet Source pill. */
export type SnippetDropdownItem = {
  id: string;
  label: string;
};

export function getSnippetPopoverForDropdownItem(item: SnippetDropdownItem): SnippetPopoverConfig | undefined {
  return SNIPPET_POPOVER_BY_ID[item.id];
}

export const MULTI_SNIPPET_DROPDOWN_ITEMS: SnippetDropdownItem[] = [
  { id: 'pricing-disparity', label: 'Pricing disparity after FX adjustment' },
  { id: 'inventory-timing', label: 'Inventory timing' },
  { id: 'partner-door-mix', label: 'Partner door mix' },
  { id: 'emea-sell-through', label: 'EMEA sell-through toward NSO' },
];
