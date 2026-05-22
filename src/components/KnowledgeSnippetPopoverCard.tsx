import { css } from '@emotion/react';
import { Button, ThumbsDownIcon, ThumbsUpIcon, useDesignSystemTheme } from '@databricks/design-system';
import type { ThemeType } from '@databricks/design-system';
import type { CSSProperties } from 'react';
import { AiGradientLightbulbIcon } from './AiGradientIcon';
import { genieVar } from '../theme/genieSun';
import { KnowledgeSnippetTag } from './KnowledgeSnippetTag';
import { SnippetSourceMetadataRow } from './SnippetSourceMetadataRow';
import type { SnippetPopoverConfig } from './snippetPopoverConfig';

const CARD_WIDTH_PX = 320;
const HEADER_ICON_PX = 14;
const FEEDBACK_ICON_PX = 16;

/** Figma `ai-gradient-100` — 1px gradient border via padding shell. */
function snippetPopoverGradientShell() {
  return css({
    width: CARD_WIDTH_PX,
    padding: 1,
    borderRadius: 'var(--genie-radius-lg)',
    background: genieVar.fillAiGradient100,
    boxSizing: 'border-box',
  });
}

function snippetPopoverInner(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    alignItems: 'flex-start',
    width: '100%',
    padding: theme.spacing.md,
    borderRadius: 11,
    backgroundColor: genieVar.backgroundPrimary,
    boxShadow: genieVar.shadowMd,
    overflow: 'hidden',
    boxSizing: 'border-box',
    color: theme.colors.textPrimary,
  });
}

function metadataHeader(theme: ThemeType) {
  return css({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    width: '100%',
    minWidth: 0,
    flexWrap: 'wrap',
  });
}

function snippetLabelGroup() {
  return css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  });
}

function snippetEyebrow() {
  return css({
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 400,
    color: genieVar.textSecondary,
    whiteSpace: 'nowrap',
  });
}

function metadataSeparator() {
  return css({
    fontSize: 12,
    lineHeight: '16px',
    color: genieVar.textSecondary,
    flexShrink: 0,
  });
}

function bodySection(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    alignItems: 'flex-start',
    width: '100%',
  });
}

function snippetDefinition() {
  return css({
    margin: 0,
    width: '100%',
    fontSize: 15,
    lineHeight: '22px',
    fontWeight: 600,
    color: genieVar.textPrimary,
    wordBreak: 'break-word',
  });
}

function sourceSection(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
    alignItems: 'flex-start',
    width: '100%',
    paddingTop: theme.spacing.sm,
    boxSizing: 'border-box',
  });
}

function sourceLabel() {
  return css({
    margin: 0,
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 600,
    color: genieVar.textSecondary,
  });
}

function feedbackIconStyle(theme: ThemeType): CSSProperties {
  return { fontSize: FEEDBACK_ICON_PX, color: theme.colors.textSecondary };
}

function feedbackButtonStyles(theme: ThemeType) {
  return css({
    width: 24,
    height: 24,
    minWidth: 24,
    padding: '0 4px',
    color: `${theme.colors.textSecondary} !important`,
    '& > .anticon': { color: `${theme.colors.textSecondary} !important` },
    '&:hover, &:hover > .anticon': {
      color: `${theme.colors.actionDefaultIconHover} !important`,
    },
    '&:active, &:active > .anticon': {
      color: `${theme.colors.actionDefaultIconPress} !important`,
    },
  });
}

/**
 * Figma Snippet Popover `8450:14345` — hover context card for snippet pills and menus.
 * @see https://www.figma.com/design/st5IOjhahvmvXyDbjvMpHB/?node-id=8450-14345
 */
export function KnowledgeSnippetPopoverCard({
  config,
  onViewFullSnippet,
}: {
  config: SnippetPopoverConfig;
  onViewFullSnippet?: () => void;
}) {
  const { theme, getPrefixedClassName } = useDesignSystemTheme();
  const btnClass = getPrefixedClassName('btn');
  const definitionText = config.description?.trim() || config.cardTitle;

  return (
    <div
      css={snippetPopoverGradientShell()}
      data-name="Snippet Popover"
      role="dialog"
      aria-label={config.cardAriaLabel}
    >
      <div css={snippetPopoverInner(theme)}>
      <div css={metadataHeader(theme)} data-name="Metadata">
        <span css={snippetLabelGroup()} data-name="label">
          <AiGradientLightbulbIcon size={HEADER_ICON_PX} />
          <span css={snippetEyebrow()}>Snippet</span>
        </span>
        <span css={metadataSeparator()} aria-hidden>
          •
        </span>
        <KnowledgeSnippetTag
          label={config.tagLabel}
          color={config.tagColor}
          tooltip={config.tagTooltip}
        />
      </div>

      <div css={bodySection(theme)} data-name="Title">
        <p css={snippetDefinition()}>{definitionText}</p>

        <div css={sourceSection(theme)} data-name="Metadata">
          <span css={sourceLabel()}>Source</span>
          <SnippetSourceMetadataRow
            sourceName={config.sourceName}
            sourceAuthor={config.sourceAuthor}
            showLeadingIcon={false}
            iconStyle={feedbackIconStyle(theme)}
          />
        </div>
      </div>

      <div
        css={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        })}
        data-name="Action Bar"
      >
        <Button type="tertiary" size="small" onClick={onViewFullSnippet}>
          {config.viewSnippetLabel ?? 'View full snippet'}
        </Button>
        <div
          css={css({
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.xs,
            [`& .${btnClass}`]: { color: `${theme.colors.textSecondary} !important` },
          })}
          data-name="thumbs up/down"
        >
          <Button
            type="tertiary"
            size="small"
            icon={<ThumbsUpIcon style={feedbackIconStyle(theme)} />}
            aria-label="Helpful"
            css={feedbackButtonStyles(theme)}
          />
          <Button
            type="tertiary"
            size="small"
            icon={<ThumbsDownIcon style={feedbackIconStyle(theme)} />}
            aria-label="Not helpful"
            css={feedbackButtonStyles(theme)}
          />
        </div>
      </div>
      </div>
    </div>
  );
}
