import {ImageResponseDb} from "./ImageResponseDb.interface";

export interface FooterDB {
    id: number
    documentId: string
    description: string
    rights: string
    terms: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    FooterMenus: FooterMenu[]
    logo: ImageResponseDb

    // generated value
    imageUrl: string;
}

export interface FooterMenu {
    id: number
    menuTitle: string
    isIconMenu: boolean
    menu: Menu[]
}

export interface Menu {
    id: number
    title?: string
    url?: string
    sort?: number
    icon?: 'facebook' | 'instagram' | 'twitter' | 'youtube' | 'linkedin'
    color?: string;
    loggedInUrl?: string;
}
