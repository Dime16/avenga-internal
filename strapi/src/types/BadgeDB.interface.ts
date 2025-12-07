import {DocumentID, ID} from "@strapi/types/dist/data";
import {DateTimeValue} from "@strapi/types/dist/schema/attribute";
import {ImageResponseDb} from "./ImageResponseDb.interface";

export interface BadgeDB {
    id: ID
    documentId: DocumentID
    locale?: string
    createdAt?: DateTimeValue
    publishedAt?: DateTimeValue
    updatedAt?: DateTimeValue
    description?: string
    title?: string
    badgeType?: 'userCreated' | 'userLoggedIn' |'bibleStudiesTaught'
    threshold?: string
    caption?: string
    image: ImageResponseDb
}