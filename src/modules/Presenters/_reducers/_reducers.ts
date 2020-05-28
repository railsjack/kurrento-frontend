import * as ActionTypes from "../../../config/redux/store/action-types";

const initialState = {};

const User = (state = initialState, {type = '', payload = null}) => {
    switch (type) {
        case ActionTypes.SET_USERNAME:
            return Object.assign({}, state, {
                dashboardData: payload
            });
        default:
            return state;
    }
};

export default User;
