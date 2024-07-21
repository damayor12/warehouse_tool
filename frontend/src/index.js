import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { store } from './store/store';
import { StyleSheetManager } from 'styled-components';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyleSheetManager shouldForwardProp={() => true} disableVendorPrefixes={false}>
        <App />
      </StyleSheetManager>
    </Provider>
  </React.StrictMode>,
);
