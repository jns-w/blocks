import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {v4 as uuid} from "uuid";
import useSound from "use-sound";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRotateRight, faXmark} from "@fortawesome/free-solid-svg-icons";

import {Blocks, TimerModals} from "@components";
import {ToggleButton} from "@components/timer/ToggleButton";
import {ProgressBar} from "@components/timer/ProgressBar";

import {useEventListener, useInterval, useIsomorphicLayoutEffect,} from "@hooks";
import {authedReq, isDev, objectToSeconds, secondsToObject, socket, stringTime,} from "@utils";

import {AppState, BlockType, TimeObject, TimerOpts} from "@types";
import {useAtom} from "jotai";

import {
  blockHistoryAtom,
  currentBlockAtom,
  currentProjectAtom,
  isCheckingAuthAtom,
  isSyncingAtom,
  newProjectModalAtom,
  socketConnectionAtom,
  targetDurationAtom,
  targetModalAtom,
  timeAtom,
  timeCheckAtom,
  timerInputsAtom,
  timerIsOnAtom,
  userActionTimestampAtom,
  userAtom,
} from "@atoms";
import {parseInt} from "lodash";
import {ProjectsButton} from "@components/timer/projects";
import {media} from "@styles";

export const Timer = () => {
  const isBrowser = () => typeof window !== "undefined";
  const [user] = useAtom(userAtom);
  const [isCheckingAuth,] = useAtom(isCheckingAuthAtom);

  const [duration, setDuration] = useAtom(timeAtom);
  const [targetDuration, setTargetDuration] = useAtom(targetDurationAtom);
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);
  const [isOn, setIsOn] = useAtom(timerIsOnAtom);

  const [delay, setDelay] = useState<null | number>(null);
  const [isOvertime, setIsOvertime] = useState(false);
  const [timeCheck, setTimeCheck] = useAtom(timeCheckAtom);
  const [, setBlockHistory] = useAtom(blockHistoryAtom);

  const [socketConnection, setSocketConnection] = useAtom(socketConnectionAtom);
  const [isSyncing, setIsSyncing] = useAtom(isSyncingAtom);

  const [currentBlock, setCurrentBlock] = useAtom(currentBlockAtom);
  const [userActionTimestamp, setUserActionTimestamp] = useAtom(
    userActionTimestampAtom
  );
  const [timerInputs, setTimerInputs] = useAtom(timerInputsAtom);
  const [targetModal, setTargetModal] = useAtom(targetModalAtom);
  const [newProjectModal, setNewProjectModal] = useAtom(newProjectModalAtom);

  const [playSessionComplete] = useSound(
    "/sounds/539259-Kalimba-INTIMATE-G4-01.mp3",
    {volume: 0.5}
  );

  const [playSessionStart] = useSound(
    "/sounds/mixkit-software-interface-start-2574.wav",
    {volume: 0.5}
  );

  useEffect(() => {
    if (!user._id) return;
    connectSocket();
    loadDB();
    return () => {
      disconnectSocket();
    };
  }, [user._id]);

  useEffect(() => {
    if (!user._id && socket.connected) {
      disconnectSocket();
    }
  }, [user._id]);

  function onConnect() {
    setSocketConnection(true);
  }

  function onDisconnect() {
    setSocketConnection(false);
  }

  const connectSocket = () => {
    if (socketConnection) return;

    if (user._id) {
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);
      socket.on("state-change", (data) => nonUserActionUpdate(data.state));

      socket.connect();
      socket.emit("subscribe", {app: "BLKS", user});
    }
  };

  const disconnectSocket = () => {
    if (!socketConnection) return;
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
    socket.disconnect();
  };


  const toggleTimer = () => {
    if (isOn) {
      timerOff({
        isBroadcast: false,
      });
    } else {
      timerOn({
        isBroadcast: false,
      });
    }
  }

  const timerOn =  (opts: TimerOpts, data?: { state: AppState }) => {
    setIsOn(true);
    if (opts.isBroadcast) {
      nonUserActionUpdate(data!.state);
    } else {
      const now = Date.now();
      setTimeCheck({
        startDuration: duration ? duration : 0,
        startEpoch: now,
      });
      setUserActionTimestamp(now);
      broadcast("state-change");
      updateDB();
    }
    playSessionStart();
  }

  const timerOff =  (opts: TimerOpts, data?: { state: AppState }) => {
    setIsOn(false);
    if (opts.isBroadcast) {
      nonUserActionUpdate(data!.state);
    } else {
      setUserActionTimestamp(Date.now());
      setTimeCheck({...timeCheck, startEpoch: 0});
      broadcast("state-change");
      updateDB();
    }
  }

  const nonUserActionUpdate = (state: AppState) => {
    // // if state is from an earlier user action, we do not update
    if (!user._id) return;
    if (
      state.userActionTimestamp &&
      state.userActionTimestamp <= userActionTimestamp
    ) {
      return;
    }
    if (state.isOn && state.timeCheck.startDuration !== 0) {
      setDuration(
        state.timeCheck.startDuration +
        (Date.now() - state.timeCheck.startEpoch) / 1000
      );
    } else {
      setDuration(state.duration);
    }
    setIsOn(state.isOn);
    setCurrentBlock(state.currentBlock);
    setTimeCheck(state.timeCheck);
    setTargetDuration(state.targetDuration);
    setCurrentProject(state.currentProject);
    // setBlockHistory(state.blockHistory);
    // setProjects(state.projects);
  };

  const gatherState = (): AppState => {
    const state: AppState = {
      currentBlock,
      currentProject,
      duration,
      isOn,
      userActionTimestamp,
      targetDuration,
      timeCheck,
      // blockHistory,
      // projects,
    };
    return state;
  };

  const broadcast = (action: string) => {
    const state = gatherState();
    socket.emit("BLKS", {
      user,
      action,
      state,
    });
  };

  const resetTimer = () => {
    setDuration(0);
    setTimeCheck({startDuration: 0, startEpoch: 0});
    setIsOvertime(false);
    setIsOn(false);
    setUserActionTimestamp(Date.now);
  };

  const endBlock = async () => {
    const now = Date.now();
    const block = {
      id: uuid(),
      duration: duration,
      endTimestamp: now,
      projectName: currentProject ? currentProject.name : "",
      projectId: currentProject ? currentProject.id : "",
      name: currentBlock ? currentBlock : "",
    };

    if (user._id) {
      const res: Awaited<{
        success: boolean,
        data: {
          blockHistory: BlockType[],
          blockAdded: BlockType
        }
      }> = await authedReq.post("/api/blocks/history/complete", {block});
      if (res.success) {
        setBlockHistory(res.data.blockHistory);
      }
    } else {
      setBlockHistory((prevState: Array<BlockType>) => [...prevState, block]);
    }
    resetTimer();
    setUserActionTimestamp(now);
  };

  const setGoal = () => {
    const newTarget = parseInt(timerInputs.targetDuration);
    const newBlockName = timerInputs.currentBlock;
    setUserActionTimestamp(Date.now());
    if (newTarget) {
      setTargetDuration(newTarget);
      setCurrentBlock(newBlockName);
    }
    setUserActionTimestamp(Date.now());
  };

  const notifyOvertime = () => {
    // toggleTheme();
    playSessionComplete();
    setIsOvertime(true);
    if (NotificationSupported() && Notification.permission === "granted") {
      new Notification(`${currentBlock}`, {body: "Session ended"});
    }
  };

  if (isBrowser()) {
    useEventListener("focus", () => {
      connectSocket();
      loadDB();
      if (!isOn) return;
    });
  }

  useEventListener("keypress", (ev) => {
    if (targetModal || newProjectModal) return;
    if (ev.key == "Spacebar" || ev.key === " ") {
      ev.preventDefault();
      toggleTimer();
      setUserActionTimestamp(Date.now());
    }
  });

  useInterval(
    () => {
      if (!isOn) return;
      setDuration(
        Math.floor(
          timeCheck.startDuration + (Date.now() - timeCheck.startEpoch) / 1000
        )
      );
    },
    isOn ? delay : null
  );

  useEffect(() => {
    // CASE -- exact moment when goal time is reached
    if (duration === targetDuration) {
      notifyOvertime();
    }
    // CASE -- goal time was reached when window is unfocused
    if (duration! > targetDuration && !isOvertime) {
      setIsOvertime(true);
      notifyOvertime();
    }
  }, [duration, targetDuration]);

  useInterval(() => {
    if (user._id && !socket.connected) {
      setSocketConnection(false);
    }
  }, 5000);


  useEffect(() => {
    if (user._id && !isCheckingAuth) {
      loadDB();
    }
  }, [user._id, isCheckingAuth]);

  const updateDB = async () => {
    try {
      const res = await authedReq.put("/api/blocks/app", {
        state: gatherState(),
      });
    } catch (err) {
      if (isDev()) console.log(err);
    }
  };

  const loadDB = async () => {
    try {
      setIsSyncing(true);
      const res: Awaited<{ success: boolean, data: { state: AppState } }> = await authedReq.get("/api/blocks/app");
      if (res.success) {
        nonUserActionUpdate(res.data.state);
        setIsSyncing(false);
      } else {
        // app is up-to-date indication
        setIsSyncing(false);
      }
    } catch (err) {
      if (isDev()) console.log(err);
      setIsSyncing(false)
    }
  }

  useEffect(() => {
    broadcast("state-change");
    updateDB();
  }, [userActionTimestamp]);

  useIsomorphicLayoutEffect(() => {
    if (isOn) {
      setDelay(1000);
    } else {
      setDelay(null);
    }
  }, [isOn]);

  const NotificationSupported = () => {
    return "Notification" in window;
  };

  const getNotifPermission = async () => {
    if (!NotificationSupported()) return;
    await Notification.requestPermission().then((result) => {
    });
  };

  useIsomorphicLayoutEffect(() => {
    if (timerInputs.currentBlock !== currentBlock)
      setTimerInputs({...timerInputs, currentBlock});
  }, [currentBlock]);

  useIsomorphicLayoutEffect(() => {
    if (timerInputs.targetDuration !== targetDuration.toString())
      setTimerInputs({
        ...timerInputs,
        targetDuration: targetDuration.toString(),
      });
    const {hours, minutes, seconds} = secondsToObject(targetDuration);
    setTimerInputs({
      ...timerInputs,
      hours,
      minutes,
      seconds,
    });
  }, [targetDuration]);

  useIsomorphicLayoutEffect(() => {
    const {hours, minutes, seconds} = secondsToObject(
      parseInt(timerInputs.targetDuration)
    );
    setTimerInputs({
      ...timerInputs,
      hours,
      minutes,
      seconds,
    });
  }, [timerInputs.targetDuration]);

  useIsomorphicLayoutEffect(() => {
    const obj: TimeObject = {
      hours: timerInputs.hours || "0",
      minutes: timerInputs.minutes || "0",
      seconds: timerInputs.seconds || "0",
    };
    setTimerInputs({...timerInputs, targetDuration: objectToSeconds(obj)});
  }, [timerInputs.hours, timerInputs.minutes, timerInputs.seconds]);

  return (
    <Wrapper>
      {isSyncing && <SyncLoader>Syncing</SyncLoader>}
      <TimerModals setGoal={setGoal}/>
      <Container>
        <ButtonsContainer>
          <ToggleButton
            isOn={isOn}
            time={duration}
            goalTime={targetDuration}
            toggleTimer={toggleTimer}
          />

          <CurrentSessionContainer>
            <ProjectsButton/>
            {currentBlock && <Description>{currentBlock}</Description>}
          </CurrentSessionContainer>
        </ButtonsContainer>

        <TimerContainer>
          <div onClick={() => setTargetModal(true)}>
            {`${
              targetDuration >= 3600
                ? stringTime(duration!, true)
                : stringTime(duration!)
            } / ${
              duration! >= 3600
                ? stringTime(targetDuration, true)
                : stringTime(targetDuration)
            }`}
          </div>
          <ProgressBar time={duration} goalTime={targetDuration}/>
        </TimerContainer>

        <ResetButtonsContainer>
          {duration > 0 && (
            <div>
              <div onClick={() => resetTimer()}>
                <FontAwesomeIcon icon={faArrowRotateRight}/>
              </div>
              <div onClick={() => endBlock()}>
                <FontAwesomeIcon icon={faXmark}/>
              </div>
            </div>
          )}
        </ResetButtonsContainer>

        <Blocks
          setBlockDescription={setCurrentBlock}
        />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 100px;
`;

const SyncLoader = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  // width: 100%;
  // height: 100%;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
`;

const Container = styled.div`
    min-width: 410px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${media.phone} {
        min-width: 100vw;
        padding: 0 15px;
    }
`;

const TimerContainer = styled.div`
  display: grid;
  font-family: "SF Pro Display", sans-serif;
  font-weight: 600;
  font-size: 55px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.color.cardsBg};
  box-shadow: ${({theme}) => theme.color.boxShadow} 1px 1px 20px;
  padding: 15px 25px;
  border-radius: 20px;
  transition: all 100ms ease 0ms;

  &:hover {
    background-color: ${({theme}) => theme.color.cardsHover};
  }

  div {
    cursor: pointer;
    user-select: none;
  }

  ${media.phone} {
    font-size: 32px;
  }
  ${media.phoneSm} {
    font-size: 28px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 50px;
    font-size: 50px;
    cursor: pointer;
  }
`;

const Description = styled.div`
  color: ${({theme}) => theme.color.mildTextColor};
  display: flex;
  justify-content: start;
  align-items: center;
`;

const ResetButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 10px 0;
  height: 30px;
  opacity: 0.7;

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 13px;

    div {
      display: flex;
      justify-content: center;
      align-content: center;
      background: rgba(180, 180, 180, 0.2);
      padding: 8px;
      border-radius: 6px;
      cursor: pointer;

      :hover {
        background: rgba(180, 180, 180, 0.5);
      }
    }
  }
`;

const ButtonsContainer = styled.div`
  display: grid;
  gap: 6px;
  grid-template-columns: 1fr;

  button {
    width: 150px;
  }

  span {
    opacity: 0.5;
    font-weight: 300;
    font-size: 15px;
  }
`;

const CurrentSessionContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  height: 30px;
`;
