import { css } from '@emotion/react';
import { ArrowUpIcon, Button, PlusIcon, Typography, useDesignSystemTheme } from '@databricks/design-system';
import { promptCard, promptDock, promptInner } from './knowledgeSnippetsShared';

/** Shared prompt input dock (Figma `9665:45232`). */
export function KnowledgeSnippetsPromptDock() {
  const { theme } = useDesignSystemTheme();

  return (
    <div css={promptDock(theme)} data-name="Prompt container">
      <div css={promptInner()} data-name="Prompt inner">
        <div css={promptCard(theme)} data-name="Prompt">
          <div css={css({ display: 'flex', alignItems: 'center', width: '100%', minHeight: 24 })}>
            <Typography.Text type="secondary" style={{ fontSize: 13, lineHeight: '20px', marginBottom: 0 }}>
              Ask a question...
            </Typography.Text>
          </div>
          <div css={css({ display: 'flex', alignItems: 'flex-end', gap: theme.spacing.sm, width: '100%' })}>
            <Button type="tertiary" size="middle" icon={<PlusIcon style={{ fontSize: 16 }} />} aria-label="Add" />
            <div css={css({ flex: '1 1 auto' })} />
            <div
              css={css({
                borderRadius: theme.borders.borderRadiusFull,
                backgroundColor: theme.colors.actionIconBackgroundDefault,
              })}
            >
              <Button
                type="tertiary"
                size="middle"
                icon={<ArrowUpIcon style={{ fontSize: 16 }} />}
                aria-label="Send"
              />
            </div>
          </div>
        </div>
        <div css={css({ paddingTop: theme.spacing.xs })} data-name="Disclaimer">
          <Typography.Hint style={{ marginBottom: 0, textAlign: 'center' }}>
            Check important details before use.
          </Typography.Hint>
        </div>
      </div>
    </div>
  );
}
