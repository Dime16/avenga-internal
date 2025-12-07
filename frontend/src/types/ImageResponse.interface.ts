export interface ImageResponse {
    id: number
    documentId: string
    name: string
    alternativeText: string;
    caption: string;
    width: number
    height: number
    formats: Formats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string
    provider: string
    provider_metadata: string
    createdAt: string
    updatedAt: string
    publishedAt: string
}

export interface Formats {
    thumbnail: Thumbnail
    small: Small
    medium: Medium
    large: Large
}

export interface Thumbnail {
    name: string
    hash: string
    ext: string
    mime: string
    path: string
    width: number
    height: number
    size: number
    sizeInBytes: number
    url: string
}

export interface Small {
    name: string
    hash: string
    ext: string
    mime: string
    path: string
    width: number
    height: number
    size: number
    sizeInBytes: number
    url: string
}

export interface Medium {
    name: string
    hash: string
    ext: string
    mime: string
    path: string
    width: number
    height: number
    size: number
    sizeInBytes: number
    url: string
}

export interface Large {
    name: string
    hash: string
    ext: string
    mime: string
    path: string
    width: number
    height: number
    size: number
    sizeInBytes: number
    url: string
}
