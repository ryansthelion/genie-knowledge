import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import {
  ArrowUpIcon,
  Button,
  ChevronDownIcon,
  CircleIcon,
  CopyIcon,
  DashboardIcon,
  OverflowIcon,
  PlusIcon,
  TableIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Typography,
  UploadIcon,
  useDesignSystemTheme,
} from '@databricks/design-system';
import type { ThemeType } from '@databricks/design-system';
import { genieVar } from '../theme/genieSun';
import {
  EMEA_KNOWLEDGE_CONTEXT,
  SELL_THROUGH_KNOWLEDGE_CONTEXT,
} from './knowledgeContextConfig';
import {
  KNOWLEDGE_DETAIL_PANEL_INSET_PX,
  KnowledgeDetailPanel,
} from './KnowledgeDetailPanel';
import { EmeaAiTerm, SellThroughAiTerm } from './KnowledgeContextPopover';
import { KnowledgeSnippetsCanvasHeader } from './KnowledgeSnippetsCanvasHeader';
import { KnowledgeSnippetsV2 } from './KnowledgeSnippetsV2';
import { RYAN_CHEN_USER_ID, SnippetPanelContainer, type SnippetPanelView } from './SnippetPanelContainer';
import type { SnippetPanelDomainId } from './domainPanelConfig';
import { snippetPanelShell } from './knowledgeSnippetsShared';
import { Thinking } from './Thinking';
import { JORDAN_SELL_THROUGH_THINKING_TRACE } from './thinkingStepContent';
import {
  DEFAULT_PROTOTYPE_VERSION_ID,
  getPrototypeVersion,
  type PrototypeVersionId,
} from '../prototype/prototypeVersions';

type DetailPanelKind = 'sell-through' | 'emea';

const DETAIL_PANEL_SLIDE_MS = 300;

/** Du Bois / Ant Design default UI stack (see `@databricks/design-system/dist/index.css`). */
const DUBOIS_UI_FONT_FAMILY = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`;

const imgImage =
  'https://www.figma.com/api/mcp/asset/1e1c8c34-0110-4747-8067-baacb7a03ae7';

const iconSm = { fontSize: 16 } as const;

/**
 * Figma **Du Bois / Paragraph** — canvas menu breadcrumb + tertiary `small` button labels
 * (Genie Unified Components / Du Bois library).
 */
const CANVAS_MENU_PARAGRAPH = {
  fontSize: 13,
  lineHeight: '20px',
  fontWeight: 400,
  letterSpacing: 0,
  fontFamily: DUBOIS_UI_FONT_FAMILY,
} as const;

const CANVAS_MENU_ICON_PX = 16;

function canvasMenu(theme: ThemeType) {
  const padMid = theme.spacing.sm + theme.spacing.xs;
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: padMid,
    flexShrink: 0,
    width: '100%',
    ...CANVAS_MENU_PARAGRAPH,
  });
}

/** Tertiary header buttons: Du Bois/Paragraph on labels; 16px icons per Figma `buttonIcon`. */
function canvasHeaderButtonTypography(btnClass: string) {
  return css({
    [`& .${btnClass}`]: {
      fontSize: CANVAS_MENU_PARAGRAPH.fontSize,
      lineHeight: CANVAS_MENU_PARAGRAPH.lineHeight,
      fontWeight: CANVAS_MENU_PARAGRAPH.fontWeight,
      letterSpacing: CANVAS_MENU_PARAGRAPH.letterSpacing,
      fontFamily: CANVAS_MENU_PARAGRAPH.fontFamily,
    },
    [`& .${btnClass} .anticon`]: {
      fontSize: CANVAS_MENU_ICON_PX,
      lineHeight: 1,
    },
  });
}

function layoutRoot(theme: ThemeType) {
  return css({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: '1 1 auto',
    minHeight: 0,
    width: '100%',
    backgroundColor: genieVar.bgSecondary,
    borderRight: `1px solid ${genieVar.border}`,
    fontFamily: DUBOIS_UI_FONT_FAMILY,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  });
}

function bodyRow() {
  return css({
    display: 'flex',
    flex: '1 1 auto',
    minHeight: 0,
    width: '100%',
    overflow: 'hidden',
  });
}

function mainColumn() {
  return css({
    flex: '1 1 auto',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  });
}

function detailPanelShell(open: boolean) {
  const openWidth = 400 + KNOWLEDGE_DETAIL_PANEL_INSET_PX;
  return css({
    flexShrink: 0,
    boxSizing: 'border-box',
    width: open ? openWidth : 0,
    paddingRight: KNOWLEDGE_DETAIL_PANEL_INSET_PX,
    paddingBottom: KNOWLEDGE_DETAIL_PANEL_INSET_PX,
    overflow: 'hidden',
    transition: `width ${DETAIL_PANEL_SLIDE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    minHeight: 0,
    display: 'flex',
  });
}

function contentOuter(theme: ThemeType) {
  const hPad = theme.spacing.sm + theme.spacing.xs;
  return css({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    minHeight: 0,
    width: '100%',
    paddingLeft: hPad,
    paddingRight: hPad,
  });
}

function mainScrollRegion(theme: ThemeType) {
  return css({
    flex: '1 1 auto',
    minHeight: 0,
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  });
}

function chatColumn(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    maxWidth: 744,
    width: '100%',
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    minWidth: 0,
  });
}

function promptDock(theme: ThemeType) {
  return css({
    flexShrink: 0,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing.sm,
    paddingBottom: `calc(${theme.spacing.md}px + env(safe-area-inset-bottom, 0px))`,
    backgroundColor: genieVar.bgSecondary,
  });
}

function promptInner() {
  return css({
    width: '100%',
    maxWidth: 744,
  });
}

function userBubble(theme: ThemeType) {
  return css({
    alignSelf: 'flex-end',
    maxWidth: 600,
    width: '100%',
    backgroundColor: genieVar.actionDefaultBgHover,
    padding: `${theme.spacing.sm + theme.spacing.xs}px ${theme.spacing.md}px`,
    borderRadius: theme.spacing.lg,
  });
}

function responseBlock(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    alignItems: 'flex-start',
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    width: '100%',
    maxWidth: 744,
  });
}

function numberedList(theme: ThemeType) {
  return css({
    margin: 0,
    paddingLeft: theme.spacing.lg,
    color: theme.colors.textPrimary,
    fontSize: 15,
    lineHeight: '22px',
  });
}

function promptCard(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    width: '100%',
    minHeight: 104,
    padding: theme.spacing.md,
    backgroundColor: genieVar.bgPrimary,
    border: `1px solid ${genieVar.border}`,
    borderRadius: theme.spacing.lg,
    boxShadow: genieVar.shadowMd,
  });
}

function sourceChip(theme: ThemeType) {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: theme.borders.borderRadiusFull,
    backgroundColor: genieVar.bgSecondary,
    border: `2px solid ${genieVar.bgPrimary}`,
    marginRight: -4,
    flexShrink: 0,
  });
}

function Inner() {
  const { theme, classNamePrefix, getPrefixedClassName } = useDesignSystemTheme();
  const canvasHeaderBtnClass = getPrefixedClassName('btn');
  const canvasHeaderBtnIconOnlyClass = getPrefixedClassName('btn-icon-only');
  const [detailPanelKind, setDetailPanelKind] = useState<DetailPanelKind | null>(null);
  const [snippetPanelOpen, setSnippetPanelOpen] = useState(false);
  const [snippetPanelView, setSnippetPanelView] = useState<SnippetPanelView>({ kind: 'snippet' });
  const [snippetPanelReturnView, setSnippetPanelReturnView] = useState<SnippetPanelView | null>(null);
  const [prototypeVersionId, setPrototypeVersionId] = useState<PrototypeVersionId>(
    DEFAULT_PROTOTYPE_VERSION_ID,
  );
  const detailPanelOpen = detailPanelKind !== null;
  const canvasTitle = getPrototypeVersion(prototypeVersionId).canvasTitle;

  useEffect(() => {
    if (prototypeVersionId !== 'v1') {
      setDetailPanelKind(null);
    }
    if (prototypeVersionId !== 'v2') {
      setSnippetPanelOpen(false);
      setSnippetPanelView({ kind: 'snippet' });
      setSnippetPanelReturnView(null);
    }
  }, [prototypeVersionId]);

  const openSellThroughDetailPanel = () => setDetailPanelKind('sell-through');
  const openEmeaDetailPanel = () => setDetailPanelKind('emea');
  const closeDetailPanel = () => setDetailPanelKind(null);
  const openSnippetPanel = (snippetId?: string) => {
    setSnippetPanelReturnView(null);
    setSnippetPanelView({ kind: 'snippet', snippetId });
    setSnippetPanelOpen(true);
  };
  const openDomainPanel = (domainId: SnippetPanelDomainId) => {
    setSnippetPanelReturnView(snippetPanelView);
    setSnippetPanelView({ kind: 'domain', domainId });
    setSnippetPanelOpen(true);
  };
  const openUserProfilePanel = (userId: string) => {
    setSnippetPanelReturnView(snippetPanelView);
    setSnippetPanelView({ kind: 'user', userId });
    setSnippetPanelOpen(true);
  };
  const closeSnippetPanel = () => {
    setSnippetPanelOpen(false);
    setSnippetPanelReturnView(null);
    setSnippetPanelView({ kind: 'snippet' });
  };
  const backInSnippetPanel = () => {
    if (snippetPanelView.kind === 'domain' || snippetPanelView.kind === 'user') {
      if (snippetPanelReturnView) {
        setSnippetPanelView(snippetPanelReturnView);
        setSnippetPanelReturnView(null);
      } else {
        setSnippetPanelView({ kind: 'snippet' });
      }
    }
  };

  return (
    <div
      className={classNamePrefix}
      css={layoutRoot(theme)}
      data-name="Knowledge Snippets"
      data-genie-surface="knowledge-snippets"
    >
      <KnowledgeSnippetsCanvasHeader
        canvasTitle={canvasTitle}
        prototypeVersionId={prototypeVersionId}
        onPrototypeVersionChange={setPrototypeVersionId}
      />

      {prototypeVersionId === 'v2' ? (
        <div css={bodyRow()} data-name="Body">
          <div css={mainColumn()} data-name="Main column">
            <KnowledgeSnippetsV2
              key={prototypeVersionId}
              onViewFullSnippet={openSnippetPanel}
              onDomainSelect={openDomainPanel}
            />
          </div>
          <div css={snippetPanelShell(snippetPanelOpen)} aria-hidden={!snippetPanelOpen}>
            {snippetPanelOpen ? (
              <SnippetPanelContainer
                view={snippetPanelView}
                onClose={closeSnippetPanel}
                onBack={backInSnippetPanel}
                onDomainSelect={openDomainPanel}
                onAuthorSelect={() => openUserProfilePanel(RYAN_CHEN_USER_ID)}
                onExpertSelect={openUserProfilePanel}
              />
            ) : null}
          </div>
        </div>
      ) : null}

      {prototypeVersionId === 'v1' ? (
      <div css={bodyRow()} data-name="Body">
        <div css={mainColumn()} data-name="Main column">
          <div css={contentOuter(theme)} data-name="Content container">
        <div css={mainScrollRegion(theme)} data-name="Chat scroll">
          <div css={chatColumn(theme)} data-name="Chat content">
            <div css={css({ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' })}>
              <div css={userBubble(theme)} data-name="User input text bubble">
                <Typography.Paragraph
                  style={{
                    marginBottom: 0,
                    color: theme.colors.textPrimary,
                    fontSize: 15,
                    lineHeight: '22px',
                  }}
                >
                  Why is our Jordan 1 retro sell-through lagging in EMEA compared to NA this quarter?
                </Typography.Paragraph>
              </div>
              <div css={css({ height: 40, width: '100%' })} aria-hidden />
            </div>

            <Thinking pastSteps={JORDAN_SELL_THROUGH_THINKING_TRACE} durationSeconds={12} />

            <div css={responseBlock(theme)} data-name="Response">
              <div css={css({ width: '100%', maxWidth: 744 })}>
                <Typography.Paragraph
                  style={{
                    marginBottom: 0,
                    maxWidth: 744,
                    color: theme.colors.textPrimary,
                    fontSize: 15,
                    lineHeight: '22px',
                  }}
                >
                  Jordan 1 Retro{' '}
                  <SellThroughAiTerm onExpandDetail={openSellThroughDetailPanel} />
                  {' '}
                  in{' '}
                  <EmeaAiTerm onExpandDetail={openEmeaDetailPanel} />
                  {' '}
                  is running approximately&nbsp;12 points below&nbsp;North America this quarter
                </Typography.Paragraph>
                <Typography.Paragraph
                  style={{
                    marginBottom: 0,
                    color: theme.colors.textPrimary,
                    fontSize: 15,
                    lineHeight: '22px',
                  }}
                >
                  (38% vs. 50%).
                </Typography.Paragraph>
              </div>

              <Typography.Paragraph
                style={{
                  marginBottom: 0,
                  color: theme.colors.textPrimary,
                  fontSize: 15,
                  lineHeight: '22px',
                }}
              >
                The gap is primarily driven by three factors:
              </Typography.Paragraph>

              <ol css={numberedList(theme)}>
                <li style={{ marginBottom: 0 }}>
                  <Typography.Text strong style={{ fontSize: 15, lineHeight: '22px' }}>
                    Pricing disparity after FX adjustment.
                  </Typography.Text>
                  <Typography.Text style={{ fontSize: 15, lineHeight: '22px' }}>
                    &nbsp;The €180 EMEA retail price equates to ~$198 at current EUR/USD rates, a 10% premium over the
                    $180 NA price. Historical data shows EMEA demand for retro silhouettes is elastic above €175.
                  </Typography.Text>
                </li>
                <li style={{ marginBottom: 0 }}>
                  <Typography.Text strong style={{ fontSize: 15, lineHeight: '22px' }}>
                    Inventory timing.
                  </Typography.Text>
                  <Typography.Text style={{ fontSize: 15, lineHeight: '22px' }}>
                    &nbsp;EMEA warehouses received the full Jordan 1 OG colorway allocation 3 weeks after NA launch,
                    missing the peak hype window. Inventory for Sizes EU 42–44 (the highest-velocity band) didn't
                    land until Week 6.
                  </Typography.Text>
                </li>
                <li>
                  <Typography.Text strong style={{ fontSize: 15, lineHeight: '22px' }}>
                    Partner door mix.&nbsp;
                  </Typography.Text>
                  <Typography.Text style={{ fontSize: 15, lineHeight: '22px' }}>
                    EMEA's sell-through is weighted heavily toward NSO (Nike-owned stores), which historically
                    underperform versus Key Account partners for retro launches in that region.
                  </Typography.Text>
                </li>
              </ol>
            </div>

            <div
              css={css({
                display: 'flex',
                alignItems: 'flex-start',
                gap: theme.spacing.md,
                width: '100%',
                flexWrap: 'wrap',
                [`& > div .${canvasHeaderBtnClass}`]: {
                  color: `${theme.colors.textSecondary} !important`,
                },
                [`& > div .${canvasHeaderBtnClass}:hover`]: {
                  color: `${theme.colors.actionDefaultIconHover} !important`,
                },
                [`& > div .${canvasHeaderBtnClass}:active`]: {
                  color: `${theme.colors.actionDefaultIconPress} !important`,
                },
                [`& > div .${canvasHeaderBtnClass} .anticon`]: {
                  color: 'inherit !important',
                },
                '& [data-name="Sources"] .anticon': {
                  color: `${theme.colors.textSecondary} !important`,
                },
              })}
              data-name="Response Action Bar"
            >
              <div css={css({ display: 'flex', alignItems: 'center', gap: 4 })}>
                <Button type="tertiary" size="small" icon={<CopyIcon style={iconSm} />} aria-label="Copy" />
                <Button type="tertiary" size="small" icon={<ThumbsUpIcon style={iconSm} />} aria-label="Thumbs up" />
                <Button
                  type="tertiary"
                  size="small"
                  icon={<ThumbsDownIcon style={iconSm} />}
                  aria-label="Thumbs down"
                />
                <Button type="tertiary" size="small" icon={<UploadIcon style={iconSm} />} aria-label="Share or export" />
              </div>
              <button
                type="button"
                css={css({
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: theme.spacing.xs,
                  height: 22,
                  paddingRight: theme.spacing.sm,
                  border: 'none',
                  borderRadius: theme.borders.borderRadiusFull,
                  background: genieVar.actionDefaultBgDefault,
                  cursor: 'pointer',
                  color: theme.colors.textSecondary,
                })}
                data-name="Sources"
              >
                <span css={css({ display: 'flex', alignItems: 'center' })}>
                  <span css={sourceChip(theme)}>
                    <TableIcon style={iconSm} />
                  </span>
                  <span css={sourceChip(theme)}>
                    <DashboardIcon style={iconSm} />
                  </span>
                  <span
                    css={css({
                      ...sourceChip(theme),
                      marginRight: 0,
                      padding: 0,
                      overflow: 'hidden',
                    })}
                  >
                    <img
                      src={imgImage}
                      alt=""
                      width={14}
                      height={14}
                      css={css({ display: 'block', borderRadius: theme.borders.borderRadiusFull })}
                    />
                  </span>
                </span>
                <Typography.Hint style={{ marginBottom: 0, textAlign: 'center' }}>4 sources</Typography.Hint>
              </button>
            </div>
          </div>
        </div>

        <div css={promptDock(theme)} data-name="Prompt container">
          <div css={promptInner()} data-name="Prompt inner">
            <div css={promptCard(theme)} data-name="Prompt">
              <div css={css({ display: 'flex', alignItems: 'center', width: '100%', minHeight: 24 })}>
                <Typography.Text type="secondary" style={{ fontSize: 13, lineHeight: '20px', marginBottom: 0 }}>
                  Ask a question...
                </Typography.Text>
              </div>
              <div css={css({ display: 'flex', alignItems: 'flex-end', gap: theme.spacing.sm, width: '100%' })}>
                <Button type="tertiary" size="middle" icon={<PlusIcon style={{ fontSize: 16 }} />} aria-label="Add" />
                <div css={css({ flex: '1 1 auto' })} />
                <div
                  css={css({
                    borderRadius: theme.borders.borderRadiusFull,
                    backgroundColor: theme.colors.actionIconBackgroundDefault,
                  })}
                >
                  <Button
                    type="tertiary"
                    size="middle"
                    icon={<ArrowUpIcon style={{ fontSize: 16 }} />}
                    aria-label="Send"
                  />
                </div>
              </div>
            </div>
            <div css={css({ paddingTop: theme.spacing.xs })} data-name="Disclaimer">
              <Typography.Hint style={{ marginBottom: 0, textAlign: 'center' }}>
                Check important details before use.
              </Typography.Hint>
            </div>
          </div>
        </div>
          </div>
        </div>
        <div css={detailPanelShell(detailPanelOpen)} aria-hidden={!detailPanelOpen}>
          {detailPanelKind === 'sell-through' ? (
            <KnowledgeDetailPanel config={SELL_THROUGH_KNOWLEDGE_CONTEXT} onClose={closeDetailPanel} />
          ) : null}
          {detailPanelKind === 'emea' ? (
            <KnowledgeDetailPanel config={EMEA_KNOWLEDGE_CONTEXT} onClose={closeDetailPanel} />
          ) : null}
        </div>
      </div>
      ) : null}
    </div>
  );
}

/** Genie ☀️ screen — surfaces use Figma-linked `genieVar` tokens; components use Du Bois (`@databricks/design-system`). */
export function KnowledgeSnippets() {
  return <Inner />;
}
