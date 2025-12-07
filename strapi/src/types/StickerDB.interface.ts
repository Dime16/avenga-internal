import {ImageResponseDb} from "./ImageResponseDb.interface";
import {DocumentID, ID} from "@strapi/types/dist/data";
import {DateTimeValue} from "@strapi/types/dist/schema/attribute";

export interface StickerDB {
    id: ID
    documentId: DocumentID
    locale?: string
    order?: number
    caption?: string
    createdAt?: DateTimeValue
    publishedAt?: DateTimeValue
    updatedAt?: DateTimeValue
    image: ImageResponseDb
}