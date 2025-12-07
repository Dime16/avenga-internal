// src/api/bible-study-entry/controllers/custom.ts
import type {Context} from "koa";

export default {
    async increment(ctx: Context) {
        const user = ctx.state.user;

        let bibleStudy: { bibleStudyTypesIds: number[]; added: number };

        try {
            bibleStudy = JSON.parse(ctx.request.body).bibleStudyEntry;
        } catch (err) {
            return ctx.badRequest("Invalid request data");
        }

        if (!user || !user.id) {
            return ctx.unauthorized("User not authenticated.");
        }

        const parsedCount = parseInt(bibleStudy.added.toString(), 10);

        if (isNaN(parsedCount) || parsedCount < 0 || parsedCount > 5) {
            return ctx.badRequest("Invalid `count`; must be a number between 0 and 5.");
        }

        if (!Array.isArray(bibleStudy.bibleStudyTypesIds) || bibleStudy.bibleStudyTypesIds.length === 0) {
            return ctx.badRequest("At least one bible study type must be selected.");
        }

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const result = await strapi.db.connection.raw(`
            SELECT count
            FROM bible_study_entries e
                     JOIN bible_study_entries_user_lnk l ON e.id = l.bible_study_entry_id
            WHERE l.user_id = ?
              AND e.submitted_at BETWEEN ? AND ?
        `, [user.id, todayStart.toISOString(), todayEnd.toISOString()]);

        const entriesToday = result?.rows || [];

        const totalToday = entriesToday.reduce((sum, e) => sum + (e.count || 0), 0);

        if (totalToday + parsedCount > 5) {
            return ctx.badRequest('You can only submit 5 bible studies a day');
        }

        try {
            await strapi.entityService.create("api::bible-study-entry.bible-study-entry", {
                data: {
                    count: parsedCount,
                    types: bibleStudy.bibleStudyTypesIds.map((id: number) => ({id})) as any,
                    user: user.id,
                    submittedAt: new Date().toISOString(),
                },
                populate: ["user", "types"],
            });

            ctx.body = {data: parsedCount};
        } catch (err) {
            strapi.log.error("Error creating bibleStudyEntry", err);
            return ctx.internalServerError("Failed to create bible study entry.");
        }
    },


    async count(ctx: Context) {
        console.log('Count:============ ');

        try {
            const result = await strapi.db.connection.raw(`SELECT SUM(count) AS total
                                                       FROM bible_study_entries;`);

            console.log('result:============ ', result);
            const total = result?.[0]?.total || 0;
            ctx.body = {count: Number(total)};
        } catch (err) {
            console.log('Errr: ', err);
            strapi.log.error("Error calculating user's bible study count", err);
            return ctx.internalServerError("Failed to calculate total count.");
        }


    },


    async getLoggedInUserBibleStudyEntries(ctx: Context) {
        const user = ctx.state.user;

        if (!user || !user.id) {
            return ctx.unauthorized("User not authenticated.");
        }

        try {
            const result = await strapi.db.connection.raw(
                `
                    SELECT SUM(e.count) AS total
                    FROM bible_study_entries e
                             INNER JOIN bible_study_entries_user_lnk l ON e.id = l.bible_study_entry_id
                    WHERE l.user_id = ?
                `,
                [user.id]
            );

            console.log('RESULT:============ ', result);

            const total = result?.rows?.[0]?.total || 0;

            ctx.body = {count: Number(total)};
        } catch (err) {
            console.log('Errr: ', err);
            strapi.log.error("Error calculating user's bible study count", err);
            return ctx.internalServerError("Failed to calculate total count.");
        }
    }
};