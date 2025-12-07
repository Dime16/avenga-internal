import {DateTimeValue} from "@strapi/types/dist/schema/attribute";
import {DocumentID, ID} from "@strapi/types/dist/data";
import {ImageResponseDb} from "./ImageResponseDb.interface";

export interface ImageCardDB {
    id: ID
    documentId: DocumentID
    locale?: string
    text?: string
    createdAt?: DateTimeValue
    publishedAt?: DateTimeValue
    updatedAt?: DateTimeValue
    sort?: number
    href?: string
    image?: ImageResponseDb
}