import {AboutDb} from "../../../types/AboutDb.interface";
import {About} from "../../../types/About.interface";
import {ImageResponseDb} from "../../../types/ImageResponseDb.interface";
import {Badge} from "../../../types/Badge.interface";
import {BadgeDB} from "../../../types/BadgeDB.interface";
import {StickerDB} from "../../../types/StickerDB.interface";
import {Sticker} from "../../../types/Sticker.interface";
import { InteractiveStudyDB} from "../../../types/InteractiveStudyDB.interface";
import { InteractiveStudy} from "../../../types/InteractiveStudy.interface";
import {PageDB} from "../../../types/PageDB.interface";
import {Page} from "../../../types/Page.interface";
import {FooterDB} from "../../../types/FooterDb.interface";
import {Footer} from "../../../types/Footer.interface";
import {ImageCardDB} from "../../../types/ImageCardDB.interface";
import {ImageCard} from "../../../types/ImageCard.interface";
import {ImageAndTextDB} from "../../../types/ImageAndTextDB.Interface";
import {ImageAndText} from "../../../types/ImageAndText.Interface";
import {FeaturedStudy} from "../../../types/FeaturedStudy.interface";
import {FeaturedStudyDB} from "../../../types/FeaturedStudyDB.interface";

const PUBLIC_URL = (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV)
    ? 'http://localhost:1337'
    : '';

export default {
    async getInitialData(ctx) {
        // 1. Fetch stickers with images
        const stickersData = await strapi.entityService.findMany('api::sticker.sticker', {
            sort: {order: 'asc'},
            populate: ['image'],
        }) as StickerDB[];

        const stickers = prepareStickersData(stickersData);


        // 2. Count total inputCount from all users
        const result = await strapi.db.connection.raw(`SELECT SUM(count) AS total FROM bible_study_entries;`);

        // 2. Extract total safely
        const count = result?.rows?.[0]?.total || 0;

        // 3. Fetch badges with images
        const badgesData = await strapi.entityService.findMany('api::badge.badge', {
            populate: ['image'],
        }) as BadgeDB[];

        const badges = prepareBadgesData(badgesData);

        // 4. Fetch menu
        const menu = await strapi.entityService.findOne('api::menu.menu', 1, {
            populate: [
                'menuItem',
                'confirmation',
            ]
        });

        // 5. Fetch featured studies with image and PDF
        const featuredStudiesData = await strapi.entityService.findMany('api::featured-study.featured-study', {
            populate: {image: true, pdf: true},
        }) as FeaturedStudyDB[];

        const featuredStudies = prepareFeaturedStudies(featuredStudiesData);


        // 6. Fetch About entry with cover and images
        const aboutEntries = await strapi.entityService.findMany('api::about.about', {
            populate: {
                cover: true,
                images: true,
            },
        }) as AboutDb[];

        const about = prepareAboutData(aboutEntries?.[0] || null);

        // 7. Fetch Seed study cards (small video cards)
        const seedStudyCards = await strapi.entityService.findMany('api::seed-study-card.seed-study-card');


        // 8. Fetch Seed videos
        const seedVideos = await strapi.entityService.findMany('api::seed-video.seed-video');

        // 9. Fetch Image and Text items
        const imageAndTextDB = await strapi.entityService.findMany('api::image-and-text.image-and-text', {populate: ['image']});

        const imageAndText = prepareImageAndText(imageAndTextDB);

        // 10. Fetch Interactive Study (single type)
        const interactiveStudyData = await strapi.entityService.findOne('api::interactive-study.interactive-study', 1, {
            populate: {
                image: true,
                pdf: true,
            },
        }) as InteractiveStudyDB;

        const interactiveStudy = prepareInteractiveStudyData(interactiveStudyData);

        // 11. Fetch Cards with image

        const imageCardsData = await strapi.entityService.findMany('api::image-card.image-card', {
            populate: ['image'],
        }) as ImageCardDB[];

        const imageCards = prepareImageCardsData(imageCardsData);


        // 11. Fetch Footer (single type with nested menu and logo)
        const footerData = await strapi.entityService.findOne('api::footer.footer', 1, {
            populate: {
                FooterMenus: {
                    populate: ['menu'],
                },
                logo: true,
            },
        }) as FooterDB;

        const footer = prepareFooterData(footerData);


        // 12. Fetch all pages
        const pagesData = await strapi.entityService.findMany('api::page.page', {
            populate: {
                image: true,
                connect: {
                    populate: ['image'],
                },
                coreCards: true
            },
        }) as PageDB[];

        const pages = preparePagesData(pagesData);


        // 13. Fetch all pages
        const privacyPolicy = await strapi.entityService.findOne('api::privacy-policy.privacy-policy', 1) ;

        const bibleStudyTypes = await strapi.entityService.findMany('api::bible-study-type.bible-study-type');

        // 14. Cache for 10 min
        ctx.set('Cache-Control', 'public, max-age=600');

        // 16. Return all data as a single JSON payload
        ctx.body = {
            stickers,
            count,
            badges,
            about,
            seedStudyCards,
            seedVideos,
            interactiveStudy,
            featuredStudies,
            footer,
            pages,
            imageCards,
            menu,
            imageAndText,
            bibleStudyTypes,
            privacyPolicy: privacyPolicy?.content || ''
        };
    },
};

export const prepareImageAndText = (imageAndTexts: ImageAndTextDB[]): ImageAndText[] => {
    if (!imageAndTexts || imageAndTexts.length <= 0) {
        return [];
    }
    return imageAndTexts.map(imageAndText => {

        const imageFormats = imageAndText.image?.formats;
        let imageUrl = '';

        if (imageFormats) {
            const smallUrl = imageFormats?.small?.url;
            const mediumUrl = imageFormats?.medium?.url;
            const largeUrl = imageFormats?.large?.url;
            const thumbnail = imageFormats?.thumbnail?.url;
            imageUrl = PUBLIC_URL + (largeUrl || mediumUrl || smallUrl || thumbnail);
        }

        return {
            id: Number(imageAndText.id),
            type: imageAndText.type,
            title: imageAndText.title,
            titleColor: imageAndText.titleColor,
            subtitle: imageAndText.subtitle,
            subtitleColor: imageAndText.subtitleColor,
            description: imageAndText.description,
            descriptionColor: imageAndText.descriptionColor,
            url: imageAndText.url,
            imageAlt: imageAndText.imageAlt,
            urlColor: imageAndText.urlColor,
            urlDescription: imageAndText.urlDescription,
            position: imageAndText.position,
            privateLink: imageAndText.privateLink,
            imageUrl
        }
    });
}


export const prepareInteractiveStudyData = (interactiveStudyData: InteractiveStudyDB): InteractiveStudy => {
    if (!interactiveStudyData) {
        return null;
    }
    const image = interactiveStudyData?.image;
    const url = image?.formats?.large?.url || image?.formats?.medium?.url || image?.formats?.small?.url || image?.formats?.thumbnail?.url
    const imageUrl = PUBLIC_URL + url
    const pdfUrl = interactiveStudyData.pdfUrl;
    return {
        id: Number(interactiveStudyData.id),
        title: interactiveStudyData.title,
        description: interactiveStudyData.description,
        link: interactiveStudyData.link,
        privateLink: interactiveStudyData.privateLink,
        actionButtonText: interactiveStudyData.actionButtonText,
        pdfUrl,
        imageUrl
    }
}


export const prepareStickersData = (stickers: StickerDB[]): Sticker[] => {
    if (!stickers || stickers.length <= 0) {
        return [];
    }
    return stickers.map((file: StickerDB) => {
        const image = file.image;

        const url = image?.formats?.large?.url || image?.formats?.medium?.url || image?.formats?.small?.url || image?.formats?.thumbnail?.url
        const imageUrl = PUBLIC_URL + url;

        return {
            id: Number(file.id),
            caption: file.caption,
            imageUrl
        };
    })
}


export const prepareBadgesData = (badges: BadgeDB[]): Badge[] => {
    if (!badges || badges.length <= 0) {
        return [];
    }
    return badges.map((badge: BadgeDB) => ({
        id: Number(badge.id),
        badgeType: badge.badgeType,
        threshold: badge.threshold,
        title: badge.title,
        description: badge.description,
        caption: badge.caption,
        imageUrl: PUBLIC_URL + badge.image?.formats?.thumbnail?.url
    }))
}

export const prepareAboutData = (about: AboutDb): About => {
    if (!about) {
        return null;
    }
    const aboutRecord = about;
    const coverObj = about?.cover;
    // Top‐level has id, url, formats, caption, etc.

    const url = coverObj?.formats?.large?.url || coverObj?.formats?.medium?.url || coverObj?.formats?.small?.url || coverObj?.formats?.thumbnail?.url
    const coverUrl = PUBLIC_URL + url;


    let imageUrls: string[] = [];
    if (aboutRecord && aboutRecord.images && aboutRecord.images.length > 0) {
        imageUrls = (aboutRecord.images || []).map((img: ImageResponseDb) => {
            const url = img?.formats?.large?.url || img?.formats?.medium?.url || img?.formats?.small?.url || img?.formats?.thumbnail?.url
            return PUBLIC_URL + url;
        });
    }

    return {
        id: aboutRecord.id,
        title: aboutRecord.title,
        description: aboutRecord.description,
        textColor: aboutRecord.textColor,
        coverUrl,
        imageUrls,
    };
}


export const prepareFeaturedStudies = (featuredStudies: FeaturedStudyDB[]): FeaturedStudy[] => {
    if (!featuredStudies || featuredStudies.length <= 0) {
        return [];
    }
    return featuredStudies?.map((study: FeaturedStudyDB) => {
        const image = study.image;
        const url = image?.formats?.large?.url || image?.formats?.medium?.url || image?.formats?.small?.url || image?.formats?.thumbnail?.url
        const imageUrl = PUBLIC_URL + url;
        const pdfUrl = study.pdfUrl
        return {
            id: Number(study.id),
            title: study.title,
            description: study.description,
            link: study.link,
            privateLink: study.privateLink,
            pdfUrl,
            imageUrl
        }
    })
}

export const preparePagesData =
    (pages: PageDB[]): Page[] => {
        if (!pages || pages.length <= 0) {
            return [];
        }

        return pages.map((pageData: PageDB) => {

            const largestImageFormat = pageData.image?.formats?.large?.url ||
                pageData.image?.formats?.medium?.url ||
                pageData.image?.formats?.small?.url ||
                pageData.image?.formats?.thumbnail?.url
            const largestVideoImageFormat = pageData.connect?.image?.formats?.large?.url ||
                pageData.connect?.image?.formats?.medium?.url ||
                pageData.connect?.image?.formats?.small?.url ||
                pageData.connect?.image?.formats?.thumbnail?.url

            const imageUrl = PUBLIC_URL + largestImageFormat
            const videoImageUrl = PUBLIC_URL + largestVideoImageFormat
            const videoUrl = pageData.connect?.url

            const videoDescription = pageData.connect?.description
            return {
                id: Number(pageData.id),
                title: pageData.title,
                titleDescription: pageData.titleDescription,
                titleColor: pageData.titleColor,
                content: pageData.content,
                type: pageData.type,
                subtitle: pageData.subtitle,
                pageBackgroundColor: pageData.pageBackgroundColor,
                videoDescription,
                coreCards: pageData.coreCards,
                videoImageUrl,
                imageUrl,
                videoUrl
            }
        })

    }

export const prepareFooterData = (footer: FooterDB): Footer => {
    if (!footer) {
        return null;
    }

    const largestImageFormat =  footer?.logo?.formats?.large?.url ||
        footer?.logo?.formats?.medium?.url ||
        footer?.logo?.formats?.small?.url ||
        footer?.logo?.formats?.thumbnail?.url
    const imageUrl = PUBLIC_URL + largestImageFormat;

    return {
        id: Number(footer.id),
        description: footer.description,
        rights: footer.rights,
        terms: footer.terms,
        FooterMenus: footer.FooterMenus,
        imageUrl
    }
}

export const prepareImageCardsData = (imageCards: ImageCardDB[]): ImageCard[] => {
    if (!imageCards || imageCards.length <= 0) {
        return [];
    }
    return imageCards.map((card: ImageCardDB) => {

        const image = card.image;

        const smallUrl = image.formats?.small?.url || image.url;
        const mediumUrl = image.formats?.medium?.url || image.url;

        const largeUrl = image.formats?.large?.url || image.url;
        const imageUrl = PUBLIC_URL + (largeUrl || mediumUrl || smallUrl);

        return {
            id: Number(card.id),
            smallUrl,
            mediumUrl,
            largeUrl,
            imageUrl,
            text: card.text,
            sort: card.sort,
            href: card.href,
        };
    });
}
