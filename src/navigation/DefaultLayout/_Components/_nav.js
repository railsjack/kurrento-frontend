//https://marcoceppi.github.io/bootstrap-glyphicons/
export default {
    items: [
        {
            name: 'Organization',
            icon: 'fa fa-group',
            children: [
                {
                    name: 'Add Organization',
                    icon: 'icon-note',
                    url: '/organization/new/'
                },

                {
                    name: 'List Organizations',
                    icon: 'icon-list',
                    url: '/organization/list/'
                }
            ]
        },
        {
            name: 'Events',
            icon: 'fa fa-calendar',
            children: [
                {
                    name: 'Add Event',
                    url: '/events/new/',
                    icon: 'nav-icon icon-note',
                },
                {
                    name: 'List Events',
                    url: '/events/list/',
                    icon: 'nav-icon icon-list',
                }
            ],
        },

        {
            name: 'Rooms',
            icon: 'fa fa-video-camera',
            url: '/presenters'
        }
    ]
};

