import axios from "axios";
import User from "../interfaces/User";

import { Card } from "../interfaces/Card";
import { getToken } from "./usersService";

const api = `${process.env.REACT_APP_API}/cards`;

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
        "x-auth-token": token,
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
      "x-auth-token": token,
    },
  });
}
export function updateCard(card: any, id: string) {
  let token: string = getToken() as string;
  
  return axios.put(`${api}/${id}`, card, {
    headers: {
      "x-auth-token": token,
    },
  });
}
export function deleteCard(card: any, id: string) {
  let bizNumber = card.bizNumber
  let token: string = getToken() as string;
   return axios.delete(`${api}/${id}`, {
    headers: {
      "x-auth-token": token,
    },
    data: {
      bizNumber, 
    },
  });

}
