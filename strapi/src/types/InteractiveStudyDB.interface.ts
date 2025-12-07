import {ImageResponseDb} from "./ImageResponseDb.interface";
import {DateTimeValue} from "@strapi/types/dist/schema/attribute";
import {DocumentID, ID} from "@strapi/types/dist/data";

export interface InteractiveStudyDB {
    id: ID
    documentId: DocumentID
    locale?: string
    link?: string
    createdAt?: DateTimeValue
    description?: string
    publishedAt?: DateTimeValue
    title?: string
    updatedAt?: DateTimeValue
    pdfUrl?: string;
    image?: ImageResponseDb
    pdf?: ImageResponseDb
    privateLink?: boolean
    actionButtonText: string
}