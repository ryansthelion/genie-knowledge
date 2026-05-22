import { css } from '@emotion/react';
import {
  Button,
  InfoSmallIcon,
  SidebarExpandIcon,
  Tag,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Typography,
  useDesignSystemTheme,
} from '@databricks/design-system';
import type { ThemeType } from '@databricks/design-system';
import { useCallback, useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import {
  EMEA_KNOWLEDGE_CONTEXT,
  SELL_THROUGH_KNOWLEDGE_CONTEXT,
  type KnowledgeContextConfig,
} from './knowledgeContextConfig';
import { genieSunRootAttributes, genieVar } from '../theme/genieSun';

const HOVER_DELAY_MS = 200;
const FADE_MS = 200;
const POPOVER_OFFSET_PX = 4;
const CARD_WIDTH_PX = 320;

const AVATAR_INDIGO = '#434a93';
const AVATAR_TEAL = '#04867d';
const AVATAR_PINK = '#b45091';
const FEEDBACK_ICON_PX = 16;

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

export function knowledgeAiTermStyles() {
  return css({
    position: 'relative',
    display: 'inline',
    cursor: 'pointer',
    isolation: 'isolate',
    whiteSpace: 'nowrap',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: '-4px -3px',
      borderRadius: 0,
      background: genieVar.primaryAiBackgroundDefault,
      opacity: 0,
      transition: 'opacity 0.12s ease-out',
      zIndex: -1,
    },
    '&:hover::before': {
      opacity: 1,
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '-2px',
      height: '1.5px',
      background: genieVar.fillAiGradient100,
      WebkitMaskImage: 'radial-gradient(circle at 2px 50%, #000 0.75px, transparent 0.85px)',
      WebkitMaskSize: '5px 1.5px',
      WebkitMaskRepeat: 'repeat-x',
      maskImage: 'radial-gradient(circle at 2px 50%, #000 0.75px, transparent 0.85px)',
      maskSize: '5px 1.5px',
      maskRepeat: 'repeat-x',
      pointerEvents: 'none',
    },
  });
}

function contextCardGradientShell() {
  return css({
    width: CARD_WIDTH_PX,
    padding: 1,
    borderRadius: 12,
    background: genieVar.fillAiGradient100,
  });
}

function contextCardInner(theme: ThemeType) {
  return css({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--genie-spacing-mid)',
    padding: 'var(--genie-spacing-mid)',
    borderRadius: 11,
    backgroundColor: genieVar.backgroundPrimary,
    boxShadow: genieVar.shadowMd,
    overflow: 'hidden',
    color: theme.colors.textPrimary,
  });
}

function contextCardFeedbackButtons(theme: ThemeType, btnClass: string) {
  return css({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    flexShrink: 0,
    [`& .${btnClass}`]: {
      color: `${theme.colors.textSecondary} !important`,
    },
    [`& .${btnClass}:hover`]: {
      color: `${theme.colors.actionDefaultIconHover} !important`,
    },
    [`& .${btnClass}:active`]: {
      color: `${theme.colors.actionDefaultIconPress} !important`,
    },
    [`& .${btnClass} .anticon`]: {
      color: `${theme.colors.textSecondary} !important`,
    },
    [`& .${btnClass}:hover .anticon`]: {
      color: `${theme.colors.actionDefaultIconHover} !important`,
    },
    [`& .${btnClass}:active .anticon`]: {
      color: `${theme.colors.actionDefaultIconPress} !important`,
    },
  });
}

function contextAvatar(bg: string, fontSize = 12) {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 'var(--genie-radius-full)',
    backgroundColor: bg,
    border: `1px solid ${genieVar.backgroundPrimary}`,
    marginRight: -4,
    flexShrink: 0,
    fontSize,
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

function KnowledgeContextCard({
  config,
  onExpandDetail,
}: {
  config: KnowledgeContextConfig;
  onExpandDetail?: () => void;
}) {
  const { theme, getPrefixedClassName } = useDesignSystemTheme();
  const btnClass = getPrefixedClassName('btn');
  const { metadata } = config;
  const avatarPair = metadata.verifiedUsers.slice(0, 2);
  const moreExpertsBadge =
    config.verifiedExpertsCount > avatarPair.length
      ? `+${config.verifiedExpertsCount - avatarPair.length}`
      : null;

  return (
    <div css={contextCardGradientShell()} data-name="Context Card" role="dialog" aria-label={config.cardAriaLabel}>
      <div css={contextCardInner(theme)}>
        <div css={css({ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm, width: '100%' })}>
          <div
            css={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
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
              {config.cardTitle}
            </Typography.Text>
            <Button
              type="tertiary"
              size="small"
              icon={<SidebarExpandIcon style={feedbackIconStyle(theme)} />}
              aria-label={config.expandAriaLabel}
              css={feedbackButtonStyles(theme)}
              onClick={(event) => {
                event.stopPropagation();
                onExpandDetail?.();
              }}
            />
          </div>

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

        <div
          css={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: theme.spacing.sm,
            borderTop: `1px solid ${genieVar.border}`,
          })}
        >
          <div css={css({ display: 'flex', alignItems: 'center', gap: theme.spacing.xs, minWidth: 0 })}>
            <div css={css({ display: 'flex', alignItems: 'center' })}>
              {avatarPair.map((user) => (
                <span key={user.name} css={contextAvatar(user.bg)}>
                  {user.initial}
                </span>
              ))}
              {moreExpertsBadge ? (
                <span css={[contextAvatar(AVATAR_PINK, 9), css({ marginRight: 0 })]}>{moreExpertsBadge}</span>
              ) : null}
            </div>
            <Typography.Hint style={{ marginBottom: 0, whiteSpace: 'nowrap' }}>
              Verified by{' '}
              <Typography.Text strong style={{ fontSize: 12, lineHeight: '16px', color: genieVar.textPrimary }}>
                {config.verifiedExpertsCount} experts
              </Typography.Text>
            </Typography.Hint>
            <InfoSmallIcon style={{ fontSize: 16, color: genieVar.textSecondary, flexShrink: 0 }} />
          </div>
          <div css={contextCardFeedbackButtons(theme, btnClass)}>
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

type PopoverCoords = { top: number; left: number };

function useHoverPopoverCoords(anchorRef: RefObject<HTMLSpanElement>, isOpen: boolean) {
  const [coords, setCoords] = useState<PopoverCoords>({ top: 0, left: 0 });

  const updateCoords = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCoords({
      top: rect.bottom + POPOVER_OFFSET_PX,
      left: rect.left,
    });
  }, [anchorRef]);

  useEffect(() => {
    if (!isOpen) return;
    updateCoords();
    window.addEventListener('scroll', updateCoords, true);
    window.addEventListener('resize', updateCoords);
    return () => {
      window.removeEventListener('scroll', updateCoords, true);
      window.removeEventListener('resize', updateCoords);
    };
  }, [isOpen, updateCoords]);

  return { coords, updateCoords };
}

function KnowledgeContextPopoverLayer({
  config,
  coords,
  visible,
  onPointerEnter,
  onPointerLeave,
  onExpandDetail,
}: {
  config: KnowledgeContextConfig;
  coords: PopoverCoords;
  visible: boolean;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onExpandDetail?: () => void;
}) {
  return createPortal(
    <div
      {...genieSunRootAttributes}
      css={css({
        position: 'fixed',
        top: coords.top,
        left: coords.left,
        zIndex: 10000,
        pointerEvents: 'auto',
        opacity: visible ? 1 : 0,
        transition: `opacity ${FADE_MS}ms ease-out`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -POPOVER_OFFSET_PX,
          left: 0,
          right: 0,
          height: POPOVER_OFFSET_PX,
        },
      })}
      onMouseEnter={onPointerEnter}
      onMouseLeave={onPointerLeave}
    >
      <KnowledgeContextCard config={config} onExpandDetail={onExpandDetail} />
    </div>,
    document.body,
  );
}

export type KnowledgeAiTermProps = {
  config: KnowledgeContextConfig;
  onExpandDetail?: () => void;
};

/** Inline AI term with dotted gradient underline and context-card popover. */
export function KnowledgeAiTerm({ config, onExpandDetail }: KnowledgeAiTermProps) {
  const anchorRef = useRef<HTMLSpanElement>(null);
  const showDelayRef = useRef<ReturnType<typeof setTimeout>>();
  const hideDelayRef = useRef<ReturnType<typeof setTimeout>>();
  const pointerInsideRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { coords, updateCoords } = useHoverPopoverCoords(anchorRef, isMounted);

  const clearTimers = useCallback(() => {
    if (showDelayRef.current) clearTimeout(showDelayRef.current);
    if (hideDelayRef.current) clearTimeout(hideDelayRef.current);
  }, []);

  const hidePopover = useCallback(() => {
    setIsVisible(false);
    hideDelayRef.current = setTimeout(() => {
      setIsMounted(false);
    }, FADE_MS);
  }, []);

  const showPopover = useCallback(() => {
    if (hideDelayRef.current) clearTimeout(hideDelayRef.current);
    updateCoords();
    setIsVisible(false);
    setIsMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true));
    });
  }, [updateCoords]);

  const handlePointerEnter = useCallback(() => {
    pointerInsideRef.current = true;
    if (hideDelayRef.current) clearTimeout(hideDelayRef.current);
    if (isMounted) {
      setIsVisible(true);
      return;
    }
    showDelayRef.current = setTimeout(() => {
      if (pointerInsideRef.current) showPopover();
    }, HOVER_DELAY_MS);
  }, [isMounted, showPopover]);

  const handlePointerLeave = useCallback(() => {
    pointerInsideRef.current = false;
    if (showDelayRef.current) clearTimeout(showDelayRef.current);
    if (!isMounted) return;
    hidePopover();
  }, [hidePopover, isMounted]);

  const handleExpandDetail = useCallback(() => {
    pointerInsideRef.current = false;
    clearTimers();
    setIsVisible(false);
    setIsMounted(false);
    onExpandDetail?.();
  }, [clearTimers, onExpandDetail]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  return (
    <>
      <span
        ref={anchorRef}
        css={knowledgeAiTermStyles()}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
        tabIndex={0}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={isMounted && isVisible}
        aria-label={config.cardAriaLabel}
      >
        {config.term}
      </span>
      {isMounted ? (
        <KnowledgeContextPopoverLayer
          config={config}
          coords={coords}
          visible={isVisible}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onExpandDetail={handleExpandDetail}
        />
      ) : null}
    </>
  );
}

export type SellThroughAiTermProps = {
  onExpandDetail?: () => void;
};

export function SellThroughAiTerm({ onExpandDetail }: SellThroughAiTermProps) {
  return <KnowledgeAiTerm config={SELL_THROUGH_KNOWLEDGE_CONTEXT} onExpandDetail={onExpandDetail} />;
}

export type EmeaAiTermProps = {
  onExpandDetail?: () => void;
};

export function EmeaAiTerm({ onExpandDetail }: EmeaAiTermProps) {
  return <KnowledgeAiTerm config={EMEA_KNOWLEDGE_CONTEXT} onExpandDetail={onExpandDetail} />;
}
