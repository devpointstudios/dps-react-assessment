import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { Segment, Header } from 'semantic-ui-react';
import Beer from './Beer';

class RandomBeer extends Component {
  state = { beer: {}, loaded: false };

  componentDidMount() {
    axios.get('/api/random_beer')
      .then( res => {
        this.setState({ beer: res.data, loaded: true });
      })
      .catch( error => {
        console.log(error)
        this.props.dispatch(setFlash('Error Getting Random Beer.', 'error'));
    });
  }

  display = () => {
    const { beer, loaded } = this.state;

    if(loaded)
      return(
        <Segment basic>
          <Header as='h1' style={styles.white}>Random Beer: {beer.name}</Header>
          <Beer beer={beer} display={true} />
        </Segment>
      )
    else
      return(
        <Header as='h1'>Loading Random Beer...</Header>
      )
  }

  render() {
    return(
      <Segment inverted textAlign='center' style={styles.white}>
        { this.display() }
      </Segment>
    );
  }
}


const styles = {
  white: { color: 'white' },
}

export default connect()(RandomBeer);
