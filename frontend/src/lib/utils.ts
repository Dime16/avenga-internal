import {StrapiUser} from "@/types/StrapiLoginResponse.interface";
import {Badge} from "@/types/Badge.interface";

export const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

export const assignUserBadges = (user: StrapiUser, loginCount: number | null, badges: Badge[]) => {
    let userCreatedBadges = badges.filter(badge => badge.badgeType === 'userCreated')
    let userLoginBadges = badges.filter(badge => badge.badgeType === 'userLoggedIn')
    let bibleStudyBadges = badges.filter(badge => badge.badgeType === 'bibleStudiesTaught')

    if (userCreatedBadges && userCreatedBadges.length > 0) {
        userCreatedBadges = userCreatedBadges.sort((a, b) => Number(a.threshold) - Number(b.threshold));
    }

    if (userLoginBadges && userLoginBadges.length > 0) {
        userLoginBadges = userLoginBadges.sort((a, b) => Number(a.threshold) - Number(b.threshold));
    }

    if (bibleStudyBadges && bibleStudyBadges.length > 0) {
        bibleStudyBadges = bibleStudyBadges.sort((a, b) => Number(a.threshold) - Number(b.threshold));
    }

    user.registerBadge = userCreatedBadges.find(badge => Number(user.registrationOrder) < Number(badge.threshold));

    user.loginBadge = userLoginBadges.map(badge => {
        if (loginCount && loginCount >= Number(badge.threshold)) {
            badge.active = true;
        }
        return badge;
    });


    user.bibleStudyBadges = bibleStudyBadges.map(badge => {
        if (+(user.bibleStudyCount ?? 0) >= Number(badge.threshold)) {
            badge.active = true;
            return badge;
        }

        badge.active = false;
        return badge;
    });
}


export function findActiveUserBadge(user: StrapiUser): Badge | null {
    const userCopy = structuredClone(user);
    let activeBadge = userCopy.registerBadge ?? null;

    if (!activeBadge) {
        const sortedLoginBadges = userCopy.loginBadge?.sort(
            (a, b) => Number(b.threshold) - Number(a.threshold)
        );
        const sortedBibleStudyBadges = userCopy.bibleStudyBadges?.sort(
            (a, b) => Number(b.threshold) - Number(a.threshold)
        );
        const loginActiveBadge = sortedLoginBadges?.find((badge) => badge.active);
        activeBadge = loginActiveBadge ?? sortedBibleStudyBadges?.find((badge) => badge.active) ?? null;
    }

    return activeBadge;
}

export const isMobile =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;