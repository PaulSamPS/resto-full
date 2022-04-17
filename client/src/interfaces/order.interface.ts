import {ProductInterface} from './product.interface';

export interface OrderInterface {
    check: boolean
    comment: string
    entrance: string
    house: string
    level: string
    name: string
    office: string
    phone: string
    street: string
}

export interface IOrderSuccess {
    delivery: OrderInterface
    products: ProductInterface[]
    totalPrice: number
    totalCount: number
    id: number
    deliveryType: string
    payment: string
}

export interface IOSuccess {
    success: IOrderSuccess
}
