import React, { Component } from 'react';
import NoMatch from './NoMatch';
import NavBar from './NavBar';
import Flash from './Flash';
import Home from './Home';
import { Switch, Route } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import Beers from './Beers';
import Beer from './Beer';
import Breweries from './Breweries';
import Brewery from './Brewery';

class App extends Component {
  render() {
    return (
      <Segment style={styles.background}>
        <NavBar />
        <Flash />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/beers' component={Beers} />
          <Route exact path='/beers/:name' component={Beer} />
          <Route exact path='/breweries' component={Breweries} />
          <Route exact path='/breweries/:name' component={Brewery} /> 
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
