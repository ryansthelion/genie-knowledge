import { SELL_THROUGH_KNOWLEDGE_CONTEXT } from './knowledgeContextConfig';
import { KnowledgeDetailPanel } from './KnowledgeDetailPanel';

export {
  KNOWLEDGE_DETAIL_PANEL_INSET_PX,
  KNOWLEDGE_DETAIL_PANEL_WIDTH_PX,
  SELL_THROUGH_DETAIL_PANEL_INSET_PX,
  SELL_THROUGH_DETAIL_PANEL_WIDTH_PX,
} from './KnowledgeDetailPanel';

export type SellThroughDetailPanelProps = {
  onClose: () => void;
};

export function SellThroughDetailPanel({ onClose }: SellThroughDetailPanelProps) {
  return <KnowledgeDetailPanel config={SELL_THROUGH_KNOWLEDGE_CONTEXT} onClose={onClose} />;
}
