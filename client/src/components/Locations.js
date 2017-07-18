import React, { Component } from 'react';
import axios from 'axios';
import { Segment, Header, Grid, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import InfiniteScroll from 'react-infinite-scroller';

class Locations extends Component {
  state = { locations: {}, loaded: false };

  componentDidMount() {
    axios.get('/api/all_locations')
      .then(res => {
        this.setState({ locations: res.data, loaded: true });
      })
      .catch( error => {
        this.props.dispatch(setFlash('Error Getting Locations.', 'error'));
    });
  }

  displayLocations = () => {
    return this.state.locations.entries.map( location => {
      console.log(location)
      return(
        <Grid.Column key={location.id} width={4}>
          <Card>
            <Card.Content header={location.name} />
            <Card.Content description={`Country: ${location.country.display_name}`} />
            <Card.Content extra>
            </Card.Content>
          </Card>
        </Grid.Column>
      );
    });
  }

  display = () => {
    if(this.state.loaded)
      return(
        <Segment basic textAlign='center'>
          <Header as='h1'  style={styles.white}>All Locations</Header>
          <Grid centered>
            { this.displayLocations() }
          </Grid>
        </Segment>
      );
    else
      return(
        <Header as='h1'>Loading Locations...</Header>
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

export default connect()(Locations);
