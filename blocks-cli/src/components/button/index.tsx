import React from "react";
import styled from "styled-components";

// export type IButton = React.DetailedHTMLProps<
//   React.ButtonHTMLAttributes<HTMLButtonElement>,
//   HTMLButtonElement
// >;

interface IButton {
    active?: boolean,
    onClick?: Function,
    onMouseEnter?: Function,
    onMouseLeave?: Function
    type?: string
    style?: object
}

export const Button: React.FC<IButton> = ({active, type, ...rest}) => {

    switch (type) {
        case 'accent':
            return <ActiveButton accent {...rest} />;
        case 'warning':
            return <ActiveButton warning {...rest} />;
        case 'inactive':
            return <InactiveButton {...rest} />
    }

    return <InactiveButton {...rest} />;
};


const ActiveButton = styled.button<any>`
  font-family: Arial, sans-serif;
  font-size: 1.25rem;
  color: ${props => props.accent ?
          ({theme}) => theme.color.white :
          props => props.warning ?
                  ({theme}) => theme.color.white :
                  ({theme}) => theme.color.textColor};
    //background-color: ${({theme}) => theme.color.mainAccent};
  background-color: ${props => props.accent ?
          ({theme}) => theme.color.mainAccent :
          props => props.warning ? ({theme}) => theme.color.warning :
                  ({theme}) => theme.color.inactiveAccent};

  border-radius: 100px;
  border: none;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 200ms linear 0s;
  user-select: none;
`;

const InactiveButton = styled.button<any>`
  font-family: Arial, sans-serif;
  font-size: 1.25rem;
  color: ${({theme}) => theme.color.mildTextColor};
  background-color: ${({theme}) => theme.color.inactiveAccent};
  border-radius: 30px;
  border: none;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 200ms linear 0s;
  user-select: none;
`
