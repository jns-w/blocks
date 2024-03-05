import {atom} from 'jotai'
import {atomWithStorage} from "jotai/utils";
import {storagePrefix} from "@utils";


export const themeAtom = atomWithStorage<'light' | 'dark'>(storagePrefix+"THEME", 'light')
export const showBlocksAtom = atomWithStorage<boolean>(storagePrefix+'SHOW-BLOCKS', false)


export const targetModalAtom = atom<boolean>(false)
export const newProjectModalAtom = atom<boolean>(false)
export const blocksOverviewModalAtom = atom<boolean>(false)