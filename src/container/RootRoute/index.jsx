/**
 * Created by xu.long on 25/03/2018.
 */

import { HashRouter, Route, Switch } from 'react-router-dom';

import { ConnectedRouter } from 'react-router-redux';
import React from 'react';
import createFirstRoutes from '../../route';
import { generateRoutes } from '../../util';

export class RootRoute extends React.Component {
  constructor(props) {
    super(props);
    this.rootRoutes = createFirstRoutes();
    this.state = {
      myHistory: window.myHistory,
    };
  }

  componentDidMount() {
    let routes = generateRoutes(this.rootRoutes);
    this.setState({
      routes: routes,
    });
  }

  render() {
    return (
      <HashRouter>
        <Switch>{this.state.routes}</Switch>
      </HashRouter>
    );
  }
}
