export type SnippetPanelDomainId = 'merchandising' | 'sales-data';

export type DomainExpert = {
  id: string;
  name: string;
  rating: number;
  snippetCount: number;
  assetCount: number;
};

export type DomainAssetIconKind = 'dashboard' | 'table';

export type DomainAssetRow = {
  id: string;
  name: string;
  path: string;
  updatedAgo: string;
  viewedAgo: string;
  iconKind: DomainAssetIconKind;
};

export type DomainSnippetTagColor = 'indigo' | 'lime' | 'coral' | 'lemon' | 'brown' | 'default';

export type DomainSnippetRow = {
  id: string;
  /** Short label for aria / keys. */
  title: string;
  /** Figma card body — semibold 13/20, clamped to 2 lines (40px). */
  description: string;
  tagLabel: string;
  tagColor: DomainSnippetTagColor;
  topicCount: number;
};

export type DomainPanelTabId = 'experts' | 'assets' | 'snippets';

export type DomainPanelTab = {
  id: DomainPanelTabId;
  label: string;
  count: number;
};

export type DomainPanelConfig = {
  domainId: SnippetPanelDomainId;
  title: string;
  panelAriaLabel: string;
  /** Figma topic avatar tile — gradient-backed entity icon. */
  entityAvatarBg: string;
  tabs: readonly DomainPanelTab[];
  experts: readonly DomainExpert[];
  assets: readonly DomainAssetRow[];
  snippets: readonly DomainSnippetRow[];
};

const MERCHANDISING_EXPERTS: DomainExpert[] = [
  { id: 'liam', name: 'Liam Chen', rating: 4.7, snippetCount: 15, assetCount: 18 },
  { id: 'oliver', name: 'Oliver Smith', rating: 4.9, snippetCount: 25, assetCount: 30 },
  { id: 'emma', name: 'Emma Johnson', rating: 4.8, snippetCount: 20, assetCount: 25 },
  { id: 'noah', name: 'Noah Brown', rating: 4.6, snippetCount: 10, assetCount: 12 },
  { id: 'ava', name: 'Ava Martinez', rating: 5.0, snippetCount: 30, assetCount: 35 },
  { id: 'sofia', name: 'Sofia Kim', rating: 4.9, snippetCount: 28, assetCount: 22 },
  { id: 'mia', name: 'Mia Davis', rating: 4.5, snippetCount: 12, assetCount: 15 },
];

/** Figma Context Card assets `10538:14639`–`10538:14642`. */
const MERCHANDISING_ASSETS: DomainAssetRow[] = [
  {
    id: 'analytics-marketing',
    name: 'Analytics Marketing Dashboard',
    path: 'catalog.schema',
    updatedAgo: '1d ago',
    viewedAgo: '15 days ago',
    iconKind: 'dashboard',
  },
  {
    id: 'social-reach',
    name: 'Social Media Reach',
    path: 'social.media',
    updatedAgo: '6h ago',
    viewedAgo: '12 days ago',
    iconKind: 'dashboard',
  },
  {
    id: 'merch-analytics',
    name: 'Merch Analytics Dashboard',
    path: 'catalog.schema',
    updatedAgo: '1d ago',
    viewedAgo: '15 days ago',
    iconKind: 'dashboard',
  },
  {
    id: 'product-usage',
    name: 'Product Usage Statistics',
    path: 'product.analytics',
    updatedAgo: '8h ago',
    viewedAgo: '14 days ago',
    iconKind: 'table',
  },
];

/** Figma Snippets list `10538:14897`–`10538:14905` in `10538:14873`. */
const MERCHANDISING_SNIPPETS: DomainSnippetRow[] = [
  {
    id: 'fx',
    title: 'Pricing disparity after FX adjustment',
    description:
      'Pricing disparity after FX adjustment refers to the difference in prices after accounting for fluctuations in foreign exchange rates.',
    tagLabel: 'Metric definition',
    tagColor: 'indigo',
    topicCount: 12,
  },
  {
    id: 'sell-through',
    title: 'Weekly sell-through rate',
    description:
      'Weekly sell-through rate measures how much of available inventory sold in a calendar week, expressed as units sold divided by starting on-hand inventory.',
    tagLabel: 'Table semantics',
    tagColor: 'lime',
    topicCount: 12,
  },
  {
    id: 'inventory',
    title: 'EMEA inventory timing',
    description:
      'EMEA inventory timing adjusts sell-through windows for regional receipt lag so EMEA weeks are not compared directly to North America ship weeks.',
    tagLabel: 'Filter',
    tagColor: 'coral',
    topicCount: 12,
  },
  {
    id: 'door-mix',
    title: 'Partner door mix',
    description:
      'Partner door mix weights sell-through by active door count per account so a small boutique is not compared to a full-line fleet partner.',
    tagLabel: 'Business term',
    tagColor: 'lemon',
    topicCount: 12,
  },
  {
    id: 'retro',
    title: 'Jordan 1 Retro launch curve',
    description:
      'Jordan 1 Retro launch curve tracks first-eight-week sell-through against historical retro curves to flag hype windows that clear faster than plan.',
    tagLabel: 'Metric definition',
    tagColor: 'indigo',
    topicCount: 12,
  },
  {
    id: 'refunds',
    title: 'Refunds excluded from sell-through',
    description:
      'Refunds are excluded from sell-through numerators after the return posts to the ledger; use net units sold, not gross shipments minus returns in the same week.',
    tagLabel: 'Join hint',
    tagColor: 'brown',
    topicCount: 12,
  },
  {
    id: 'nso',
    title: 'NSO vs Key Account weighting',
    description:
      'NSO vs Key Account weighting applies different door-mix coefficients for new-store openings versus established key accounts in regional rollups.',
    tagLabel: 'Business term',
    tagColor: 'lemon',
    topicCount: 12,
  },
  {
    id: 'quarterly',
    title: 'Quarterly sell-through rollup',
    description:
      'Quarterly sell-through rollup sums weekly numerators and denominators before dividing; do not average weekly percentages when building quarter totals.',
    tagLabel: 'Metric definition',
    tagColor: 'indigo',
    topicCount: 12,
  },
  {
    id: 'emea-lag',
    title: 'EMEA vs NA sell-through lag',
    description:
      'EMEA vs NA sell-through lag documents the two-week receipt offset used when comparing launch curves across regions in merchandising reviews.',
    tagLabel: 'Table semantics',
    tagColor: 'lime',
    topicCount: 12,
  },
  {
    id: 'fx-ticket',
    title: 'FX-adjusted ticket price',
    description:
      'FX-adjusted ticket price converts local currency tickets to USD using the finance month-end rate before comparing pricing disparity across regions.',
    tagLabel: 'Filter',
    tagColor: 'coral',
    topicCount: 12,
  },
  {
    id: 'hype',
    title: 'Launch hype window',
    description:
      'Launch hype window is the first four weeks after inline date when sell-through is benchmarked against retro curves rather than steady-state targets.',
    tagLabel: 'Business term',
    tagColor: 'lemon',
    topicCount: 12,
  },
  {
    id: 'size-band',
    title: 'EU 42–44 velocity band',
    description:
      'EU 42–44 velocity band isolates size-run sell-through for high-demand EU sizes when planning replenishment for inline footwear.',
    tagLabel: 'Join hint',
    tagColor: 'brown',
    topicCount: 12,
  },
  {
    id: 'wholesale',
    title: 'Wholesale partner attribution',
    description:
      'Wholesale partner attribution maps sell-through to the billing partner on the shipment record, not the storefront brand displayed to consumers.',
    tagLabel: 'Table semantics',
    tagColor: 'lime',
    topicCount: 12,
  },
];

const SALES_DATA_EXPERTS: DomainExpert[] = [
  { id: 'jacqueline', name: 'Jacqueline Li', rating: 4.8, snippetCount: 18, assetCount: 14 },
  { id: 'ken', name: 'Ken Wong', rating: 4.6, snippetCount: 11, assetCount: 9 },
  { id: 'miranda', name: 'Miranda Luna', rating: 4.9, snippetCount: 22, assetCount: 16 },
];

const SALES_DATA_ASSETS: DomainAssetRow[] = [
  {
    id: 'gtm',
    name: 'GTM Pipeline Dashboard',
    path: 'sales.gtm',
    updatedAgo: '2h ago',
    viewedAgo: '3 days ago',
    iconKind: 'dashboard',
  },
  {
    id: 'merch',
    name: 'Merch Analytics Dashboard',
    path: 'catalog.schema',
    updatedAgo: '1d ago',
    viewedAgo: '9 days ago',
    iconKind: 'dashboard',
  },
  {
    id: 'forecast',
    name: 'Regional Forecast Hub',
    path: 'forecast.regional',
    updatedAgo: '12h ago',
    viewedAgo: '6 days ago',
    iconKind: 'table',
  },
  {
    id: 'partner',
    name: 'Partner Performance',
    path: 'partner.scorecard',
    updatedAgo: '4h ago',
    viewedAgo: '11 days ago',
    iconKind: 'dashboard',
  },
];

const SALES_DATA_SNIPPETS: DomainSnippetRow[] = [
  {
    id: 'gtm-def',
    title: 'GTM qualified pipeline definition',
    description:
      'GTM qualified pipeline counts opportunities that reached Stage 3 with a confirmed economic buyer and a close date inside the current fiscal quarter.',
    tagLabel: 'Metric definition',
    tagColor: 'indigo',
    topicCount: 8,
  },
  {
    id: 'silver',
    title: 'Silver-layer Salesforce ingest',
    description:
      'Silver-layer Salesforce ingest normalizes opportunity stages and owner fields before gold-layer GTM metrics are calculated.',
    tagLabel: 'Table semantics',
    tagColor: 'lime',
    topicCount: 8,
  },
  {
    id: 'gold',
    title: 'Gold-layer GTM metrics',
    description:
      'Gold-layer GTM metrics publish qualified pipeline, win rate, and cycle time for executive dashboards after silver QA checks pass.',
    tagLabel: 'Business term',
    tagColor: 'lemon',
    topicCount: 8,
  },
  {
    id: 'churn',
    title: 'Customer churn proxy for accounts',
    description:
      'Customer churn proxy flags accounts with no closed-won activity in 180 days and no open renewal opportunity in Salesforce.',
    tagLabel: 'Filter',
    tagColor: 'coral',
    topicCount: 8,
  },
];

/** Figma Domain Panel `10342:11108` — Merchandising topic. */
export const MERCHANDISING_DOMAIN_PANEL: DomainPanelConfig = {
  domainId: 'merchandising',
  title: 'Merchandising',
  panelAriaLabel: 'Merchandising domain',
  entityAvatarBg: '#a6630c',
  tabs: [
    { id: 'experts', label: 'Experts', count: 7 },
    { id: 'assets', label: 'Assets', count: 4 },
    { id: 'snippets', label: 'Snippets', count: 13 },
  ],
  experts: MERCHANDISING_EXPERTS,
  assets: MERCHANDISING_ASSETS,
  snippets: MERCHANDISING_SNIPPETS,
};

/** Figma Domain Panel `10342:11108` — Sales Data topic. */
export const SALES_DATA_DOMAIN_PANEL: DomainPanelConfig = {
  domainId: 'sales-data',
  title: 'Sales Data',
  panelAriaLabel: 'Sales Data domain',
  entityAvatarBg: '#04867d',
  tabs: [
    { id: 'experts', label: 'Experts', count: 3 },
    { id: 'assets', label: 'Assets', count: 4 },
    { id: 'snippets', label: 'Snippets', count: 4 },
  ],
  experts: SALES_DATA_EXPERTS,
  assets: SALES_DATA_ASSETS,
  snippets: SALES_DATA_SNIPPETS,
};

export const DOMAIN_PANEL_BY_ID: Record<SnippetPanelDomainId, DomainPanelConfig> = {
  merchandising: MERCHANDISING_DOMAIN_PANEL,
  'sales-data': SALES_DATA_DOMAIN_PANEL,
};

export function domainIdFromLabel(label: string): SnippetPanelDomainId | null {
  if (label === 'Merchandising') return 'merchandising';
  if (label === 'Sales Data') return 'sales-data';
  return null;
}
