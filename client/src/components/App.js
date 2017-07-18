import React, { Component } from 'react';
import NoMatch from './NoMatch';
import NavBar from './NavBar';
import Flash from './Flash';
import Home from './Home';
import TheBar from './TheBar';
import Beer from './Beer';
import Search from './Search';
import RandomBeer from './RandomBeer';
import Locations from './Locations';
import Brewery from './Brewery';
import { Switch, Route } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <Segment style={styles.background}>
        <NavBar />
        <Flash />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/the_bar' component={TheBar} />
          <Route exact path='/beer/:name' component={Beer} />
          <Route exact path='/random_beer' component={RandomBeer} />
          <Route exact path='/locations' component={Locations} />
          <Route exact path='/brewery/:name' component={Brewery} />
          <Route exact path='/search/' component={Search} />
          <Route component={NoMatch} />
        </Switch>
      </Segment>
    );
  }
}

const styles = {
  background: {
  backgroundColor: 'black',
  },
}

export default App;
