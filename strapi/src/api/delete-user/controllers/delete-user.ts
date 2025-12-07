import { Context } from 'koa';

export default {
    async deleteMe(ctx: Context) {
        const user = ctx.state.user;

        if (!user) {
            return ctx.unauthorized('You must be logged in.');
        }

        try {
            await strapi.entityService.delete('plugin::users-permissions.user', user.id);
            ctx.send({ message: 'Your account has been deleted.' });
        } catch (err) {
            strapi.log.error('Error deleting user:', err);
            ctx.throw(500, 'Could not delete your account.');
        }
    },
};