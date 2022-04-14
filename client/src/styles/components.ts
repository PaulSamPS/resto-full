import styled, {css} from 'styled-components';
import {device} from './breakpoints';

// H

interface TitleProps {
    size: number
}

export const H1 = styled.h1<TitleProps>`
    margin: 0;
    text-transform: uppercase;
    
    color: var(--textWhite);
    
    font-size: ${({size}) => size}px;
    font-weight: bold;

    @media only screen and ${device.laptop} {
        font-size: 26px;
    }

    @media only screen and ${device.mobileL} {
        font-size: 22px!important;
    }
`;

export const H2 = styled.h2<TitleProps>`
    margin: 0;
    text-transform: uppercase;
    
    color: var(--textWhite);
    
    font-size: ${({size}) => size}px;
    font-weight: bold;
`;

export const H3 = styled.h3<TitleProps>`
    font-size: ${({size}) => size}px;
    margin: 0;
    color: var(--textWhite);
`;

// Button
interface IBtn {
    marginR?: number
    size?: number
    weight?: number
    background?: string
}

export const Button = styled.button<IBtn>`
    padding: 10px 20px;
    cursor: pointer;
    transition: transform ease 0.2s;
    margin-right: ${({marginR}) => marginR}px;
    
    color: var(--textWhite);
    border: none;
    border-radius: 10px;
    background: ${({background = 'var(--greenGradient)'}) => background};
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
    
    font-size: ${({size = 14}) => size}px;
    font-weight: ${({weight = 600}) => weight};
    line-height: 17px;
    
    &:active {
      transform: translateY(2px);
    }
`;


// P

interface ParagraphProps {
    size: number
    weight?: number
    color?: string
}

export const P = styled.p<ParagraphProps>`
    font-size: ${({size}) => size}px;
    color: ${({color = 'var(--tetxGray)'}) => color};
    font-weight: ${({weight = 400}) => weight}px;
`;

// Input

export const InputS = styled.input`
  padding: 15px 30px;
  color: var(--textWhite);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  background: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
  font-size: 16px;
  width: 100%;
  font-weight: 400;

  &::placeholder {
    color: var(--textWhite);
    opacity: 1;
  }

  &:focus {
    outline: none;
  }

    @media only screen and ${device.laptopL} {
        font-size: 14px;
    }
`;

export const InputCss = css`
    padding: 15px 30px;
    color: var(--textWhite);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    background: none;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
    font-size: 16px;
    font-weight: 400;

    &::placeholder {
        color: var(--textWhite);
        opacity: 1;
    }

    &:focus {
        outline: none;
    }
`;

// a

interface ILink {
    linkColor: string
    borderBtm?: string
    size: number
}

export const StyledA = styled.a<ILink>`
    cursor: pointer;
    transition: all ease 0.2s;
    white-space: nowrap;
    text-decoration: none;
    
    color: ${({linkColor}) => linkColor};
    border-bottom: ${({borderBtm}) => borderBtm};
    
    font-size: ${({size}) => size}px;
    font-weight: 400;

    //&:hover {
    //    color: var(--textWhite);
    //}
`;

// span

interface ISpan {
    color?: string
    size: number
    weight?: number
}

export const Span = styled.span<ISpan>`
    color: ${({color = 'var(--textWhite)'}) => color};
    font-size: ${({size}) => size}px;
    font-weight: ${({weight = 400}) => weight}px;
    white-space: nowrap;
`;

// img

interface IImg {
    width?: number
    height?: number
}

export const Img = styled.img<IImg>`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  object-fit: cover;
`;


// flex

interface IFlex {
    align?: 'center' | 'baseline'
    justify?: 'space-between' | 'center'
    direction?: 'column' | 'row'
}

export const Flex = css<IFlex>`
    display: flex;
    justify-content: ${({justify}) => justify};
    align-items: ${({align}) => align};
    flex-direction: ${({direction}) => direction ? 'column' : 'row'};
`;


export const FormInputBlock = styled.div`
  position: relative;
  
  span {
    position: absolute;
    top: -18px;
    left: 0;
    color: orangered;
  }
`;
