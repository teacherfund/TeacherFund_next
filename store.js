import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const exampleInitialState = {
  drawerOpen: false,
}

export const actionTypes = {
  DRAWEROPEN: 'DRAWEROPEN',
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.DRAWEROPEN:
      return Object.assign({}, state, {
        drawerOpen: action.drawerOpen,
      })
    default: return state
  }
}

// ACTIONS
export const drawerOpen = (drawerOpen) => dispatch => {
  return dispatch({ type: actionTypes.DRAWEROPEN, drawerOpen: isServer })
}

export function initializeStore (initialState = exampleInitialState) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}