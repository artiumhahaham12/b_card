import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCardById } from "../services/cardsService";
import { Card } from "../interfaces/Card";

interface MoreDatailsProps {
    
}
 
const MoreDatails: FunctionComponent<MoreDatailsProps> = () => {
    let { id } = useParams(); 
    let [card, setCard] = useState<Card>();
    let navigator = useNavigate()
    useEffect(() => {
      
        getCardById(id as string).then((res) => {
            setCard(res.data)
           
            
        }) 
    },[])
    return (
      <div className="vh-100 vw-100 d-flex flex-column">
        <div className="vw-100">
          <img
            style={{
              height: "200px",

              width: "100%",
            }}
            src={card?.image.url}
            className="card-img-top"
            alt={card?.image.alt}
          ></img>
        </div>
        <div className="d-flex flex-column m-0  mt-5 vw-100 align-items-center ">
          <h3 className="display-2">{card?.title}</h3>

          <h5 className="display-6">{card?.subtitle}</h5>
          <p>{card?.description}</p>
          
          <p>
            <span className="fw-bold">adress: </span>
            {card?.address.state && card?.address.state}
            {card?.address.country}, {card?.address.city} {card?.address.street}{" "}
            {card?.address.houseNumber}
          </p>
          {(card?.address.zip as number) != 0  && (
            <span className="fw-bold">Zip: {card?.address.zip} </span>
          )}
                <span className="fw-bold">Phone: { card?.phone}</span>
                <span className="fw-bold">Email: { card?.email}</span>
                <a href={`${card?.web as string}`} className="fw-bold" target="_blank">visit site</a>
                <button className="mt-2 btn btn-secondary " onClick={() =>{
                    navigator(-1)
                }}>Back</button>
        </div>
      </div>
    );
}
 
export default MoreDatails;