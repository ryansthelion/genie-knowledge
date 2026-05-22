import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BUBBLE_ENTRANCE_MS,
  getPhaseAdvanceMs,
  KNOWLEDGE_SNIPPETS_V2_PHASES,
  THINKING_TRACE_PHASES,
  TOPICS_TO_EXPERTS_SOURCE_DELAY_MS,
  type KnowledgeSnippetsV2Phase,
} from '../animations/thinkingAnimationTiming';

function useEntranceKey(phase: KnowledgeSnippetsV2Phase, entrancePhase: KnowledgeSnippetsV2Phase): number {
  const [key, setKey] = useState(0);
  const prevPhaseRef = useRef(phase);

  useEffect(() => {
    if (phase === entrancePhase && prevPhaseRef.current !== entrancePhase) {
      setKey((value) => value + 1);
    }
    prevPhaseRef.current = phase;
  }, [phase, entrancePhase]);

  return key;
}

export type ThinkingTraceReveal = 'none' | 'pulse' | 'partial' | 'full';

export type ThinkingPartialReveal = {
  showDescription: boolean;
  showToolCalls: boolean;
};

function getTraceReveal(phase: KnowledgeSnippetsV2Phase): ThinkingTraceReveal {
  if (phase === 'trace-pulse') return 'pulse';
  if (phase === 'trace-title' || phase === 'trace-description' || phase === 'trace-tool') {
    return 'partial';
  }
  if (phase === 'thought-complete' || phase === 'response') return 'full';
  return 'none';
}

function getPartialReveal(phase: KnowledgeSnippetsV2Phase): ThinkingPartialReveal {
  return {
    showDescription: phase === 'trace-title' || phase === 'trace-description' || phase === 'trace-tool',
    showToolCalls: phase === 'trace-description' || phase === 'trace-tool',
  };
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const FINAL_PHASE: KnowledgeSnippetsV2Phase = 'response';

export function useKnowledgeSnippetsV2Animation() {
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);
  const [phaseIndex, setPhaseIndex] = useState(() =>
    reducedMotion ? KNOWLEDGE_SNIPPETS_V2_PHASES.indexOf(FINAL_PHASE) : 0,
  );
  const [bubbleEntranceKey, setBubbleEntranceKey] = useState(0);
  const thinkingStartedAt = useRef<number | null>(null);
  const [thoughtSeconds, setThoughtSeconds] = useState(12);
  const [showTopicsSource, setShowTopicsSource] = useState(false);
  const [showExpertsSource, setShowExpertsSource] = useState(false);

  const phase = KNOWLEDGE_SNIPPETS_V2_PHASES[phaseIndex];

  const advancePhase = useCallback(() => {
    setPhaseIndex((index) => Math.min(index + 1, KNOWLEDGE_SNIPPETS_V2_PHASES.length - 1));
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setPhaseIndex(KNOWLEDGE_SNIPPETS_V2_PHASES.indexOf(FINAL_PHASE));
      return;
    }
    setPhaseIndex(0);
    thinkingStartedAt.current = null;
  }, [reducedMotion]);

  useEffect(() => {
    if (phase === 'user-only') {
      thinkingStartedAt.current = null;
      return;
    }

    if (phase === 'thinking-header' && thinkingStartedAt.current === null) {
      thinkingStartedAt.current = Date.now();
    }

    if (phase === 'thought-complete' && thinkingStartedAt.current !== null) {
      const elapsedMs = Date.now() - thinkingStartedAt.current;
      setThoughtSeconds(Math.max(1, Math.round(elapsedMs / 1000)));
    }
  }, [phase]);

  useEffect(() => {
    if (reducedMotion) {
      setShowTopicsSource(true);
      setShowExpertsSource(true);
      return;
    }

    if (phase === 'thought-complete' || phase === 'response') {
      setShowTopicsSource(true);
      setShowExpertsSource(true);
      return;
    }

    if (phase === 'trace-tool') {
      setShowTopicsSource(true);
      setShowExpertsSource(false);
      const id = window.setTimeout(
        () => setShowExpertsSource(true),
        TOPICS_TO_EXPERTS_SOURCE_DELAY_MS,
      );
      return () => window.clearTimeout(id);
    }

    setShowTopicsSource(false);
    setShowExpertsSource(false);
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || phase === FINAL_PHASE) return;

    if (phase === 'user-only') {
      const id = window.setTimeout(advancePhase, BUBBLE_ENTRANCE_MS + 50);
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(advancePhase, getPhaseAdvanceMs(phase));
    return () => window.clearTimeout(id);
  }, [advancePhase, phase, reducedMotion]);

  const thinkingRunning = THINKING_TRACE_PHASES.includes(
    phase as (typeof THINKING_TRACE_PHASES)[number],
  );

  const traceExpanded =
    phase === 'trace-pulse' ||
    phase === 'trace-title' ||
    phase === 'trace-description' ||
    phase === 'trace-tool' ||
    phase === 'thought-complete' ||
    phase === 'response';

  const drawerCollapsed = phase === 'thought-complete' || phase === 'response';
  const animationExpanded = traceExpanded && !drawerCollapsed;

  const traceEntranceKey = useEntranceKey(phase, 'trace-pulse');
  const descriptionEntranceKey = useEntranceKey(phase, 'trace-title');
  const toolEntranceKey = useEntranceKey(phase, 'trace-description');
  const fullTraceEntranceKey = useEntranceKey(phase, 'thought-complete');

  return {
    phase,
    bubbleEntranceKey,
    showUserBubble: true,
    showThinking: phase !== 'user-only',
    showResponse: phase === 'response',
    thinkingRunning,
    animationExpanded,
    thoughtSeconds,
    traceReveal: getTraceReveal(phase),
    partialReveal: getPartialReveal(phase),
    pulseStatusDot: phase === 'trace-pulse',
    traceEntranceKey,
    descriptionEntranceKey,
    toolEntranceKey,
    fullTraceEntranceKey,
    showTopicsSource,
    showExpertsSource,
    animateSourceFades: !reducedMotion && phase === 'trace-tool',
    responseEntranceKey: phase === 'response' ? 1 : 0,
  };
}
