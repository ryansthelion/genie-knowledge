import { css, keyframes } from '@emotion/react';
import { MULTISTEPS_ENTER_DURATION_MS } from './thinkingAnimationTiming';

const ENTER_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
const ENTER_FROM_BELOW_DURATION = '0.45s';
const ENTER_FROM_BELOW_OFFSET = '80px';
const ENTER_FADE_IN_DURATION = '0.25s';

function createEnterFromBelowKeyframes(offset: string) {
  return keyframes({
    '0%': {
      opacity: 0,
      transform: `translateY(${offset})`,
    },
    '100%': {
      opacity: 1,
      transform: 'none',
    },
  });
}

const enterFromBelowKeyframes = createEnterFromBelowKeyframes(ENTER_FROM_BELOW_OFFSET);
const multistepsEnterFromBelowKeyframes = createEnterFromBelowKeyframes('80px');

const enterFadeInKeyframes = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

/** Figma Animation 1 enter-from-below — user bubble, response block. */
export function enterFromBelow(overrides?: { duration?: string; offset?: string }) {
  const duration = overrides?.duration ?? ENTER_FROM_BELOW_DURATION;
  const offset = overrides?.offset ?? ENTER_FROM_BELOW_OFFSET;
  const frames =
    offset === ENTER_FROM_BELOW_OFFSET && duration === ENTER_FROM_BELOW_DURATION
      ? enterFromBelowKeyframes
      : createEnterFromBelowKeyframes(offset);

  return css({
    opacity: 0,
    willChange: 'transform, opacity',
    animation: `${frames} ${duration} ${ENTER_EASING} forwards`,
    '@media (prefers-reduced-motion: reduce)': {
      opacity: 1,
      animation: 'none',
      transform: 'none',
    },
  });
}

/** Multisteps enter-from-below — duration synced with thinkingAnimationTiming.ts */
export function enterFromBelowMultisteps(delayMs = 0) {
  const durationSec = `${MULTISTEPS_ENTER_DURATION_MS / 1000}s`;

  return css({
    opacity: 0,
    willChange: 'transform, opacity',
    animation: `${multistepsEnterFromBelowKeyframes} ${durationSec} ${ENTER_EASING} forwards`,
    animationDelay: delayMs > 0 ? `${delayMs}ms` : undefined,
    '@media (prefers-reduced-motion: reduce)': {
      opacity: 1,
      animation: 'none',
      transform: 'none',
      animationDelay: undefined,
    },
  });
}

/** Lighter entrance for nested trace elements. */
export function enterFadeIn() {
  return css({
    opacity: 0,
    animation: `${enterFadeInKeyframes} ${ENTER_FADE_IN_DURATION} ${ENTER_EASING} forwards`,
    '@media (prefers-reduced-motion: reduce)': {
      opacity: 1,
      animation: 'none',
    },
  });
}

export const ENTER_ANIMATION_MS = {
  fromBelow: 450,
  multisteps: MULTISTEPS_ENTER_DURATION_MS,
  fadeIn: 250,
} as const;
