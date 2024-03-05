import React, {useState} from 'react';
import styled from 'styled-components';
import {Button, Modal} from "@components";
import {useIsomorphicLayoutEffect} from "@hooks";
import {BlockType} from "@types";
import {getWorkDay, isWork, stringTimeWithText} from "@utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faClipboardCheck} from "@fortawesome/free-solid-svg-icons";
import {
  format,
  hoursToMilliseconds, isSameDay,
} from "date-fns";
import {blockHistoryAtom} from "@atoms";
import {useAtom} from "jotai";

interface Props {
  setOpen: Function
}

interface IActivity {
  projectName: string | undefined,
  name: string | undefined,
  totalDuration: number | null
}

export const BlocksOverview: React.FC<Props> = (props) => {
  const [modal, setModal] = useState(false)
  const [overview, setOverview] = useState<Array<IActivity>>([])
  const [mode, setMode] = useState("today")
  const [totalWork, setTotalWork] = useState(0)
  const [isCopied, setIsCopied] = useState(false)

  const [blocks] = useAtom(blockHistoryAtom)

  function closeModal() {
    setModal(false)
  }

  function toggleMode() {
    if (mode == "today") {
      setMode("all time")
    } else {
      setMode("today")
    }
  }

  function calcTotalWork(activities: Array<IActivity>): number {
    if (!activities) return 0;
    let duration = 0
    for (let i = 0; i < activities.length; i++) {
      if (isWork(activities[i].name!)) {
        duration += activities[i].totalDuration!
      }
    }
    return duration
  }

  function arrangeByDuration(activities: Array<IActivity>): Array<IActivity> {
    return activities.sort((a, b) => {
      return b.totalDuration! - a.totalDuration!
    })
  }


  function copyActivities(): void {
    let clipboardStr = ""
    clipboardStr += `#Flow duration: **${stringTimeWithText(totalWork)}**\n`
    overview.forEach(activity => {
      clipboardStr += `${activity.projectName} | ${activity.name}: ${stringTimeWithText(activity.totalDuration!)}\n`
    })
    navigator.clipboard.writeText(clipboardStr)

    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 800)
  }

  useIsomorphicLayoutEffect(() => {
    /*
      This section deals with combining sessions of the same description
      it also takes into account if it is today mode by breaking the loop

      1. start loop on sessions from the latest date (backwards)
      2. break loop when mode is today & we reach a non-today date
      3. else continue the loop for all

      this function can evolve to do weekly / monthly modes

      update: hard code start of day to be 6am
      convert start time in to millis from 00:00, add it from timestamp
    */
    // const workDayStartsAt = 21600000 // 6hours
    let arr: Array<IActivity> = []
    if (blocks!!) {
      const currentWorkDay = getWorkDay(Date.now(), hoursToMilliseconds(6))
      for (let i = blocks.length-1; i>=0;i--) {
        const block = blocks[i]
        const sessionWorkDay = getWorkDay(block.endTimestamp, hoursToMilliseconds(6))
       // if (!isToday(session.endTimestamp) && mode == "today") break;
        if (!isSameDay(sessionWorkDay, currentWorkDay) && mode == "today") break;
          let index = arr.findIndex(el => el.name == block.name && el.projectName == block.projectName)
          if (index === -1) {
            let obj: IActivity = {
              projectName: block.projectName,
              name: block.name,
              totalDuration: block.duration
            }
            arr.push(obj)
          } else {
            let newObj = {
              projectName: block.projectName,
              name: block.name,
              totalDuration: (arr[index].totalDuration! + block.duration!)
            }
            arr.splice(index, 1, newObj)
          }
      }
      arr = arrangeByDuration(arr)
      setTotalWork(calcTotalWork(arr))
      setOverview(arr)
      setModal(true)
    }
  }, [mode])


  return (
    <Wrapper>
      {modal &&
        <Modal setMount={props.setOpen}
               header={"Sessions Overview"}
        >
          <Container>
            {isCopied &&
              <CopySuccessIcon style={{opacity: 0}}>
                <FontAwesomeIcon icon={faClipboardCheck}/>
              </CopySuccessIcon>
            }

            <Button
              onClick={() => toggleMode()}>{mode}{mode == 'today' ? ` (${format(getWorkDay(Date.now(),hoursToMilliseconds(6)), "dd-MM-yyyy")})` : ""}</Button>
            {overview!! && overview.map((activity) => (
              <ActivityContainer key={activity.projectName+"-"+activity.name}>
                <div>{activity.projectName} - {activity.name}</div>
                <div
                  style={{opacity: isWork(activity.name!) ? 1 : 0.3}}>{stringTimeWithText(activity.totalDuration!)}</div>
              </ActivityContainer>
            ))}
            <TotalContainer>Flow: {stringTimeWithText(totalWork)}</TotalContainer>
            <div>
              <Button type={'accent'} style={{marginTop: '20px', width: '50px'}} onClick={() => copyActivities()}>
                <CopyIconContainer>
                  <FontAwesomeIcon icon={faClipboardCheck}
                                   style={{position: "absolute", opacity: isCopied ? 1 : 0}}/>
                  <FontAwesomeIcon icon={faCopy} style={{opacity: isCopied ? 0 : 1}}/>
                </CopyIconContainer>

              </Button>
            </div>

          </Container>
        </Modal>
      }
    </Wrapper>
  );
}

const Wrapper = styled.div``

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px;
`

const ActivityContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const TotalContainer = styled.div`
  margin-top: 50px;
`

const CopySuccessIcon = styled.div`
  position: absolute;
  color: greenyellow;
  font-size: 150px;
  left: 150px;
`

const CopyIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;

  svg {
    transition: opacity 500ms ease 50ms;
  }

`
