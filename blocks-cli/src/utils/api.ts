import {isDev, storage} from "@/utils/index";
import axios, {AxiosRequestConfig} from "axios";
import {AES} from "crypto-js";
import * as process from "process";

const API_URL = "https://blocks-server.wldspace.com"

export const getURIPrefix = () => {
  return isDev() ? "" : process.env.NEXT_PUBLIC_API_ENDPOINT || API_URL
}


type Data = {
  success: boolean
}

type AuthConfig = {
  auth: string
}

const headers = {}

export const req = {
  get: async (endpoint: string, headers?: object) => {
    const res = await axios.get(`${getURIPrefix() + endpoint}`, {
      headers: {...headers}
    }).then(res => res.data)
      .catch((err) => {
        if (isDev()) console.log(err);
        throw err
      })
    return res
  },
  put: async (endpoint: string, payload: object, headers?: object) => {
    try {
      const data = await axios.put(`${getURIPrefix()}${endpoint}`, {
        ...payload,
        headers: {
          ...headers
        }
      }).then(res => res.data)
      if (data?.success) return data;
      return null;
    } catch (err) {
      if (isDev()) console.log(err);
      return null;
    }
  },
  // encrypted requests encrypts payload and places it under payload key in data object
  encPut: async (endpoint: string, payload: object, headers?: object) => {
    console.log("PUT", getURIPrefix(), endpoint)
    const res = await axios.put(`${getURIPrefix()}${endpoint}`, {
        payload: ENC.aes(payload)
      },
      {headers: {...headers}}
    ).then(res => res.data).catch(err => {
      if (isDev()) console.log(err);
      throw err
    })
    return res
  },
  encPost: async (endpoint: string, payload: object, headers?: object) => {
    const res = await axios.post(`${getURIPrefix()}${endpoint}`, {
      ciphertext: ENC.aes(payload)
    }, {headers}).then(res => res.data).catch(err => {
      if (isDev()) console.log(err);
      throw err
    })
    return res
  }
}


export const authedReq = {
  get: async (endpoint: string, payload?: object, headers?: object) => {
    try {
      const URI_PREFIX = getURIPrefix()
      const token = storage.getToken()
      // implement time based encryption in the future
      if (!token) return null
      const config: AxiosRequestConfig<AuthConfig> = {
        headers: {
          token,
          ...headers
        }
      }
      const res = await axios.get(`${URI_PREFIX}${endpoint}`, config).then(res => res.data)
      if (res.success) return res; else return null;
    } catch (err) {
      if (isDev()) console.log(err);
      throw err
    }
  },

  post: async (endpoint: string, payload: object, headers?: object) => {
    try {
      const URI_PREFIX = getURIPrefix()
      const token = storage.getToken()
      if (!token) return null
      const res = await axios.post(`${getURIPrefix()}${endpoint}`,
        {
          payload: ENC.aes(payload)
        },
        {
          headers: {
            ...headers,
            token
          }
        })
        .then(res => res.data)
      if (res.success) return res; else return null;
    } catch (err) {
      if (isDev()) console.log(err);
      throw err
    }
  },

  put: async (endpoint: string, payload: object, headers?: object) => {
    try {
      const URI_PREFIX = getURIPrefix()
      const token = storage.getToken()
      if (!token) return null
      const res = await axios.put(`${getURIPrefix()}${endpoint}`,
        {
          payload: ENC.aes(payload)
        },
        {
          headers: {
            ...headers,
            token
          }
        }).then(res => res.data)
      if (res.success) return res; else return null;
    } catch (err) {
      if (isDev()) console.log(err);
      throw err
    }
  },

  delete: async (endpoint: string, payload?: object, headers?: object) => {
    try {
      const URI_PREFIX = getURIPrefix()
      const token = storage.getToken()
      if (!token) return null;
      const res = await axios.delete(`${URI_PREFIX}${endpoint}`, {
        headers: {
          ...headers,
          token
        }
      }).then(res => res.data)
      if (res.success) return res; else return null;
    } catch (err) {
      if (isDev()) console.log(err);
      throw err
    }
  }
}

const ENC = {
  aes: (payload: object) => {
    const message = JSON.stringify(payload)
    const ciphertext = AES.encrypt(message, process.env.NEXT_PUBLIC_SECRET!).toString()
    return ciphertext
  },
  jwt: () => {

  }
}