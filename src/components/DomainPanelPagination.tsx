import { css } from '@emotion/react';
import { Button, ChevronLeftIcon, ChevronRightIcon, useDesignSystemTheme } from '@databricks/design-system';
import type { ThemeType } from '@databricks/design-system';
import { genieVar } from '../theme/genieSun';
import { tertiaryIconButtonStyles, tertiaryIconStyle } from './snippetPanelChrome';

function paginationBar(theme: ThemeType) {
  return css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    flexShrink: 0,
    width: '100%',
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    backgroundColor: genieVar.backgroundPrimary,
  });
}

function pageButtonStyles(theme: ThemeType, selected: boolean) {
  return css({
    minWidth: 28,
    height: 28,
    padding: '0 6px',
    margin: 0,
    border: 'none',
    borderRadius: theme.borders.borderRadiusSm,
    backgroundColor: selected ? genieVar.actionDefaultBgHover : 'transparent',
    cursor: 'pointer',
    font: 'inherit',
    fontSize: 13,
    lineHeight: '20px',
    fontWeight: selected ? 600 : 400,
    color: genieVar.textPrimary,
    transition: 'background-color 0.12s ease-out',
    '&:hover': {
      backgroundColor: genieVar.actionDefaultBgHover,
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.colors.actionPrimaryBackgroundPress}`,
      outlineOffset: 2,
    },
  });
}

export type DomainPanelPaginationProps = {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

/** Figma pagination `10538:14323`. */
export function DomainPanelPagination({ pageCount, currentPage, onPageChange }: DomainPanelPaginationProps) {
  const { theme } = useDesignSystemTheme();

  return (
    <nav css={paginationBar(theme)} data-name="Pagination" aria-label="Pagination">
      <div css={css({ display: 'flex', alignItems: 'center', gap: 4 })} data-name="Buttons">
        <Button
          type="tertiary"
          size="small"
          icon={<ChevronLeftIcon style={tertiaryIconStyle(theme)} />}
          aria-label="Previous page"
          css={tertiaryIconButtonStyles(theme)}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
        {Array.from({ length: pageCount }, (_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              type="button"
              css={pageButtonStyles(theme, page === currentPage)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}
        <Button
          type="tertiary"
          size="small"
          icon={<ChevronRightIcon style={tertiaryIconStyle(theme)} />}
          aria-label="Next page"
          css={tertiaryIconButtonStyles(theme)}
          disabled={currentPage >= pageCount}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </div>
    </nav>
  );
}
