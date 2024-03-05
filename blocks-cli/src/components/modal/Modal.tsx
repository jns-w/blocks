import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Button} from "@components";
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {wait} from '@utils';
import {useEventListener, useOnClickOutside} from "usehooks-ts";
import {media} from "@styles";

interface ModalProps {
  setMount: any,
  header?: string,
  buttonContent?: ButtonContent,
  children: any
}

interface ButtonContent {
  text: String,
  fn: Function,
  isActive?: boolean
}

export const Modal: React.FC<ModalProps> = (props) => {
  const [visible, setVisible] = useState(false)
  const [input, setInput] = useState("")

  const ref = useRef(null)

  async function closeModal() {
    setVisible(false)
    await wait(250)
    props.setMount(false)
  }


  useEffect(() => {
    setVisible(true)
  }, [])

  useOnClickOutside(ref, closeModal)

  useEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      closeModal()
    }
    if (ev.key === 'Enter') {
      props.buttonContent?.fn()
      closeModal()
    }
  })

  return (
    <Wrapper style={visible ? {opacity: 1, transform: `scale(1)`} : {opacity: 0, transform: `scale(0.9)`}}>
      <Container ref={ref}>
        <>
          <HeaderContainer>
            {props.header || "Header"}
          </HeaderContainer>
          <CloseButton onClick={() => closeModal()}>
            <FontAwesomeIcon icon={faTimes}/>
          </CloseButton>
        </>

        <ContentContainer>
          {props.children}
        </ContentContainer>
        {props.buttonContent && props.buttonContent.fn != null ?
          <Button
            type={props.buttonContent?.isActive ? "accent" : "inactive"}
            onClick={() => {
              props.buttonContent?.fn();
              closeModal()
            }}> {props.buttonContent.text}
          </Button>
          :
          ""
          // <Button onClick={() => closeModal()}>Close</Button>
        }
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 1;
  //width: 100%;
  top: 15vh;
  left: 50vw;
  transition: all 200ms ease 0s;
  opacity: 0;
  
  ${media.phone} {
    width: 100%;
    left: 0;
    top: 10vh;
    padding: 10px 10px;
  }
`

const Container = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 10%;
  left: -211px;
  background-color: ${({theme}) => theme.color.cardsBg};
  border-radius: 10px;
  border: 1.5px solid ${({theme}) => theme.color.boxOutline};
  padding: 30px 60px;
  
  ${media.phone} {
    padding: 15px 15px;
    left: 0;
  }
`

const ContentContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
`

const CloseButton = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: ${({theme}) => theme.color.textColor}
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  color: ${({theme}) => theme.color.textColor};
  font-weight: bold;
  font-size: 20px;
`

const InputContainer = styled.div`
  display: grid;
  gap: 10px;
  justify-content: center;
  align-items: center;
`

const Input = styled.input`
  background-color: ${({theme}) => theme.color.inputBg};
  color: ${({theme}) => theme.color.textColor};
  border: solid 1px ${({theme}) => theme.color.boxOutline};
  border-radius: 3px;
  height: 55px;
  padding: 10px 10px;
  width: 350px;

  font-family: SFProDisplay, sans-serif;
  font-size: 23px;
  text-align: center;
  font-weight: bolder;

  &:focus {
    outline: none;
  }
`