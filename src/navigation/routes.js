import React from 'react';

const Events = React.lazy(() => import('../modules/Events/Views/AddEvents'));
const Presenters = React.lazy(() => import('../modules/Presenters'));
const SignIn = React.lazy(() => import('../modules/User/Views/Login'));
const SignUp = React.lazy(() => import('../modules/User/Views/Login'));
const Home = React.lazy(() => import('../modules/Home/Views/Home'));
const Organization = React.lazy(() => import('../modules/Organizations/Views/AddOrganization'));

const routes = [
    {path: '/presenters', name: 'Presenters', component: Presenters},
    {path: '/signin', name: 'signin', component: SignIn},
    {path: '/home', name: 'home', component: Home},
    {path: '/events/new', name: 'Events', component: Events},
    {path: '/events/:id/edit', name: 'Events', component: Events},
    {path: '/organization/new', name: 'Organization', component: Organization},
    {path: '/organization/:id/edit', name: 'Organization', component: Organization},
    {path: '/signup', name: 'singup', component: SignUp},
    {path: '/create_room', name: 'Create Room', component: SignIn},
];

export default routes;
