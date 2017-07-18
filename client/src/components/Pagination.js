import React from 'react';
import { Grid, Button, Icon, Divider } from 'semantic-ui-react';
import styled from 'styled-components';

const NoClick = styled(Button)`
  cursor: default !important;
`

class Pagination extends React.Component {
  state = { activePage: 1 }

  page = (activePage) => {
    this.setState({ activePage }, () => {
      this.props.paginate(this.state.activePage);
    })
  }

  render() {
    let { numPages } = this.props;
    let { activePage } = this.state;
    let canPrev = {};
    let canNext = {};
    canPrev.disabled = activePage === 1
    canNext.disabled = activePage === numPages

    return (
      <Grid.Column width={8}>
        <Button 
          basic 
          {...canPrev} 
          onClick={() => this.page (activePage - 1) }
        >
          <Icon name='chevron left' />
          Prev
        </Button>
        {activePage !== 1 && <Button basic onClick={ () => this.page(1) }>{1}</Button>}
        {activePage > 3 && numPages > 4 && <Button disabled>...</Button>}
        {activePage === numPages && numPages > 2 && numPages > 3 && <Button basic onClick={ () => this.page(numPages - 2) }>{numPages - 2}</Button>}
        {activePage > 2 && <Button basic onClick={ () => this.page(activePage - 1) }>{activePage - 1}</Button>}
        <NoClick>{activePage}</NoClick>
        {activePage < numPages && <Button basic onClick={ () => this.page(activePage + 1) }>{activePage + 1}</Button>}
        {activePage === 1 && numPages > 2 && <Button basic onClick={ () => this.page(activePage + 2) }>{3}</Button>}
        {numPages - 2 > activePage && numPages > 4 && <Button disabled>...</Button>}
        {numPages - 1 > activePage && numPages > 3 && <Button basic onClick={ () => this.page(numPages) }>{numPages}</Button>}
        <Button basic {...canNext} onClick={() => this.page(activePage + 1)}>Next<Icon name='chevron right' /></Button>
        <Divider hidden />
      </Grid.Column>
    )
  }
}

export default Pagination;
