import {authedReq} from "@/utils/api";
import PasswordValidator from "password-validator";


export const auth = {
  verifyToken: async (token: string) => {
    const data = await authedReq.get('/api/blocks/auth/checkuser')
    if (data) return data;
    return null;
  }
}

export const pwdSchema = new PasswordValidator().is().min(8).has().digits(1).symbols(1).uppercase().lowercase().is().not().spaces()

export const checkPasswordValidity = async (password: string) => {
  return pwdSchema.validate(password)
}