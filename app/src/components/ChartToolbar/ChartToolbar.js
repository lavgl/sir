import React from 'react';

import {
  NoneModeButton,
  AddStandardModeButton,
  AddImageModeButton
} from './buttons';

const buttonsLayout = [
  <NoneModeButton key = 'noneMode' />,
  <AddStandardModeButton key = 'standardMode' />,
  <AddImageModeButton key = 'imageMode' />
];

const style = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
};

const ChartToolbar = (props) => {
  return (
    <div style = {style.wrapper}>
      {props.buttons}
    </div>
  );
}

export default ChartToolbar;

export const ChartToolbarWithButtons = () => <ChartToolbar buttons = {buttonsLayout} />;
