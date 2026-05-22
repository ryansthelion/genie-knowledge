import { css } from '@emotion/react';
import { Button, ChevronDownIcon, DropdownMenu } from '@databricks/design-system';
import {
  DEFAULT_PROTOTYPE_VERSION_ID,
  getPrototypeVersion,
  PROTOTYPE_VERSIONS,
  type PrototypeVersionId,
} from '../prototype/prototypeVersions';

const iconSm = { fontSize: 16 } as const;

/** Du Bois / Paragraph — matches canvas menu typography. */
const VERSION_MENU_TEXT = css({
  fontSize: 13,
  lineHeight: '20px',
});

export type PrototypeVersionSelectProps = {
  value?: PrototypeVersionId;
  onChange?: (versionId: PrototypeVersionId) => void;
};

/**
 * Canvas header version picker — lists prototype iterations (currently Version 1).
 */
export function PrototypeVersionSelect({
  value = DEFAULT_PROTOTYPE_VERSION_ID,
  onChange,
}: PrototypeVersionSelectProps) {
  const current = getPrototypeVersion(value);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          type="tertiary"
          size="small"
          endIcon={<ChevronDownIcon style={iconSm} />}
          aria-label="Prototype version"
        >
          {current.label}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="start" minWidth={120} css={VERSION_MENU_TEXT}>
        {PROTOTYPE_VERSIONS.map((version) => (
          <DropdownMenu.Item
            key={version.id}
            onSelect={() => onChange?.(version.id)}
            css={VERSION_MENU_TEXT}
          >
            {version.label}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
