import React from 'react';
import axios from 'axios';
import { Segment, Image, Card, Grid, Header, Divider } from 'semantic-ui-react';
import styled from 'styled-components';
import Scroll from './Scroll';

const StyledCard = styled(Card)`
  height: 500px !important;
  width: 100% !important;
`

class Breweries extends React.Component {
  state = { breweries: { entries: [] }}

  componentDidMount() {
    axios.get('/api/all_breweries')
      .then( res => this.setState({ breweries: res.data }) )
  }

  render() {
    let { breweries } = this.state;
    return (
      <Segment>
        <Grid>
          <Header as="h2" textAlign="center">Breweries</Header>
          <Grid.Row>
            { breweries.entries.map( brew => { 
                let { id, name, description, images = {}, website } = brew;
                return (
                  <Grid.Column computer={8} key={id}>
                    <StyledCard>
                      <Divider hidden />
                      <Image src={images.large} />
                      <Divider hidden />
                      <Card.Content>
                        <Card.Header>
                          { name }
                        </Card.Header>
                        <Card.Meta>
                          <Scroll height="100px">
                            { description || 'No Description' }
                          </Scroll>

                        </Card.Meta>
                      </Card.Content>
                      <Card.Content extra>
                        { website ?
                          <a href={website} target="_blank" rel="noopener noreferrer">Website</a> :
                          <span>No Website Listed</span>
                        }
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

export default Breweries;
