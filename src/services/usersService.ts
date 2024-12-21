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
export function getUserById(id: string) {
  
  let token = getToken()
  console.log(4);
  
  return axios.get(`${api}/${id}`, {
    headers: {
      "x-auth-token":
        token,
    },
  });
}
export function getToken(){
  return localStorage.getItem("token")
}
//admin tools 
export function getAllUsers() {
  let adminToken = getToken()
  return axios.get(api,{ 
    headers: {
      "x-auth-token":adminToken,
    }
  })
}
export function updateUser(user_id:string,updated_user:User) {
  let adminToken = getToken()
  return axios.put(`${api}/${user_id}`,updated_user, {
    headers: {
      "x-auth-token": adminToken,
    },
  });
}
export function deleteUser(user_id:string) {
  let adminToken = getToken()
  return axios.delete(`${api}/${user_id}`, {
    headers: {
      "x-auth-token": adminToken,
    },
  });
}