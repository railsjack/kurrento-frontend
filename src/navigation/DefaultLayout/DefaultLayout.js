import React, {Component, Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Container} from "reactstrap";
import * as actions from "../../config/redux/store/actions";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import navigation from "./_Components/_nav";
// routes config
import routes from "../routes";
import {Observable} from "../../modules/_CommonModels/ViewModelBase";

const DefaultFooter = React.lazy(() => import("./_Components/DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./_Components/DefaultHeader"));

class DefaultLayout extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">
      <div className="sk-spinner sk-spinner-pulse" />
    </div>
  );

  signOut(e) {
    e.preventDefault();
    if(window.FB) window.FB.logout();
    this.props.history.push("/signin");
    // this.props.dispatch(actions.authLogout());
  }
  removeASidebar() {
    document.body.classList.remove('aside-menu-lg-show');
  }
  componentDidMount() {
    if(!Observable.getReduxValue('userDetails')){
      this.props.history.push('/signin');
    }
  }

  render() {
    // If user is already authenticated we redirect to dashboard.
    //@HP
    const {history, location, match, staticContext} = this.props;
    const props = {history, location, match, staticContext};
    let defaultNavigation = <AppSidebarNav navConfig={navigation} {...props} />;

    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader/>
            <AppSidebarForm/>
            <Suspense>
              {/* <AppSidebarNav navConfig={navigation} {...this.props} /> */}
              {defaultNavigation}
            </Suspense>
            <AppSidebarFooter/>
            <AppSidebarMinimizer/>
          </AppSidebar>
          <main className="main">

            {/* <AppBreadcrumb appRoutes={routes} /> */}
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch onChange={this.removeASidebar}>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/events/list/"/>
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter/>
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}
export default DefaultLayout;
