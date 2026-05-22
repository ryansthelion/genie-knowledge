import { Icon } from '@databricks/design-system';
import type { CSSProperties, SVGProps } from 'react';

/** Figma Indicator `9866:45422` — four ascending bars (no chart axis). */
function SvgSnippetPopularIndicatorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M2.5 11.25h1.5v3.25H2.5zM5.75 7h1.5v8H5.75zM9.25 5.5h1.5v9.5H9.25zM12.75 3h1.5v12H12.75z"
      />
    </svg>
  );
}

export type SnippetPopularIndicatorIconProps = {
  size?: number;
  color?: string;
  style?: CSSProperties;
  'aria-hidden'?: boolean;
};

/**
 * Popularity / signal indicator beside dashboard source names.
 * @see https://www.figma.com/design/st5IOjhahvmvXyDbjvMpHB/?node-id=9866-45422
 */
export function SnippetPopularIndicatorIcon({
  size = 16,
  color,
  style,
  'aria-hidden': ariaHidden = true,
}: SnippetPopularIndicatorIconProps) {
  return (
    <Icon
      component={SvgSnippetPopularIndicatorIcon}
      aria-hidden={ariaHidden}
      style={{ fontSize: size, color, flexShrink: 0, lineHeight: 0, ...style }}
    />
  );
}
