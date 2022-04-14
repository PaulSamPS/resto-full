import {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from 'react';

export interface ButtonMobileProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode
    appearance: 'cartMobile' | 'burger'
    totalCount?: number
}
