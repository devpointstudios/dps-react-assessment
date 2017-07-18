import React from 'react';
import axios from 'axios';
import { Table, Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { fixKey } from '../utils/nameHelpers';

class Beer extends React.Component {
  state = { 
    beer: { 
      style: { category: {} }, 
      glass: {} 
    } 
  }

  componentDidMount() {
    let { name } = this.props.match.params
    axios.get(`/api/beer/${name}`)
      .then( res => this.setState({ beer: res.data.entries[0] }) )
  }

  styleRows = (styles) => {
    return Object.keys(styles).map( (s, i) => {
      return (
        <Table.Row key={i}>
          <Table.Cell>{fixKey(s)}</Table.Cell>
          <Table.Cell>{styles[s]}</Table.Cell>
        </Table.Row>
      )
    });
  }

  render() {
    let { 
      abv,
      description,
      glass: { name: glassType },
      is_organic,
      name, 
      status_display,
      style: { 
        create_date, 
        category: { name: catName }, 
        id,
        name: styleName,
        update_date,
        ...styles
      },
    } = this.state.beer
    return (
      <div>
        <Divider hidden />
        <Table definition>
          <Table.Header>
            <Table.Row>
              <Table.Cell></Table.Cell>
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
            <Table.Row>
              <Table.Cell>ABV</Table.Cell>
              <Table.Cell>{abv}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Glass</Table.Cell>
              <Table.Cell>{glassType}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Organic?</Table.Cell>
              <Table.Cell>{is_organic === 'N' ? 'No' : 'Yes' }</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Status</Table.Cell>
              <Table.Cell>{status_display}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Table definition>
          <Table.Header>
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.HeaderCell textAlign="center">
                Style
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>{styleName}</Table.Cell>
            </Table.Row>
            { this.styleRows(styles) }
          </Table.Body>
        </Table>
        <Button basic color='blue' size="massive" fluid>
          <Link to="/beers">See All Beers</Link>
        </Button>
      </div>
    )
  }
}

export default Beer;
