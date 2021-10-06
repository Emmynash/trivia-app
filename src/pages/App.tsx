import React from "react";
import { ProvideSideBarContext, ProvideThemeContext, } from "hooks";
import { Home, Quiz } from "pages";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Layout } from "components";
export const App = () => {
  return (
    <BrowserRouter>
      <ProvideThemeContext>
        <ProvideSideBarContext>
          <Layout>
            <Switch>
              <Route path='/' component={Home} exact />
              <Route path="/quiz" component={Quiz} exact />
            </Switch>
          </Layout>
        </ProvideSideBarContext>
      </ProvideThemeContext>
    </BrowserRouter>
  )
}