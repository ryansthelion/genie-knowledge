import { LightbulbIcon } from '@databricks/design-system';
import type { ComponentType, CSSProperties } from 'react';

type IconComponent = ComponentType<{
  color?: 'ai';
  style?: CSSProperties;
  'aria-hidden'?: boolean;
}>;

export type AiGradientIconProps = {
  icon: IconComponent;
  size?: number;
  'aria-hidden'?: boolean;
};

/**
 * Figma Du Bois Patterns: Gen AI — `ai-gradient-100`.
 * Uses Du Bois `color="ai"` (SVG gradient from `theme.colors.branded.ai`).
 */
export function AiGradientIcon({ icon: Icon, size = 14, 'aria-hidden': ariaHidden }: AiGradientIconProps) {
  return <Icon color="ai" style={{ fontSize: size, flexShrink: 0, lineHeight: 0 }} aria-hidden={ariaHidden} />;
}

/** Snippet Source pill `3432:6834` — lightbulb with `ai-gradient-100`. */
export function AiGradientLightbulbIcon({
  size = 14,
  'aria-hidden': ariaHidden = true,
}: {
  size?: number;
  'aria-hidden'?: boolean;
}) {
  return <AiGradientIcon icon={LightbulbIcon} size={size} aria-hidden={ariaHidden} />;
}
