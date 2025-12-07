import { userRegistrationOrderLifecycle } from './lifecycles/userRegisterCount';
import { customRegister } from './extensions/users-permissions/controllers/auth';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user'],
      ...userRegistrationOrderLifecycle,
    });
    strapi.plugin('users-permissions').controller('auth').register = customRegister;
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap() {},
};