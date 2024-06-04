import axios, {ApiResponse} from '@/common/axios'
import {IAuthVerifyParams} from "@/api/interface";

export const fetchAuthVerify = (data: IAuthVerifyParams) => {
  return axios.post('/auth/verify', data) as Promise<ApiResponse>;
}
