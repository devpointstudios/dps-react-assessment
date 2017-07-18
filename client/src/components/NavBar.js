import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class NavBar extends Component {
  activeItem = (navPath) => {
    return navPath === this.props.location.pathname;
  }

  render() {
    return (
      <div>
        <Menu pointing>
          <Link to='/'>
            <Menu.Item name='Home' active={this.activeItem('/')} />
          </Link>
          <Link to='/the_bar'>
            <Menu.Item name='The Bar' active={this.activeItem('/the_bar')} />
          </Link>
          <Link to='/search'>
            <Menu.Item name='Search The Bar' active={this.activeItem('/search')} />
          </Link>
          <Link to='/random_beer'>
            <Menu.Item name='Random Beer' active={this.activeItem('/random_beer')} />
          </Link>
          <Link to='/locations'>
            <Menu.Item name='Locations' active={this.activeItem('/locations')} />
          </Link>
          <Menu.Menu position='right'>
            <Link to='/'>
              <Menu.Item name='DPS React Assessment' />
            </Link>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

export default withRouter(NavBar);
