import { css } from '@emotion/react';
import {
  Button,
  ChevronDownIcon,
  CircleIcon,
  OverflowIcon,
  Typography,
  useDesignSystemTheme,
} from '@databricks/design-system';
import type { ThemeType } from '@databricks/design-system';
import { genieVar } from '../theme/genieSun';
import {
  CANVAS_MENU_PARAGRAPH,
  canvasHeaderButtonTypography,
  canvasMenu,
  iconSm,
} from './knowledgeSnippetsShared';
import { PrototypeVersionSelect } from './PrototypeVersionSelect';
import type { PrototypeVersionId } from '../prototype/prototypeVersions';

export type KnowledgeSnippetsCanvasHeaderProps = {
  canvasTitle: string;
  prototypeVersionId: PrototypeVersionId;
  onPrototypeVersionChange: (id: PrototypeVersionId) => void;
};

export function KnowledgeSnippetsCanvasHeader({
  canvasTitle,
  prototypeVersionId,
  onPrototypeVersionChange,
}: KnowledgeSnippetsCanvasHeaderProps) {
  const { theme, getPrefixedClassName } = useDesignSystemTheme();
  const canvasHeaderBtnClass = getPrefixedClassName('btn');
  const canvasHeaderBtnIconOnlyClass = getPrefixedClassName('btn-icon-only');

  return (
    <header
      css={[canvasMenu(theme), canvasHeaderButtonTypography(canvasHeaderBtnClass)]}
      data-name="Canvas Menu"
    >
      <nav css={css({ display: 'flex', alignItems: 'center', gap: theme.spacing.sm })}>
        <Typography.Text
          style={{
            ...CANVAS_MENU_PARAGRAPH,
            marginBottom: 0,
            color: genieVar.textSecondary,
          }}
        >
          {canvasTitle}
        </Typography.Text>
      </nav>
      <div
        css={headerActionsStyles(theme, canvasHeaderBtnClass, canvasHeaderBtnIconOnlyClass)}
      >
        <div css={css({ display: 'flex', alignItems: 'center', gap: 0 })}>
          <PrototypeVersionSelect value={prototypeVersionId} onChange={onPrototypeVersionChange} />
          <Button
            type="tertiary"
            size="small"
            icon={<CircleIcon style={{ ...iconSm, fontSize: 10 }} />}
            endIcon={<ChevronDownIcon style={iconSm} />}
          >
            Auto-compute
          </Button>
          <Button type="tertiary" size="small">
            Share
          </Button>
        </div>
        <Button type="tertiary" size="small" icon={<OverflowIcon style={iconSm} />} aria-label="More actions" />
      </div>
    </header>
  );
}

function headerActionsStyles(
  theme: ThemeType,
  canvasHeaderBtnClass: string,
  canvasHeaderBtnIconOnlyClass: string,
) {
  return css({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
    [`& > div .${canvasHeaderBtnClass}`]: {
      color: `${genieVar.textPrimary} !important`,
    },
    [`& > div .${canvasHeaderBtnClass} span:not(.anticon)`]: {
      color: `${genieVar.textPrimary} !important`,
    },
    [`& > div .${canvasHeaderBtnClass}:hover`]: {
      color: `${genieVar.textPrimary} !important`,
    },
    [`& > div .${canvasHeaderBtnClass}:hover span:not(.anticon)`]: {
      color: `${genieVar.textPrimary} !important`,
    },
    [`& > div .${canvasHeaderBtnClass}:active`]: {
      color: `${genieVar.textPrimary} !important`,
    },
    [`& > div .${canvasHeaderBtnClass}:active span:not(.anticon)`]: {
      color: `${genieVar.textPrimary} !important`,
    },
    [`& > div .${canvasHeaderBtnClass} .anticon`]: {
      color: 'inherit !important',
    },
    [`& > .${canvasHeaderBtnClass}.${canvasHeaderBtnIconOnlyClass}`]: {
      color: `${theme.colors.textSecondary} !important`,
    },
    [`& > .${canvasHeaderBtnClass}.${canvasHeaderBtnIconOnlyClass}:hover`]: {
      color: `${theme.colors.actionDefaultIconHover} !important`,
    },
    [`& > .${canvasHeaderBtnClass}.${canvasHeaderBtnIconOnlyClass}:active`]: {
      color: `${theme.colors.actionDefaultIconPress} !important`,
    },
    [`& > .${canvasHeaderBtnClass}.${canvasHeaderBtnIconOnlyClass} .anticon`]: {
      color: 'inherit !important',
    },
  });
}
