export interface Badge {
    id: number
    badgeType: 'userCreated' | 'userLoggedIn' | 'bibleStudiesTaught'
    threshold: string
    title: string
    description: string
    imageUrl?: string;
    caption?: string;
}