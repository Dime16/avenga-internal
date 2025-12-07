import {ImageResponseDb} from "./ImageResponseDb.interface";


export interface PageDB {
    id: number
    documentId: string
    title: string
    titleDescription: string
    titleColor: string
    content: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    type: string
    subtitle: string
    pageBackgroundColor?: string;
    image: ImageResponseDb
    connect: Connect,
    coreCards?: CoreCard[]
}

export interface Connect {
    id: number
    description: string
    url: string
    image: ImageResponseDb
}

export interface CoreCard {
    title: number
    url: string
    urlDescription: string
}
