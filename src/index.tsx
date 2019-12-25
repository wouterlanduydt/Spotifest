import React from 'react';
import ReactDOM from 'react-dom';
import { Home, Login } from './pages';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import branding from 'styles/branding';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import global from './styles/global';

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${global}
`;

ReactDOM.render(
  <ThemeProvider theme={branding}>
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <Route path="/login" exact component={Login} />
        <Route path="/" exact component={Home} />
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);
