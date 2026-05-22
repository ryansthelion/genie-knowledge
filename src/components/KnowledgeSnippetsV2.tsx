import { css } from '@emotion/react';
import { useCallback, useEffect, useState } from 'react';
import { enterFromBelow } from '../animations/enterFromBelow';
import { useKnowledgeSnippetsV2Animation } from '../hooks/useKnowledgeSnippetsV2Animation';
import {
  Button,
  CopyIcon,
  DashboardIcon,
  TableIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Typography,
  UploadIcon,
  useDesignSystemTheme,
} from '@databricks/design-system';
import { genieVar } from '../theme/genieSun';
import { KnowledgeSnippetPill } from './KnowledgeSnippetPill';
import { MULTI_SNIPPET_DROPDOWN_ITEMS } from './snippetDropdownConfig';
import { PRICING_DISPARITY_SNIPPET_POPOVER } from './snippetPopoverConfig';
import { KnowledgeSnippetsPromptDock } from './KnowledgeSnippetsPromptDock';
import {
  chatScrollContent,
  contentOuter,
  mainScrollRegion,
  FIGMA_SOURCE_AVATAR_IMG,
  iconSm,
  numberedList,
  responseBlock,
  responseParagraphStyle,
  sourceChip,
  userBubble,
} from './knowledgeSnippetsShared';
import { Thinking } from './Thinking';
import type { SnippetPanelDomainId } from './domainPanelConfig';
import { KNOWLEDGE_SNIPPETS_V2_THINKING_TRACE } from './thinkingStepContent';

export type KnowledgeSnippetsV2Props = {
  onViewFullSnippet?: (snippetId?: string) => void;
  onDomainSelect?: (domainId: SnippetPanelDomainId) => void;
};

/**
 * Version 2 — knowledge snippet pills in response (Figma `9665:45187`).
 * @see https://www.figma.com/design/st5IOjhahvmvXyDbjvMpHB/Genie--Unified-Components-?node-id=9665-45187
 */
export function KnowledgeSnippetsV2({ onViewFullSnippet, onDomainSelect }: KnowledgeSnippetsV2Props) {
  const { theme, getPrefixedClassName } = useDesignSystemTheme();
  const canvasHeaderBtnClass = getPrefixedClassName('btn');
  const {
    phase,
    bubbleEntranceKey,
    showThinking,
    showResponse,
    thinkingRunning,
    thoughtSeconds,
    traceReveal,
    partialReveal,
    pulseStatusDot,
    traceEntranceKey,
    descriptionEntranceKey,
    toolEntranceKey,
    fullTraceEntranceKey,
    showTopicsSource,
    showExpertsSource,
    animateSourceFades,
    responseEntranceKey,
  } = useKnowledgeSnippetsV2Animation();

  const [traceExpanded, setTraceExpanded] = useState(false);
  const [entranceReplayOffset, setEntranceReplayOffset] = useState(0);

  useEffect(() => {
    if (phase === 'user-only' || phase === 'thinking-header') {
      setTraceExpanded(false);
      return;
    }
    if (phase === 'thought-complete') {
      setTraceExpanded(false);
      return;
    }
    if (
      phase === 'trace-pulse' ||
      phase === 'trace-title' ||
      phase === 'trace-description' ||
      phase === 'trace-tool'
    ) {
      setTraceExpanded(true);
    }
  }, [phase]);

  const traceAnimating =
    phase === 'trace-pulse' ||
    phase === 'trace-title' ||
    phase === 'trace-description' ||
    phase === 'trace-tool';

  const handleTraceExpandedChange = useCallback(
    (open: boolean) => {
      setTraceExpanded(open);
      if (
        open &&
        (phase === 'thought-complete' || phase === 'response')
      ) {
        setEntranceReplayOffset((offset) => offset + 1000);
      }
    },
    [phase],
  );

  return (
    <div css={contentOuter(theme)} data-name="Content container">
      <div css={mainScrollRegion(theme)} data-name="Chat scroll">
        <div css={chatScrollContent(theme)} data-name="Chat content">
          <div
            key={bubbleEntranceKey}
            css={[
              css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                width: '100%',
              }),
              enterFromBelow(),
            ]}
            data-name="User input"
          >
            <div css={userBubble(theme)} data-name="User input text bubble">
              <Typography.Paragraph style={{ ...responseParagraphStyle, color: theme.colors.textPrimary }}>
                Why is our Jordan 1 retro sell-through lagging in EMEA compared to NA this quarter?
              </Typography.Paragraph>
            </div>
            <div css={css({ height: 40, width: '100%' })} aria-hidden data-name="Action container" />
          </div>

          {showThinking ? (
            <Thinking
              pastSteps={KNOWLEDGE_SNIPPETS_V2_THINKING_TRACE}
              durationSeconds={thoughtSeconds}
              running={thinkingRunning}
              expanded={traceExpanded}
              onExpandedChange={handleTraceExpandedChange}
              traceReveal={traceReveal}
              partialReveal={partialReveal}
              pulseStatusDot={pulseStatusDot}
              animateTraceEntrances={
                traceAnimating ||
                ((phase === 'thought-complete' || phase === 'response') && traceExpanded)
              }
              traceEntranceKey={traceEntranceKey}
              descriptionEntranceKey={descriptionEntranceKey}
              toolEntranceKey={toolEntranceKey}
              fullTraceEntranceKey={fullTraceEntranceKey}
              entranceReplayOffset={entranceReplayOffset}
              showTopicsSource={showTopicsSource}
              showExpertsSource={showExpertsSource}
              animateSourceFades={animateSourceFades}
              onViewFullSnippet={onViewFullSnippet}
              onDomainSelect={onDomainSelect}
            />
          ) : null}

          {showResponse ? (
            <>
          <div
            key={responseEntranceKey}
            css={[responseBlock(theme), enterFromBelow()]}
            data-name="Response"
          >
            <div css={css({ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' })}>
              <Typography.Paragraph
                style={{ ...responseParagraphStyle, color: theme.colors.textPrimary, maxWidth: 744 }}
              >
                Jordan 1 Retro sell-through in EMEA is running approximately&nbsp;12 points below&nbsp;North America
                this quarter
              </Typography.Paragraph>
              <div
                css={css({
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 4,
                })}
                data-name="knolwedge"
              >
                <Typography.Paragraph
                  style={{
                    ...responseParagraphStyle,
                    color: theme.colors.textPrimary,
                    marginBottom: 0,
                    whiteSpace: 'nowrap',
                  }}
                >
                  (38% vs. 50%).
                </Typography.Paragraph>
                <KnowledgeSnippetPill
                  label="1 snippet"
                  popover={PRICING_DISPARITY_SNIPPET_POPOVER}
                  onViewFullSnippet={onViewFullSnippet}
                />
              </div>
            </div>

            <Typography.Paragraph style={{ ...responseParagraphStyle, color: theme.colors.textPrimary }}>
              The gap is primarily driven by three factors:
            </Typography.Paragraph>

            <div
              css={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 4,
                width: '100%',
              })}
            >
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
                    missing the peak hype window. Inventory for Sizes EU 42–44 (the highest-velocity band) didn&apos;t
                    land until Week 6.
                  </Typography.Text>
                </li>
                <li>
                  <Typography.Text strong style={{ fontSize: 15, lineHeight: '22px' }}>
                    Partner door mix.&nbsp;
                  </Typography.Text>
                  <Typography.Text style={{ fontSize: 15, lineHeight: '22px' }}>
                    EMEA&apos;s sell-through is weighted heavily toward NSO (Nike-owned stores), which historically
                    underperform versus Key Account partners for retro launches in that region.
                  </Typography.Text>
                </li>
              </ol>
              <KnowledgeSnippetPill label="4 snippets" menu={MULTI_SNIPPET_DROPDOWN_ITEMS} />
            </div>
          </div>

          <div
            css={css({
              display: 'flex',
              alignItems: 'flex-start',
              gap: theme.spacing.md,
              width: '100%',
              flexWrap: 'wrap',
              [`& > div .${canvasHeaderBtnClass}`]: {
                color: `${genieVar.textSecondary} !important`,
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
            <div css={css({ display: 'flex', alignItems: 'center', gap: 4 })} data-name="Response actions">
              <Button type="tertiary" size="small" icon={<CopyIcon style={iconSm} />} aria-label="Copy" />
              <Button type="tertiary" size="small" icon={<ThumbsUpIcon style={iconSm} />} aria-label="Thumbs up" />
              <Button type="tertiary" size="small" icon={<ThumbsDownIcon style={iconSm} />} aria-label="Thumbs down" />
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
              <span css={css({ display: 'flex', alignItems: 'center' })} data-name="Avatars">
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
                    src={FIGMA_SOURCE_AVATAR_IMG}
                    alt=""
                    width={14}
                    height={14}
                    css={css({ display: 'block', borderRadius: theme.borders.borderRadiusFull })}
                  />
                </span>
              </span>
              <Typography.Hint style={{ marginBottom: 0, textAlign: 'center', fontSize: 12, lineHeight: 1.4 }}>
                4 sources
              </Typography.Hint>
            </button>
          </div>
            </>
          ) : null}

        </div>
      </div>
      <KnowledgeSnippetsPromptDock />
    </div>
  );
}
