import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css'

import theme from './utils/theme'
import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';

ReactDOM.render(
  <>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <App />
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </>,
  document.getElementById('root')
);