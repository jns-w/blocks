import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useIsomorphicLayoutEffect, useEventListener} from "@hooks";
import {isWork, wait} from "@utils";
import {currentBlockAtom} from "@atoms";
import {useAtom} from "jotai";
import {red} from "colorette";

type Props = {
  time: number | null,
  goalTime: number,
  sessionDescription: string,
  setMount: Function
}

export const MiniProgressBar: React.FC<Props> = (props) => {
  const [percentage, setPercentage] = useState(0)
  const [vis, setVis] = useState(false)
  const [sessionDescription] = useAtom(currentBlockAtom)

  const isBrowser = () => typeof window !== "undefined"

  const unmount = async () => {
    setVis(false)
    await wait(500)
    props.setMount(false)
  }

  useIsomorphicLayoutEffect(() => {
    if (props.time === null) setPercentage(0); else {
      const p = (props.time / props.goalTime) * 100
      if (p >= 100) setPercentage(100); else setPercentage(p);
    }
  }, [props.time, props.goalTime])


  if (isBrowser()) {
    useEventListener('focus', (ev) => {
      unmount()
    })
  }

  useEffect(() => {
    async function fadeIn() {
      try {
        await wait(1)
        setVis(true)
      } catch (err) {
      }
    }
    fadeIn()
  }, [])

  return (
    <Wrapper style={vis ? {opacity: 1} : {opacity: 0}}>
      <Container sessionDescription={sessionDescription}>
        <ColorBar percentage={percentage} sessionDescription={sessionDescription}/>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 38px;
  transition: opacity 500ms ease-in-out 0s;
`

const Container = styled.div.attrs((props: { sessionDescription: string }) => props)`
  display: flex;
  height: 400px;
  width: 15px;
  border: ${props => {
    if (!isWork(props.sessionDescription)) return "red"
    return "green"
  }} 1px solid;
  border-radius: 5px;
  opacity: .7;
  position: absolute;
  bottom: 0;
`

const ColorBar = styled.div.attrs((props: { percentage: number, sessionDescription: string }) => props)`
  background-color: ${props => {
    if (!isWork(props.sessionDescription)) return "red"
    return "green"
  }};
  height: ${props => props.percentage}%;
  border-radius: 0 0 4px 4px;
  width: 100%;
  position: absolute;
  bottom: 0;
  transition: height 250ms linear 0ms;
`