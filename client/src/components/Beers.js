import React from 'react';
import axios from 'axios';
import { Segment, Image, Card, Grid, Divider } from 'semantic-ui-react';
import styled from 'styled-components';
import Scroll from './Scroll';

const StyledCard = styled(Card)`
  height: 500px !important;
`

class Beers extends React.Component {
  state = { beers: { entries: [] } }

  componentDidMount() {
    axios.get('/api/all_beers')
      .then( res => this.setState({ beers: res.data }) )
  }

  render() {
    let { beers } = this.state;
    return (
      <Segment>
        <Grid>
          <Grid.Row>
          { beers.entries.map( beer => { 
              let { id, name, abv, description, style: { category: { name: catName }}} = beer; 
              return (
                <Grid.Column key={id} computer={4}>
                  <StyledCard>
                    <Card.Content>
                      <Card.Header>
                        { name }
                      </Card.Header>
                      <Card.Meta>
                        <Divider />
                        <Scroll>
                          {description}
                        </Scroll>
                        <Divider />
                        ABV: {abv}
                        <Divider />
                        Category: {catName}
                      </Card.Meta>
                    </Card.Content>
                  </StyledCard>
                  <Divider hidden />
                </Grid.Column>
              )
            })
          }
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default Beers;
