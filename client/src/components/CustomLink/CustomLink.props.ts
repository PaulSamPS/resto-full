import {AnchorHTMLAttributes, ReactNode} from 'react';
import {To} from 'react-router-dom';

export interface CustomLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    children: ReactNode
    to: string
}
