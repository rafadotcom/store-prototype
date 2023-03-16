export interface products{
    id: number,
    name: string
    description: string
    image: string
    seller: {
        id: number
        name: string
        rating: number
        image: string
      },
    price: number
}