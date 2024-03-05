import {atom} from 'jotai'
import {storage, storagePrefix} from "@utils";
import {atomWithStorage} from "jotai/utils";
import {AppState, BlockType, Project, TimeCheck} from "@types";


export const timeAtom = atomWithStorage<number>(storagePrefix+'DURATION', 0)

export const timerIsOnAtom = atomWithStorage<boolean>(storagePrefix+'IS-ON', false)

export const timeCheckAtom = atomWithStorage<TimeCheck>(storagePrefix+'CHECK', {startDuration: 0, startEpoch:0})

export const projectsAtom = atomWithStorage<Project[]>(storagePrefix+'PROJECTS',[])

export const currentBlockAtom = atomWithStorage<string>(storagePrefix+'CURRBLOCK', "")

export const blockHistoryAtom = atomWithStorage<BlockType[]>(storagePrefix+'HISTORY', [])

export const currentProjectAtom = atomWithStorage<Project>(storagePrefix+'CURRPROJECT', {id: "", name: ""})

export const targetDurationAtom = atomWithStorage<number>(storagePrefix+'TARGETDUR', 0)

export const timerInputsAtom = atom({
    hours: "",
    minutes: "",
    seconds: "",
    targetDuration: "",
    currentBlock: "",
    newProjectName: "",
  })