import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from "next/link";
import {inputObjHandler} from "@/utils/handlers";
import {validate} from 'email-validator'
import {useIsomorphicLayoutEffect} from "@/hooks";
import {authedReq, isDev, pwdSchema, req, storage} from "@/utils";
import {Button, GradientBG, InputBasic, InputsWithLabel} from "@/styles";
import {useRouter} from "next/router";
import {useEventListener} from "usehooks-ts";
import {useAtom} from "jotai";
import {authTokenAtom, userAtom} from "@/atoms";

const SignIn = () => {
  const [inputs, setInputs] = useState({email: "", password: ""})
  const [focus, setFocus] = useState<"username" | "email" | "password" | "">("")
  const [validMail, setValidMail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [user, setUser] = useAtom(userAtom)
  const [token, setToken] = useAtom(authTokenAtom)

  const router = useRouter()
  const passwordRef: React.Ref<any> = useRef()
  const emailRef: React.Ref<any> = useRef()

  const signIn = async () => {
    try {
      const authRes = await req.encPost('/api/blocks/auth/signin', inputs)
      if (authRes.success) {
        // storage.setToken(authRes.token)
        setToken(authRes.data.token)
        const res: Awaited<{
          success: boolean, data: {
            _id: string,
            username: string
          }
        }> = await authedReq.get('/api/blocks/auth/checkuser')
        if (res.success) {
          setUser({_id: res.data._id, username: res.data.username})
          await router.push('/')
        }
      }
    } catch (err: any) {
      if (isDev()) console.log(err);
    }
  }

  useIsomorphicLayoutEffect(() => {
    if (validate(inputs.email)) setValidMail(true); else setValidMail(false);
  }, [inputs.email])

  useIsomorphicLayoutEffect(() => {
    if (pwdSchema.validate(inputs.password)) setValidPassword(true); else setValidPassword(false);
  }, [inputs.password])

  useEventListener('keypress', (ev) => {
    if (ev.key == 'Enter') {
      ev.preventDefault();
      if (inputs.email && inputs.password) {
        signIn()
      }
    }
  })

  useEventListener('focus', () => {
    setFocus("email")
  }, emailRef)

  useEventListener('focus', () => {
    setFocus("password")
  }, passwordRef)

  return (
    <Wrapper>
      <Container>
        <Logo>
          <h3 onClick={() => router.push('/')}>
            Blocks
          </h3>
        </Logo>
        <h2>Welcome back.</h2>
        <p>Sign in to your account</p>
        <InputsContainer>
          <div>
            <label>Email</label>
            <Input type="email" name="email" value={inputs.email} placeholder="johndoe55@hotmail.com"
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputObjHandler(e, setInputs, inputs)}
                   ref={emailRef}/>
          </div>
          <div>
            <label>Password</label>
            <Input type="password" name="password" value={inputs.password} placeholder="•••••••••"
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputObjHandler(e, setInputs, inputs)}
                   ref={passwordRef}/>
          </div>
        </InputsContainer>

        <SignInButton onClick={() => signIn()}>
          Sign in <FontAwesomeIcon icon={faArrowRight} style={{fontSize: 13.5}}/>
        </SignInButton>

        <SignUpContainer>
          <p>Don't have an account yet?</p>
          <Link href="/signup"><h4>Sign up here</h4></Link>
        </SignUpContainer>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 80vh;
`

const Logo = styled.div`
  h3 {
    cursor: pointer;
    font-size: 23px;
  }

  color: ${({theme}) => theme.color.mainAccent};
  margin: 25px 0 10px 0;
`

const Container = styled.div`
  display: flex;
  font-family: "Inter", sans-serif;
  margin: 70px auto 0 auto;
  padding: 40px 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 450px;
  height: 100%;
  
  h2 {
    font-family: "Inter", sans-serif;
    font-size: 43px;
    color: ${({theme}) => theme.color.textColor};
    margin: 0;
  }

  p {
    font-family: "Inter", sans-serif;
    font-size: ${({theme}) => theme.fontSize.l};
    font-weight: 400;
    color: ${({theme}) => theme.color.mildTextColor};
    margin: 10px 0 60px 0;
  }
`
const InputsContainer = styled(InputsWithLabel)`
  gap: 12px;
`

const Input = styled(InputBasic)``

const SignInButton = styled(Button)`
  margin-top: 50px;
  ${props => props.theme.name === 'dark' ? GradientBG : ''};
`

const SignUpContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 13.5px;
    color: ${({theme}) => theme.color.mildTextColor};
    padding: 0;
    margin: 0;
  }

  h4 {
    font-size: 13.5px;
    font-weight: 500;
    padding: 0;
    margin: 0;
    color: ${({theme}) => theme.color.textColor};

    :hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`

export default SignIn