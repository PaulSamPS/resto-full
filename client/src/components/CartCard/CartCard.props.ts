import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {ProductInterface} from '../../interfaces/product.interface';

export interface CartCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    product: ProductInterface
    setModal: (modal: boolean) => void
}
