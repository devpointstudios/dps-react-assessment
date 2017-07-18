import React from 'react';
import { Segment, Grid, Header } from 'semantic-ui-react';
import SearchResults from './SearchResults';

const Search = () => (
  <Segment inverted>
    <Header as='h1'>Search The Bar</Header>
    <Grid stretched relaxed centered textAlign='center' columns={12}>
      <Grid.Column width={4} stretched>
        <SearchResults type='All' />
      </Grid.Column>
      <Grid.Column width={4} stretched>
        <SearchResults type='Beers' />
      </Grid.Column>
      <Grid.Column width={4} stretched>
        <SearchResults type='Breweries' />
      </Grid.Column>
    </Grid>
  </Segment>
);

export default Search;
