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
import './scss/App.scss';

const SignIn = React.lazy(() => import('../User/Views/Login'));

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
                                <Route auth="true" path="/" name="Home"
                                       render={(props: any) => <DefaultLayout {...props}/>}/>
                                <Route exact path="/signin" name="Login Page"
                                       render={(props: any) => <SignIn {...props}/>}/>
                            </Switch>
                        </React.Suspense>
                    </ConnectedRouter>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
