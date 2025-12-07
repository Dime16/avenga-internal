

export interface Page {
    id: number
    title: string
    titleDescription: string
    titleColor: string
    content: string
    type: string
    subtitle: string
    imageUrl: string;
    videoUrl: string;
    videoImageUrl?: string;
    pageBackgroundColor?: string;
    videoDescription?: string;
    coreCards?: CoreCard[]
}

export interface CoreCard {
    title: number
    url: string
    urlDescription: string
}
