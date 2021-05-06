import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/layout/Header';
import Overview from './components/overview/Overview';
import SocialInteractions from './components/social-interactions/SocialInteractions';
import VisitedPlaces from './components/visited-places/VisitedPlaces';

function App() {
  return (
    <div className="app-container">
      <Header></Header>
      <div className="route-container">
        <Switch>
          <Route exact path="/" component={Dashboard}></Route>
          <Route path="/interactions" component={SocialInteractions}></Route>
          <Route path="/places" component={VisitedPlaces}></Route>
          <Route path="/overview" component={Overview}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
