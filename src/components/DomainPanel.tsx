import { css } from '@emotion/react';
import { useDesignSystemTheme } from '@databricks/design-system';
import { useMemo, useState } from 'react';
import type { DomainPanelConfig, DomainPanelTabId } from './domainPanelConfig';
import { DomainPanelAssetCard } from './DomainPanelAssetCard';
import { DomainPanelExpertCard } from './DomainPanelExpertCard';
import { DomainPanelPagination } from './DomainPanelPagination';
import { DomainPanelSnippetCard } from './DomainPanelSnippetCard';
import {
  domainPanelBody,
  DomainPanelPillTabs,
  DomainPanelTitleBlock,
  GenieGraphPanelHeader,
  panelRoot,
  panelSectionDividerWrap,
  panelDivider,
} from './snippetPanelChrome';

const EXPERTS_PER_PAGE = 7;
const ASSETS_PER_PAGE = 4;

/** Figma Domain Panel `10342:11108` — Genie Graph topic drill-down. */
export type DomainPanelProps = {
  config: DomainPanelConfig;
  onClose: () => void;
  onBack: () => void;
  onExpertSelect?: (expertId: string) => void;
};

export function DomainPanel({ config, onClose, onBack, onExpertSelect }: DomainPanelProps) {
  const { theme } = useDesignSystemTheme();
  const [activeTabId, setActiveTabId] = useState<DomainPanelTabId>('experts');
  const [currentPage, setCurrentPage] = useState(1);

  const pillTabs = useMemo(
    () => config.tabs.map((tab) => ({ id: tab.id, label: `${tab.label} (${tab.count})` })),
    [config.tabs],
  );

  const expertsByRating = useMemo(
    () => [...config.experts].sort((a, b) => b.rating - a.rating),
    [config.experts],
  );

  const pagedExperts = useMemo(() => {
    const start = (currentPage - 1) * EXPERTS_PER_PAGE;
    return expertsByRating.slice(start, start + EXPERTS_PER_PAGE);
  }, [expertsByRating, currentPage]);

  const pagedAssets = useMemo(() => {
    const start = (currentPage - 1) * ASSETS_PER_PAGE;
    return config.assets.slice(start, start + ASSETS_PER_PAGE);
  }, [config.assets, currentPage]);

  const showPagination = activeTabId === 'experts' || activeTabId === 'assets';

  return (
    <aside css={panelRoot()} data-name="DomainPanel" aria-label={config.panelAriaLabel}>
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
            <DomainPanelTitleBlock title={config.title} />

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
              {activeTabId === 'experts'
                ? pagedExperts.map((expert) => (
                    <DomainPanelExpertCard
                      key={expert.id}
                      expert={expert}
                      onClick={onExpertSelect ? () => onExpertSelect(expert.id) : undefined}
                    />
                  ))
                : null}

              {activeTabId === 'assets'
                ? pagedAssets.map((asset) => <DomainPanelAssetCard key={asset.id} asset={asset} />)
                : null}

              {activeTabId === 'snippets'
                ? config.snippets.map((snippet) => <DomainPanelSnippetCard key={snippet.id} snippet={snippet} />)
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
