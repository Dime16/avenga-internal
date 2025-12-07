import {ImageResponseDb} from "./ImageResponseDb.interface";
import {DocumentID, ID} from "@strapi/types/dist/data";
import {DateTimeValue} from "@strapi/types/dist/schema/attribute";

export interface ImageAndTextDB {
    id: ID
    documentId: DocumentID
    locale?: string
    type?: "text" | "image" | "textAndImage"
    createdAt?: DateTimeValue
    publishedAt?: DateTimeValue
    title?: string
    titleColor?: string
    subtitle?: string
    subtitleColor?: string
    description?: string
    descriptionColor?: string
    url?: string
    updatedAt?: DateTimeValue
    imageAlt?: string
    urlColor?: string
    image?: ImageResponseDb
    urlDescription?: string;
    privateLink?: boolean;
    position?: 'top' | 'bottom'
}