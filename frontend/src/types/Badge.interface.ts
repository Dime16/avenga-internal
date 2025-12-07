import {ImageResponse} from "@/types/ImageResponse.interface";

export interface Badge {
    id: number
    documentId: string
    badgeType: 'userCreated' | 'userLoggedIn' | 'bibleStudiesTaught'
    threshold: number
    createdAt: string
    updatedAt: string
    publishedAt: string
    title: string
    description: string
    image: ImageResponse,
    imageUrl?: string;
    active?: boolean;
    caption?: string;
}