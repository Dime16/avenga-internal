export const userRegistrationOrderLifecycle = {
    async beforeCreate(event: any) {
        const totalUsers = await strapi.db.query('plugin::users-permissions.user').count();
        event.params.data.registrationOrder = BigInt(totalUsers + 1);
    },
};