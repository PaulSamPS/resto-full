import {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from 'react';

export interface ArrowBtnType extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode
}
