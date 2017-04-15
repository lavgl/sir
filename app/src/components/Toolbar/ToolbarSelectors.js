import { createSelector } from 'reselect';

const toolbar = (state) => state.UI.get('toolbar');
const state = (state) => state;

export function createDisplaySelector(toolbarConfig) {
  return createSelector(
    [state, toolbar],
    (state, toolbar) => {
      const mode = toolbar.get('mode');
      return toolbarConfig[mode](state);
    }
  );
}