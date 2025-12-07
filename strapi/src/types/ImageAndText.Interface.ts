export interface ImageAndText {
    id: number
    type?: "text" | "image" | "textAndImage"
    title?: string
    titleColor?: string
    subtitle?: string
    subtitleColor?: string
    description?: string
    descriptionColor?: string
    url?: string
    imageAlt?: string
    urlColor?: string
    imageUrl?: string
    urlDescription?: string;
    privateLink?: boolean;
    position?: 'top' | 'bottom'
}