import { css } from '@emotion/react';
import {
  Button,
  DagHorizontalIcon,
  DashboardIcon,
  MapIcon,
  NotebookIcon,
  UserIcon,
  useDesignSystemTheme,
  ZoomInIcon,
  ZoomOutIcon,
  ZoomToFitIcon,
} from '@databricks/design-system';
import type { ThemeType } from '@databricks/design-system';
import { useCallback, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { AiGradientLightbulbIcon } from './AiGradientIcon';
import { genieVar } from '../theme/genieSun';

/** Figma `nodes` frame `9559:46946` — DAG content size. */
const CANVAS_WIDTH_PX = 740;
const CANVAS_HEIGHT_PX = 320;
/** Extra pan room around the DAG for an infinite-canvas feel. */
const CANVAS_WORLD_PADDING_PX = 480;
const CANVAS_WORLD_WIDTH_PX = CANVAS_WIDTH_PX + CANVAS_WORLD_PADDING_PX * 2;
const CANVAS_WORLD_HEIGHT_PX = CANVAS_HEIGHT_PX + CANVAS_WORLD_PADDING_PX * 2;
const CANVAS_CONTENT_OFFSET_X = CANVAS_WORLD_PADDING_PX;
const CANVAS_CONTENT_OFFSET_Y = CANVAS_WORLD_PADDING_PX;
/** Initial pan so the DAG sits near the top-left of the viewport with breathing room. */
const INITIAL_PAN_X = -(CANVAS_CONTENT_OFFSET_X - 16);
const INITIAL_PAN_Y = -(CANVAS_CONTENT_OFFSET_Y - 16);
const NODE_WIDTH_PX = 200;
const ICON_PX = 16;

type DagNodeKind = 'snippet' | 'dashboard' | 'notebook' | 'user';

type DagNodeSpec = {
  id: string;
  kind: DagNodeKind;
  title: string;
  subtitle: string;
  x: number;
  y: number;
};

type DagEdgeSpec = {
  from: string;
  to: string;
};

export type LineageVariant = 'sell-through' | 'emea' | 'pricing-disparity';

type LineageGraph = {
  nodes: DagNodeSpec[];
  edges: DagEdgeSpec[];
};

/** Figma DAG layout `9559:46946` — sell-through knowledge lineage. */
const SELL_THROUGH_LINEAGE_GRAPH: LineageGraph = {
  nodes: [
  {
    id: 'snippet-refunds',
    kind: 'snippet',
    title: 'Snippet',
    subtitle: 'Refunds should be excluded from sell-through numerator when calculating weekly rate.',
    x: 0,
    y: 0,
  },
  {
    id: 'dashboard-revenue',
    kind: 'dashboard',
    title: 'Dashboard',
    subtitle: 'Revenue Dashboard',
    x: 270,
    y: 70,
  },
  {
    id: 'dashboard-marketing',
    kind: 'dashboard',
    title: 'Dashboard',
    subtitle: 'Marketing KPIs',
    x: 270,
    y: 150,
  },
  {
    id: 'notebook-finance',
    kind: 'notebook',
    title: 'Notebook',
    subtitle: 'Finance Notebook',
    x: 270,
    y: 275,
  },
  {
    id: 'user-ryan',
    kind: 'user',
    title: 'User',
    subtitle: 'Ryan Chen',
    x: 540,
    y: 71,
  },
  {
    id: 'user-jack',
    kind: 'user',
    title: 'User',
    subtitle: 'Jack Reidy',
    x: 540,
    y: 214,
  },
  {
    id: 'snippet-active-1',
    kind: 'snippet',
    title: 'Snippet',
    subtitle: 'NSO doors are weighted more heavily in EMEA sell-through vs Key Account partners.',
    x: 0,
    y: 141,
  },
  {
    id: 'snippet-active-2',
    kind: 'snippet',
    title: 'Snippet',
    subtitle: 'Active customers are users with at least one order in the trust category',
    x: 0,
    y: 269,
  },
  ],
  edges: [
    { from: 'snippet-refunds', to: 'dashboard-revenue' },
    { from: 'snippet-active-1', to: 'dashboard-marketing' },
    { from: 'snippet-active-2', to: 'notebook-finance' },
    { from: 'dashboard-revenue', to: 'user-ryan' },
    { from: 'dashboard-marketing', to: 'user-jack' },
    { from: 'notebook-finance', to: 'user-jack' },
  ],
};

const EMEA_LINEAGE_GRAPH: LineageGraph = {
  nodes: [
    {
      id: 'snippet-nso',
      kind: 'snippet',
      title: 'Snippet',
      subtitle: 'NSO doors are weighted more heavily in EMEA sell-through vs Key Account partners.',
      x: 0,
      y: 0,
    },
    {
      id: 'snippet-fx',
      kind: 'snippet',
      title: 'Snippet',
      subtitle:
        'The €180 EMEA retail price equates to ~$198 at current EUR/USD rates, a 10% premium over the $180 NA price.',
      x: 0,
      y: 141,
    },
    {
      id: 'snippet-inventory',
      kind: 'snippet',
      title: 'Snippet',
      subtitle: 'EMEA warehouses received allocation 3 weeks after NA launch, missing the peak hype window.',
      x: 0,
      y: 269,
    },
    {
      id: 'dashboard-regional',
      kind: 'dashboard',
      title: 'Dashboard',
      subtitle: 'Regional Sales Dashboard',
      x: 270,
      y: 70,
    },
    {
      id: 'dashboard-partner',
      kind: 'dashboard',
      title: 'Dashboard',
      subtitle: 'EMEA Partner Mix',
      x: 270,
      y: 150,
    },
    {
      id: 'notebook-planning',
      kind: 'notebook',
      title: 'Notebook',
      subtitle: 'Regional Planning Notebook',
      x: 270,
      y: 275,
    },
    {
      id: 'user-sofia',
      kind: 'user',
      title: 'User',
      subtitle: 'Sofia Martins',
      x: 540,
      y: 71,
    },
    {
      id: 'user-liam',
      kind: 'user',
      title: 'User',
      subtitle: 'Liam Okafor',
      x: 540,
      y: 214,
    },
  ],
  edges: [
    { from: 'snippet-nso', to: 'dashboard-partner' },
    { from: 'snippet-fx', to: 'dashboard-regional' },
    { from: 'snippet-inventory', to: 'notebook-planning' },
    { from: 'dashboard-regional', to: 'user-sofia' },
    { from: 'dashboard-partner', to: 'user-liam' },
    { from: 'notebook-planning', to: 'user-liam' },
  ],
};

/** Figma Snippet Panel DAG `9681:52883` — pricing disparity lineage. */
const PRICING_DISPARITY_LINEAGE_GRAPH: LineageGraph = {
  nodes: [
    {
      id: 'snippet-refunds',
      kind: 'snippet',
      title: 'Snippet',
      subtitle: 'Refunds should be excluded when computing gross revenue',
      x: 0,
      y: 0,
    },
    {
      id: 'dashboard-revenue',
      kind: 'dashboard',
      title: 'Dashboard',
      subtitle: 'Revenue Dashboard',
      x: 270,
      y: 70,
    },
    {
      id: 'dashboard-marketing',
      kind: 'dashboard',
      title: 'Dashboard',
      subtitle: 'Marketing KPIs',
      x: 270,
      y: 150,
    },
    {
      id: 'notebook-finance',
      kind: 'notebook',
      title: 'Notebook',
      subtitle: 'Finance Notebook',
      x: 270,
      y: 275,
    },
    {
      id: 'user-ryan',
      kind: 'user',
      title: 'User',
      subtitle: 'Ryan Chen',
      x: 540,
      y: 71,
    },
    {
      id: 'user-jack',
      kind: 'user',
      title: 'User',
      subtitle: 'Jack Reidy',
      x: 540,
      y: 214,
    },
    {
      id: 'snippet-active',
      kind: 'snippet',
      title: 'Snippet',
      subtitle: 'Active customers are users with least one order in the trust category',
      x: 0,
      y: 141,
    },
    {
      id: 'snippet-trust',
      kind: 'snippet',
      title: 'Snippet',
      subtitle: 'Active customers are users with least one order in the trust category',
      x: 0,
      y: 269,
    },
  ],
  edges: [
    { from: 'snippet-refunds', to: 'dashboard-revenue' },
    { from: 'snippet-active', to: 'dashboard-marketing' },
    { from: 'snippet-trust', to: 'notebook-finance' },
    { from: 'dashboard-revenue', to: 'user-ryan' },
    { from: 'dashboard-marketing', to: 'user-jack' },
    { from: 'notebook-finance', to: 'user-jack' },
  ],
};

const LINEAGE_GRAPHS: Record<LineageVariant, LineageGraph> = {
  'sell-through': SELL_THROUGH_LINEAGE_GRAPH,
  emea: EMEA_LINEAGE_GRAPH,
  'pricing-disparity': PRICING_DISPARITY_LINEAGE_GRAPH,
};

function nodeHeight(kind: DagNodeKind) {
  return kind === 'snippet' ? 80 : 64;
}

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

function visualizerShell(theme: ThemeType) {
  return css({
    position: 'relative',
    flex: '1 1 auto',
    minHeight: 280,
    borderRadius: genieVar.radiusLg,
    border: `1px solid ${genieVar.border}`,
    backgroundColor: genieVar.bgSecondary,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  });
}

function canvasViewport(isPanning: boolean) {
  return css({
    position: 'relative',
    flex: '1 1 auto',
    minHeight: 0,
    overflow: 'hidden',
    touchAction: 'none',
    cursor: isPanning ? 'grabbing' : 'grab',
    userSelect: isPanning ? 'none' : undefined,
  });
}

function canvasWorld(panX: number, panY: number) {
  return css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: CANVAS_WORLD_WIDTH_PX,
    height: CANVAS_WORLD_HEIGHT_PX,
    transform: `translate(${panX}px, ${panY}px)`,
    willChange: 'transform',
    backgroundImage: 'radial-gradient(circle, rgba(131, 150, 165, 0.35) 1px, transparent 1px)',
    backgroundSize: '12px 12px',
  });
}

function canvasStage() {
  return css({
    position: 'absolute',
    left: CANVAS_CONTENT_OFFSET_X,
    top: CANVAS_CONTENT_OFFSET_Y,
    width: CANVAS_WIDTH_PX,
    height: CANVAS_HEIGHT_PX,
  });
}

function dagNodeCard(theme: ThemeType, kind: DagNodeKind) {
  return css({
    position: 'absolute',
    width: NODE_WIDTH_PX,
    minHeight: nodeHeight(kind),
    padding: theme.spacing.sm,
    borderRadius: theme.borders.borderRadiusMd,
    backgroundColor: genieVar.backgroundPrimary,
    border: `1px solid ${genieVar.border}`,
    boxShadow: genieVar.shadowMd,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
    boxSizing: 'border-box',
  });
}

function iconSlot(theme: ThemeType) {
  return css({
    display: 'flex',
    alignItems: 'flex-start',
    padding: 4,
    borderRadius: theme.borders.borderRadiusSm,
    backgroundColor: genieVar.bgSecondary,
    flexShrink: 0,
  });
}

function canvasToolbar(theme: ThemeType) {
  return css({
    position: 'absolute',
    right: theme.spacing.sm,
    bottom: theme.spacing.sm,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
    padding: theme.spacing.xs,
    borderRadius: theme.borders.borderRadiusMd,
    backgroundColor: genieVar.backgroundPrimary,
    border: `1px solid ${genieVar.border}`,
    boxShadow: genieVar.shadowMd,
  });
}

function nodeIcon(kind: DagNodeKind, theme: ThemeType) {
  const style = { fontSize: ICON_PX, flexShrink: 0 } as const;
  switch (kind) {
    case 'snippet':
      return <AiGradientLightbulbIcon size={ICON_PX} />;
    case 'dashboard':
      return <DashboardIcon style={style} />;
    case 'notebook':
      return <NotebookIcon style={style} />;
    case 'user':
      return <UserIcon style={style} />;
  }
}

function DagNodeInner({ theme, node }: { theme: ThemeType; node: DagNodeSpec }) {
  return (
    <>
      <div css={css({ display: 'flex', alignItems: 'center', gap: theme.spacing.sm, width: '100%' })}>
        <span css={iconSlot(theme)}>{nodeIcon(node.kind, theme)}</span>
        <span
          css={css({
            flex: 1,
            minWidth: 0,
            fontSize: 13,
            lineHeight: '20px',
            fontWeight: 600,
            color: genieVar.textPrimary,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          })}
        >
          {node.title}
        </span>
      </div>
      <p
        css={css({
          margin: 0,
          fontSize: 12,
          lineHeight: '16px',
          color: genieVar.textSecondary,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        })}
      >
        {node.subtitle}
      </p>
    </>
  );
}

function DagNode({ theme, node }: { theme: ThemeType; node: DagNodeSpec }) {
  return (
    <div
      css={[
        dagNodeCard(theme, node.kind),
        css({ left: node.x, top: node.y }),
      ]}
      data-name="DAG node"
    >
      <DagNodeInner theme={theme} node={node} />
    </div>
  );
}

function getNode(nodes: DagNodeSpec[], id: string) {
  const node = nodes.find((n) => n.id === id);
  if (!node) throw new Error(`Unknown node ${id}`);
  return node;
}

function edgePath(from: DagNodeSpec, to: DagNodeSpec) {
  const fromH = nodeHeight(from.kind);
  const toH = nodeHeight(to.kind);
  const x1 = from.x + NODE_WIDTH_PX;
  const y1 = from.y + fromH / 2;
  const x2 = to.x;
  const y2 = to.y + toH / 2;
  const midX = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
}

function portPoint(x: number, y: number) {
  return { cx: x, cy: y };
}

function LineageEdges({ nodes, edges }: LineageGraph) {
  const stroke = '#8396a5';
  const ports: { cx: number; cy: number }[] = [];

  const paths = edges.map(({ from, to }) => {
    const fromNode = getNode(nodes, from);
    const toNode = getNode(nodes, to);
    const fromH = nodeHeight(fromNode.kind);
    const toH = nodeHeight(toNode.kind);
    ports.push(portPoint(fromNode.x + NODE_WIDTH_PX, fromNode.y + fromH / 2));
    ports.push(portPoint(toNode.x, toNode.y + toH / 2));
    return edgePath(fromNode, toNode);
  });

  return (
    <svg
      width={CANVAS_WIDTH_PX}
      height={CANVAS_HEIGHT_PX}
      css={css({ position: 'absolute', inset: 0, pointerEvents: 'none' })}
      aria-hidden
    >
      {paths.map((d, index) => (
        <path key={edges[index].from + edges[index].to} d={d} fill="none" stroke={stroke} strokeWidth={1} />
      ))}
      {ports.map((port, index) => (
        <circle
          key={index}
          cx={port.cx}
          cy={port.cy}
          r={4}
          fill={genieVar.backgroundPrimary}
          stroke={stroke}
          strokeWidth={1}
        />
      ))}
    </svg>
  );
}

type PanOffset = { x: number; y: number };

type PanDragState = {
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startPanX: number;
  startPanY: number;
};

function useCanvasPan() {
  const [pan, setPan] = useState<PanOffset>({ x: INITIAL_PAN_X, y: INITIAL_PAN_Y });
  const [isPanning, setIsPanning] = useState(false);
  const panRef = useRef(pan);
  const dragRef = useRef<PanDragState | null>(null);

  panRef.current = pan;

  const endPan = useCallback((target: HTMLElement, pointerId: number) => {
    if (dragRef.current?.pointerId === pointerId) {
      dragRef.current = null;
      setIsPanning(false);
      try {
        target.releasePointerCapture(pointerId);
      } catch {
        // capture may already be released
      }
    }
  }, []);

  const onViewportPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    const target = event.currentTarget;
    dragRef.current = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startPanX: panRef.current.x,
      startPanY: panRef.current.y,
    };
    setIsPanning(true);
    target.setPointerCapture(event.pointerId);
    event.preventDefault();
  }, []);

  const onViewportPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    setPan({
      x: drag.startPanX + (event.clientX - drag.startClientX),
      y: drag.startPanY + (event.clientY - drag.startClientY),
    });
  }, []);

  const onViewportPointerUp = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    endPan(event.currentTarget, event.pointerId);
  }, [endPan]);

  const onViewportPointerCancel = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    endPan(event.currentTarget, event.pointerId);
  }, [endPan]);

  return {
    pan,
    isPanning,
    viewportHandlers: {
      onPointerDown: onViewportPointerDown,
      onPointerMove: onViewportPointerMove,
      onPointerUp: onViewportPointerUp,
      onPointerCancel: onViewportPointerCancel,
    },
  };
}

function CanvasToolbar({ theme }: { theme: ThemeType }) {
  return (
    <div css={canvasToolbar(theme)} data-name="Canvas navigation">
      <Button
        type="tertiary"
        size="small"
        icon={<ZoomToFitIcon style={tertiaryIconStyle(theme)} />}
        aria-label="Zoom to fit"
        css={tertiaryIconButtonStyles(theme)}
      />
      <Button
        type="tertiary"
        size="small"
        icon={<ZoomInIcon style={tertiaryIconStyle(theme)} />}
        aria-label="Zoom in"
        css={tertiaryIconButtonStyles(theme)}
      />
      <Button
        type="tertiary"
        size="small"
        icon={<ZoomOutIcon style={tertiaryIconStyle(theme)} />}
        aria-label="Zoom out"
        css={tertiaryIconButtonStyles(theme)}
      />
      <div css={css({ height: 1, width: '100%', backgroundColor: genieVar.border })} />
      <Button
        type="tertiary"
        size="small"
        icon={<DagHorizontalIcon style={tertiaryIconStyle(theme)} />}
        aria-label="DAG view"
        css={tertiaryIconButtonStyles(theme)}
      />
      <Button
        type="tertiary"
        size="small"
        icon={<MapIcon style={tertiaryIconStyle(theme)} />}
        aria-label="Map view"
        css={tertiaryIconButtonStyles(theme)}
      />
    </div>
  );
}

/** Figma lineage visualizer `9556:51564` with full DAG nodes and edges. */
export type LineageVisualizerProps = {
  variant?: LineageVariant;
};

export function LineageVisualizer({ variant = 'sell-through' }: LineageVisualizerProps) {
  const { theme } = useDesignSystemTheme();
  const { pan, isPanning, viewportHandlers } = useCanvasPan();
  const graph = LINEAGE_GRAPHS[variant];

  return (
    <div css={visualizerShell(theme)} data-name="Lineage visualizer">
      <div
        css={canvasViewport(isPanning)}
        role="application"
        aria-label="Lineage graph canvas. Drag to pan."
        {...viewportHandlers}
      >
        <div css={canvasWorld(pan.x, pan.y)}>
          <div css={canvasStage()}>
            <LineageEdges nodes={graph.nodes} edges={graph.edges} />
            {graph.nodes.map((node) => (
              <DagNode key={node.id} theme={theme} node={node} />
            ))}
          </div>
        </div>
      </div>
      <CanvasToolbar theme={theme} />
    </div>
  );
}
