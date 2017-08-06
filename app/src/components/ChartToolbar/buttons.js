import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';

import {
  NONE_MODE,
  ADD_STANDARD_MODE,
  ADD_IMAGE_MODE
} from 'constants/Chart';

import { setChartToolbarMode } from 'actions/UI';

const ChartToolbarButton = (props) => (
  <Button
    active = {props.selected}
    onClick = {props.handleClick}
    style = {{ padding: 0, width: 24, height: 24, zIndex: 10 }}
  >
    {props.label}
  </Button>
);

const generatedButtons = [
  { label: 'N', mode: NONE_MODE },
  { label: 'S', mode: ADD_STANDARD_MODE },
  { label: 'I', mode: ADD_IMAGE_MODE }
].map(generateButtonForMode);

export const NoneModeButton = generatedButtons[0];
export const AddStandardModeButton = generatedButtons[1];
export const AddImageModeButton = generatedButtons[2];

function generateButtonForMode({ label, mode }) {
  function mapStateToProps(state, props) {
    const selected = state.UI.getIn(['charts', 'main', 'toolbarMode']) === mode;

    return {
      selected,
      label
    };
  }

  const action = setChartToolbarMode.bind(null, { name: 'main', mode });

  const mapDispatchToProps = {
    handleClick: action
  };

  return connect(mapStateToProps, mapDispatchToProps)(ChartToolbarButton);
}
