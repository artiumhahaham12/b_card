import axios from "axios";
import User from "../interfaces/User";

import { Card } from "../interfaces/Card";

const api = `${process.env.REACT_APP_API}/cards`;

export function getAllCards() {
    
    
    return axios.get(api)
}
export function patchLike( card:Card) {
    let token: string = localStorage.getItem("token") || ""
    if (token === "") {
        console.error("token is missing");
        return Promise.reject(new Error("Token is missing."));
        
    }
    console.log([token, card, `${api}/${card._id}`]);
    
    return axios.patch(`${api}/${card._id}`,
        {}
      ,{
    headers: {
      'x-auth-token': token
    }
  }
  );
}
export function getCardById(card_id: string) {
    console.log(`${api}/${card_id}`);
    
    return axios.get(`${api}/${card_id}`);
}