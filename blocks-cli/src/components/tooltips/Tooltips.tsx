import {useOnClickOutside} from '@hooks';
import {wait} from '@utils';
import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';

interface TooltipsProps {
    setMount: Function
}

export const Tooltips: React.FC<TooltipsProps> = (props) => {
    const [open, setVisible] = useState(false)

    const ref = useRef(null);

    async function closeTooltips() {
        setVisible(false)
        await wait(250)
        props.setMount(false)
    }

    useEffect(() => {
        setVisible(true)
    }, [])

    useOnClickOutside(ref, closeTooltips)

    return (
        <Wrapper ref={ref} style={open ? {opacity: 1} : {opacity: 0}}>
            <Triangle>
                <div/>
            </Triangle>
            <Container>
                {props.children}
            </Container>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  z-index: 8;
  position: absolute;
  top: 40px;
  left: -10px;
  user-select: none;
  transition: opacity 300ms linear 0s, background-color 100ms ease 0s;
`

const Triangle = styled.div`
  z-index: 7;
  position: absolute;
  top: -7px;
  left: 50px;
  width: 20px;
  height: 8px;
  background: ${({theme}) => theme.color.boxOutline};
  clip-path: polygon(0% 100%, 50% 0%, 100% 100%);


  div {
    position: absolute;
    top: 2px;
    width: 20px;
    height: 8px;
    background: ${({theme}) => theme.color.cardsBg};
    clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
    border-bottom: ${({theme}) => theme.color.cardsBg};
  }

`


const Container = styled.div`
  display: grid;
  width: 130px;

  div {
    display: flex;
    height: 33px;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.color.cardsBg};
    border-left: 1px solid ${({theme}) => theme.color.boxOutline};
    border-right: 1px solid ${({theme}) => theme.color.boxOutline};
    color: ${({theme}) => theme.color.textColor};
    cursor: pointer;

    &:hover {
      background-color: ${({theme}) => theme.color.cardsHover};
      transition: border 200ms linear 0s, opacity 100ms linear 100ms;
    }
  }

  div:nth-child(1) {
    border-radius: 8px 8px 0 0;
    border-top: 1px solid ${({theme}) => theme.color.boxOutline};
  }

  div:nth-last-child(1) {
    border-bottom: 1px solid ${({theme}) => theme.color.boxOutline};
    border-radius: 0 0 8px 8px;
  }
  
  div:only-child {
    border-radius: 8px;
  }

`
