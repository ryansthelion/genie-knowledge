import type { ThinkingPastStep } from './Thinking';
import {
  CUSTOMER_CHURN_EXPERTS_DROPDOWN_ITEMS,
  CUSTOMER_CHURN_TOPICS_DROPDOWN_ITEMS,
  CUSTOMER_CHURN_TOOL_CALL_CONTENT_ITEMS,
} from './customerChurnSnippetConfig';

/** Figma Thinking `9916:59453` — customer churn knowledge search trace (V2). */
export const KNOWLEDGE_SNIPPETS_V2_THINKING_TRACE: ThinkingPastStep[] = [
  {
    id: 'intent-search',
    description:
      "I'll search for knowledge snippets about customer churn to find any curated business definitions.",
    showConnectorLine: true,
    toolCalls: [
      {
        id: 'search-results',
        variant: 'search',
        title: 'Found relevant knowledge within Genie Graph.',
        sources: [
          { id: 'snippets', label: '20 snippets', kind: 'snippets' },
          {
            id: 'topics',
            label: '12 topics',
            kind: 'topics',
            sourceMenu: CUSTOMER_CHURN_TOPICS_DROPDOWN_ITEMS,
            sourceMenuMaxVisibleItems: 5,
          },
          {
            id: 'experts',
            label: '8 experts',
            kind: 'experts',
            sourceMenu: CUSTOMER_CHURN_EXPERTS_DROPDOWN_ITEMS,
            sourceMenuMaxVisibleItems: 5,
          },
        ],
        contentItems: CUSTOMER_CHURN_TOOL_CALL_CONTENT_ITEMS,
      },
    ],
  },
  {
    id: 'synthesize',
    description:
      'I now have a rich set of knowledge snippets covering multiple definitions of "customer churn" across different domains in this workspace. Let me compile these into a clear response.',
    showConnectorLine: false,
  },
];

/** Demo trace for Jordan 1 sell-through (Figma Step Container `9622:44963`). */
export const JORDAN_SELL_THROUGH_THINKING_TRACE: ThinkingPastStep[] = [
  {
    id: 'search',
    description: 'Found 18 results for “Jordan 1 Retro sell-through EMEA vs NA”',
    showConnectorLine: true,
    toolCalls: [
      {
        id: 'st',
        title: '“sell-through rate”',
        matchPercent: 92,
        body: 'Sell-through tells you how much of your available inventory actually sold in a given week, expressed as a percentage. Refunds should be excluded from the sell-through numerator when calculating the weekly rate.',
        sourceLabel: 'merch-analytics.lvdash.json',
      },
      {
        id: 'emea',
        title: '“EMEA door mix”',
        matchPercent: 88,
        body: 'EMEA door mix describes how sell-through is distributed across Nike-owned stores (NSO) versus Key Account partners in the Europe, Middle East, and Africa region.',
        sourceLabel: 'regional-sales.lvdash.json',
      },
      {
        id: 'nso',
        title: '“NSO vs Key Account”',
        matchPercent: 87,
        body: 'NSO (Nike-owned stores) and Key Account partners are weighted differently in regional sell-through. EMEA reporting often over-indexes NSO doors relative to wholesale partners.',
        sourceLabel: 'door-mix.lvdash.json',
      },
      {
        id: 'fx',
        title: '“FX-adjusted retail price”',
        matchPercent: 85,
        body: 'FX-adjusted retail price normalizes local ticket prices to a common currency so quarter-over-quarter sell-through comparisons are not distorted by exchange-rate movement.',
        sourceLabel: 'pricing-fx.lvdash.json',
      },
      {
        id: 'inventory',
        title: '“EMEA inventory timing”',
        matchPercent: 84,
        body: 'EMEA inventory timing captures when product arrives at regional doors. Late receipts can depress sell-through in the launch quarter even when demand is healthy.',
        sourceLabel: 'inventory-timing.lvdash.json',
      },
      {
        id: 'retro',
        title: '“Jordan 1 Retro”',
        matchPercent: 81,
        body: 'Jordan 1 Retro refers to the retro-run silhouette in the Jordan franchise. Launch sell-through for this style is tracked separately from inline Jordan performance.',
        sourceLabel: 'jordan-franchise.lvdash.json',
      },
      {
        id: 'quarterly',
        title: '“quarterly sell-through”',
        matchPercent: 79,
        body: 'Quarterly sell-through rolls up weekly door-level rates into a fiscal-quarter view, using the same refund exclusions and door-mix weights as weekly merch analytics.',
        sourceLabel: 'merch-analytics.lvdash.json',
      },
    ],
  },
  {
    id: 'synthesize',
    description:
      'I now have a rich set of knowledge snippets covering sell-through lag in EMEA versus North America for this launch. Let me compile these into a clear response.',
    showConnectorLine: false,
  },
];
