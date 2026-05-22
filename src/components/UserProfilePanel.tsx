import { css } from '@emotion/react';
import { useDesignSystemTheme } from '@databricks/design-system';
import { useMemo, useState } from 'react';
import type { SnippetPanelDomainId } from './domainPanelConfig';
import { DomainPanelAssetCard } from './DomainPanelAssetCard';
import { DomainPanelPagination } from './DomainPanelPagination';
import { DomainPanelSnippetCard } from './DomainPanelSnippetCard';
import { UserProfileTopicCard } from './UserProfileTopicCard';
import type { UserProfilePanelConfig, UserProfileTabId } from './userProfilePanelConfig';
import {
  domainPanelBody,
  DomainPanelPillTabs,
  GenieGraphPanelHeader,
  panelDivider,
  panelRoot,
  panelSectionDividerWrap,
  UserProfileTitleBlock,
} from './snippetPanelChrome';

const TOPICS_PER_PAGE = 3;
const ASSETS_PER_PAGE = 4;
const SNIPPETS_PER_PAGE = 4;

/** Figma user profile panel `10528:8558`. */
export type UserProfilePanelProps = {
  config: UserProfilePanelConfig;
  onClose: () => void;
  onBack: () => void;
  onTopicSelect?: (domainId: SnippetPanelDomainId) => void;
};

export function UserProfilePanel({ config, onClose, onBack, onTopicSelect }: UserProfilePanelProps) {
  const { theme } = useDesignSystemTheme();
  const [activeTabId, setActiveTabId] = useState<UserProfileTabId>('topics');
  const [currentPage, setCurrentPage] = useState(1);

  const pillTabs = useMemo(
    () => config.tabs.map((tab) => ({ id: tab.id, label: `${tab.label} (${tab.count})` })),
    [config.tabs],
  );

  const pagedTopics = useMemo(() => {
    const start = (currentPage - 1) * TOPICS_PER_PAGE;
    return config.topics.slice(start, start + TOPICS_PER_PAGE);
  }, [config.topics, currentPage]);

  const pagedAssets = useMemo(() => {
    const start = (currentPage - 1) * ASSETS_PER_PAGE;
    return config.assets.slice(start, start + ASSETS_PER_PAGE);
  }, [config.assets, currentPage]);

  const pagedSnippets = useMemo(() => {
    const start = (currentPage - 1) * SNIPPETS_PER_PAGE;
    return config.snippets.slice(start, start + SNIPPETS_PER_PAGE);
  }, [config.snippets, currentPage]);

  const showPagination = true;

  return (
    <aside css={panelRoot()} data-name="UserProfilePanel" aria-label={config.panelAriaLabel}>
      <GenieGraphPanelHeader onClose={onClose} onBack={onBack} />

      <div css={domainPanelBody(theme)} data-name="Context Card">
        <div
          css={css({
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            minHeight: 0,
            gap: theme.spacing.sm,
            overflow: 'hidden',
          })}
        >
          <div
            css={css({
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.sm,
              flex: '1 1 auto',
              minHeight: 0,
              overflowY: 'auto',
            })}
          >
            <UserProfileTitleBlock
              name={config.name}
              initial={config.initial}
              avatarBg={config.avatarBg}
              rating={config.rating}
              email={config.email}
            />

            <div css={panelSectionDividerWrap()} data-name="Divider">
              <div css={panelDivider()} />
            </div>

            <DomainPanelPillTabs
              tabs={pillTabs}
              activeTabId={activeTabId}
              onTabChange={(tabId) => {
                setActiveTabId(tabId);
                setCurrentPage(1);
              }}
            />

            <div
              css={css({
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing.sm,
                width: '100%',
                paddingBottom: showPagination ? 56 : 0,
              })}
            >
              {activeTabId === 'topics'
                ? pagedTopics.map((topic) => (
                    <UserProfileTopicCard
                      key={topic.id}
                      topic={topic}
                      onClick={topic.domainId ? () => onTopicSelect?.(topic.domainId!) : undefined}
                    />
                  ))
                : null}

              {activeTabId === 'assets'
                ? pagedAssets.map((asset) => <DomainPanelAssetCard key={asset.id} asset={asset} />)
                : null}

              {activeTabId === 'snippets'
                ? pagedSnippets.map((snippet) => <DomainPanelSnippetCard key={snippet.id} snippet={snippet} />)
                : null}
            </div>
          </div>

          {showPagination ? (
            <DomainPanelPagination
              pageCount={config.paginationPageCount}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          ) : null}
        </div>
      </div>
    </aside>
  );
}
