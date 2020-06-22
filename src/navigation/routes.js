import React from 'react';

const AddEvent = React.lazy(() => import('../modules/Events/Views/AddEvents'));
const ListEvents = React.lazy(() => import('../modules/Events/Views/ListEvents'));
const LiveEvent = React.lazy(() => import('../modules/Events/Views/LiveEvent'));
const EventRoom = React.lazy(() => import('../modules/Presenters/Views/Room'));
const Home = React.lazy(() => import('../modules/Home/Views/Home'));
const AddOrganization = React.lazy(() => import('../modules/Organizations/Views/AddOrganization'));
const ListOrganization = React.lazy(() => import('../modules/Organizations/Views/ListOrganization'));
const routes = [
    {path: '/',exact:true,name:'Home'},
    {path: '/home', name: 'home', component: Home},
    {path: '/events/new', name: 'Events', component: AddEvent},
    {path: '/events/list', name: 'Events', component: ListEvents},
    {path: '/events/:id/edit', name: 'Events', component: AddEvent},
    {path: '/events/:id/:username/live', name: 'Events', component: EventRoom},
    {path: '/organization/new', name: 'Organization', component: AddOrganization},
    {path: '/organization/:id/edit', name: 'Organization', component: AddOrganization},
    {path: '/organization/list', name: 'Organization', component: ListOrganization},
];

export default routes;
