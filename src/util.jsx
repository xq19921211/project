/**
 * Created by xu.long on 2018/4/23.
 */
import React from 'react';
import { Route } from 'react-router-dom';
export const generateRoutes = routes => {
  return routes.map((route, index) => {
    if (route.component !== undefined) {
      if (route.exact) {
        return (
          <Route
            exact
            key={'rRoute_' + index}
            path={route.path}
            render={props => (
              // pass the sub-routes down to keep nesting
              <route.component {...props} routes={route.routes} />
            )}
          />
        );
      } else {
        return (
          <Route
            key={'rRoute_' + index}
            path={route.path}
            render={props => (
              // pass the sub-routes down to keep nesting
              <route.component {...props} routes={route.routes} />
            )}
          />
        );
      }
    } else if (route.render !== undefined) {
      if (route.exact) {
        return (
          <Route
            exact
            key={'rRoute_' + index}
            path={route.path}
            render={route.render}
          />
        );
      } else {
        return (
          <Route
            key={'rRoute_' + index}
            path={route.path}
            render={route.render}
          />
        );
      }
    }
  });
};
