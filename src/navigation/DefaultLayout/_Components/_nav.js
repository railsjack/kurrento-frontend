//https://marcoceppi.github.io/bootstrap-glyphicons/
export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-user'
    },
    {
      name: 'Client',
      icon: 'fa fa-users',
      children: [
        {
          name: 'Search Client',
          url: '/searchClient',
          icon: 'nav-icon icon-note',
        },
        {
          name: 'Add Client',
          url: '/addClient',
          icon: 'nav-icon icon-note',
        }
      ],
    },
    {
      name: 'Company',
      icon: 'fa fa-building',
      children: [
        {
          name: 'Add Company',
          url: '/companies/new',
          icon: 'nav-icon icon-note',
        },
        {
          name: 'Search Company',
          url: '/search-company',
          icon: 'nav-icon icon-note',
        }
      ],
    },
    {
      name:'Settings',
      icon:'fa fa-cog',
      children:[
        {
          name: 'Mange Group',
          icon: 'nav-icon icon-folder',
          children: [
            {
              name: 'Add Group',
              url: '/settings/group/add-group',
              icon: 'nav-icon icon-people',
            }
          ],
        },
        {
          name: 'Mange User',
          icon: 'nav-icon icon-folder',
          children: [
            {
              name: 'User List',
              url: '/settings/users/user-list',
              icon: 'nav-icon icon-user',
            }
          ],
        }
      ]
    }
  ]
};

