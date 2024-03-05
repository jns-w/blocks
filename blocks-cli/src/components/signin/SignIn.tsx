import React, {useState} from "react";
import {Modal} from "@components";
import {userAtom} from "@/atoms";
import {useAtom} from "jotai";
import styled from "styled-components";
import axios from "axios";
import {getURIPrefix, inputObjHandler, isDev, storage} from "@utils";
import {AES} from 'crypto-js'

export const SignIn: React.FC = () => {
  const [mount, setMount] = useState(false)
  const [inputs, setInputs] = useState({username: "", password: ""})
  const [user, setUser] = useAtom(userAtom)

  const URI_PREFIX = getURIPrefix()

  const signUp = async () => {
    // first check that inputs are valid
    try {
      const message = JSON.stringify(inputs)
      const ciphertext = AES.encrypt(message, process.env.NEXT_PUBLIC_SECRET!).toString()
      const data = await axios.put(`${URI_PREFIX}/api/blocks/auth/signup`, {ciphertext}).then(res => res.data)
      if (data.success) {
        // jotai set token, set user
        storage.setToken(data.token)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const pingTest = async () => {
    try {
      const data = await axios.get(`${URI_PREFIX}/api/server/test`).then(res=>res.data)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  const checkUsername = async () => {
    try {
      const data = await axios.get(`${URI_PREFIX}/api/blocks/auth/nameavail`, {
        headers: {
          username: inputs.username
        }
      }).then(res=>res.data)
      console.log(data.avail)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Wrapper>
      <Modal setMount={setMount} header="Sign In">
        <Container>
          <Input placeholder="username" name="username" value={inputs.username}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputObjHandler(e, setInputs, inputs)}/>
          <Input placeholder="password" name="password" value={inputs.password} type="password"
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputObjHandler(e, setInputs, inputs)}/>
          <Button onClick={() => signUp()}>Sign in</Button>
          <Button onClick={() => checkUsername()}>check</Button>
          <Button onClick={() => pingTest()}>Backend Test</Button>
        </Container>
      </Modal>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
`

const Button = styled.button``

const Input = styled.input`
  background-color: ${({theme}) => theme.color.inputBg};
  color: ${({theme}) => theme.color.textColor};
  border: solid 1px ${({theme}) => theme.color.boxOutline};
  border-radius: 3px;
  height: 55px;
  padding: 10px 10px;
  max-width: 300px;

  font-family: SFProDisplay, sans-serif;
  font-size: 23px;
  text-align: left;
  font-weight: bolder;

  &:focus {
    outline: none;
  }
`