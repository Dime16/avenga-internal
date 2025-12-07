export default {
    type: "content-api",
    routes: [
        {
            method: "POST",
            path: "/bible-study/increment",
            handler: "api::bible-study-entry.custom.increment",
            config: {
                auth: {
                    scope: [],
                },
                policies: [],
            },
        },
        {
            method: "GET",
            path: "/bible-study/count",
            handler: "api::bible-study-entry.custom.count",
            config: {
                auth: false,
                policies: [],
            },
        },
        {
            method: "GET",
            path: "/bible-study/mine",
            handler: "api::bible-study-entry.custom.getLoggedInUserBibleStudyEntries",
            config: {
                auth: {
                    scope: [],
                },
                policies: [],
            },
        },
    ],
};