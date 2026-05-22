/**
 * Genie ☀️ (light) — design tokens from the Genie Unified Components file, which consumes
 * the **🧰 Du Bois Design System** Figma library (semantic colors, spacing, radii, Genie text styles).
 *
 * Figma: https://www.figma.com/design/st5IOjhahvmvXyDbjvMpHB/
 * Runtime UI: `@databricks/design-system` + `useDesignSystemTheme()` (Du Bois implementation).
 * Surfaces in this app that must match Figma exactly use CSS vars from `./genieSun.css` (`--genie-*`).
 */
export const GENIE_SUN_THEME = 'genie-sun' as const;

export const GENIE_FIGMA = {
  fileKey: 'st5IOjhahvmvXyDbjvMpHB',
  fileName: 'Genie — Unified Components',
  duBoisLibraryName: '🧰 Du Bois Design System',
} as const;

/** Apply to the React shell (see `main.tsx`) so `genieSun.css` variables apply to the tree. */
export const genieSunRootAttributes = {
  'data-theme': GENIE_SUN_THEME,
  'data-genie-figma-file': GENIE_FIGMA.fileKey,
} as const;

/** CSS `var(--genie-*)` references — aligned to Figma variable defs on the Genie canvas. */
export const genieVar = {
  textPrimary: 'var(--genie-color-text-primary)',
  textSecondary: 'var(--genie-color-text-secondary)',
  /** Figma `Background/backgroundPrimary`. */
  backgroundPrimary: 'var(--genie-color-background-primary)',
  bgPrimary: 'var(--genie-color-background-primary)',
  bgSecondary: 'var(--genie-color-background-secondary)',
  border: 'var(--genie-color-border)',
  actionDefaultBgDefault: 'var(--genie-color-action-default-background-default)',
  actionDefaultBgHover: 'var(--genie-color-action-default-background-hover)',
  shadowMd: 'var(--genie-shadow-md)',
  radiusLg: 'var(--genie-radius-lg)',
  /** Figma DuBois Patterns: Gen AI — `ai-gradient-100` (dotted underline). */
  fillAiGradient100: 'var(--genie-fill-ai-gradient-100)',
  /** Figma `Primary/aiPrimaryBackgroundDefault` — hover highlight on AI-linked terms. */
  primaryAiBackgroundDefault: 'var(--genie-color-primary-ai-background-default)',
} as const;
