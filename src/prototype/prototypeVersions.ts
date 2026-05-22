/** Prototype iteration registry — add entries as you ship new versions. */
export type PrototypeVersionId = 'v1' | 'v2';

export type PrototypeVersion = {
  id: PrototypeVersionId;
  label: string;
  canvasTitle: string;
};

export const PROTOTYPE_VERSIONS: readonly PrototypeVersion[] = [
  {
    id: 'v1',
    label: 'Version 1',
    canvasTitle: 'Jordan 1 retro sell-through lags',
  },
  {
    id: 'v2',
    label: 'Version 2',
    canvasTitle: 'Jordan 1 retro sell-through lags',
  },
] as const;

export const DEFAULT_PROTOTYPE_VERSION_ID: PrototypeVersionId = 'v2';

export function getPrototypeVersion(id: PrototypeVersionId): PrototypeVersion {
  return PROTOTYPE_VERSIONS.find((version) => version.id === id) ?? PROTOTYPE_VERSIONS[0];
}
