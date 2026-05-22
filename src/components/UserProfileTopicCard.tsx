import { css } from '@emotion/react';
import { DataIcon, LightbulbIcon, UserBadgeIcon, useDesignSystemTheme } from '@databricks/design-system';
import type { ThemeType } from '@databricks/design-system';
import { useState } from 'react';
import { genieVar } from '../theme/genieSun';
import type { UserProfileTopic } from './userProfilePanelConfig';

const METADATA_ICON_PX = 14;

type CardInteraction = 'default' | 'hover' | 'press';

function topicCardStyles(theme: ThemeType, interaction: CardInteraction) {
  const backgroundColor =
    interaction === 'press'
      ? theme.colors.actionDefaultBackgroundPress
      : interaction === 'hover'
        ? genieVar.actionDefaultBgHover
        : genieVar.actionDefaultBgDefault;

  return css({
    display: 'flex',
    width: '100%',
    margin: 0,
    padding: 'var(--genie-spacing-mid)',
    border: `1px solid ${genieVar.border}`,
    borderRadius: 'var(--genie-radius-lg)',
    backgroundColor,
    cursor: 'pointer',
    font: 'inherit',
    color: 'inherit',
    textAlign: 'left',
    boxSizing: 'border-box',
    transition: 'background-color 0.12s ease-out',
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.actionPrimaryBackgroundPress}`,
      outlineOffset: 2,
    },
  });
}

function topicTitle() {
  return css({
    margin: 0,
    fontSize: 13,
    lineHeight: '20px',
    fontWeight: 600,
    color: genieVar.textPrimary,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });
}

function metadataRow() {
  return css({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    width: '100%',
  });
}

function metadataGroup() {
  return css({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  });
}

function metadataText() {
  return css({
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 400,
    color: genieVar.textSecondary,
    whiteSpace: 'nowrap',
  });
}

function metadataDot() {
  return css({
    fontSize: 12,
    lineHeight: '16px',
    color: genieVar.textSecondary,
    flexShrink: 0,
  });
}

function TopicCardBody({
  topic,
  secondaryIcon,
}: {
  topic: UserProfileTopic;
  secondaryIcon: { fontSize: number; color: string; flexShrink: number };
}) {
  return (
    <div css={css({ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', minWidth: 0 })}>
      <p css={topicTitle()}>{topic.title}</p>
      <div css={metadataRow()} data-name="metadata">
        <span css={metadataGroup()} data-name="label">
          <LightbulbIcon style={secondaryIcon} aria-hidden />
          <span css={metadataText()}>{topic.snippetCount} snippets</span>
        </span>
        <span css={metadataDot()} aria-hidden>
          •
        </span>
        <span css={metadataGroup()} data-name="label">
          <DataIcon style={secondaryIcon} aria-hidden />
          <span css={metadataText()}>{topic.assetCount} assets</span>
        </span>
        <span css={metadataDot()} aria-hidden>
          •
        </span>
        <span css={metadataGroup()} data-name="label">
          <UserBadgeIcon style={secondaryIcon} aria-hidden />
          <span css={metadataText()}>{topic.expertCount} experts</span>
        </span>
      </div>
    </div>
  );
}

/** Figma Topic card `10538:15147` in user profile Context Card `10528:8558`. */
export function UserProfileTopicCard({
  topic,
  onClick,
}: {
  topic: UserProfileTopic;
  onClick?: () => void;
}) {
  const { theme } = useDesignSystemTheme();
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const interaction: CardInteraction = pressed ? 'press' : hovered ? 'hover' : 'default';
  const secondaryIcon = { fontSize: METADATA_ICON_PX, color: theme.colors.textSecondary, flexShrink: 0 };

  if (!onClick) {
    return (
      <div
        css={[
          topicCardStyles(theme, 'default'),
          css({ cursor: 'default', backgroundColor: genieVar.actionDefaultBgDefault }),
        ]}
        data-name="Topic"
      >
        <TopicCardBody topic={topic} secondaryIcon={secondaryIcon} />
      </div>
    );
  }

  return (
    <button
      type="button"
      css={topicCardStyles(theme, interaction)}
      data-name="Topic"
      aria-label={`${topic.title}, ${topic.snippetCount} snippets`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      <TopicCardBody topic={topic} secondaryIcon={secondaryIcon} />
    </button>
  );
}
