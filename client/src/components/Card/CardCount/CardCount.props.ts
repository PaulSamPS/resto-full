import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {ProductInterface} from '../../../interfaces/product.interface';

export interface CardCountProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    itemCount: ProductInterface[]
}
