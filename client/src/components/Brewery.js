import React from 'react';
import axios from 'axios';
import { Table, Button, Divider, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fixKey } from '../utils/nameHelpers';

class Brewery extends React.Component {
  state = { brewery: { images: {} }}

  componentDidMount() {
    let { name } = this.props.match.params
    axios.get(`/api/brewery/${name}`)
      .then( res => this.setState({ brewery: res.data.entries[0] }) )
  }

  tableRows = (attrs) => {
    return Object.keys(attrs).map( (a, i) => {
      return (
        <Table.Row key={i}>
          <Table.Cell>{fixKey(a)}</Table.Cell>
          <Table.Cell>{attrs[a]}</Table.Cell>
        </Table.Row>
      )
    });
  }

  render() {
    let { 
      name,
      description,
      create_date,
      id,
      images,
      name_short_display,
      status,
      update_date,
      ...rest
    } = this.state.brewery;
    return (
      <div>
        <Divider hidden />
        <Table definition>
          <Table.Header>
            <Table.Row>
              <Table.Cell>
                <Image src={images.icon} />
              </Table.Cell>
              <Table.HeaderCell textAlign="center">
                { name }
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Description</Table.Cell>
              <Table.Cell>{description}</Table.Cell>
            </Table.Row>
            { this.tableRows(rest) }
          </Table.Body>
        </Table>
        <Button basic color='blue' size="massive" fluid>
          <Link to="/breweries">See All Breweries</Link>
        </Button>
      </div>
    )
  }
}

export default Brewery;
