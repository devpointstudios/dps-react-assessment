import React from 'react';
import axios from 'axios';
import { Segment, Image, Card, Grid, Header, Divider, Dimmer, Loader, Button } from 'semantic-ui-react';
import styled from 'styled-components';
import Scroll from './Scroll';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)`
  height: 500px !important;
  width: 100% !important;
`

class Breweries extends React.Component {
  state = { breweries: { entries: [], total_pages: 0, pages: 1 }, loading: false }

  componentDidMount() {
    this.getBreweries(1);
  }

  getBreweries = (page) => {
    axios.get(`/api/all_breweries?per_page=10&page=${page}`)
      .then( res => this.setState({ breweries: res.data, loading: false }) )
  }

  handlePageClick = (page) => {
    this.setState({ loading: true }, () => {
      this.getBreweries(page)
    });
  }

  render() {
    let { breweries, loading } = this.state;
    return (
      <Segment>
        <Pagination paginate={this.handlePageClick} numPages={breweries.total_pages} />
        { loading ?
          <Segment>
            <Dimmer active>
              <Loader />
            </Dimmer>
          </Segment> :
          <Grid>
            <Header as="h2" textAlign="center">Breweries</Header>
            <Grid.Row>
              { breweries.entries.map( brew => { 
                  let { id, name, description, images = {}, website } = brew;
                  return (
                    <Grid.Column computer={8} tablet={16} mobile={16} key={id}>
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
                          <div className="ui two buttons">
                            <Button basic>
                              { website ?
                                <a href={website} target="_blank" rel="noopener noreferrer">Website</a> :
                                <span>No Website Listed</span>
                              }
                            </Button>
                            <Button basic>
                              <Link to={`/breweries/${encodeURIComponent(name)}`}>More Info</Link>
                            </Button>
                          </div>
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

export default Breweries;
