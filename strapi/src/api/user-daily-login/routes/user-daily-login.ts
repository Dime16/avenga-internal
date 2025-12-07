export default {
    routes: [
        {
            method: 'POST',
            path: '/user-daily-login/record',
            handler: 'user-daily-login.record',
            config: {
                auth: {
                    scope: [],
                },
                policies: [],
            },
        },
    ],
};