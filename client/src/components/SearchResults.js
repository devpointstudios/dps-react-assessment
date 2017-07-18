import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Segment, Input, Header } from 'semantic-ui-react';

class SearchResults extends Component {
  state = { results: { entries: [], page: 1, total_pages: 1 }, value: '' };

  search = (value, page = 1, paginate = false) => {
    if(!paginate)
      this.setState({ results: { entries: [], page: 1, total_pages: 1 } });
    let url = '';
    if(value.length >= 3) {
      switch(this.props.type) {
        case 'All':
          url = `/api/search_all?query=${value}&page=${page}`;
          break;
        case 'Beers':
          url = `/api/search_beers?query=${value}&page=${page}`;
          break;
        case 'Breweries':
          url = `/api/search_breweries?query=${value}&page=${page}`;
          break;
        default:
          url = `/api/search_all?query=${value}&page=${page}`;
      }
      axios.get(url)
        .then( res => {
          this.setState({ results: {...res.data, entries: [...this.state.results.entries, ...res.data.entries]}, value });
      })
    }
  }

  display = () => {
    return this.state.results.entries.map(result => {
      return(<div key={result.id} style={styles.white}>{result.name}</div>)
    });
  }

  render() {
    const { results: { page, total_pages: totalPages }, value } = this.state;
    const { type } = this.props;

    return(
      <Segment basic textAlign='center'>
        <Header as='h2' style={styles.white}>Search {type}</Header>
        <Input placeholder='Search Term' onChange={(e) => this.search(e.target.value)} />
        <Segment basic style={styles.scroller}>
          <InfiniteScroll
              pageStart={page}
              loadMore={() => this.search(value, page + 1, true)}
              hasMore={page < totalPages}
              loader={<Header as='h1' textAlign='center' style={styles.white}>Loading More Search Results...</Header>}
              useWindow={false}
          >
            { this.display() }
          </InfiniteScroll>
        </Segment>
      </Segment>
    );
  }
}

const styles = {
  white: { color: 'white' },
  scroller: { height: '60vh', overflow: 'auto' },
}

export default connect()(SearchResults);
