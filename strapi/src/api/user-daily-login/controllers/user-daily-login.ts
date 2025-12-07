import {Context} from 'koa';

export default {
    async record(ctx: Context) {
        const user = ctx.state.user;

        if (!user || !user.id) {
            return ctx.unauthorized("User not authenticated.");
        }

        const userId = user.id;
        const today = new Date().toISOString().slice(0, 10);

        // check if we've already recorded today’s login
        const exists = await strapi.db
            .query('api::user-daily-login.user-daily-login')
            .findOne({where: {user: userId, date: today}});

        if (!exists) {
            await strapi.entityService.create("api::user-daily-login.user-daily-login", {
                data: {
                    user: user.id,
                    date: today,
                },
                populate: ["user"],
            });
        }

        const loginCount = await strapi.db
            .query('api::user-daily-login.user-daily-login')
            .count({where: {user: userId}});

        ctx.body = {loginCount};
    },
};