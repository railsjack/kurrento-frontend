import {LOADING} from '../../../config/redux/store/action-types';

const initialState = {
  isLoading: false
};
export default (state = initialState, {type, status}) => {
  switch (type) {
    case LOADING:
      return {...state, isLoading: status};
    default:
      return state;
  }
};

