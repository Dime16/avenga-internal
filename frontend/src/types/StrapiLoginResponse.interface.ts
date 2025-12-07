import {Badge} from "@/types/Badge.interface";

/**
 * Response format from Strapi's /api/auth/local login endpoint
 */
export interface StrapiUser {
    id: number;
    username: string;
    email: string;
    bibleStudyCount?: number;
    registrationOrder: number
    firstName?: string;
    lastName?: string;
    registerBadge?: Badge | null;
    loginBadge?: Badge[]  | null;
    bibleStudyBadges?: Badge[];
}

export interface StrapiLoginResponse {
    jwt: string;
    user: StrapiUser | null;
}
