export default {
    routes: [
        {
            method: 'DELETE',
            path: '/delete-user',
            handler: 'delete-user.deleteMe',
            config: {
                auth: {
                    scope: [],
                },
                policies: [],
            },
        },
    ],
};