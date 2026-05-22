import { css, keyframes } from '@emotion/react';
import { genieVar } from '../theme/genieSun';

const TIMELINE_LINE_COLOR = '#d8d8d8';
const DOT_PX = 12;

const dotPulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.55 },
});

/** Du Bois .animation/Dot Pulsing — Figma 2006:5955 */
export function AnimationDotPulsing({ pulsing = true }: { pulsing?: boolean }) {
  return (
    <span
      css={css({
        position: 'relative',
        zIndex: 1,
        display: 'block',
        width: DOT_PX,
        height: DOT_PX,
        borderRadius: '50%',
        border: `2px solid ${TIMELINE_LINE_COLOR}`,
        backgroundColor: genieVar.backgroundPrimary,
        boxSizing: 'border-box',
        flexShrink: 0,
        ...(pulsing
          ? {
              animation: `${dotPulse} 0.7s ease-in-out infinite`,
              '@media (prefers-reduced-motion: reduce)': {
                animation: 'none',
              },
            }
          : {}),
      })}
      data-name=".animation/Dot Pulsing"
      aria-hidden
    />
  );
}
