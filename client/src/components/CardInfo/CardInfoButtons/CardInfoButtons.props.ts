import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {ProductInterface} from '../../../interfaces/product.interface';

export interface CardInfoButtonsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    product: ProductInterface
    itemCount: ProductInterface[]
}
