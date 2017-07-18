import React, { Component } from 'react';
import { setFlash } from '../actions/flash';
import { connect } from 'react-redux';
import { Segment, Header, Icon, Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Beer extends Component {
  state = { beer: {}, loaded: false };

  componentDidMount() {
    if(this.props.display)
      this.setState({ beer: this.props.beer, loaded: true })
    else
      axios.get(`/api/beer/${this.props.match.params.name}`)
        .then(res => {
          this.setState({ beer: res.data.entries[0], loaded: true })
        })
        .catch(error => {
          this.setState({ beer: {}, loaded: true });
          this.props.dispatch(setFlash('Error Getting Beer.', 'error'));
      });
  }

  render() {
    const { beer, loaded } = this.state;
    return(
      <Segment basic>
        { loaded ?
          <Segment basic textAlign='center'>
            <Header as='h1' style={styles.white}>Check It Out!</Header>
            <Card raised fluid centered>
              <Card.Content as='h1' header={beer.name} />
              <Card.Content description={beer.description} />
              <Card.Content extra>
                <Header as='h3'>Glass</Header>
                { beer.glass ? beer.glass.name : 'N/A' }
              </Card.Content>
              <Card.Content extra>
                <Header as='h3'>Organic?</Header>
                {beer.is_organic === 'N' ? 'No' : 'Yes'}
              </Card.Content>
              <Card.Content extra>
                <Header as='h3'>Style</Header>
                { beer.style ? beer.style.name : 'N/A' }
              </Card.Content>
              <Card.Content extra>
                <Header as='h3'>Style Description</Header>
                { beer.style ? beer.style.description : 'N/A' }
              </Card.Content>
            </Card>
            <Segment basic textAlign='center'>
              <Link to='/the_bar'>
                <Button primary>Back To The Bar</Button>
              </Link>
            </Segment>
          </Segment> :
          <Segment inverted textAlign='center'>
            <Header as='h1' style={styles.white}>Loading Beer...</Header>
            <Icon loading name='spinner' />
          </Segment>
        }
      </Segment>
    );
  }
}

const styles = {
  white: { color: 'white' },
  centered: { margin: '0 auto' },
}

export default connect()(Beer);
