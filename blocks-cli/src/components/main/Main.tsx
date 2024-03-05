import React, {useEffect} from "react";
import styled from "styled-components";
import {Timer} from "@components";
import {useAtom} from "jotai";
import {authTokenAtom, isCheckingAuthAtom, userAtom} from "@atoms";
import {useIsomorphicLayoutEffect} from "usehooks-ts";
import {authedReq, isDev, storage} from "@utils";

export const Main: React.FC = () => {
  const [, setUser] = useAtom(userAtom)
  const [token,] = useAtom(authTokenAtom)
  const [, setIsCheckingAuth] = useAtom(isCheckingAuthAtom)

  async function verifyToken() {
    try {
       if (!token) return;
       const res: Awaited<{
         success: boolean,
         data: {
            _id: string,
            username: string
         }
       }> = await authedReq.get('/api/blocks/auth/checkuser')
      if (res.success) {
        setUser({_id: res.data._id, username: res.data.username})
      }
    } catch (err) {
      if (isDev()) console.log(err);
      throw err
    }
  }
  useEffect( () => {
    setIsCheckingAuth(true)
    verifyToken();
    setIsCheckingAuth(false)
  }, [token])


  return (
    <Wrapper>
      <Container>
        <Timer />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
  top: 80px;
  bottom: 0;
  justify-content: center;
  align-items: flex-start;
  // background-color: ${({theme}) => theme.color.background};
  // color: ${({theme}) => theme.color.textColor};
  transition: background-color 100ms ease 0s;
  padding: 0;
`;

const Container = styled.div`
  text-align: center;
  max-width: 71rem;

  h1 {
    font-family: SFProDisplay, sans-serif;
    font-size: 5.5rem;
    font-weight: 900;
    line-height: 0rem;
    transition: all 200ms linear 0s;
  }

  p {
    margin-bottom: 100px;
  }
`;
