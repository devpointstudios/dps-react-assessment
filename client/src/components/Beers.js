import React, { Component } from 'react';
import { setFlash } from '../actions/flash';
import { Segment, Grid, Item, Header, Divider, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

class Beers extends Component {
  state = { page: 1, beers: [], loaded: false, totalPages: 0 };

  componentDidMount() {
    axios.get(`/api/all_beers?page=${this.state.page}`)
      .then( res => {
        this.setState({ beers: res.data.entries, totalPages: res.data.total_pages, loaded: true });
      })
      .catch(error => {
        this.setState({ beers: [], loaded: true });
        this.props.dispatch(setFlash('Error Getting Beers.', 'error'));
    });
  }

  displayBeers = () => {
    return this.state.beers.map(beer => {
      return(
        <Segment key={beer.id} inverted>
          <Grid.Column computer={8} tablet={16} mobile={16}>
            <Item>
              <Item.Content>
                <Item.Header as='h3'>
                  <Link to={`/beer/${beer.name_display}`}>
                    {beer.name_display}
                  </Link>
                </Item.Header>
                <Item.Meta>
                  { beer.ibu &&
                    <div>
                      <span><strong>IBU:</strong> {beer.ibu}</span>
                      <br />
                    </div>
                  }
                  { beer.style &&
                    <div>
                      <span><strong>Style:</strong> {beer.style.category.name}</span>
                      <br />
                    </div>
                  }
                  { beer.glass && <span><strong>Recommended Glass Type:</strong> {beer.glass.name}</span> }
                </Item.Meta>
                {beer.description && <Item.Description><strong>Description:</strong> {beer.description}</Item.Description> }
                <Divider />
              </Item.Content>
            </Item>
          </Grid.Column>
        </Segment>
      )
    });
  }

  loadFunc = () => {
    const nextPage = this.state.page + 1;

    axios.get(`/api/all_beers?page=${nextPage}`)
      .then( res => {
        this.setState({ beers: [...this.state.beers, ...res.data.entries], page: nextPage });
      })
      .catch(error => {
        this.props.dispatch(setFlash('Error Getting More Beers. You Must Be Drunk!', 'error'));
    });
  }

  render() {
    const { loaded, page, totalPages } = this.state;

    return(
      <Segment basic textAlign='center'>
        {loaded ?
          <Segment inverted>
            <Header as='h1' style={styles.white}>Beers</Header>
            <Divider />
            <Segment basic style={styles.scroller}>
              <InfiniteScroll
                  pageStart={page}
                  loadMore={this.loadFunc}
                  hasMore={page < totalPages }
                  loader={<Header as='h1' textAlign='center' style={styles.white}>Loading More Brews...</Header>}
                  useWindow={false}
              >
                { this.displayBeers() }
              </InfiniteScroll>
            </Segment>
          </Segment> :
          <Segment inverted>
            <Header as='h1' style={styles.white}>Loading Beers</Header>
            <Icon loading name='spinner' />
          </Segment>
        }
      </Segment>
    );
  }
}

const styles = {
  white: { color: 'white' },
  scroller: { height: '60vh', overflow: 'auto' },
}

export default connect()(Beers);
