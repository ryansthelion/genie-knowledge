import type { ReactNode } from 'react';

export type KnowledgeTagColor = 'indigo' | 'lime' | 'default';

export type KnowledgeVerifiedUser = {
  initial: string;
  name: string;
  bg: string;
};

export type KnowledgeContextConfig = {
  term: string;
  cardTitle: string;
  cardAriaLabel: string;
  expandAriaLabel: string;
  description: ReactNode;
  tagLabel: string;
  tagColor: KnowledgeTagColor;
  verifiedExpertsCount: number;
  panelTitle: string;
  panelAriaLabel: string;
  metadata: {
    source: string;
    tags: { label: string; color: KnowledgeTagColor }[];
    verifiedUsers: readonly KnowledgeVerifiedUser[];
    moreVerifiedCount: number;
  };
  lineageVariant: 'sell-through' | 'emea';
};

const AVATAR_INDIGO = '#434a93';
const AVATAR_TEAL = '#04867d';
const AVATAR_BROWN = '#a6630c';
const AVATAR_PINK = '#b45091';
const AVATAR_SLATE = '#5c6b7a';

const SHARED_VERIFIED_USERS = [
  { initial: 'K', name: 'Ken Wong', bg: AVATAR_INDIGO },
  { initial: 'M', name: 'Miranda Luna', bg: AVATAR_TEAL },
  { initial: 'R', name: 'Ross Geller', bg: AVATAR_BROWN },
  { initial: 'D', name: 'Daniel Kim', bg: AVATAR_PINK },
] as const;

export const SELL_THROUGH_KNOWLEDGE_CONTEXT: KnowledgeContextConfig = {
  term: 'sell-through',
  cardTitle: 'Sell-through rate',
  cardAriaLabel: 'Sell-through rate',
  expandAriaLabel: 'Expand sell-through definition',
  description: (
    <>
      <strong>Sell-through</strong> tells you how much of your available inventory actually sold in a given week,
      expressed as a percentage.
    </>
  ),
  tagLabel: 'Metric definition',
  tagColor: 'indigo',
  verifiedExpertsCount: 6,
  panelTitle: 'Sell-through rate',
  panelAriaLabel: 'Sell-through rate details',
  metadata: {
    source: 'Merch Analytics Dashboard',
    tags: [
      { label: 'Table semantics', color: 'lime' },
      { label: 'Merchandising', color: 'default' },
      { label: 'Analytics', color: 'default' },
    ],
    verifiedUsers: SHARED_VERIFIED_USERS,
    moreVerifiedCount: 2,
  },
  lineageVariant: 'sell-through',
};

export const EMEA_KNOWLEDGE_CONTEXT: KnowledgeContextConfig = {
  term: 'EMEA',
  cardTitle: 'EMEA',
  cardAriaLabel: 'EMEA region',
  expandAriaLabel: 'Expand EMEA definition',
  description: (
    <>
      <strong>EMEA</strong> is Nike&apos;s Europe, Middle East, and Africa region. Reporting and sell-through here
      reflect regional door mix—especially NSO versus Key Account partners—and local pricing after FX adjustment.
    </>
  ),
  tagLabel: 'Regional definition',
  tagColor: 'lime',
  verifiedExpertsCount: 5,
  panelTitle: 'EMEA',
  panelAriaLabel: 'EMEA region details',
  metadata: {
    source: 'Regional Sales Dashboard',
    tags: [
      { label: 'Geography', color: 'lime' },
      { label: 'Regional reporting', color: 'default' },
      { label: 'Partner mix', color: 'default' },
    ],
    verifiedUsers: [
      { initial: 'S', name: 'Sofia Martins', bg: AVATAR_TEAL },
      { initial: 'L', name: 'Liam Okafor', bg: AVATAR_INDIGO },
      { initial: 'A', name: 'Amélie Dubois', bg: AVATAR_PINK },
      { initial: 'H', name: 'Hassan El-Amin', bg: AVATAR_SLATE },
    ],
    moreVerifiedCount: 1,
  },
  lineageVariant: 'emea',
};
