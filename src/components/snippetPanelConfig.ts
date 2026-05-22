import type { KnowledgeTagColor, KnowledgeVerifiedUser } from './knowledgeContextConfig';
import type { LineageVariant } from './LineageVisualizer';

/** Figma Knowledge Snippet Panel `10055:46586`. */
export type SnippetPanelConfig = {
  title: string;
  panelAriaLabel: string;
  description: string;
  tagLabel: string;
  tagColor: KnowledgeTagColor;
  /** Figma Tooltip `9783:44978`. */
  tagTooltip?: string;
  sourceName: string;
  sourceAuthor: string;
  /** Author avatar initial + background (Figma `10055:47261`). */
  sourceAuthorInitial: string;
  sourceAuthorAvatarBg: string;
  /** Figma Topics `10055:47291` — default tag pills. */
  topics: readonly string[];
  /** @deprecated Domain drill-down pills removed in `10055:46586`; kept for container routing. */
  domains: readonly string[];
  verifiedUsers: readonly KnowledgeVerifiedUser[];
  moreVerifiedCount: number;
  lineageVariant: LineageVariant;
};

const PRICING_DISPARITY_VERIFIED = [
  { initial: 'K', name: 'Ken Wong', bg: '#434a93' },
  { initial: 'M', name: 'Miranda Luna', bg: '#04867d' },
  { initial: 'R', name: 'Ross Geller', bg: '#a6630c' },
] as const;

export const PRICING_DISPARITY_SNIPPET_PANEL: SnippetPanelConfig = {
  title: 'Pricing disparity after FX adjustment',
  panelAriaLabel: 'Pricing disparity after FX adjustment',
  description:
    'Pricing disparity after FX adjustment refers to the difference in prices after accounting for fluctuations in foreign exchange rates.',
  tagLabel: 'Metric definition',
  tagColor: 'indigo',
  tagTooltip:
    'This snippet describes how a metric is calculated, including its formula, data source, and any exclusions to apply.',
  sourceName: 'Merch Analytics Dashboard',
  sourceAuthor: 'Ryan Chen',
  sourceAuthorInitial: 'R',
  sourceAuthorAvatarBg: '#04867d',
  topics: ['Merchandising', 'customers', 'stores', 'billing'],
  domains: ['Merchandising', 'Sales Data'],
  verifiedUsers: PRICING_DISPARITY_VERIFIED,
  moreVerifiedCount: 2,
  lineageVariant: 'pricing-disparity',
};
