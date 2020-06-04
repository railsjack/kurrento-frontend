import React from 'react';
const Presenters = React.lazy(() => import('../modules/Presenters'));
const Login = React.lazy(() => import('../modules/Login'));

const routes = [
  {path: '/presenters', name: 'Presenters', component: Presenters},
  {path: '/login', name: 'Presenters', component: Login}
];

export default routes;
