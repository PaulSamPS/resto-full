import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {FieldError} from 'react-hook-form';

export interface ContactInfoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  error?: FieldError
}

