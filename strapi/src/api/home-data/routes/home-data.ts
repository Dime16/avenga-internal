module.exports = {
    routes: [
        {
            method: "GET",
            path: "/initial-home-data",
            handler: "home-data.getInitialData",
            config: {
                auth: false,
            },
        },
    ],
};