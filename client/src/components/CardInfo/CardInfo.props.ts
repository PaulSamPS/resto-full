import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {ProductInterface} from '../../interfaces/product.interface';

export interface CardInfoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    count: ProductInterface[]
}
