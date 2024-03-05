import React, {useState} from 'react';
import styled from 'styled-components';
import {useIsomorphicLayoutEffect} from "@hooks";
import {timeAtom} from "@atoms";
import {useAtom} from "jotai";

interface Props {
  time: number | null;
  goalTime: number;
}

export const ProgressBar: React.FC<Props> = (props) => {
  const [percentage, setPercentage] = useState(0)
  const [time] = useAtom(timeAtom)

  useIsomorphicLayoutEffect(() => {
    if (time === null) setPercentage(0); else {
      setPercentage((time / props.goalTime) * 100)
    }
  }, [time, props.goalTime])

  return (
    <Wrapper>
      <Container>
        <ColorBar percentage={percentage}/>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div``

const Container = styled.div`
  display: flex;
  height: 4px;
  background-color: ${({theme}) => theme.color.inactiveAccent};
  opacity: .8;
`

const ColorBar = styled.div.attrs((props: { percentage: number }) => props)`
  background-color: ${({theme}) => theme.color.mainAccent};
  height: 100%;
  width: ${props => props.percentage}%;

  transition: width 1000ms linear 0ms;
`