import React from 'react';

const Events = React.lazy(() => import('../modules/Events/Views/AddEvents'));
const Presenters = React.lazy(() => import('../modules/Presenters'));
const SignIn = React.lazy(() => import('../modules/User/Views/Login'));
const SignUp = React.lazy(() => import('../modules/User/Views/Login'));
const Home = React.lazy(() => import('../modules/Home/Views/Home'));
const AddOrganization = React.lazy(() => import('../modules/Organizations/Views/AddOrganization'));
const ListOrganization = React.lazy(() => import('../modules/Organizations/Views/ListOrganization'));
const routes = [
    {path: '/',exact:true,name:'Home'},
    {path: '/presenters', name: 'Presenters', component: Presenters},
    {path: '/home', name: 'home', component: Home},
    {path: '/events/new', name: 'Events', component: Events},
    {path: '/events/:id/edit', name: 'Events', component: Events},
    {path: '/organization/new', name: 'Organization', component: AddOrganization},
    {path: '/organization/:id/edit', name: 'Organization', component: AddOrganization},
    {path: '/organization/list', name: 'Organization', component: ListOrganization},
];

export default routes;
