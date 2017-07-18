import React, { Component } from 'react';
import { setFlash } from '../actions/flash';
import { Segment, Grid, Item, Header, Divider, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

class Breweries extends Component {
  state = { page: 1, breweries: [], loaded: false, totalPages: 0  };

  componentDidMount() {
    axios.get(`/api/all_breweries?page=${this.state.page}`)
      .then( res => {
        this.setState({ breweries: res.data.entries, loaded: true, totalPages: res.data.total_pages });
      })
      .catch(error => {
        this.setState({ breweries: [], loaded: true });
        this.props.dispatch(setFlash('Error Getting Breweries.', 'error'));
    });
  }

  displayBreweries = () => {
    return this.state.breweries.map(brewery => {
      return(
        <Segment key={brewery.id} inverted>
          <Grid.Column computer={8} tablet={16} mobile={16}>
            <Item>
              <Item.Content>
                <Item.Header as='h3'>
                  {brewery.images && <Image centered src={brewery.images.icon} alt='Brewery Thumb' /> }
                  <Link to={`/brewery/${encodeURIComponent(brewery.name)}`}>
                    {brewery.name}
                  </Link>
                </Item.Header>
                <Item.Meta>
                  { brewery.brand_classification &&
                    <div>
                      <span><strong>Brewery Classification:</strong> {brewery.brand_classification}</span>
                      <br />
                    </div>
                  }
                  { brewery.status &&
                    <div>
                      <span><strong>Status:</strong> {brewery.status}</span>
                      <br />
                    </div>
                  }
                  { brewery.website &&
                    <span>
                      <strong>Website:</strong>
                      &nbsp;
                      <a href={brewery.website} target='_blank' alt={`${brewery.name} Website`}>
                        {brewery.website}
                      </a>
                    </span>
                  }
                </Item.Meta>
                <br />
                {brewery.description && <Item.Description><strong>Description:</strong> {brewery.description}</Item.Description> }
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

    axios.get(`/api/all_breweries?page=${nextPage}`)
      .then( res => {
        this.setState({ breweries: [...this.state.breweries, ...res.data.entries], page: nextPage });
      })
      .catch(error => {
        this.props.dispatch(setFlash('Error Getting More Breweries. You Must Be Drunk!', 'error'));
    });
  }

  render() {
    const { page, loaded, totalPages } = this.state;

    return(
      <Segment basic textAlign='center'>
        {loaded ?
          <Segment inverted>
            <Header as='h1' style={styles.white}>Breweries</Header>
            <Divider />
            <Segment basic style={styles.scroller}>
              <InfiniteScroll
                  pageStart={page}
                  loadMore={this.loadFunc}
                  hasMore={page < totalPages }
                  loader={<Header as='h1' textAlign='center' style={styles.white}>Loading More Breweries...</Header>}
                  useWindow={false}
              >
                { this.displayBreweries() }
              </InfiniteScroll>
            </Segment>
          </Segment> :
          <Segment inverted>
            <Header as='h1' style={styles.white}>Loading Breweries</Header>
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

export default connect()(Breweries);
