'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const history = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      cloneState = {};
    } else if (action.type === 'addProperties') {
      cloneState = {
        ...cloneState,
        ...action.extraData,
      };
    } else if (action.type === 'removeProperties') {
      const newState = { ...cloneState };

      for (const key of action.keysToRemove) {
        delete newState[key];
      }

      cloneState = newState;
    }

    history.push({ ...cloneState });
  }

  return history;
}

module.exports = transformStateWithClones;
