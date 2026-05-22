import '@databricks/design-system/index.css';
import './theme/genieSun.css';
import {
  ApplyGlobalStyles,
  DesignSystemProvider,
  DesignSystemThemeProvider,
} from '@databricks/design-system';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { KnowledgeSnippets } from './components/KnowledgeSnippets';
import { genieSunRootAttributes } from './theme/genieSun';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div
      {...genieSunRootAttributes}
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
        height: '100%',
      }}
    >
      <DesignSystemProvider>
        <DesignSystemThemeProvider>
          <ApplyGlobalStyles />
          <KnowledgeSnippets />
        </DesignSystemThemeProvider>
      </DesignSystemProvider>
    </div>
  </React.StrictMode>,
);
