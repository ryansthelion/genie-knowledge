import { css, keyframes } from '@emotion/react';
import { ChevronDownIcon, ChevronRightIcon, useDesignSystemTheme } from '@databricks/design-system';
import {
  ThinkingSearchResultRow,
  type ThinkingSearchSource,
} from './ThinkingSearchResultRow';
import type { ThinkingToolCallSnippetItem } from './ThinkingToolCallSnippetContent';
import { ThinkingToolCallRow, type ThinkingToolCallVariant } from './ThinkingToolCallRow';
import type { SnippetDropdownItem } from './snippetDropdownConfig';
import type { SnippetPopoverConfig } from './snippetPopoverConfig';
import type { ThemeType } from '@databricks/design-system';
import { useCallback, useEffect, useId, useState, type CSSProperties } from 'react';
import { enterFromBelowMultisteps } from '../animations/enterFromBelow';
import { MULTISTEPS_ENTRANCE_STAGGER_MS } from '../animations/thinkingAnimationTiming';
import { AnimationDotPulsing } from './AnimationDotPulsing';
import { genieVar } from '../theme/genieSun';

export type ThinkingTraceReveal = 'none' | 'pulse' | 'partial' | 'full';

export type ThinkingPartialReveal = {
  showDescription: boolean;
  showToolCalls: boolean;
};

/** Figma Drawer `3112:5903` — 28px trigger height. */
const DRAWER_HEIGHT_PX = 28;
const ICON_PX = 16;
const STATUS_DOT_PX = 12;
const TIMELINE_LINE_COLOR = '#d8d8d8';

const thinkingShimmerKeyframes = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(120px)' },
});

export type ThinkingToolCall = {
  id: string;
  title: string;
  matchPercent?: number;
  body?: string;
  /** Figma `10677:7346+` — inline snippets / topics / experts pills in search tool call. */
  sources?: ThinkingSearchSource[];
  sourceLabel?: string;
  /** {@link KnowledgeSnippetPill} menu — same Source pill as response area. */
  sourceMenu?: SnippetDropdownItem[];
  sourceMenuMaxVisibleItems?: number;
  sourcePopover?: SnippetPopoverConfig;
  /** Figma `10692:13402` — expandable snippet rows under search tool-call header. */
  contentItems?: ThinkingToolCallSnippetItem[];
  variant?: ThinkingToolCallVariant;
  assetName?: string;
  running?: boolean;
};

export type ThinkingPastStep = {
  id: string;
  description: string;
  toolCalls?: ThinkingToolCall[];
  /** Vertical connector below the status dot (Figma past steps except the last). */
  showConnectorLine?: boolean;
};

export type ThinkingProps = {
  /** Figma Step Container — timeline steps shown when expanded. */
  pastSteps: ThinkingPastStep[];
  durationSeconds?: number;
  running?: boolean;
  defaultExpanded?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  traceReveal?: ThinkingTraceReveal;
  partialReveal?: ThinkingPartialReveal;
  pulseStatusDot?: boolean;
  /** Bump keys when trace sub-parts enter (Multisteps enter-from-below). */
  traceEntranceKey?: number;
  descriptionEntranceKey?: number;
  toolEntranceKey?: number;
  fullTraceEntranceKey?: number;
  entranceReplayOffset?: number;
  animateTraceEntrances?: boolean;
  showTopicsSource?: boolean;
  showExpertsSource?: boolean;
  animateSourceFades?: boolean;
  onViewFullSnippet?: (snippetId?: string) => void;
};

function thinkingRoot() {
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  });
}

function drawerButtonStyles(theme: ThemeType, hovered: boolean) {
  return css({
    display: 'inline-flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    width: 'fit-content',
    maxWidth: '100%',
    gap: theme.spacing.xs,
    height: DRAWER_HEIGHT_PX,
    padding: theme.spacing.xs,
    margin: 0,
    border: 'none',
    borderRadius: theme.borders.borderRadiusMd,
    backgroundColor: hovered ? genieVar.actionDefaultBgHover : genieVar.actionDefaultBgDefault,
    cursor: 'pointer',
    font: 'inherit',
    color: 'inherit',
    transition: 'background-color 0.12s ease-out',
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.actionPrimaryBackgroundPress}`,
      outlineOffset: 2,
    },
  });
}

function drawerRow() {
  return css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2,
  });
}

function drawerLabel() {
  return css({
    fontSize: 12,
    lineHeight: 1.4,
    fontWeight: 600,
    color: genieVar.textSecondary,
    whiteSpace: 'nowrap',
  });
}

/** Figma ThinkingDrawer shimmer — node 3112:6489 */
function thinkingShimmerWrap() {
  return css({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  });
}

function thinkingShimmerOverlay() {
  return css({
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: -48,
    width: 48,
    background: `linear-gradient(90deg, ${genieVar.textPrimary} 0%, ${genieVar.textSecondary} 50%, ${genieVar.textPrimary} 100%)`,
    mixBlendMode: 'screen',
    pointerEvents: 'none',
    animation: `${thinkingShimmerKeyframes} 1.6s ease-in-out infinite`,
    '@media (prefers-reduced-motion: reduce)': {
      animation: 'none',
      opacity: 0,
    },
  });
}

/** Figma Step Container `10677:7333`. */
function stepContainer(theme: ThemeType) {
  return css({
    position: 'relative',
    alignSelf: 'stretch',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    overflow: 'hidden',
    padding: `${theme.spacing.md}px ${theme.spacing.xs}px`,
    borderRadius: theme.borders.borderRadiusMd,
    boxSizing: 'border-box',
  });
}

function pastStepsList() {
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    borderRadius: genieVar.radiusLg,
  });
}

function pastStepRow() {
  return css({
    display: 'flex',
    gap: 8,
    alignItems: 'flex-start',
    width: '100%',
  });
}

/** Status column stays top-aligned — dot must not shift as step content grows. */
function statusColumn(hasLine: boolean) {
  return css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexShrink: 0,
    width: STATUS_DOT_PX,
    paddingTop: 4,
    minHeight: 'calc(12px * 1.4)',
    '&::after': hasLine
      ? {
          content: '""',
          position: 'absolute',
          left: 5.5,
          top: 'calc(12px * 1.4 / 2)',
          zIndex: 0,
          width: 1,
          height: 1000,
          backgroundColor: TIMELINE_LINE_COLOR,
        }
      : undefined,
  });
}

function statusDot() {
  return css({
    position: 'relative',
    zIndex: 1,
    width: STATUS_DOT_PX,
    height: STATUS_DOT_PX,
    borderRadius: '50%',
    border: `2px solid ${TIMELINE_LINE_COLOR}`,
    backgroundColor: genieVar.backgroundPrimary,
    boxSizing: 'border-box',
    flexShrink: 0,
  });
}

function stepTextContainer(theme: ThemeType, isLast: boolean) {
  return css({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    gap: 6,
    alignItems: 'flex-start',
    minWidth: 0,
    paddingBottom: isLast ? 0 : theme.spacing.lg,
  });
}

function stepDescriptionBlock(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    alignItems: 'flex-start',
    width: '100%',
  });
}

/** Figma Du Bois/Paragraph `10677:7342` — 13px / 20px primary body. */
function stepDescription() {
  return css({
    margin: 0,
    width: '100%',
    fontSize: 13,
    lineHeight: '20px',
    fontWeight: 400,
    color: genieVar.textPrimary,
    wordBreak: 'break-word',
  });
}

function toolCallsSection() {
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    alignItems: 'flex-start',
    width: '100%',
  });
}

function chevronIconStyle(theme: ThemeType): CSSProperties {
  return { fontSize: ICON_PX, color: theme.colors.textSecondary, flexShrink: 0 };
}

function ThinkingDrawerLabel({ running, durationSeconds }: { running: boolean; durationSeconds: number }) {
  if (running) {
    return (
      <span css={thinkingShimmerWrap()} data-name=".animation/Shimmer Gradient">
        <span css={drawerLabel()}>Thinking</span>
        <span css={thinkingShimmerOverlay()} aria-hidden />
      </span>
    );
  }

  return <span css={drawerLabel()}>Thought for {durationSeconds}s</span>;
}

function ThinkingPastStepItem({
  theme,
  step,
  isFirst,
  isLast,
  showDescription = true,
  showToolCalls = true,
  pulseStatusDot = false,
  animateEntrances = false,
  descriptionEntranceKey = 0,
  toolEntranceKey = 0,
  entranceReplayOffset = 0,
  stepEntranceKey = 0,
  traceEntranceKey = 0,
  animateTraceContainer = false,
  showTopicsSource = true,
  showExpertsSource = true,
  animateSourceFades = false,
  onViewFullSnippet,
}: {
  theme: ThemeType;
  step: ThinkingPastStep;
  isFirst: boolean;
  isLast: boolean;
  showDescription?: boolean;
  showToolCalls?: boolean;
  pulseStatusDot?: boolean;
  animateEntrances?: boolean;
  descriptionEntranceKey?: number;
  toolEntranceKey?: number;
  entranceReplayOffset?: number;
  stepEntranceKey?: number;
  traceEntranceKey?: number;
  /** Enter-from-below on text only (keeps timeline dot fixed). */
  animateTraceContainer?: boolean;
  showTopicsSource?: boolean;
  showExpertsSource?: boolean;
  animateSourceFades?: boolean;
  onViewFullSnippet?: (snippetId?: string) => void;
}) {
  const descriptionEntrance = animateEntrances
    ? enterFromBelowMultisteps(MULTISTEPS_ENTRANCE_STAGGER_MS.description)
    : undefined;
  const toolEntrance = animateEntrances
    ? enterFromBelowMultisteps(MULTISTEPS_ENTRANCE_STAGGER_MS.toolCall)
    : undefined;
  const replay = entranceReplayOffset;
  const textContainerEntrance =
    animateEntrances && (animateTraceContainer || stepEntranceKey > 0)
      ? enterFromBelowMultisteps()
      : undefined;
  const textContainerKey = animateTraceContainer
    ? traceEntranceKey + replay
    : stepEntranceKey > 0
      ? stepEntranceKey + replay
      : undefined;
  const hasLine = step.showConnectorLine ?? !isLast;

  return (
    <div css={pastStepRow()} data-name="Past Step">
      <div css={statusColumn(hasLine)} data-name=".animation/Status">
        {pulseStatusDot ? (
          <AnimationDotPulsing pulsing />
        ) : (
          <span css={statusDot()} data-name="Status/Rest/No" aria-hidden />
        )}
      </div>
      <div
        key={textContainerKey}
        css={[stepTextContainer(theme, isLast), textContainerEntrance]}
        data-name="Text container"
      >
        <div css={stepDescriptionBlock(theme)} data-name="➡️ Description">
          {showDescription ? (
            <p
              key={animateEntrances ? descriptionEntranceKey + replay : undefined}
              css={[stepDescription(), descriptionEntrance]}
            >
              {step.description}
            </p>
          ) : null}
          {showToolCalls && step.toolCalls && step.toolCalls.length > 0 ? (
            <div
              key={animateEntrances ? toolEntranceKey + replay : undefined}
              css={[toolCallsSection(), toolEntrance]}
              data-name="section"
            >
              {step.toolCalls.map((toolCall) =>
                toolCall.variant === 'search' ? (
                  <ThinkingSearchResultRow
                    key={toolCall.id}
                    title={toolCall.title}
                    sources={toolCall.sources}
                    sourceLabel={toolCall.sourceLabel}
                    sourceMenu={toolCall.sourceMenu}
                    sourceMenuMaxVisibleItems={toolCall.sourceMenuMaxVisibleItems}
                    sourcePopover={toolCall.sourcePopover}
                    onViewFullSnippet={onViewFullSnippet}
                    contentItems={toolCall.contentItems}
                    showTopicsSource={showTopicsSource}
                    showExpertsSource={showExpertsSource}
                    animateSourceFades={animateSourceFades}
                  />
                ) : (
                  <ThinkingToolCallRow
                    key={toolCall.id}
                    title={toolCall.title}
                    matchPercent={toolCall.matchPercent}
                    body={toolCall.body}
                    sourceLabel={toolCall.sourceLabel}
                    variant={toolCall.variant}
                    assetName={toolCall.assetName}
                    running={toolCall.running}
                  />
                ),
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** Figma Step Container `10677:7333` — timeline + tool-call cards. */
function ThinkingStepContainer({
  theme,
  pastSteps,
  traceReveal = 'full',
  partialReveal,
  pulseStatusDot = false,
  animateTraceEntrances = false,
  traceEntranceKey = 0,
  descriptionEntranceKey = 0,
  toolEntranceKey = 0,
  fullTraceEntranceKey = 0,
  entranceReplayOffset = 0,
  showTopicsSource = true,
  showExpertsSource = true,
  animateSourceFades = false,
  onViewFullSnippet,
}: {
  theme: ThemeType;
  pastSteps: ThinkingPastStep[];
  traceReveal?: ThinkingTraceReveal;
  partialReveal?: ThinkingPartialReveal;
  pulseStatusDot?: boolean;
  animateTraceEntrances?: boolean;
  traceEntranceKey?: number;
  descriptionEntranceKey?: number;
  toolEntranceKey?: number;
  fullTraceEntranceKey?: number;
  entranceReplayOffset?: number;
  showTopicsSource?: boolean;
  showExpertsSource?: boolean;
  animateSourceFades?: boolean;
  onViewFullSnippet?: (snippetId?: string) => void;
}) {
  const visibleSteps =
    traceReveal === 'full' ? pastSteps : pastSteps.length > 0 ? [pastSteps[0]] : [];

  return (
    <div css={stepContainer(theme)} data-name="Step Container">
      <div css={pastStepsList()} data-name="➡️ Past Steps">
        {visibleSteps.map((step, index) => (
          <ThinkingPastStepItem
            key={step.id}
            theme={theme}
            step={step}
            isFirst={index === 0}
            isLast={index === visibleSteps.length - 1}
            showDescription={
              traceReveal === 'full' || traceReveal === 'pulse'
                ? traceReveal === 'full'
                : (partialReveal?.showDescription ?? false)
            }
            showToolCalls={traceReveal === 'full' ? true : (partialReveal?.showToolCalls ?? false)}
            pulseStatusDot={traceReveal === 'pulse' && pulseStatusDot && index === 0}
            animateEntrances={animateTraceEntrances}
            animateTraceContainer={
              animateTraceEntrances && index === 0 && !(traceReveal === 'pulse' && pulseStatusDot)
            }
            traceEntranceKey={traceEntranceKey}
            descriptionEntranceKey={descriptionEntranceKey}
            toolEntranceKey={toolEntranceKey}
            entranceReplayOffset={entranceReplayOffset}
            stepEntranceKey={
              traceReveal === 'full' && index > 0 ? fullTraceEntranceKey : traceEntranceKey
            }
            showTopicsSource={showTopicsSource}
            showExpertsSource={showExpertsSource}
            animateSourceFades={animateSourceFades}
            onViewFullSnippet={onViewFullSnippet}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Figma Thinking `9622:44963` — Drawer trigger + Step Container trace.
 * @see https://www.figma.com/design/st5IOjhahvmvXyDbjvMpHB/Genie--Unified-Components-?node-id=9622-44963
 */
export function Thinking({
  pastSteps,
  durationSeconds = 12,
  running = false,
  defaultExpanded = true,
  expanded: expandedProp,
  onExpandedChange,
  traceReveal = 'full',
  partialReveal,
  pulseStatusDot = false,
  traceEntranceKey = 0,
  descriptionEntranceKey = 0,
  toolEntranceKey = 0,
  fullTraceEntranceKey = 0,
  entranceReplayOffset = 0,
  animateTraceEntrances = false,
  showTopicsSource = true,
  showExpertsSource = true,
  animateSourceFades = false,
  onViewFullSnippet,
}: ThinkingProps) {
  const { theme } = useDesignSystemTheme();
  const traceId = useId();
  const [expandedInternal, setExpandedInternal] = useState(defaultExpanded);
  const [hovered, setHovered] = useState(false);

  const expanded = expandedProp ?? expandedInternal;

  useEffect(() => {
    if (expandedProp === undefined) {
      setExpandedInternal(defaultExpanded);
    }
  }, [defaultExpanded, expandedProp]);

  const setExpanded = useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const next = typeof value === 'function' ? value(expanded) : value;
      if (expandedProp === undefined) {
        setExpandedInternal(next);
      }
      onExpandedChange?.(next);
    },
    [expanded, expandedProp, onExpandedChange],
  );

  const toggle = useCallback(() => {
    setExpanded((value) => !value);
  }, [setExpanded]);

  const ChevronIcon = running || !expanded ? ChevronRightIcon : ChevronDownIcon;
  const showTrace = expanded && pastSteps.length > 0 && traceReveal !== 'none';

  return (
    <div css={thinkingRoot()} data-name="Thinking">
      <button
        type="button"
        css={drawerButtonStyles(theme, hovered)}
        data-name="Drawer"
        aria-expanded={expanded}
        aria-controls={traceId}
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span css={drawerRow()}>
          <ThinkingDrawerLabel running={running} durationSeconds={durationSeconds} />
          <ChevronIcon style={chevronIconStyle(theme)} aria-hidden />
        </span>
      </button>

      {showTrace ? (
        <div id={traceId} css={css({ alignSelf: 'stretch', width: '100%' })} role="region" aria-label="Thinking trace">
          <ThinkingStepContainer
            theme={theme}
            pastSteps={pastSteps}
            traceReveal={traceReveal}
            partialReveal={partialReveal}
            pulseStatusDot={pulseStatusDot}
            animateTraceEntrances={animateTraceEntrances}
            traceEntranceKey={traceEntranceKey}
            descriptionEntranceKey={descriptionEntranceKey}
            toolEntranceKey={toolEntranceKey}
            fullTraceEntranceKey={fullTraceEntranceKey}
            entranceReplayOffset={entranceReplayOffset}
            showTopicsSource={showTopicsSource}
            showExpertsSource={showExpertsSource}
            animateSourceFades={animateSourceFades}
            onViewFullSnippet={onViewFullSnippet}
          />
        </div>
      ) : null}
    </div>
  );
}
