import React from 'react';
const Presenters = React.lazy(() => import('../modules/Presenters'));

const routes = [
  {path: '/presenters', name: 'Presenters', component: Presenters}
];

export default routes;
