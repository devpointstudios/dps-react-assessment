import React from 'react';
import Beers from './Beers';
import Breweries from './Breweries';
import { Segment, Grid, Header } from 'semantic-ui-react';

const TheBar = () => (
  <Segment basic>
    <Header as='h1' textAlign='center' style={styles.white}>Welcome To The Bar</Header>
    <Grid>
      <Grid.Row>
        <Grid.Column computer={8} tablet={8} mobile={16}>
          <Segment inverted>
            <Beers />
          </Segment>
        </Grid.Column>
        <Grid.Column computer={8} tablet={8} mobile={16}>
          <Segment inverted>
            <Breweries />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);


const styles = {
  white: { color: 'white' },
}

export default TheBar;
