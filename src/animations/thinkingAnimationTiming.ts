/** Ported from genie-thinking-animation/src/timing.ts */

export const BUBBLE_ENTRANCE_MS = 450;
export const GENIE_AFTER_BUBBLE_MS = 200;

export const ENTER_FADE_IN_MS = 250;

export const THINKING_DRAWER_TO_MULTISTEPS_DELAY_MS = 20;

export const THINKING_DRAWER_SETTLE_MS = ENTER_FADE_IN_MS + 100 + ENTER_FADE_IN_MS;

/** Matches `enterFromBelowMultisteps` duration — keep in sync with enterFromBelow.ts */
export const MULTISTEPS_ENTER_DURATION_MS = 450;

/** Pause after each multistep entrance finishes before the next trace phase. */
export const MULTISTEPS_PHASE_HOLD_MS = 700;

/** Stagger nested trace entrances (description → tool call) within a phase. */
export const MULTISTEPS_ENTRANCE_STAGGER_MS = {
  description: 120,
  toolCall: 240,
} as const;

/** Gap between Topics and Experts source pill fade-ins during `trace-tool`. */
export const TOPICS_TO_EXPERTS_SOURCE_DELAY_MS = 400;

const TRACE_STEP_PHASE_MS = MULTISTEPS_ENTER_DURATION_MS + MULTISTEPS_PHASE_HOLD_MS;

export const AUTO_ADVANCE_MS = 2000;

export const PHASE_ADVANCE_MS = {
  'thinking-header':
    THINKING_DRAWER_SETTLE_MS + THINKING_DRAWER_TO_MULTISTEPS_DELAY_MS + 300,
  'trace-pulse': TRACE_STEP_PHASE_MS,
  'trace-title': TRACE_STEP_PHASE_MS + MULTISTEPS_ENTRANCE_STAGGER_MS.description,
  'trace-description': TRACE_STEP_PHASE_MS + MULTISTEPS_ENTRANCE_STAGGER_MS.toolCall,
  'trace-tool': 5000,
  'thought-complete': 1200,
} as const;

export const THINKING_TRACE_PHASES = [
  'thinking-header',
  'trace-pulse',
  'trace-title',
  'trace-description',
  'trace-tool',
] as const;

export type KnowledgeSnippetsV2Phase =
  | 'user-only'
  | 'thinking-header'
  | 'trace-pulse'
  | 'trace-title'
  | 'trace-description'
  | 'trace-tool'
  | 'thought-complete'
  | 'response';

export const KNOWLEDGE_SNIPPETS_V2_PHASES: KnowledgeSnippetsV2Phase[] = [
  'user-only',
  'thinking-header',
  'trace-pulse',
  'trace-title',
  'trace-description',
  'trace-tool',
  'thought-complete',
  'response',
];

export function getPhaseAdvanceMs(phase: KnowledgeSnippetsV2Phase): number {
  return phase in PHASE_ADVANCE_MS
    ? PHASE_ADVANCE_MS[phase as keyof typeof PHASE_ADVANCE_MS]
    : AUTO_ADVANCE_MS;
}
