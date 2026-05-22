import { DomainPanel } from './DomainPanel';
import { DOMAIN_PANEL_BY_ID, type SnippetPanelDomainId } from './domainPanelConfig';
import { SnippetPanel } from './SnippetPanel';
import { CUSTOMER_CHURN_SNIPPET_PANELS_BY_ID } from './customerChurnSnippetConfig';
import { PRICING_DISPARITY_SNIPPET_PANEL } from './snippetPanelConfig';
import { UserProfilePanel } from './UserProfilePanel';
import { getUserProfileConfig, RYAN_CHEN_USER_ID } from './userProfilePanelConfig';

export type SnippetPanelView =
  | { kind: 'snippet'; snippetId?: string }
  | { kind: 'domain'; domainId: SnippetPanelDomainId }
  | { kind: 'user'; userId: string };

export type SnippetPanelContainerProps = {
  view: SnippetPanelView;
  onClose: () => void;
  onBack: () => void;
  onDomainSelect: (domainId: SnippetPanelDomainId) => void;
  onAuthorSelect: () => void;
  onExpertSelect: (userId: string) => void;
};

/** Swaps snippet detail, domain drill-down, and user profile (`10528:8558`). */
export function SnippetPanelContainer({
  view,
  onClose,
  onBack,
  onDomainSelect,
  onAuthorSelect,
  onExpertSelect,
}: SnippetPanelContainerProps) {
  if (view.kind === 'domain') {
    return (
      <DomainPanel
        config={DOMAIN_PANEL_BY_ID[view.domainId]}
        onClose={onClose}
        onBack={onBack}
        onExpertSelect={onExpertSelect}
      />
    );
  }

  if (view.kind === 'user') {
    return (
      <UserProfilePanel
        config={getUserProfileConfig(view.userId)}
        onClose={onClose}
        onBack={onBack}
        onTopicSelect={onDomainSelect}
      />
    );
  }

  const snippetConfig =
    view.snippetId && CUSTOMER_CHURN_SNIPPET_PANELS_BY_ID[view.snippetId]
      ? CUSTOMER_CHURN_SNIPPET_PANELS_BY_ID[view.snippetId]
      : PRICING_DISPARITY_SNIPPET_PANEL;

  return (
    <SnippetPanel
      config={snippetConfig}
      onClose={onClose}
      onAuthorClick={onAuthorSelect}
      onTopicSelect={onDomainSelect}
    />
  );
}

export { RYAN_CHEN_USER_ID };
