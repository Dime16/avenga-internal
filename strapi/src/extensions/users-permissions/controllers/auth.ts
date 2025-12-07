import _ from 'lodash';
import {Context} from 'koa';
import {isArray, compact, concat} from 'lodash';
import leoProfanity from 'leo-profanity';
import validator from 'validator';

/**
 * Sanitizes a user object according to the defined schema and context authentication.
 * This function ensures that the sensitive or restricted user information is filtered
 * based on the provided schema and the authentication context.
 *
 * @param {Object} user - The user object to sanitize.
 * @param {Object} ctx - The context object containing request-specific information, including state and authentication data.
 * @returns {Object} The sanitized user object.
 */
const sanitizeUser = (user, ctx) => {
    const {auth} = ctx.state;
    const userSchema = strapi.getModel('plugin::users-permissions.user');

    return strapi.contentAPI.sanitize.output(user, userSchema, {auth});
};

/**
 * Validates the registration body by ensuring the presence of a valid email address
 * and a password that meets the minimum length requirement specified in the configuration.
 * If validation fails, it sends a corresponding bad request response.
 *
 * @param {any} body - The request body containing the registration data, which typically includes email and password.
 * @param {any} config - The configuration object containing validation rules, such as password minimum length.
 * @param {Context} ctx - The context object used to handle the request and send error responses.
 * @return {Promise<void>} Resolves if the validation succeeds. Sends a bad request response if validation fails.
 */
async function validateRegisterBody(body: any, config: any, ctx: Context) {
    const {email, password} = body;

    if (!email || !validator.isEmail(email)) {
        return ctx.badRequest('Invalid email address');
    }

    const minLength = config?.password?.minLength || 6;
    if (!password || password.length < minLength) {
        return ctx.badRequest(`Password must be at least ${minLength} characters long`);
    }
}

/**
 * Handles user registration based on provided context. Validates input parameters,
 * applies business rules such as allowed fields and inappropriate word check,
 * assigns roles, and sends confirmation emails if enabled in the settings.
 *
 * @param {Context} ctx - The context object containing the request and response objects.
 * @return {Promise<void>} Resolves with the response containing the JWT token and user data if successful,
 * or an appropriate error message in case of failure.
 */
export async function customRegister(ctx: Context) {
    const pluginStore = strapi.store({type: 'plugin', name: 'users-permissions'});
    const settings = await pluginStore.get({key: 'advanced'}) as any;

    if (!settings.allow_register) {
        return ctx.badRequest('Register action is currently disabled');
    }

    const {register}: any = strapi.config.get('plugin::users-permissions');
    const alwaysAllowedKeys = ['email', 'password', 'firstName', 'lastName'];
    const allowedKeys = compact(concat(alwaysAllowedKeys, isArray(register?.allowedFields) ? register.allowedFields : []));

    const invalidKeys = Object.keys(ctx.request.body).filter((key) => !allowedKeys.includes(key));
    if (invalidKeys.length > 0) {
        return ctx.badRequest(`Invalid parameters: ${invalidKeys.join(', ')}`);
    }

    const params = {
        ..._.pick(ctx.request.body, allowedKeys),
        provider: 'local',
    } as any;

    // Validate name and surname
    if (!params.firstName || !params.lastName) {
        return ctx.badRequest(`firstName and lastName are required`);
    }

    if (leoProfanity.check(params.name) || leoProfanity.check(params.surname)) {
        return ctx.badRequest(`firstName and lastName contains inappropriate words`);
    }

    const validations = strapi.config.get('plugin::users-permissions.validationRules');
    await validateRegisterBody(params, validations, ctx);

    const role = await strapi.db
        .query('plugin::users-permissions.role')
        .findOne({where: {type: settings.default_role}});

    if (!role) {
        return ctx.badRequest('Impossible to find the default role');
    }

    const {email, provider} = params;

    const conflictingUserCount = await strapi.db
        .query('plugin::users-permissions.user')
        .count({
            where: {
                email: email.toLowerCase(),
                provider,
            },
        });

    if (conflictingUserCount > 0) {
        return ctx.badRequest('Email already taken');
    }

    if (settings.unique_email) {
        const conflict = await strapi.db
            .query('plugin::users-permissions.user')
            .count({
                where: {
                    email: email.toLowerCase(),
                },
            });

        if (conflict > 0) {
            return ctx.badRequest('Email already taken');
        }
    }

    const newUser = {
        ...params,
        username: email.toLowerCase(),
        role: role.id,
        email: email.toLowerCase(),
        confirmed: !settings.email_confirmation,
    };

    const userService = strapi.plugin('users-permissions').service('user');
    const jwtService = strapi.plugin('users-permissions').service('jwt');

    const user = await userService.add(newUser);
    const sanitizedUser = await sanitizeUser(user, ctx);

    // No need for this in local dev
    // if (settings.email_confirmation) {
    //     try {
    //         await userService.sendConfirmationEmail(sanitizedUser);
    //     } catch (err) {
    //         strapi.log.error(err);
    //         return ctx.badRequest('Error sending confirmation email');
    //     }
    //
    //     return ctx.send({user: sanitizedUser});
    // }

    const jwt = jwtService.issue(_.pick(user, ['id']));

    return ctx.send({
        jwt,
        user: sanitizedUser,
    });
}