import {
  Context,
  ContextType,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAllCards, getCardById, patchLike } from "../services/cardsService";
import { Card } from "../interfaces/Card";
import { UserContext } from "../App";
import { AxiosResponse } from "axios";
import { Link, useNavigate } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import User from "../interfaces/User";
import { JwtPayload } from "jwt-decode";
import Sppiner from "./Sppiner";
import styles from "../Css/Home.module.css"
interface FavCardsProps {}

const FavCards: FunctionComponent<FavCardsProps> = () => {
  let [isLoading, setIsLoading] = useState(true);
    let { user} = useContext(UserContext);
  let navigator = useNavigate()
    let [changingOfCardsFlag, setChangingOfCardsFlag] = useState<boolean>(false);
  let [fav, setFav] = useState<Card[]>([]);
  useEffect(() => {
    getAllCards().then((res: AxiosResponse) => {
     
      let CardWithLike: any = [];
      for (let card of res.data) {
        for (let like of card.likes) {
          if (like == user._id) {
            CardWithLike.push(card);
          }
        }
      }

      setFav(CardWithLike);
      setIsLoading(false)
    });
  }, [changingOfCardsFlag,user]);
    function checkLike(card: Card) {
      if (
        (card.likes || ["1111"]).find((likeId: string) => {
          return likeId == user._id;
        })
      ) {
        return <i className="fa-solid fa-heart text-danger"> </i>;
      } else {
        return <i className="fa-regular fa-heart "> </i>;
      }
    }
  function resetCards() {
    setChangingOfCardsFlag(!changingOfCardsFlag);
  }

    return !isLoading?(
      <>
        <MyNavbar allCards={[]} isHome={false}/>
        <div className="container">
          <div className="row">
            {fav.map((card:Card) => {
              return (
                <div
                  key={card._id}
                  className="col-lg-4 col-sm-12 my-3"
                  style={{ height: "10%" }}
                >
                  <div className="card" style={{ height: "40rem" }}>
                    <div className="card-header">{card.title}</div>

                    <div className="h-50">
                      <img
                        style={{ height: "300px" }}
                        src={card.image.url as string}
                        className="card-img-top"
                        alt={card.image.alt as string}
                      ></img>
                    </div>
                    <div className="card-body h-75">
                      <p className="card-text overflow-y-hidden">
                        {card.description}
                      </p>
                      <p className="card-text">Phone: {card.phone}</p>
                      <p className="card-text">Email: {card.email}</p>
                      <p className="card-text">
                        Address: {card.address.street}{" "}
                        {card.address.houseNumber}
                        {", "}
                        {card.address.city} {card.address.country}
                      </p>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          navigator(`/details/${card._id}`);
                        }}
                      >
                        More Information
                      </button>
                      <span
                        className={styles["like border-0 d-block fs-4 btn"]}
                        onClick={(e) => {
                          patchLike(card).then((res) => {
                          
                            resetCards();
                          });
                        }}
                      >
                        {checkLike(card)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    ) : (
        <div className="">
          <MyNavbar allCards={[]} isHome={false} />
          <Sppiner/>
        </div>
    );
}

export default FavCards;
