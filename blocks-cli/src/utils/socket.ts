import { io } from 'socket.io-client'
import {getURIPrefix} from "@/utils/api";

// const URL: string | undefined = process.env.NODE_ENV === 'production' ? getURIPrefix() : 'http://localhost:8181'
const URL = "https://api.wldspace.com";
// const URL = 'http://localhost:8181'

export const socket = io(URL, {
  autoConnect: false
})