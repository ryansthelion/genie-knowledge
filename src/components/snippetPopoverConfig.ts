import type { KnowledgeTagColor } from './knowledgeContextConfig';
import { CUSTOMER_CHURN_SNIPPET_POPOVERS_BY_ID } from './customerChurnSnippetConfig';

/** Figma Snippet Popover `8450:14345` — hover popover for snippet pills and menus. */
export type SnippetPopoverConfig = {
  cardTitle: string;
  cardAriaLabel: string;
  description: string;
  tagLabel: string;
  tagColor: KnowledgeTagColor;
  /** Figma Tooltip `9783:44978`. */
  tagTooltip?: string;
  sourceName: string;
  sourceAuthor: string;
  viewSnippetLabel?: string;
};

export const PRICING_DISPARITY_SNIPPET_POPOVER: SnippetPopoverConfig = {
  cardTitle: 'Pricing disparity after FX adjustment',
  cardAriaLabel: 'Pricing disparity after FX adjustment',
  description:
    'Pricing disparity after FX adjustment refers to the difference in prices after accounting for fluctuations in foreign exchange rates.',
  tagLabel: 'Metric definition',
  tagColor: 'indigo',
  tagTooltip:
    'This snippet describes how a metric is calculated, including its formula, data source, and any exclusions to apply.',
  sourceName: 'Merch Analytics Dashboard',
  sourceAuthor: 'Ryan Chen',
  viewSnippetLabel: 'View full snippet',
};

export const INVENTORY_TIMING_SNIPPET_POPOVER: SnippetPopoverConfig = {
  cardTitle: 'Inventory timing',
  cardAriaLabel: 'Inventory timing',
  description:
    'EMEA warehouses received the full Jordan 1 OG colorway allocation 3 weeks after NA launch, missing the peak hype window. Inventory for Sizes EU 42–44 did not land until Week 6.',
  tagLabel: 'Operational context',
  tagColor: 'lime',
  tagTooltip: 'Context about when inventory arrived relative to launch and regional demand peaks.',
  sourceName: 'Merch Analytics Dashboard',
  sourceAuthor: 'Ryan Chen',
  viewSnippetLabel: 'View full snippet',
};

export const PARTNER_DOOR_MIX_SNIPPET_POPOVER: SnippetPopoverConfig = {
  cardTitle: 'Partner door mix',
  cardAriaLabel: 'Partner door mix',
  description:
    "EMEA's sell-through is weighted heavily toward NSO (Nike-owned stores), which historically underperform versus Key Account partners for retro launches in that region.",
  tagLabel: 'Channel insight',
  tagColor: 'default',
  tagTooltip: 'How store-type mix affects sell-through for this launch in EMEA.',
  sourceName: 'Merch Analytics Dashboard',
  sourceAuthor: 'Ryan Chen',
  viewSnippetLabel: 'View full snippet',
};

export const EMEA_SELL_THROUGH_SNIPPET_POPOVER: SnippetPopoverConfig = {
  cardTitle: 'EMEA sell-through toward NSO',
  cardAriaLabel: 'EMEA sell-through toward NSO',
  description:
    'EMEA sell-through toward NSO tracks how much of regional demand is captured in Nike-owned stores versus partner doors, highlighting where retro launches under-index relative to NA.',
  tagLabel: 'Metric definition',
  tagColor: 'indigo',
  tagTooltip:
    'This snippet describes how a metric is calculated, including its formula, data source, and any exclusions to apply.',
  sourceName: 'Merch Analytics Dashboard',
  sourceAuthor: 'Ryan Chen',
  viewSnippetLabel: 'View full snippet',
};

export const SNIPPET_POPOVER_BY_ID: Record<string, SnippetPopoverConfig> = {
  'pricing-disparity': PRICING_DISPARITY_SNIPPET_POPOVER,
  'inventory-timing': INVENTORY_TIMING_SNIPPET_POPOVER,
  'partner-door-mix': PARTNER_DOOR_MIX_SNIPPET_POPOVER,
  'emea-sell-through': EMEA_SELL_THROUGH_SNIPPET_POPOVER,
  ...CUSTOMER_CHURN_SNIPPET_POPOVERS_BY_ID,
};
