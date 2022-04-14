import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {IOrderSuccess} from '../../interfaces/order.interface';

export interface MyOrdersProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    order: IOrderSuccess[]
    loading: boolean
}
