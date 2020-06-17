import React, {Component} from 'react';
// @ts-ignore
import {Redirect, Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
// @ts-ignore
import {createBrowserHistory} from 'history';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import store, {persistor} from '../../config/redux/store';
import * as action from '../../config/redux/store/actions';
import './scss/App.scss';
import Presenters from "../Presenters";
const SignIn = React.lazy(() => import('../User/Views/Login'));
const Home = React.lazy(() => import('../Home/Views/Home'));
const Events = React.lazy(() => import('../Events/Views/AddEvents'));
const Organization = React.lazy(() => import('../Organizations/Views/AddOrganization'));

const DefaultLayout = React.lazy(() => import('../../navigation/DefaultLayout'));

export const history = createBrowserHistory();

const loading = () =>
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"/>
  </div>;


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ConnectedRouter history={history}>
            <ToastContainer/>
            <React.Suspense fallback={loading()}>
              <Switch>
                <Route exact path="/" name="Home Page" render={(props: any) => <DefaultLayout {...props}/>}/>
                <Route exact path="/presenters" name="Home Page" render={(props: any) => <Presenters {...props}/>}/>
                <Route exact path="/signin" name="Login Page" render={(props: any) => <SignIn {...props}/>}/>
                <Route exact path="/home" name="Home Page" render={(props: any) => <Home {...props}/>}/>
                <Route exact path="/events/new" name="Events Page" render={(props: any) => <Events {...props}/>}/>
                <Route exact path="/events/:id/edit" name="Events Page" render={(props: any) => <Events {...props}/>}/>
                <Route exact path="/organization/new" name="Organization Page" render={(props: any) => <Organization {...props}/>}/>
                <Route exact path="/organization/:id/edit" name="Organization Page" render={(props: any) => <Organization {...props}/>}/>
              </Switch>
            </React.Suspense>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
