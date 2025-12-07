import {DocumentID, ID} from "@strapi/types/dist/data";
import {DateTimeValue} from "@strapi/types/dist/schema/attribute";
import {ImageResponseDb} from "./ImageResponseDb.interface";

export interface AboutDb {
    id: ID
    documentId: DocumentID
    locale?: string
    createdAt?: DateTimeValue
    publishedAt?: DateTimeValue
    updatedAt?: DateTimeValue
    description?: string
    textColor?: string
    title?: string
    cover?: ImageResponseDb;
    images?: ImageResponseDb[];
}