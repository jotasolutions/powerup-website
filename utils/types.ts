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
