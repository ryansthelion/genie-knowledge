import { css } from '@emotion/react';
import {
  Button,
  ChevronLeftIcon,
  CloseIcon,
  GlobeIcon,
  LightbulbIcon,
  OverflowIcon,
  StarFillIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Typography,
  UserCircleIcon,
  useDesignSystemTheme,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@databricks/design-system';
import type { ThemeType } from '@databricks/design-system';
import { useState, type CSSProperties, type ReactNode } from 'react';
import { AiGradientIcon, AiGradientLightbulbIcon } from './AiGradientIcon';
import { KnowledgeSnippetTag } from './KnowledgeSnippetTag';
import type { KnowledgeTagColor } from './knowledgeContextConfig';
import { genieVar } from '../theme/genieSun';

const ICON_PX = 16;

export function panelRoot() {
  return css({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    minHeight: 0,
    backgroundColor: genieVar.backgroundPrimary,
    border: `1px solid ${genieVar.border}`,
    borderRadius: genieVar.radiusLg,
    boxShadow: genieVar.shadowMd,
    overflow: 'hidden',
  });
}

export function panelHeader(theme: ThemeType) {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    width: '100%',
    padding: 'var(--genie-spacing-mid)',
    paddingLeft: theme.spacing.md,
    borderBottom: `1px solid ${genieVar.border}`,
  });
}

export function panelHeaderTitleRow() {
  return css({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
    flex: '1 1 auto',
  });
}

export function panelBody(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    minHeight: 0,
    overflow: 'hidden',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
  });
}

/** Figma Genie Graph bar `10538:10486` — 8px × 12px inset. */
export function genieGraphPanelHeader(theme: ThemeType) {
  return css({
    display: 'flex',
    flexShrink: 0,
    width: '100%',
    padding: '8px 12px',
    margin: 0,
    backgroundColor: genieVar.actionDefaultBgHover,
    borderBottom: `1px solid ${genieVar.border}`,
    boxSizing: 'border-box',
  });
}

export function genieGraphHeaderTitle() {
  return css({
    margin: 0,
    fontSize: 13,
    lineHeight: '20px',
    fontWeight: 400,
    color: genieVar.textSecondary,
    whiteSpace: 'nowrap',
    textAlign: 'center',
    justifySelf: 'center',
    gridColumn: 2,
  });
}

function genieGraphHeaderTopRow() {
  return css({
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    alignItems: 'center',
    width: '100%',
    height: 24,
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  });
}

export function panelSectionDividerWrap() {
  return css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
    padding: '8px 0',
    flexShrink: 0,
  });
}

export function panelSectionTitle() {
  return css({
    margin: 0,
    fontSize: 13,
    lineHeight: '20px',
    fontWeight: 600,
    color: genieVar.textPrimary,
  });
}

/**
 * Figma Avatar `10538:14617` — Size=sm (24px), Shape=Square (entity), Type=Icon.
 * Fill: Primary/aiPrimaryBackgroundDefault; icon stroke: ai-gradient-100; radius: border-radius-sm (4px).
 * @see https://www.figma.com/design/st5IOjhahvmvXyDbjvMpHB/?node-id=10538-14617
 */
export function panelTitleIconAvatarBox() {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 'var(--genie-radius-sm)',
    backgroundColor: genieVar.primaryAiBackgroundDefault,
    flexShrink: 0,
  });
}

export function PanelTitleIconAvatar({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <span css={panelTitleIconAvatarBox()} data-name="Avatar" role="img" aria-label={label}>
      {children}
    </span>
  );
}

export function domainPanelBody(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    minHeight: 0,
    overflow: 'hidden',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    position: 'relative',
  });
}

export function panelKeyValueRow() {
  return css({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    minHeight: 24,
  });
}

export function panelKeyLabel() {
  return css({
    width: 120,
    flexShrink: 0,
    margin: 0,
    fontSize: 13,
    lineHeight: '20px',
    fontWeight: 400,
    color: genieVar.textSecondary,
  });
}

export function panelKeyValue() {
  return css({
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    minWidth: 0,
    flex: '1 1 auto',
    fontSize: 13,
    lineHeight: '20px',
    color: genieVar.textPrimary,
  });
}

export function previewSection(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    flex: '1 1 auto',
    minHeight: 0,
    width: '100%',
  });
}

export function previewCanvasFrame() {
  return css({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    minHeight: 160,
    width: '100%',
    overflow: 'hidden',
  });
}

/** Figma `4. buttonIcon` — 24×24, no extra horizontal padding. */
function genieGraphHeaderIconButtonStyles(theme: ThemeType) {
  return css({
    width: 24,
    height: 24,
    minWidth: 24,
    padding: '0 !important',
    paddingInline: '0 !important',
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

export type GenieGraphPanelHeaderProps = {
  onClose: () => void;
  onBack?: () => void;
  onForward?: () => void;
};

/** Figma Panel header `10538:10486` — Genie Graph navigation bar. */
export function GenieGraphPanelHeader({ onClose, onBack, onForward }: GenieGraphPanelHeaderProps) {
  const { theme } = useDesignSystemTheme();
  const headerIconButton = genieGraphHeaderIconButtonStyles(theme);

  return (
    <header css={genieGraphPanelHeader(theme)} data-name="AssetDetail/Overview">
      <div css={genieGraphHeaderTopRow()} data-name="Top">
        <div css={css({ display: 'flex', alignItems: 'center', gap: 4, justifySelf: 'start' })} data-name="lhs">
          <Button
            type="tertiary"
            size="small"
            icon={<ArrowLeftIcon style={tertiaryIconStyle(theme)} />}
            aria-label="Back"
            css={headerIconButton}
            onClick={onBack}
            disabled={!onBack}
          />
          <Button
            type="tertiary"
            size="small"
            icon={<ArrowRightIcon style={tertiaryIconStyle(theme)} />}
            aria-label="Forward"
            css={headerIconButton}
            onClick={onForward}
            disabled={!onForward}
          />
        </div>
        <span css={genieGraphHeaderTitle()}>Genie Graph</span>
        <div css={css({ display: 'flex', alignItems: 'center', justifySelf: 'end' })} data-name="rhs">
          <Button
            type="tertiary"
            size="small"
            icon={<CloseIcon style={tertiaryIconStyle(theme)} />}
            aria-label="Close panel"
            css={headerIconButton}
            onClick={onClose}
          />
        </div>
      </div>
    </header>
  );
}

/** Figma Du Bois/Title 3 — SF Pro Display Semibold 18/24. */
export function duBoisTitle3() {
  return css({
    margin: 0,
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: 18,
    lineHeight: '24px',
    fontWeight: 600,
    letterSpacing: 0,
    color: genieVar.textPrimary,
    wordBreak: 'break-word',
  });
}

export type SnippetPanelTitleBlockProps = {
  /** Figma Title 3 headline — full snippet definition. */
  headline: string;
  tagLabel: string;
  tagColor: KnowledgeTagColor;
  tagTooltip?: string;
};

export type DomainPanelTitleBlockProps = {
  title: string;
};

const STAR_COLOR = '#e5891d';
const PROFILE_METADATA_ICON_PX = 14;

export function userProfileAvatar(bg: string) {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 'var(--genie-radius-full)',
    backgroundColor: bg,
    flexShrink: 0,
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1,
    color: '#fff',
  });
}

export type UserProfileTitleBlockProps = {
  name: string;
  initial: string;
  avatarBg: string;
  rating: number;
  email: string;
};

/** Figma user title `10528:9746` — circle avatar, Title 3 name, rating + email metadata. */
export function UserProfileTitleBlock({ name, initial, avatarBg, rating, email }: UserProfileTitleBlockProps) {
  const { theme } = useDesignSystemTheme();

  return (
    <div
      css={css({ display: 'flex', gap: theme.spacing.sm, alignItems: 'flex-start', width: '100%' })}
      data-name="Title"
    >
      <span css={userProfileAvatar(avatarBg)} data-name="Avatar" aria-hidden>
        {initial}
      </span>
      <div css={css({ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 auto', minWidth: 0 })}>
        <p css={duBoisTitle3()}>{name}</p>
        <div
          css={css({
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 4,
            minHeight: 24,
            width: '100%',
          })}
          data-name="Metadata"
        >
          <span css={css({ display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0 })}>
            <span
              css={css({
                fontSize: 12,
                lineHeight: '16px',
                color: genieVar.textSecondary,
              })}
            >
              {rating.toFixed(1)}
            </span>
            <StarFillIcon
              style={{ fontSize: PROFILE_METADATA_ICON_PX, color: STAR_COLOR, flexShrink: 0, lineHeight: 0 }}
              aria-hidden
            />
          </span>
          <span css={css({ fontSize: 12, lineHeight: '16px', color: genieVar.textSecondary })} aria-hidden>
            •
          </span>
          <span css={css({ display: 'inline-flex', alignItems: 'center', gap: 4, minWidth: 0 })} data-name="label">
            <UserCircleIcon
              style={{
                fontSize: PROFILE_METADATA_ICON_PX,
                color: theme.colors.textSecondary,
                flexShrink: 0,
                lineHeight: 0,
              }}
              aria-hidden
            />
            <span
              css={css({
                fontSize: 12,
                lineHeight: '16px',
                color: genieVar.textSecondary,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              })}
            >
              {email}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

/** Figma topic title `10528:9719` — gradient globe avatar + 18px title + Topic label. */
export function DomainPanelTitleBlock({ title }: DomainPanelTitleBlockProps) {
  const { theme } = useDesignSystemTheme();

  return (
    <div
      css={css({ display: 'flex', gap: theme.spacing.sm, alignItems: 'flex-start', width: '100%' })}
      data-name="Title"
    >
      <PanelTitleIconAvatar label={title}>
        <AiGradientIcon icon={GlobeIcon} size={14} aria-hidden />
      </PanelTitleIconAvatar>
      <div css={css({ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 auto', minWidth: 0 })}>
        <Typography.Text
          strong
          style={{
            marginBottom: 0,
            fontSize: 18,
            lineHeight: '24px',
            color: genieVar.textPrimary,
            wordBreak: 'break-word',
          }}
        >
          {title}
        </Typography.Text>
        <span
          css={css({
            fontSize: 12,
            lineHeight: '16px',
            color: genieVar.textSecondary,
          })}
        >
          Topic
        </span>
      </div>
    </div>
  );
}

export type DomainPanelPillTab = {
  id: string;
  label: string;
};

function pillTabStyles(theme: ThemeType, selected: boolean) {
  return css({
    display: 'inline-flex',
    alignItems: 'center',
    height: 24,
    padding: `0 ${theme.spacing.sm}px`,
    margin: 0,
    border: `1px solid ${selected ? '#cbcbcb' : genieVar.border}`,
    borderRadius: 24,
    backgroundColor: selected ? theme.colors.actionDefaultBackgroundPress : genieVar.actionDefaultBgDefault,
    cursor: 'pointer',
    font: 'inherit',
    fontSize: 13,
    lineHeight: '20px',
    fontWeight: 400,
    color: genieVar.textPrimary,
    whiteSpace: 'nowrap',
    flexShrink: 0,
    transition: 'background-color 0.12s ease-out, border-color 0.12s ease-out',
    '&:hover': {
      backgroundColor: genieVar.actionDefaultBgHover,
      borderColor: '#cbcbcb',
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.actionPrimaryBackgroundPress}`,
      outlineOffset: 2,
    },
  });
}

/** Figma PillControl `10405:6444`. */
export function DomainPanelPillTabs<T extends string>({
  tabs,
  activeTabId,
  onTabChange,
}: {
  tabs: readonly { id: T; label: string }[];
  activeTabId: T;
  onTabChange: (tabId: T) => void;
}) {
  const { theme } = useDesignSystemTheme();

  return (
    <div css={css({ display: 'flex', gap: 8, flexWrap: 'wrap', width: '100%' })} data-name="PillControl">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          css={pillTabStyles(theme, tab.id === activeTabId)}
          aria-pressed={tab.id === activeTabId}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/** Figma title block `10528:9592` — avatar, Title 3 headline, snippet metadata + feedback. */
export function SnippetPanelTitleBlock({ headline, tagLabel, tagColor, tagTooltip }: SnippetPanelTitleBlockProps) {
  return (
    <div
      css={css({ display: 'flex', gap: 8, alignItems: 'flex-start', width: '100%' })}
      data-name="Title"
    >
      <PanelTitleIconAvatar label="Snippet">
        <AiGradientLightbulbIcon size={14} />
      </PanelTitleIconAvatar>
      <div css={css({ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 auto', minWidth: 0 })}>
        <p css={duBoisTitle3()}>{headline}</p>
        <div
          css={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            minHeight: 24,
          })}
          data-name="Metadata"
        >
          <div css={css({ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 })} data-name="lhs">
            <span
              css={css({
                fontSize: 12,
                lineHeight: '16px',
                color: genieVar.textSecondary,
                whiteSpace: 'nowrap',
              })}
            >
              Snippet
            </span>
            <span css={css({ fontSize: 12, lineHeight: '16px', color: genieVar.textSecondary })} aria-hidden>
              •
            </span>
            <KnowledgeSnippetTag label={tagLabel} color={tagColor} tooltip={tagTooltip} />
          </div>
          <PanelFeedbackActions />
        </div>
      </div>
    </div>
  );
}

/** Figma AssetDetail/Overview `9889:47284`. */
export function snippetPanelOverviewHeader(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    flexShrink: 0,
    width: '100%',
    padding: theme.spacing.md,
    borderBottom: `1px solid ${genieVar.border}`,
  });
}

export function PanelFeedbackActions() {
  const { theme } = useDesignSystemTheme();

  return (
    <div css={css({ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 })}>
      <Button
        type="tertiary"
        size="small"
        icon={<ThumbsUpIcon style={tertiaryIconStyle(theme)} />}
        aria-label="Helpful"
        css={tertiaryIconButtonStyles(theme)}
      />
      <Button
        type="tertiary"
        size="small"
        icon={<ThumbsDownIcon style={tertiaryIconStyle(theme)} />}
        aria-label="Not helpful"
        css={tertiaryIconButtonStyles(theme)}
      />
    </div>
  );
}

export type SnippetPanelOverviewHeaderProps = {
  title: string;
  onClose: () => void;
};

/** Figma Knowledge Snippet panel header `9889:47284`–`9889:47296`. */
export function SnippetPanelOverviewHeader({ title, onClose }: SnippetPanelOverviewHeaderProps) {
  const { theme } = useDesignSystemTheme();

  return (
    <header css={snippetPanelOverviewHeader(theme)} data-name="AssetDetail/Overview">
      <div
        css={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        })}
        data-name="Top"
      >
        <div css={css({ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 })}>
          <LightbulbIcon
            style={{ fontSize: 14, color: genieVar.textSecondary, flexShrink: 0, lineHeight: 0 }}
            aria-hidden
          />
          <Typography.Text
            style={{
              marginBottom: 0,
              fontSize: 13,
              lineHeight: '20px',
              color: genieVar.textSecondary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            Knowledge Snippet
          </Typography.Text>
        </div>
        <div css={css({ display: 'flex', alignItems: 'center', gap: 4 })} data-name="rhs">
          <PanelFeedbackActions />
          <Button
            type="tertiary"
            size="small"
            icon={<CloseIcon style={tertiaryIconStyle(theme)} />}
            aria-label="Close panel"
            css={tertiaryIconButtonStyles(theme)}
            onClick={onClose}
          />
        </div>
      </div>
      <Typography.Text
        strong
        style={{
          marginBottom: 0,
          fontSize: 18,
          lineHeight: '24px',
          color: genieVar.textPrimary,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%',
        }}
      >
        {title}
      </Typography.Text>
    </header>
  );
}

export type DomainPanelOverviewHeaderProps = {
  title: string;
  entityAvatarBg: string;
  entityIcon: ReactNode;
  onBack: () => void;
  onClose: () => void;
};

/** Figma Domain Panel header `9889:47228` — Back, overflow, close, entity avatar + title. */
export function DomainPanelOverviewHeader({
  title,
  entityAvatarBg,
  entityIcon,
  onBack,
  onClose,
}: DomainPanelOverviewHeaderProps) {
  const { theme } = useDesignSystemTheme();

  return (
    <header css={snippetPanelOverviewHeader(theme)} data-name="AssetDetail/Overview">
      <div
        css={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        })}
        data-name="Top"
      >
        <button
          type="button"
          onClick={onBack}
          css={css({
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            margin: 0,
            padding: 0,
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            font: 'inherit',
            color: theme.colors.actionLinkDefault,
            fontSize: 13,
            lineHeight: '20px',
            '&:hover': { textDecoration: 'underline' },
            '&:focus-visible': {
              outline: `2px solid ${theme.colors.actionPrimaryBackgroundPress}`,
              outlineOffset: 2,
            },
          })}
        >
          <ChevronLeftIcon style={{ fontSize: 14, flexShrink: 0, lineHeight: 0 }} aria-hidden />
          Back
        </button>
        <div css={css({ display: 'flex', alignItems: 'center', gap: 5 })} data-name="Actions">
          <Button
            type="tertiary"
            size="small"
            icon={<OverflowIcon style={tertiaryIconStyle(theme)} />}
            aria-label="More actions"
            css={tertiaryIconButtonStyles(theme)}
          />
          <Button
            type="tertiary"
            size="small"
            icon={<CloseIcon style={tertiaryIconStyle(theme)} />}
            aria-label="Close panel"
            css={tertiaryIconButtonStyles(theme)}
            onClick={onClose}
          />
        </div>
      </div>
      <div
        css={css({
          display: 'flex',
          alignItems: 'center',
          gap: theme.spacing.sm,
          width: '100%',
          minWidth: 0,
        })}
        data-name="Bottom"
      >
        <span css={entityAvatarBox(entityAvatarBg)}>{entityIcon}</span>
        <Typography.Text
          strong
          style={{
            marginBottom: 0,
            fontSize: 18,
            lineHeight: '24px',
            color: genieVar.textPrimary,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flex: '1 1 auto',
            minWidth: 0,
          }}
        >
          {title}
        </Typography.Text>
      </div>
    </header>
  );
}

export function panelDivider() {
  return css({
    height: 1,
    width: '100%',
    backgroundColor: genieVar.border,
    flexShrink: 0,
  });
}

export function tertiaryIconStyle(theme: ThemeType): CSSProperties {
  return { fontSize: ICON_PX, color: theme.colors.textSecondary };
}

export function tertiaryIconButtonStyles(theme: ThemeType) {
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

/** Figma entity square avatar — sm (24px), border-radius-sm; solid entity fill + white icon. */
export function entityAvatarBox(bg: string) {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 'var(--genie-radius-sm)',
    backgroundColor: bg,
    flexShrink: 0,
    color: '#fff',
  });
}

export function metadataLabel() {
  return css({
    width: 120,
    flexShrink: 0,
    fontSize: 12,
    lineHeight: '16px',
    color: genieVar.textSecondary,
  });
}

export function metadataRow() {
  return css({
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
  });
}

export function verifiedAvatar(bg: string) {
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

type PanelChipInteraction = 'default' | 'hover' | 'press';

function panelAuthorChipStyles(theme: ThemeType, interaction: PanelChipInteraction) {
  const backgroundColor =
    interaction === 'press'
      ? theme.colors.actionDefaultBackgroundPress
      : interaction === 'hover'
        ? genieVar.actionDefaultBgHover
        : 'transparent';

  return css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    margin: 0,
    padding: 2,
    border: 'none',
    borderRadius: 'var(--genie-radius-sm)',
    backgroundColor,
    cursor: 'pointer',
    font: 'inherit',
    color: 'inherit',
    minWidth: 0,
    maxWidth: '100%',
    boxSizing: 'border-box',
    transition: 'background-color 0.12s ease-out',
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.actionPrimaryBackgroundPress}`,
      outlineOffset: 2,
    },
  });
}

export type PanelAuthorChipProps = {
  name: string;
  initial: string;
  avatarBg: string;
  onClick?: () => void;
};

/** Interactive author avatar + name — panel Source Author row. */
export function PanelAuthorChip({ name, initial, avatarBg, onClick }: PanelAuthorChipProps) {
  const { theme } = useDesignSystemTheme();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const interaction: PanelChipInteraction = pressed ? 'press' : hovered ? 'hover' : 'default';

  return (
    <button
      type="button"
      css={panelAuthorChipStyles(theme, interaction)}
      data-name="Author"
      aria-label={`View profile for ${name}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <span css={verifiedAvatar(avatarBg)} aria-hidden>
        {initial}
      </span>
      <span
        css={css({
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontSize: 13,
          lineHeight: '20px',
          color: genieVar.textPrimary,
        })}
      >
        {name}
      </span>
    </button>
  );
}

export type PanelChromeHeaderProps = {
  title: ReactNode;
  leading?: ReactNode;
  onClose: () => void;
  /** Navigates back (e.g. domain panel → snippet panel). Renders chevron-left before title. */
  onBack?: () => void;
  /** Domain panels (`9783:45023`) show close only. Default true. */
  showFeedbackActions?: boolean;
};

export function PanelChromeHeader({
  title,
  leading,
  onClose,
  onBack,
  showFeedbackActions = true,
}: PanelChromeHeaderProps) {
  const { theme } = useDesignSystemTheme();

  return (
    <div css={panelHeader(theme)} data-name="Title">
      <div css={panelHeaderTitleRow()}>
        {onBack ? (
          <Button
            type="tertiary"
            size="small"
            icon={<ChevronLeftIcon style={tertiaryIconStyle(theme)} />}
            aria-label="Back"
            css={[tertiaryIconButtonStyles(theme), css({ flexShrink: 0 })]}
            onClick={onBack}
          />
        ) : null}
        <div
          css={css({
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            minWidth: 0,
            flex: '1 1 auto',
          })}
        >
          {leading}
          {title}
        </div>
      </div>
      <div css={css({ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 })}>
        {showFeedbackActions ? <PanelFeedbackActions /> : null}
        <Button
          type="tertiary"
          size="small"
          icon={<CloseIcon style={tertiaryIconStyle(theme)} />}
          aria-label="Close panel"
          css={tertiaryIconButtonStyles(theme)}
          onClick={onClose}
        />
      </div>
    </div>
  );
}
