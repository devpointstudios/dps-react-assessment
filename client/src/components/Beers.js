import React from 'react';
import axios from 'axios';
import { Segment, Card, Grid, Divider, Dimmer, Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import Scroll from './Scroll';
import Pagination from './Pagination';

const StyledCard = styled(Card)`
  height: 500px !important;
`

class Beers extends React.Component {
  state = { beers: { entries: [], total_pages: 0, page: 1 }, loading: true }

  componentDidMount() {
    this.getBeers(1)
  }

  getBeers = (page) => {
    axios.get(`/api/all_beers?per_page=10&page=${page}`)
      .then( res => this.setState({ beers: res.data, loading: false }) )
  }

  handlePageClick = (page) => {
    this.setState({ loading: true }, () => {
      this.getBeers(page)
    });
  }

  render() {
    let { beers, loading } = this.state;
    return (
      <Segment>
        <Pagination paginate={this.handlePageClick} numPages={beers.total_pages} />
        { loading ? 
          <Segment>
            <Dimmer active>
              <Loader />
            </Dimmer>
          </Segment> :
          <Grid>
            <Grid.Row>
            { beers.entries.map( beer => { 
                let { 
                  id, 
                  name, 
                  abv, 
                  description, 
                  style: { category: { name: catName } = {} } = {}
                } = beer; 
                return (
                  <Grid.Column key={id} computer={4} tablet={16} mobile={16}>
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
        }
      </Segment>
    )
  }
}

export default Beers;
