import * as ActionTypes from '../../../config/redux/store/action-types';

const initialState = {
  component: ''
}

const LayoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_ASIDE_COMPONENT:
      return {...state, component: action.payload};
    default:
      return state;
  }
}

export default LayoutReducer;
