import type { DomainAssetRow, DomainExpert, DomainSnippetRow, SnippetPanelDomainId } from './domainPanelConfig';
import { MERCHANDISING_DOMAIN_PANEL, SALES_DATA_DOMAIN_PANEL } from './domainPanelConfig';

export type UserProfileTabId = 'topics' | 'assets' | 'snippets';

export type UserProfileTab = {
  id: UserProfileTabId;
  label: string;
  count: number;
};

export type UserProfileTopic = {
  id: string;
  title: string;
  snippetCount: number;
  assetCount: number;
  expertCount: number;
  domainId?: SnippetPanelDomainId;
};

export type UserProfilePanelConfig = {
  name: string;
  initial: string;
  avatarBg: string;
  rating: number;
  email: string;
  panelAriaLabel: string;
  tabs: readonly UserProfileTab[];
  topics: readonly UserProfileTopic[];
  assets: readonly DomainAssetRow[];
  snippets: readonly DomainSnippetRow[];
  paginationPageCount: number;
};

/** Figma user profile panel `10528:8558` — Ryan Chen. */
export const RYAN_CHEN_USER_PROFILE: UserProfilePanelConfig = {
  name: 'Ryan Chen',
  initial: 'R',
  avatarBg: '#04867d',
  rating: 4.6,
  email: 'ryan.chen@databricks.com',
  panelAriaLabel: 'Ryan Chen profile',
  tabs: [
    { id: 'topics', label: 'Topics', count: 3 },
    { id: 'assets', label: 'Assets', count: 12 },
    { id: 'snippets', label: 'Snippets', count: 43 },
  ],
  topics: [
    {
      id: 'merchandising',
      title: 'Merchandising',
      snippetCount: 21,
      assetCount: 16,
      expertCount: 8,
      domainId: 'merchandising',
    },
    {
      id: 'customers',
      title: 'customers',
      snippetCount: 21,
      assetCount: 16,
      expertCount: 8,
    },
    {
      id: 'stores',
      title: 'stores',
      snippetCount: 21,
      assetCount: 16,
      expertCount: 8,
    },
  ],
  assets: [
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
      viewedAgo: '9 days ago',
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
  ],
  snippets: [
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
  ],
  paginationPageCount: 8,
};

const EXPERT_AVATAR_BG: Record<string, string> = {
  liam: '#434a93',
  oliver: '#5c6b7a',
  emma: '#b45091',
  noah: '#a6630c',
  ava: '#04867d',
  sofia: '#434a93',
  mia: '#5c6b7a',
  jacqueline: '#04867d',
  ken: '#434a93',
  miranda: '#a6630c',
};

function emailFromName(name: string) {
  const parts = name.trim().toLowerCase().split(/\s+/);
  if (parts.length < 2) return `${parts[0]}@databricks.com`;
  return `${parts[0]}.${parts[parts.length - 1]}@databricks.com`;
}

/** Same panel content as Ryan Chen; header counts reflect the selected expert. */
export function buildUserProfileFromExpert(expert: DomainExpert): UserProfilePanelConfig {
  const initial = expert.name.trim().charAt(0).toUpperCase() || '?';

  return {
    name: expert.name,
    initial,
    avatarBg: EXPERT_AVATAR_BG[expert.id] ?? '#04867d',
    rating: expert.rating,
    email: emailFromName(expert.name),
    panelAriaLabel: `${expert.name} profile`,
    tabs: [
      { id: 'topics', label: 'Topics', count: RYAN_CHEN_USER_PROFILE.topics.length },
      { id: 'assets', label: 'Assets', count: expert.assetCount },
      { id: 'snippets', label: 'Snippets', count: expert.snippetCount },
    ],
    topics: RYAN_CHEN_USER_PROFILE.topics,
    assets: RYAN_CHEN_USER_PROFILE.assets,
    snippets: RYAN_CHEN_USER_PROFILE.snippets,
    paginationPageCount: RYAN_CHEN_USER_PROFILE.paginationPageCount,
  };
}

const ALL_DOMAIN_EXPERTS: DomainExpert[] = [
  ...MERCHANDISING_DOMAIN_PANEL.experts,
  ...SALES_DATA_DOMAIN_PANEL.experts,
];

const USER_PROFILE_BY_EXPERT_ID: Record<string, UserProfilePanelConfig> = Object.fromEntries(
  ALL_DOMAIN_EXPERTS.map((expert) => [expert.id, buildUserProfileFromExpert(expert)]),
);

/** Snippet panel author chip — Ryan Chen. */
export const RYAN_CHEN_USER_ID = 'ryan-chen';

const USER_PROFILE_BY_ID: Record<string, UserProfilePanelConfig> = {
  [RYAN_CHEN_USER_ID]: RYAN_CHEN_USER_PROFILE,
  ...USER_PROFILE_BY_EXPERT_ID,
};

export function getUserProfileConfig(userId: string): UserProfilePanelConfig {
  return USER_PROFILE_BY_ID[userId] ?? RYAN_CHEN_USER_PROFILE;
}
