import {atomWithStorage} from "jotai/utils";
import {atom} from "jotai";


export const atomWithToggleAndStorage = (
  key: string, initialValue?: boolean, storage?: any
) => {

  const baseAtom = atomWithStorage(key, initialValue, storage)
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, val: boolean) => {
      const update = val ?? !get(baseAtom)
      set(baseAtom, update)
    }
  )
  return derivedAtom
}