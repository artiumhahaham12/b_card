import axios from "axios";
import User from "../interfaces/User";
import { number } from "yup";

let api = `${process.env.REACT_APP_API}/users`;

export function userRegister(user: User) {
  return axios.post(api, user);
}
export function userLogin(enterDetails: any) {
  
  return axios.post(`${api}/login`, enterDetails);
}
export function getUserById(id: string,token:any) {
  
  
  return axios.get(`${api}/${id}`, {
    headers: {
      "x-auth-token":
        token,
    },
  });
}
