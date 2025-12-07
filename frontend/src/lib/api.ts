import {RegisterUserInput} from "@/types/RegisterUserInput.interface";
import {StrapiRegisterResponse} from "@/types/StrapiRegisterResponse.interface";
import {StrapiLoginResponse} from "@/types/StrapiLoginResponse.interface";
import {Badge} from "@/types/Badge.interface";
import {InitialData} from "@/types/InitialData.interface";
import {cache} from 'react';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://192.168.1.51:1337';

export async function registerUser(data: RegisterUserInput): Promise<StrapiRegisterResponse> {

    const response = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: `${data.firstName}.${data.lastName}`,
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            yearOfBirth: data.yearOfBirth,
            gender: data.gender,
            zipCode: data.zipCode,
            country: data.country,
            state: data.state,
            loginCount: data.loginCount || 0,
        }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw result.error;
    }
    return result;
}

export async function loginUser({
                                    identifier,
                                    password,
                                }: {
    identifier: string;
    password: string;
}): Promise<StrapiLoginResponse> {
    const res = await fetch(`${STRAPI_URL}/api/auth/local`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({identifier, password}),
    });
    const data = await res.json();
    if (!res.ok) {
        return {jwt: '', user: null}
    }
    return data;
}

/**
 * @param email
 * Sends email to the user
 */
export async function sendForgotPassword(email: string) {
    const response = await fetch(`${STRAPI_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email}),
    });

    if (!response.ok) {
        return false
    }

    await response.json();
    return true;
}

/**
 * @param token
 * @param newPassword
 * @param confirmPassword
 * Resets the user password
 */
export async function sendResetPassword(token: string, newPassword: string, confirmPassword: string) {
    const response = await fetch(`${STRAPI_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            code: token,
            password: newPassword,
            passwordConfirmation: confirmPassword,
        }),
    });

    if (!response.ok) {
        return false
    }

    await response.json();
    return true;
}


/**
 * Fetch 1 random username and country only if user has valid token
 */
export async function getRandomRecentUser(jwt: string): Promise<{
    firstName: string;
    lastInitial: string;
    country: string;
    state: string;
} | null> {
    const res = await fetch(
        `${STRAPI_URL}/api/random-user`,
        {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            }
        }
    );
    if (!res.ok) {
        return null
    }
    return await res.json();
}

/**
 * Sends a request to Strapi’s /api/bible-study-entry/increment
 * to add the given `added` value to the currently logged-in user’s inputCount.
 * @param bibleStudyEntry
 * @param token
 * @returns      The updated user object (as returned by Strapi)
 */
export async function incrementBibleStudyCount(
    bibleStudyEntry: { added: number, bibleStudyTypesIds: number[] },
    token: string
): Promise<number> {
    const res = await fetch(`${STRAPI_URL}/api/bible-study/increment`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({bibleStudyEntry}),
    });

    const json = await res.json();
    if (!res.ok) {
        throw json.error;
    }


    return json.data;
}

/**
 * Fetches the count of Bible study entries associated with the authenticated user.
 *
 * @param {string} token - The authorization token used to authenticate the request.
 * @return {Promise<number>} The count of Bible study entries for the user.
 * @throws {Error} If the API request fails or the response is not successful.
 */
export async function fetchMyBibleStudyEntryCount(token: string): Promise<number> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/bible-study/mine`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        return 0
    }

    const json = await res.json();
    return json.count || 0;
}

/**
 * Fetches the Badges
 */
export async function getBadges(): Promise<Badge[]> {
    const res = await fetch(
        `${STRAPI_URL}/api/badges?populate=image`,
        {next: {revalidate: 600}}
    );

    if (!res.ok) {
        console.warn("Failed to fetch Badges:", res.status, await res.text());
        return []
    }

    const json = await res.json();
    const badges = json.data as Badge[];

    const badgesWithImages = badges.map(badge => {
        return {
            ...badge,
            imageUrl: STRAPI_URL + badge.image?.formats?.thumbnail?.url
        }
    })


    if (!badgesWithImages || badgesWithImages.length === 0) {
        console.warn("No Badge entry found in Strapi.");
        return [];
    }

    return badgesWithImages;
}

/**
 * Counts the user daily log in
 */
export async function recordDailyLogin(token: string): Promise<number | null> {
    if (!token) return null;

    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/user-daily-login/record`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        console.warn("Failed to count user:", response.status, await response.text());
        return null
    }

    const json = await response.json();
    return json?.loginCount || null;
}


/**
  * Fetches the initial data for the home page from a specified API endpoint.
 *
 * The function is wrapped in a cache utility to store and reuse data for
 * performance optimization. It asynchronously retrieves data from the API and
 * returns it in a structured format. If the request fails, the function logs a
 * warning and returns null.
 *
 * @constant
 * @type {() => Promise<InitialData | null>}
 * @returns {Promise<InitialData | null>} A promise that resolves to the initial data
 * object or null if the fetch operation fails.
 */
export const fetchInitialData: () => Promise<InitialData | null> = cache(async (): Promise<InitialData | null> => {
    const response = await fetch(`${STRAPI_URL}/api/initial-home-data`);
    // {next: {revalidate: 600}}

    if (!response.ok) {
        console.warn("Failed to fetch Page :", response.status, await response.text());
        return null
    }


    return await response.json();
});

/**
 * Retrieves the count of bible studies from the API.
 *
 * This asynchronous function sends a GET request to the specified endpoint
 * to fetch the total count of bible studies available from the system. If the
 * request is successful, it returns an object containing the count. If the
 * request fails, an error is logged, and an exception is thrown.
 *
 * @async
 * @function fetchBibleStudyCount
 * @returns {Promise<{count: number} | null>} A promise resolving to an object containing the count of bible studies, or null if no data is returned.
 * @throws {Error} Throws an error if the request fails.
 */
export const fetchBibleStudyCount = async (): Promise<{count: number} | null> => {
    const response = await fetch(`${STRAPI_URL}/api/bible-study/count`, {
        method: 'GET',
    });

    if (!response.ok) {
        console.warn("Failed to get bible studies count: ", response.status, await response.text());
        throw new Error("Failed to get bible studies count");
    }

    return await response.json();
}


/**
 * Asynchronous function to delete a user using an authorization token.
 * Makes a DELETE request to the API endpoint for deleting a user.
 *
 * @param {string} token - The authorization token used to authenticate the request.
 * @returns {Promise<object>} A promise that resolves with the response data in JSON format.
 * @throws {Error} If the request fails or the response status is not OK.
 */
export const deleteUser = async (token: string) => {
    const response = await fetch(`${STRAPI_URL}/api/delete-user`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        console.warn("Failed to delete user: ", response.status, await response.text());
        throw new Error("Failed to delete user");
    }


    return await response.json();
}