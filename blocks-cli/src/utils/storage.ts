export const storagePrefix = 'BLKS_';

export const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}TKN`) as string);
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}TKN`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}TKN`);
  },
  getPersistentState: (key:string) => {
    return JSON.parse(window.localStorage.getItem(storagePrefix+key) as string);
  },
  setPersistentState: (key: string, value: any) => {
    window.localStorage.setItem(storagePrefix+key, JSON.stringify(value));
  }
};