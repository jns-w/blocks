import { atom } from "jotai";
import { storagePrefix } from "@utils";
import { IUser } from "@definitions";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage<IUser>(`${storagePrefix}AUTH`, {
  _id: undefined,
  username: undefined,
});

export const authTokenAtom = atomWithStorage(`${storagePrefix}TKN`, "");

export const userActionTimestampAtom = atomWithStorage<number>(
  `${storagePrefix}LAST-ACTION`,
  0
);

export const socketConnectionAtom = atom<boolean>(false);

export const isCheckingAuthAtom = atom<boolean>(true);
export const isSyncingAtom = atom<boolean>(false);
