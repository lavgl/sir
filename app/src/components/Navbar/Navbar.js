import { PureComponent } from 'react';

import { Navbar as BsNavbar, Nav, MenuItem, NavDropdown } from 'react-bootstrap';

class Navbar extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <BsNavbar onSelect = {(eventKey) => console.log('event key', eventKey)}>
        <Nav>
          <NavDropdown eventKey = {1} title = 'Меню' id = 'menu'>
            <MenuItem eventKey = {1.1}>action 1</MenuItem>
            <MenuItem eventKey = {1.2}>action 2</MenuItem>
          </NavDropdown>
        </Nav>
      </BsNavbar>
    );
  }
}

export default Navbar;
