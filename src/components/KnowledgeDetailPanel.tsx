import { css } from '@emotion/react';
import {
  Button,
  CloseIcon,
  DashboardIcon,
  Tag,
  Typography,
  useDesignSystemTheme,
} from '@databricks/design-system';
import type { ThemeType } from '@databricks/design-system';
import type { CSSProperties } from 'react';
import type { KnowledgeContextConfig, KnowledgeVerifiedUser } from './knowledgeContextConfig';
import { LineageVisualizer } from './LineageVisualizer';
import { genieVar } from '../theme/genieSun';

/** Figma Panel `8679:6155` width. */
export const KNOWLEDGE_DETAIL_PANEL_WIDTH_PX = 400;

/** Inset from viewport right / bottom (Figma spacing-mid = 12px). */
export const KNOWLEDGE_DETAIL_PANEL_INSET_PX = 12;

/** @deprecated Use KNOWLEDGE_DETAIL_PANEL_WIDTH_PX */
export const SELL_THROUGH_DETAIL_PANEL_WIDTH_PX = KNOWLEDGE_DETAIL_PANEL_WIDTH_PX;

/** @deprecated Use KNOWLEDGE_DETAIL_PANEL_INSET_PX */
export const SELL_THROUGH_DETAIL_PANEL_INSET_PX = KNOWLEDGE_DETAIL_PANEL_INSET_PX;

const ICON_PX = 16;

function tertiaryIconStyle(theme: ThemeType): CSSProperties {
  return { fontSize: ICON_PX, color: theme.colors.textSecondary };
}

function tertiaryIconButtonStyles(theme: ThemeType) {
  return css({
    width: 24,
    height: 24,
    minWidth: 24,
    padding: '0 4px',
    color: `${theme.colors.textSecondary} !important`,
    '& > .anticon': {
      color: `${theme.colors.textSecondary} !important`,
    },
    '&:hover, &:hover > .anticon': {
      color: `${theme.colors.actionDefaultIconHover} !important`,
    },
    '&:active, &:active > .anticon': {
      color: `${theme.colors.actionDefaultIconPress} !important`,
    },
  });
}

function panelRoot() {
  return css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: KNOWLEDGE_DETAIL_PANEL_WIDTH_PX,
    height: '100%',
    minHeight: 0,
    backgroundColor: genieVar.backgroundPrimary,
    border: `1px solid ${genieVar.border}`,
    borderRadius: genieVar.radiusLg,
    boxShadow: genieVar.shadowMd,
    overflow: 'hidden',
  });
}

function panelScroll(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    minHeight: 0,
    overflowY: 'auto',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  });
}

function metadataLabel() {
  return css({
    width: 120,
    flexShrink: 0,
    fontSize: 12,
    lineHeight: '16px',
    color: genieVar.textSecondary,
  });
}

function metadataRow() {
  return css({
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    gap: 0,
  });
}

function contextAvatar(bg: string) {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 'var(--genie-radius-full)',
    backgroundColor: bg,
    flexShrink: 0,
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1,
    color: '#fff',
  });
}

function hugTagStyles() {
  return css({
    alignSelf: 'flex-start',
    width: 'fit-content',
    maxWidth: '100%',
    marginRight: 0,
    borderRadius: 'var(--genie-radius-action)',
    height: 20,
    '& > div': { borderRadius: 'inherit', height: '100%' },
    '& > div > div': { borderRadius: 'inherit' },
  });
}

function MetadataSection({ theme, config }: { theme: ThemeType; config: KnowledgeContextConfig }) {
  const { metadata } = config;

  return (
    <div css={css({ display: 'flex', flexDirection: 'column', gap: 'var(--genie-spacing-mid)', width: '100%' })}>
      <div css={[metadataRow(), css({ alignItems: 'center' })]}>
        <span css={metadataLabel()}>Source</span>
        <Tag color="default" icon={<DashboardIcon style={{ fontSize: 12 }} />} css={hugTagStyles()}>
          {metadata.source}
        </Tag>
      </div>

      <div css={metadataRow()}>
        <span css={metadataLabel()}>Tags</span>
        <div
          css={css({
            display: 'flex',
            flex: '1 1 auto',
            flexWrap: 'wrap',
            gap: theme.spacing.xs,
            alignItems: 'center',
            minWidth: 0,
          })}
        >
          {metadata.tags.map((tag) => (
            <Tag key={tag.label} color={tag.color} css={hugTagStyles()}>
              {tag.label}
            </Tag>
          ))}
        </div>
      </div>

      <div css={metadataRow()}>
        <span css={metadataLabel()}>Verified by</span>
        <div css={css({ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm })}>
          {metadata.verifiedUsers.map((user) => (
            <VerifiedUserRow key={user.name} user={user} />
          ))}
          {metadata.moreVerifiedCount > 0 ? (
            <Typography.Link style={{ fontSize: 12, lineHeight: '16px' }}>
              +{metadata.moreVerifiedCount} more
            </Typography.Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function VerifiedUserRow({ user }: { user: KnowledgeVerifiedUser }) {
  return (
    <div css={css({ display: 'flex', alignItems: 'center', gap: 4 })}>
      <span css={contextAvatar(user.bg)}>{user.initial}</span>
      <Typography.Text style={{ fontSize: 13, lineHeight: '20px', marginBottom: 0 }}>{user.name}</Typography.Text>
    </div>
  );
}

export type KnowledgeDetailPanelProps = {
  config: KnowledgeContextConfig;
  onClose: () => void;
};

/** Figma Panel `8679:6155` — knowledge detail with lineage visualizer. */
export function KnowledgeDetailPanel({ config, onClose }: KnowledgeDetailPanelProps) {
  const { theme } = useDesignSystemTheme();

  return (
    <aside css={panelRoot()} data-name="Panel" aria-label={config.panelAriaLabel}>
      <div css={panelScroll(theme)}>
        <div
          css={css({
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: '100%',
            flexShrink: 0,
          })}
        >
          <Typography.Text
            strong
            style={{
              marginBottom: 0,
              fontSize: 15,
              lineHeight: '22px',
              color: genieVar.textPrimary,
            }}
          >
            {config.panelTitle}
          </Typography.Text>
          <Button
            type="tertiary"
            size="small"
            icon={<CloseIcon style={tertiaryIconStyle(theme)} />}
            aria-label="Close panel"
            css={tertiaryIconButtonStyles(theme)}
            onClick={onClose}
          />
        </div>

        <div css={css({ display: 'flex', flexDirection: 'column', gap: theme.spacing.md, width: '100%' })}>
          <div css={css({ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm, width: '100%' })}>
            <Typography.Hint style={{ marginBottom: 0 }}>Description</Typography.Hint>
            <Typography.Paragraph
              style={{
                marginBottom: 0,
                fontSize: 13,
                lineHeight: '20px',
                color: genieVar.textPrimary,
              }}
            >
              {config.description}
            </Typography.Paragraph>
            <Tag color={config.tagColor} css={hugTagStyles()}>
              {config.tagLabel}
            </Tag>
          </div>

          <div css={css({ height: 1, width: '100%', backgroundColor: genieVar.border })} aria-hidden />

          <MetadataSection theme={theme} config={config} />
        </div>

        <LineageVisualizer variant={config.lineageVariant} />
      </div>
    </aside>
  );
}
