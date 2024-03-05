import {BaseLayout} from "@layouts";
import React, {ReactElement, useRef, useState} from "react";
import {Helmet} from "react-helmet-async";
import {authedReq, inputObjHandler} from "@/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import styled from "styled-components";
import {Button, GradientBG, InputBasic, InputsWithLabel, media} from "@/styles";
import {useRouter} from "next/router";
import {useIsomorphicLayoutEffect} from "@/hooks";
import {checkPasswordValidity, pwdSchema, req, storage} from "@/utils";
import {validate} from "email-validator";
import {authTokenAtom, userAtom} from "@/atoms";
import {useAtom} from "jotai";
import {useDebounce, useEventListener} from "usehooks-ts";
import axios from "axios";

type InputsProps = {
  username: string,
  email: string,
  password: string
}

const SignUp = () => {
  const router = useRouter()
  const [inputs, setInputs] = useState<InputsProps>({username: "", email: "", password: ""})
  const [focus, setFocus] = useState<"username" | "email" | "password" | "">("")
  const [usernameIsValid, setUsernameIsValid] = useState<boolean | "loading">(false)
  const [emailIsValid, setEmailIsValid] = useState<boolean | "loading">(false)
  const [passwordIsValid, setPasswordIsValid] = useState<boolean | "loading">(false)
  const debouncedInputs = useDebounce(inputs, 350)
  const [user, setUser] = useAtom(userAtom)
  const [token, setToken] = useAtom(authTokenAtom)

    // is valid booleans could be swr design.

  const usernameRef: React.Ref<any> = useRef()
  const passwordRef: React.Ref<any> = useRef()
  const emailRef: React.Ref<any> = useRef()

  /* logic
  * if username validity states: true, false, loading, illegal characters, none
  *
  * state where
  *
  *
   */


  const checkUsernameValidity = async () => {
    const res = await req.get('/api/auth/validusername', {
      check: inputs.username
    })
    if (res.success) {
      if (res.usernameIsAvail) setUsernameIsValid(true); else setUsernameIsValid(false)
    }
  }

  const checkEmailValidity = async () => {
    // basic is email string clearance first
    const isValidEmailStr = validate(inputs.email)
    if (!isValidEmailStr) return;
    // then check if email already registered
    const res = await req.get('/api/auth/validemail', {
      check: inputs.email
    })
  }


  const signUp = async () => {
    // first check that inputs are valid
    try {
      const response: Awaited<{
        success: true,
        data: {
          token: string
        }
      }> = await req.encPut('/api/blocks/auth/signup', inputs)
      if (response.success) {
        setToken(response.data.token)
        const res: Awaited<{
          success: boolean,
          data: {
            _id: string,
            username: string
          }
        }> = await authedReq.get('/api/blocks/auth/checkuser')
        if (res.data !== null) {
          setUser({_id: res.data._id, username: res.data.username})
          await router.push('/')
        }
      }
    } catch (err: any) {
      if (err.response.data.msg === 'username taken') {
        // show taken pop up
      }
      console.log(err)
    }
  }

  useIsomorphicLayoutEffect(() => {
    if (debouncedInputs.password == "") return;
    const isValid = checkPasswordValidity(debouncedInputs.password)
  }, [debouncedInputs.password])

  useIsomorphicLayoutEffect(() => {
    // const usernameIsValid = await checkUsernameValidity()
  }, [debouncedInputs.username])

  useEventListener('keypress', (ev) => {
    if (ev.key == 'Enter') {
      ev.preventDefault();
      if (inputs.email && inputs.username && inputs.password) {
        signUp()
      }
    }
  })
  // @ts-ignore
  useEventListener('focus', (ev: React.FocusEvent<HTMLInputElement>) => {
    setFocus("username")
  }, usernameRef)

  // @ts-ignore
  useEventListener('focus', (ev: React.FocusEvent<HTMLInputElement>) => {
    setFocus("email")
  }, emailRef)

  // @ts-ignore
  useEventListener('focus', (ev: React.FocusEvent<HTMLInputElement>) => {
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
        <h2>Get started today.</h2>
        <p>Sign up for an account</p>
        <InputsContainer>
          <div>
            <label>Username</label>
            <Input type="text" name="username" value={inputs.username} placeholder="johndoe92, elontusk"
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => inputObjHandler(e, setInputs, inputs)}
                   ref={usernameRef}
            />
          </div>
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
                   ref={passwordRef}
            />
          </div>
        </InputsContainer>
        <SignUpButton onClick={() => signUp()}>
          Create account <FontAwesomeIcon icon={faArrowRight} style={{fontSize: 13.5}}/>
        </SignUpButton>

        <SignUpContainer>
          <p>Already have an account?</p>
          <Link href="/signin"><h4>Sign in here</h4></Link>
        </SignUpContainer>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 80vh;
  font-family: "Inter", sans-serif;
`

const Logo = styled.div`
  h3 {
    cursor: pointer;
    font-size: 23px;
    color: ${({theme}) => theme.color.mainAccent};
    margin: 25px 0 10px 0;
`

const Container = styled.div`
  display: flex;
  margin: 70px auto 0 auto;
  padding: 40px 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 450px;

  h2 {
    font-family: "Inter", sans-serif;
    font-size: 43px;
    color: ${({theme}) => theme.color.textColor};
    margin: 0;
  }

  p {
    font-family: "Inter", sans-serif;
    font-size: 19px;
    font-weight: 400;
    color: ${({theme}) => theme.color.mildTextColor};
    margin: 10px 0 60px 0;

  }

  ${media.laptop} {
    margin: 35px auto 0 auto;
  }
}

;

${media.phone} {
  margin: 0;
  justify-content: center;

  h2 {
    font-size: 25px;
  }

  p {
    font-size: 15px;
    margin: 10px 0 40px 0;
  }
}

;

${media.phoneSm} {
  margin: 0;
  padding: 0 20px;
  justify-content: center;
  height: 100%;

  p {
    margin: 5px 0 20px 0;
  }

;
`
const InputsContainer = styled(InputsWithLabel)`
  gap: 12px;
`

const Input = styled(InputBasic)``

const SignUpButton = styled(Button)`
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



export default SignUp