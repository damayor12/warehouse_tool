import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';

const Wrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>{children}</Provider>
  </ThemeProvider>
);

const customRender = (ui, options) => render(ui, { wrapper: Wrapper, ...options });

export * from '@testing-library/react';
export { customRender as render, userEvent };
