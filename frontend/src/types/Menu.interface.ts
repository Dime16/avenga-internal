export interface Menu {
    id: number
    documentId: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    locale: string
    menuItem: MenuItem[]
    confirmation?: Confirmation
}

export interface MenuItem {
    id: number
    title: string
    url: string
    sort: number
    icon?: string
    color?: string
}

export interface Confirmation {
    id: number
    title: string
    description: string
    confirmation: string
    cancel: string
}