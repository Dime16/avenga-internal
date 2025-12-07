import {Context} from 'koa';
import leoProfanity from 'leo-profanity';

export default {
    async get(ctx: Context) {
        try {
            // Must be active, change the query
            const currentUser = ctx.state.user;

            let sql = `
                SELECT DISTINCT u.id,
                                u.first_name,
                                u.last_name,
                                u.state,
                                u.country,
                                u.updated_at
                FROM up_users u
                         INNER JOIN bible_study_entries_user_lnk l ON u.id = l.user_id
                WHERE u.confirmed = true
            `;

            const params: (string | number)[] = [];

            if (currentUser?.id) {
                sql += ` AND u.id != ?`;
                params.push(currentUser.id);
            }

            sql += ` ORDER BY u.updated_at DESC LIMIT 150`;


            const result = await strapi.db.connection.raw(sql, params);

            const users = result?.rows || [];

            const cleanUsers = users.filter(
                (u) =>
                    u.first_name &&
                    u.last_name &&
                    !leoProfanity.check(u.first_name) &&
                    !leoProfanity.check(u.last_name)
            );

            if (cleanUsers.length <= 0) {
                return ctx.send(null);
            }

            const randomUser = cleanUsers[Math.floor(Math.random() * users.length)];

            ctx.send({
                firstName: randomUser.first_name,
                lastInitial: randomUser.last_name.charAt(0),
                state: randomUser.state,
                country: randomUser.country,
            });

        } catch (err) {
            strapi.log.error('Error fetching random user:', err);
            ctx.throw(500, 'Internal server error');
        }
    },
};