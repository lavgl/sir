import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Navbar as BsNavbar, Nav, MenuItem, NavDropdown } from 'react-bootstrap';

import {
  openFile,
  saveFile,

  OPEN_FILE,
  SAVE_FILE
} from 'actions/Files';

const handlers = {
  [OPEN_FILE]: openFile,
  [SAVE_FILE]: saveFile
}

const createMenuHandler = dispatch => eventKey => {
  const handler = handlers[eventKey];

  if (!handler) {
    throw new Error('No handler for event key', eventKey);
  }

  dispatch(handler());
};

const mapDispatchToProps = dispatch => {
  return {
    handleSelect: createMenuHandler(dispatch)
  };
};

@connect(null, mapDispatchToProps)
class Navbar extends PureComponent {
  static propTypes = {};

  render() {
    return (
      <BsNavbar onSelect = {this.props.handleSelect}>
        <Nav>
          <NavDropdown eventKey = {1} title = 'Меню' id = 'menu'>
            <MenuItem eventKey = {OPEN_FILE}>Открыть файл</MenuItem>
            <MenuItem eventKey = {SAVE_FILE}>Сохранить файл</MenuItem>
          </NavDropdown>
        </Nav>
      </BsNavbar>
    );
  }
}

export default Navbar;
