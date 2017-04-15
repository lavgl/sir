import { Component, PropTypes } from 'react';
import { merge } from 'ramda';


const defaultStyle = {
  position: 'fixed',
  bottom: 0,
  width: '100%'
};

class Footer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.object
  };

  render() {
    const style = merge(defaultStyle, this.props.style);
    console.log('style', style);
    return (
      <div
        style = {style}
        children = {this.props.children}
      />
    );
  }
}

export default Footer;