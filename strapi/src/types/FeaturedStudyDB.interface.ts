import {ImageResponseDb} from "./ImageResponseDb.interface";
import {DocumentID, ID} from "@strapi/types/dist/data";
import {DateTimeValue} from "@strapi/types/dist/schema/attribute";

export interface FeaturedStudyDB {
    id: ID
    documentId: DocumentID
    locale?: string
    createdAt?: DateTimeValue
    publishedAt?: DateTimeValue
    updatedAt?: DateTimeValue
    description?: string
    pdfUrl?: string;
    image?: ImageResponseDb,
    pdf?: ImageResponseDb,
    privateLink?: boolean,
    title: string,
    link: string

}

