export interface Footer {
    id: number
    description: string
    rights: string
    terms: string
    FooterMenus: FooterMenu[]
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
    loggedInUrl?: string
}
