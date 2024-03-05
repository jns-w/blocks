import {Modal} from "@components";
import {inputObjHandler} from "@utils";
import React from "react";
import {targetModalAtom, timerInputsAtom} from "@atoms";
import {useAtom} from "jotai";
import styled from "styled-components";

type TimerModalProps = {
  setGoal: Function
}

export const TimerModals = (props: TimerModalProps) => {
  const [targetModal, setTargetModal] = useAtom(targetModalAtom);
  const [timerInputs, setTimerInputs] = useAtom(timerInputsAtom);

  return (
    <>
      {targetModal && (
        <Modal
          header={"Target timing"}
          setMount={setTargetModal}
          buttonContent={{fn: props.setGoal, text: "Save", isActive: true}}
          key={"targetModal"}
        >
          <Container>
            <TimeInputGroup>
              <TimeInputContainer key="timeInputHours">
                <LabelContainer><label>hours</label></LabelContainer>
                <Input
                  name={"hours"}
                  value={timerInputs.hours}
                  onChange={(e) => inputObjHandler(e, setTimerInputs, timerInputs, {type: "number"})}
                />
              </TimeInputContainer>
              <Separator>:</Separator>
              <TimeInputContainer key="timeInputMinutes">
                <LabelContainer><label>minutes</label></LabelContainer>
                <Input
                  name={"minutes"}
                  value={timerInputs.minutes}
                  onChange={(e) => inputObjHandler(e, setTimerInputs, timerInputs, {
                    type: "number",
                    qualifier: (val: string) => parseInt(val) < 60,
                  })}/>
              </TimeInputContainer>
              <Separator>:</Separator>
              <TimeInputContainer key="timeInputSeconds">
                <LabelContainer><label>seconds</label></LabelContainer>
                <Input
                  name={"seconds"}
                  value={timerInputs.seconds}
                  onChange={(e) => inputObjHandler(e, setTimerInputs, timerInputs, {
                    type: "number",
                    qualifier: (val: string) => parseInt(val) < 60,
                  })}/>
              </TimeInputContainer>
            </TimeInputGroup>
            <DescriptionInputContainer>
              <LabelContainer><label>description</label></LabelContainer>
            <Input
              name={"currentBlock"}
              placeholder="Block description"
              value={timerInputs.currentBlock}
              onChange={(e) => inputObjHandler(e, setTimerInputs, timerInputs)}
              onKeyDown={(e) => {
                if (e.key === "Enter") props.setGoal();
              }}
            />
            </DescriptionInputContainer>

            <TimingPresetsContainer>
              {['5m', '10m', '15m', '30m', '45m', '1h', '1.5h', '2h', '2.5h', '3h', '4h', '5h'].map(el => {
                const unit = el.at(-1)
                const n = Number(el.slice(0, -1))
                let s = 0;
                if (unit === 'm') {
                  s = n * 60
                } else if (unit === 'h') {
                  s = n * 3600
                }
                return (
                  <button onClick={() => setTimerInputs({...timerInputs, targetDuration: s.toString()})}>
                    {el}
                  </button>
                )
              })}
            </TimingPresetsContainer>
          </Container>
        </Modal>
      )}

    </>
  )
}


const TimingPresetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;

  button {
    all: unset;
    cursor: pointer;
    font-family: "SF Pro", sans-serif;
    font-size: 12px;
    color: ${({theme}) => theme.color.textColor};
    background: ${({theme}) => theme.color.inputBg};
    padding: 12px 5px;
    border-radius: 7px;
  }
`

const TimeInputGroup = styled.div`
  display: grid;
  grid-template-columns: 86px 15px 86px 15px 86px;
  justify-content: center;
`

const TimeInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  div {
    position: absolute;
    bottom: 10px;
    display: inline-block;
    justify-content: center;
    width: 100%;

    label {
      font-size: 10px;
      color: ${({theme}) => theme.color.mildTextColor};
      opacity: 0.6;
    }
  }
`

const DescriptionInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const LabelContainer = styled.div`
  position: absolute;
  bottom: 10px;
  display: inline-block;
  justify-content: center;
  width: 100%;

  label {
    font-size: 10px;
    color: ${({theme}) => theme.color.mildTextColor};
    opacity: 0.6;
  }
`

const Separator = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  height: 30px;
  margin: auto;
  font-weight: bold;
`

const Container = styled.div`
  display: grid;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 300px;
`

export const Input = styled.input`
  background-color: ${({theme}) => theme.color.inputBg};
  color: ${({theme}) => theme.color.textColor};
  border: solid 1px ${({theme}) => theme.color.boxOutline};
  border-radius: 3px;
  height: 55px;
  padding: 10px 10px;
  max-width: 300px;

  font-family: SFProDisplay, sans-serif;
  font-size: 23px;
  text-align: center;
  font-weight: bolder;

  &:focus {
    outline: none;
  }
`