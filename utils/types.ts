export interface Place {
    name: string,
    photoUrl: string,
    address: string,
    streetNumber: string,
    postalCode: string,
    city: string,
    placeId: string | undefined,
    state: string,
    photos: Array<{
        url: string,
        name: string,
        id: number | undefined
    }>
}

export type Media = {
    id: number,
    attributes: {
        alternativeText: string
        caption: string
        createdAt: string
        ext: string
        formats: any
        hash: string
        height: number
        mime: string
        name: string
        previewUrl: null | string
        provider: string
        provider_metadata: null | string
        size: number
        updatedAt: string
        url: string
        width: number
    }
}