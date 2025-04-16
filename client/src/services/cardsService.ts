import axios from "axios";
import User from "../interfaces/User";

import { Card } from "../interfaces/Card";
import { getToken } from "./usersService";

const api = `${process.env.REACT_APP_API}/cards`;
console.log(api);

export function getAllCards() {
  return axios.get(api);
}
export function patchLike(card: Card) {
  let token: string = localStorage.getItem("token") || "";
  if (token === "") {
    console.error("token is missing");
    return Promise.reject(new Error("Token is missing."));
  }
  

  return axios.patch(
    `${api}/${card._id}`,
    {},
    {
      headers: {
        "Authorization": token,
      },
    }
  );
}
export function getCardById(card_id: string) {
  return axios.get(`${api}/${card_id}`);
}
export function craeteNewCard(card: any) {
  let token: string = getToken() as string;
  return axios.post(api, card, {
    headers: {
      "Authorization": token,
    },
  });
}
export function updateCard(card: any, id: string) {
  let token: string = getToken() as string;
  
  return axios.put(`${api}/${id}`, card, {
    headers: {
      "Authorization": token,
    },
  });
}
export function deleteCard(card: any, id: string) {
  let bizNumber = card.bizNumber
  let token: string = getToken() as string;
   return axios.delete(`${api}/${id}`, {
    headers: {
      "Authorization": token,
    },
    data: {
      bizNumber, 
    },
  });

}
export function getMyCards(){
  let token: string = getToken() as string;
  return axios.get(`${api}/my-cards`, {
    headers: {
      "Authorization": token,
    },
    
  });
}
