import { css } from '@emotion/react';
import { DashboardIcon, useDesignSystemTheme } from '@databricks/design-system';
import { useCallback, useState } from 'react';
import { domainIdFromLabel, type SnippetPanelDomainId } from './domainPanelConfig';
import { KnowledgeSnippetTextPill } from './KnowledgeSnippetTextPill';
import { genieVar } from '../theme/genieSun';
import { LineageVisualizer } from './LineageVisualizer';
import { SnippetPopularIndicatorIcon } from './SnippetPopularIndicatorIcon';
import {
  GenieGraphPanelHeader,
  panelBody,
  panelDivider,
  panelKeyLabel,
  panelKeyValue,
  panelKeyValueRow,
  panelSectionDividerWrap,
  panelSectionTitle,
  previewCanvasFrame,
  previewSection,
  PanelAuthorChip,
  SnippetPanelTitleBlock,
} from './snippetPanelChrome';
import type { SnippetPanelConfig } from './snippetPanelConfig';

export { SNIPPET_PANEL_WIDTH_PX } from './knowledgeSnippetsShared';

const DESCRIPTION_COLLAPSED_LINES = 2;

function PanelSectionDivider() {
  return (
    <div css={panelSectionDividerWrap()} data-name="Divider">
      <div css={panelDivider()} />
    </div>
  );
}

export type SnippetPanelProps = {
  config: SnippetPanelConfig;
  onClose: () => void;
  onOpenSource?: () => void;
  onAuthorClick?: () => void;
  onTopicSelect?: (domainId: SnippetPanelDomainId) => void;
  activeTopicDomainId?: SnippetPanelDomainId | null;
};

/**
 * Figma Knowledge Snippet Panel `10055:46586` — Genie Graph header, metadata, Preview lineage.
 * @see https://www.figma.com/design/st5IOjhahvmvXyDbjvMpHB/?node-id=10055-46586
 */
export function SnippetPanel({
  config,
  onClose,
  onOpenSource,
  onAuthorClick,
  onTopicSelect,
  activeTopicDomainId = null,
}: SnippetPanelProps) {
  const { theme } = useDesignSystemTheme();
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const toggleDescription = useCallback(() => {
    setDescriptionExpanded((value) => !value);
  }, []);

  return (
    <aside css={panelRoot()} data-name="SnippetPanel" aria-label={config.panelAriaLabel}>
      <GenieGraphPanelHeader onClose={onClose} />

      <div css={panelBody(theme)} data-name="Context Card">
        <div
          css={css({
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.sm,
            flex: '1 1 auto',
            minHeight: 0,
            width: '100%',
            overflow: 'hidden',
          })}
        >
          <div
            css={css({
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.sm,
              flexShrink: 0,
              overflowY: 'auto',
              minHeight: 0,
              width: '100%',
            })}
          >
            <SnippetPanelTitleBlock
              headline={config.description}
              tagLabel={config.tagLabel}
              tagColor={config.tagColor}
              tagTooltip={config.tagTooltip}
            />

            <PanelSectionDivider />

            <section
              css={css({ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm, width: '100%' })}
              data-name="Description"
            >
              <h3 css={panelSectionTitle()}>Description</h3>
              <p
                css={css({
                  margin: 0,
                  fontSize: 13,
                  lineHeight: '20px',
                  fontWeight: 400,
                  color: genieVar.textPrimary,
                  wordBreak: 'break-word',
                  ...(descriptionExpanded
                    ? {}
                    : {
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: DESCRIPTION_COLLAPSED_LINES,
                        WebkitBoxOrient: 'vertical',
                      }),
                })}
              >
                {config.description}
              </p>
              <button
                type="button"
                onClick={toggleDescription}
                css={css({
                  margin: 0,
                  padding: 0,
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  font: 'inherit',
                  fontSize: 13,
                  lineHeight: '20px',
                  color: theme.colors.actionLinkDefault,
                  textAlign: 'left',
                  '&:hover': { textDecoration: 'underline' },
                  '&:focus-visible': {
                    outline: `2px solid ${theme.colors.actionPrimaryBackgroundPress}`,
                    outlineOffset: 2,
                  },
                })}
              >
                {descriptionExpanded ? 'Show less' : 'Show more'}
              </button>
            </section>

            <PanelSectionDivider />

            <section
              css={css({ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm, width: '100%', paddingBottom: 8 })}
              data-name="AssetDetail/Permissions"
            >
              <h3 css={panelSectionTitle()}>Source</h3>
              <div css={css({ display: 'flex', flexDirection: 'column', gap: theme.spacing.xs, width: '100%' })}>
                <div css={panelKeyValueRow()} data-name="KeyValue">
                  <span css={panelKeyLabel()}>Asset</span>
                  <button
                    type="button"
                    css={[
                      panelKeyValue(),
                      css({
                        margin: 0,
                        padding: 0,
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        '&:hover': { color: theme.colors.actionLinkDefault },
                        '&:focus-visible': {
                          outline: `2px solid ${theme.colors.actionPrimaryBackgroundPress}`,
                          outlineOffset: 2,
                        },
                      }),
                    ]}
                    onClick={onOpenSource}
                  >
                    <DashboardIcon
                      style={{ fontSize: 16, color: theme.colors.textSecondary, flexShrink: 0 }}
                      aria-hidden
                    />
                    <span
                      css={css({
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      })}
                    >
                      {config.sourceName}
                    </span>
                    <SnippetPopularIndicatorIcon size={16} color={theme.colors.textSecondary} />
                  </button>
                </div>
                <div css={panelKeyValueRow()} data-name="KeyValue">
                  <span css={panelKeyLabel()}>Author</span>
                  <div css={panelKeyValue()}>
                    <PanelAuthorChip
                      name={config.sourceAuthor}
                      initial={config.sourceAuthorInitial}
                      avatarBg={config.sourceAuthorAvatarBg}
                      onClick={onAuthorClick}
                    />
                  </div>
                </div>
              </div>
            </section>

            <PanelSectionDivider />

            <section
              css={css({ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm, width: '100%', paddingBottom: 8 })}
              data-name="AssetDetail/Permissions"
            >
              <h3 css={panelSectionTitle()}>Topics</h3>
              <div
                css={css({
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: theme.spacing.xs,
                  alignItems: 'flex-start',
                  width: '100%',
                })}
                data-name="Metadata"
              >
                {config.topics.map((topic) => {
                  const domainId = domainIdFromLabel(topic);
                  return (
                    <KnowledgeSnippetTextPill
                      key={topic}
                      label={topic}
                      selected={domainId !== null && activeTopicDomainId === domainId}
                      onClick={domainId ? () => onTopicSelect?.(domainId) : undefined}
                    />
                  );
                })}
              </div>
            </section>

            <PanelSectionDivider />
          </div>

          <section css={previewSection(theme)} data-name="preview">
            <h3 css={panelSectionTitle()}>Preview</h3>
            <div css={previewCanvasFrame()} data-name="Lineage visualizer frame">
              <LineageVisualizer variant={config.lineageVariant} />
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}

function panelRoot() {
  return css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    minHeight: 0,
    backgroundColor: genieVar.backgroundPrimary,
    border: `1px solid ${genieVar.border}`,
    borderRadius: genieVar.radiusLg,
    boxShadow: genieVar.shadowMd,
    overflow: 'hidden',
  });
}
