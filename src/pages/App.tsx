import React from "react";
import { ProvideSideBarContext, ProvideThemeContext } from "hooks";
import { Home } from "pages";
import { Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Layout } from "components";
import ReactGA from "react-ga";

const history = createBrowserHistory();

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize("UA-000000-01");
  ReactGA.pageview(window.location.pathname + window.location.search);
  history.listen(location => {
    ReactGA.set({ page: location.location.pathname })
    ReactGA.pageview(location.location.pathname)
  })
}

export const App = () => {
  return (
    <Router history={history}>
      <ProvideThemeContext>
        <ProvideSideBarContext>
          <Layout>
            <Switch>
              <Route exact component={Home} path="/" />
            </Switch>
          </Layout>
        </ProvideSideBarContext>
      </ProvideThemeContext>
    </Router>
  )
}