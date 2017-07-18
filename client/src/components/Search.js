import React from 'react';
import { Input } from 'semantic-ui-react';

class Search extends React.Component {
  state = { term: '' }

  handleChange = (e) => {
    let { value } = e.target;
    this.setState({ term: value })
    if (value.length > 2 || value.length === 0)
      this.props.updateResults(value)
  }

  render() {
    return (
      <Input
        fluid
        value={this.state.term}
        onChange={this.handleChange}
        placeholder="search"
      />
    )
  }
}

export default Search;
