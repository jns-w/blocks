import React, {useState} from "react";

import {Logo, Tooltips} from "@components";
import styled from "styled-components";
import {ThemeToggle} from "@components/themetoggle";
import {
  currentBlockAtom,
  timeAtom,
  timerIsOnAtom,
  userAtom,
  blockHistoryAtom,
  socketConnectionAtom,
  authTokenAtom
} from "@atoms";
import {useAtom} from "jotai";
import {getWorkDay, isWithin24Hours, isWork, secondsToHourMinSec, storage, stringTime} from "@utils";
import {useIsomorphicLayoutEffect} from "@hooks";
import {hoursToMilliseconds, isSameDay, isToday} from "date-fns";
import {Button} from "@styles";
import {useRouter} from "next/router";

export const Header: React.FC = () => {
  const [time] = useAtom(timeAtom)
  const [blocks] = useAtom(blockHistoryAtom)
  const [currentBlock] = useAtom(currentBlockAtom)
  const [dayBlocksDuration, setDayBlocksDuration] = useState(0)
  const [dayFocus, setDayFocus] = useState(0)
  const [durationDisplayStr, setDurationDisplayStr] = useState(false)
  const [isOn] = useAtom(timerIsOnAtom)
  const [user, setUser] = useAtom(userAtom)
  const [profileTooltips, setProfileTooltips] = useState(false)
  const [socketConnection,] = useAtom(socketConnectionAtom)
  const [, setToken] = useAtom(authTokenAtom)

  const router = useRouter();

  function logout() {
    setToken("")
    setUser({_id: undefined, username: undefined})
  }

  useIsomorphicLayoutEffect(() => {
    let count = 0
    const currentWorkDay = getWorkDay(Date.now(), hoursToMilliseconds(6));
    for (let i = blocks.length - 1; i >= 0; i--) {
      const block = blocks[i]
      const blockWorkDay = getWorkDay(block.endTimestamp, hoursToMilliseconds(6));
      if (!isSameDay(currentWorkDay, blockWorkDay)) {
        break;
      }
      if (isSameDay(currentWorkDay, blockWorkDay) && isWork(block.name || "")) {
        count += block.duration || 0
      }
    }
    setDayBlocksDuration(count)
  }, [blocks])

  useIsomorphicLayoutEffect(() => {
    let total = dayBlocksDuration

    if (isWork(currentBlock)) {
      total += time || 0
    }

    setDayFocus(total)
  }, [time, dayBlocksDuration, currentBlock])


  return (
    <Wrapper>
      <Container>
        <Left>
          <Logo/>
        </Left>
        {user.username ?
          <ProfileButton onClick={() => setProfileTooltips(true)}>
            { socketConnection ? <ConnectedUserText> {user.username} </ConnectedUserText> : user.username}
            {
              profileTooltips &&
              <Tooltips setMount={setProfileTooltips}>
                <div onClick={() => logout()}>Logout</div>
              </Tooltips>
            }
          </ProfileButton> :
          <ProfileButton>
            <div>
              <SigninText onClick={() => router.push('/signin')}>Sign In</SigninText>
            </div>
            <p>{`or`}</p>
            <SigninText onClick={() => router.push('/signup')}>Get Started</SigninText>
          </ProfileButton>
        }
        <Right>
          <DayFocus isOn={isOn}
                    onClick={() => setDurationDisplayStr(!durationDisplayStr)}>
            <p>Today: </p>
            <h5>
              {
                durationDisplayStr ?
                  secondsToHourMinSec(dayFocus!, true)
                  :
                  stringTime(dayFocus!, true)
              }
            </h5>
          </DayFocus>
          <ThemeToggle/>
        </Right>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 80px;
  background-color: ${({theme}) => theme.color.background};
  color: ${({theme}) => theme.color.textColor};
  transition: background-color 100ms ease 0s;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0 60px;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  @media (max-width: 575px) {
    min-width: 22rem;
  }
`;


const Left = styled.div`

`

const Right = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`

const AuthContainer = styled.div`
  display: grid;
  grid-template-columns: 45px 20px 100px;
  justify-content: center;
  font-size: 12px;
  height: 30px;

  div {
    justify-content: center;
    align-items: center;
    display: flex;
  }
`


const SignUpButton = styled(Button)`
  border: ${({theme}) => theme.color.white} 1px solid;
`

const SigninText = styled.p`
  margin: 0 5px;
  padding: 0;
  font-weight: 600;
  font-family: "Inter", sans-serif;
  cursor: pointer;
  
  &:hover {
    color: ${({theme}) => theme.color.mainAccent};
  }
`

const DayFocus = styled.div.attrs((props: { isOn: boolean }) => props)`
  position: absolute;
  top: 100px;
  right: 10px;
  cursor: pointer;
  user-select: none;
  margin-inline: auto;
  align-items: center;

  h5 {
    margin: 0;
    padding: 0;
    font-family: "SF Pro Display", sans-serif;
    font-weight: 600;
    font-size: 14px;
    color: ${props => props.isOn ? props.theme.color.mainAccent : props.theme.color.mildTextColor};
    transition: color 300ms ease 0ms;
  }


  p {
    font-weight: 100;
    font-size: 12px;
    opacity: 0.6;
  }`

const ProfileButton = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  user-select: none;
  cursor: pointer;
  padding: 10px 20px;
  font-size: 13px;
  border-radius: 20px;
  margin-right: 20px;
  transition: background-color 100ms ease 0s, box-shadow 100ms ease 0s;
  background-color: ${({theme}) => theme.color.cardsBg};
  color: ${({theme}) => theme.color.mildTextColor};

  box-shadow: ${({theme}) => theme.color.boxShadow} 1px 1px 5px;

  &:hover {
    background-color: ${({theme}) => theme.color.cardsHover};
  }
`

const ConnectedUserText = styled.p`
  color: ${({theme}) => theme.color.mainAccent};
  margin: 0;
  padding: 0;
`
