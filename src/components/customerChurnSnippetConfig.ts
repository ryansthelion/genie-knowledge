import type { KnowledgeTagColor } from './knowledgeContextConfig';
import type { SnippetDropdownItem } from './snippetDropdownConfig';
import type { SnippetPopoverConfig } from './snippetPopoverConfig';
import type { SnippetPanelConfig } from './snippetPanelConfig';

type CustomerChurnSnippetSeed = {
  id: string;
  label: string;
  description: string;
  tagLabel: string;
  tagColor: KnowledgeTagColor;
  tagTooltip: string;
  sourceName: string;
  sourceAuthor: string;
};

const CUSTOMER_CHURN_SNIPPET_SEEDS: CustomerChurnSnippetSeed[] = [
  {
    id: 'churn-standard-definition',
    label: 'Standard customer churn definition',
    description:
      'Customer churn is the loss of paying customers over a defined period. A customer is considered churned when they cancel all active subscriptions or fail to renew before the grace period ends.',
    tagLabel: 'Business definition',
    tagColor: 'indigo',
    tagTooltip: 'Canonical workspace definition for when a customer counts as churned.',
    sourceName: 'Customer Success Playbook',
    sourceAuthor: 'Jordan Lee',
  },
  {
    id: 'churn-revenue-vs-logo',
    label: 'Revenue churn vs logo churn',
    description:
      'Logo churn counts the number of accounts that left. Revenue churn measures lost MRR or ARR, including downgrades. Downgrade-only accounts are excluded from logo churn but included in gross revenue churn.',
    tagLabel: 'Metric definition',
    tagColor: 'indigo',
    tagTooltip: 'Distinguishes account-count churn from dollar-based churn.',
    sourceName: 'Finance Metrics Glossary',
    sourceAuthor: 'Priya Nair',
  },
  {
    id: 'churn-gross-rate',
    label: 'Gross churn rate formula',
    description:
      'Gross churn rate = (MRR lost from cancellations + contraction) / MRR at start of period. Expansion revenue is excluded from the numerator. Report monthly and annualized for board metrics.',
    tagLabel: 'Metric definition',
    tagColor: 'indigo',
    tagTooltip: 'Formula, numerator exclusions, and reporting cadence for gross churn.',
    sourceName: 'SaaS KPI Standards',
    sourceAuthor: 'Alex Kim',
  },
  {
    id: 'churn-net-rate',
    label: 'Net churn rate (NDR basis)',
    description:
      'Net churn incorporates expansion from retained customers: Net churn = 1 − (ending MRR from cohort / starting MRR). Values below zero indicate net negative churn (expansion outweighs losses).',
    tagLabel: 'Metric definition',
    tagColor: 'indigo',
    tagTooltip: 'How expansion revenue affects net churn and NDR-style reporting.',
    sourceName: 'SaaS KPI Standards',
    sourceAuthor: 'Alex Kim',
  },
  {
    id: 'churn-voluntary',
    label: 'Voluntary churn definition',
    description:
      'Voluntary churn occurs when a customer actively cancels or opts out. Exclude payment failures and involuntary suspensions from voluntary churn numerators when analyzing product satisfaction.',
    tagLabel: 'Business definition',
    tagColor: 'lime',
    tagTooltip: 'Customer-initiated departures versus operational or billing-driven loss.',
    sourceName: 'Retention Analytics Guide',
    sourceAuthor: 'Morgan Ellis',
  },
  {
    id: 'churn-involuntary',
    label: 'Involuntary churn definition',
    description:
      'Involuntary churn results from failed payments, fraud closure, or compliance termination after dunning is exhausted. Tag accounts with `churn_reason = involuntary` for separate funnel analysis.',
    tagLabel: 'Operational context',
    tagColor: 'lime',
    tagTooltip: 'Billing and compliance-driven churn separate from product dissatisfaction.',
    sourceName: 'Billing Operations Wiki',
    sourceAuthor: 'Sam Ortiz',
  },
  {
    id: 'churn-b2b-90-day',
    label: 'B2B enterprise 90-day churn window',
    description:
      'Enterprise accounts are marked churned if no active contract line and no qualified pipeline activity within 90 days post-renewal date. Pilot conversions within 30 days do not reset the window.',
    tagLabel: 'Business definition',
    tagColor: 'default',
    tagTooltip: 'Enterprise-specific timing rules for contract and pipeline-based churn.',
    sourceName: 'Enterprise CS Policy',
    sourceAuthor: 'Taylor Brooks',
  },
  {
    id: 'churn-ecommerce-repeat',
    label: 'E-commerce repeat-purchase churn',
    description:
      'A shopper churns when they have not placed an order in 180 days despite being reachable on email/SMS. One-time gift buyers are excluded if `acquisition_channel = gift_recipient`.',
    tagLabel: 'Business definition',
    tagColor: 'default',
    tagTooltip: 'Retail definition based on repurchase latency, not subscription status.',
    sourceName: 'Retail Loyalty Metrics',
    sourceAuthor: 'Casey Nguyen',
  },
  {
    id: 'churn-saas-mrr',
    label: 'SaaS monthly recurring churn',
    description:
      'Monthly recurring churn = canceled MRR in month / MRR at month start. Count partial-month cancellations on the cancellation effective date, not the request date, for finance alignment.',
    tagLabel: 'Metric definition',
    tagColor: 'indigo',
    tagTooltip: 'Monthly cadence and effective-date rules for subscription businesses.',
    sourceName: 'SaaS KPI Standards',
    sourceAuthor: 'Alex Kim',
  },
  {
    id: 'churn-cohort-based',
    label: 'Cohort-based churn calculation',
    description:
      'Cohort churn tracks customers acquired in the same month and reports the share who churn by month 3, 6, and 12. Do not mix acquisition channels in a single cohort without stratification.',
    tagLabel: 'Metric definition',
    tagColor: 'indigo',
    tagTooltip: 'How to build acquisition cohorts and milestone churn readouts.',
    sourceName: 'Growth Analytics Handbook',
    sourceAuthor: 'Riley Chen',
  },
  {
    id: 'churn-prediction-horizon',
    label: 'Churn prediction horizons (30/60/90)',
    description:
      'ML churn labels use a 90-day horizon by default: churn = 1 if the account cancels within 90 days of scoring date. Use 30-day horizons for transactional products with shorter lifecycles.',
    tagLabel: 'Operational context',
    tagColor: 'lime',
    tagTooltip: 'Label windows used by predictive churn models in this workspace.',
    sourceName: 'Data Science Feature Catalog',
    sourceAuthor: 'Dev Patel',
  },
  {
    id: 'churn-trial-exclusion',
    label: 'Trial user exclusion from churn',
    description:
      'Users in free trial are not counted in churn denominators until first paid invoice. Trial expirations without conversion are tracked as `trial_dropoff`, not churn.',
    tagLabel: 'Business definition',
    tagColor: 'lime',
    tagTooltip: 'Separates trial non-conversion from paid customer churn.',
    sourceName: 'Product Analytics Definitions',
    sourceAuthor: 'Jamie Wu',
  },
  {
    id: 'churn-reactivation',
    label: 'Reactivation and win-back rules',
    description:
      'Customers who return within 30 days of cancellation are treated as reactivations; the original churn event is reversed in monthly reports. Win-back campaigns after 30 days create a new acquisition cohort.',
    tagLabel: 'Operational context',
    tagColor: 'lime',
    tagTooltip: 'How returning customers affect churn numerators and denominators.',
    sourceName: 'Retention Analytics Guide',
    sourceAuthor: 'Morgan Ellis',
  },
  {
    id: 'churn-multi-product',
    label: 'Multi-product churn attribution',
    description:
      'Account-level churn requires all product entitlements to end. Product-level churn fires when a single SKU is canceled while others remain; attribute to `partial_churn` for expansion plays.',
    tagLabel: 'Business definition',
    tagColor: 'default',
    tagTooltip: 'Account vs product-line churn for multi-SKU portfolios.',
    sourceName: 'Product Analytics Definitions',
    sourceAuthor: 'Jamie Wu',
  },
  {
    id: 'churn-health-score-proxy',
    label: 'Health score as churn proxy',
    description:
      'Accounts with health score below 40 for two consecutive weeks are flagged `churn_risk` but not counted as churned until cancellation. Use for early warning, not official churn reporting.',
    tagLabel: 'Operational context',
    tagColor: 'default',
    tagTooltip: 'Leading indicators that do not replace formal churn definitions.',
    sourceName: 'Customer Success Playbook',
    sourceAuthor: 'Jordan Lee',
  },
  {
    id: 'churn-telecom-prepaid',
    label: 'Telecom prepaid churn definition',
    description:
      'Prepaid subscribers churn after 60 days without a top-up or bundle renewal. Port-outs to another carrier are churn events on the port completion date.',
    tagLabel: 'Industry definition',
    tagColor: 'default',
    tagTooltip: 'Telecommunications-specific churn for prepaid subscriber bases.',
    sourceName: 'Telco Domain Snippets',
    sourceAuthor: 'Avery Singh',
  },
  {
    id: 'churn-banking-closure',
    label: 'Banking account closure churn',
    description:
      'Retail banking churn is defined as closure of all active checking/savings relationships with zero balance for 14 days. Dormant accounts with balance > 0 are `inactive`, not churned.',
    tagLabel: 'Industry definition',
    tagColor: 'default',
    tagTooltip: 'Financial services definition distinct from subscription churn.',
    sourceName: 'Banking Analytics Library',
    sourceAuthor: 'Chris Alvarez',
  },
  {
    id: 'churn-healthcare-attrition',
    label: 'Healthcare patient attrition',
    description:
      'Patient attrition counts as churn when no completed visit or telehealth encounter occurs within 12 months for chronic-care panels. Transfers to in-network specialists are excluded.',
    tagLabel: 'Industry definition',
    tagColor: 'default',
    tagTooltip: 'Healthcare analog to churn for care continuity programs.',
    sourceName: 'Healthcare Ops Glossary',
    sourceAuthor: 'Dr. Nina Shah',
  },
  {
    id: 'churn-retail-loyalty',
    label: 'Retail loyalty program churn',
    description:
      'Loyalty members churn when points expire due to 365 days of inactivity and the member status moves to `lapsed`. Re-enrollment within 90 days restores tier history.',
    tagLabel: 'Industry definition',
    tagColor: 'default',
    tagTooltip: 'Loyalty-program lifecycle rules mapped to churn language.',
    sourceName: 'Retail Loyalty Metrics',
    sourceAuthor: 'Casey Nguyen',
  },
  {
    id: 'churn-subscription-pause',
    label: 'Paused subscription handling',
    description:
      'Paused subscriptions are not churned while pause benefits are active. If pause exceeds 120 days without resume, auto-convert to cancellation and backdate churn to pause start + 120 days.',
    tagLabel: 'Operational context',
    tagColor: 'lime',
    tagTooltip: 'How temporary pauses interact with official churn timestamps.',
    sourceName: 'Billing Operations Wiki',
    sourceAuthor: 'Sam Ortiz',
  },
];

function authorInitial(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return `${parts[0].slice(0, 1)}${parts[parts.length - 1].slice(0, 1)}`.toUpperCase();
}

function toSnippetPanelConfig(seed: CustomerChurnSnippetSeed): SnippetPanelConfig {
  return {
    title: seed.label,
    panelAriaLabel: seed.label,
    description: seed.description,
    tagLabel: seed.tagLabel,
    tagColor: seed.tagColor,
    tagTooltip: seed.tagTooltip,
    sourceName: seed.sourceName,
    sourceAuthor: seed.sourceAuthor,
    sourceAuthorInitial: authorInitial(seed.sourceAuthor),
    sourceAuthorAvatarBg: '#04867d',
    topics: ['Customer churn', 'Retention'],
    domains: ['Merchandising', 'Sales Data'],
    verifiedUsers: [{ initial: authorInitial(seed.sourceAuthor), name: seed.sourceAuthor, bg: '#04867d' }],
    moreVerifiedCount: 0,
    lineageVariant: 'pricing-disparity',
  };
}

function toPopoverConfig(seed: CustomerChurnSnippetSeed): SnippetPopoverConfig {
  return {
    cardTitle: seed.label,
    cardAriaLabel: seed.label,
    description: seed.description,
    tagLabel: seed.tagLabel,
    tagColor: seed.tagColor,
    tagTooltip: seed.tagTooltip,
    sourceName: seed.sourceName,
    sourceAuthor: seed.sourceAuthor,
    viewSnippetLabel: 'View full snippet',
  };
}

export const CUSTOMER_CHURN_SNIPPET_POPOVERS_BY_ID: Record<string, SnippetPopoverConfig> = Object.fromEntries(
  CUSTOMER_CHURN_SNIPPET_SEEDS.map((seed) => [seed.id, toPopoverConfig(seed)]),
);

export const CUSTOMER_CHURN_SNIPPET_PANELS_BY_ID: Record<string, SnippetPanelConfig> = Object.fromEntries(
  CUSTOMER_CHURN_SNIPPET_SEEDS.map((seed) => [seed.id, toSnippetPanelConfig(seed)]),
);

/** Twenty knowledge snippets for "customer churn definition" search (thinking trace). */
export const CUSTOMER_CHURN_SNIPPET_DROPDOWN_ITEMS: SnippetDropdownItem[] = CUSTOMER_CHURN_SNIPPET_SEEDS.map(
  ({ id, label }) => ({ id, label }),
);

function toToolCallCategoryLabel(tagLabel: string): string {
  if (tagLabel === 'Metric definition') return 'Metric definition';
  if (tagLabel === 'Business definition') return 'Business term';
  if (tagLabel === 'Industry definition') return 'Table semantics';
  if (tagLabel === 'Operational context') return 'Filter';
  return 'Other';
}

/** Figma Tool Call/Content `10692:13402` — eight preview rows in expanded search tool call. */
export const CUSTOMER_CHURN_TOOL_CALL_CONTENT_ITEMS = CUSTOMER_CHURN_SNIPPET_SEEDS.slice(0, 8).map(
  (seed) => ({
    id: seed.id,
    preview: seed.description,
    categoryLabel: toToolCallCategoryLabel(seed.tagLabel),
    popover: toPopoverConfig(seed),
  }),
);
