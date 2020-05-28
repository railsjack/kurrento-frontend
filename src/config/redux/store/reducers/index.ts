import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
// @ts-ignore
import {createBrowserHistory} from 'history';
import {ObserveReducer} from "../../../../modules/_CommonModels/ViewModelBase";

const history = createBrowserHistory();
const RootReducer = combineReducers({
  router: connectRouter(history),
  ObserveReducer
});

export default RootReducer;
export {history};
