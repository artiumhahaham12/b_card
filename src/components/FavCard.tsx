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
import { Link } from "react-router-dom";
import MyNavbar from "./MyNavbar";
import User from "../interfaces/User";
import { JwtPayload } from "jwt-decode";

interface FavCardsProps {}

const FavCards: FunctionComponent<FavCardsProps> = () => {
    let { user} = useContext(UserContext);

    let [changingOfCardsFlag, setChangingOfCardsFlag] = useState<boolean>(false);
  let [fav, setFav] = useState<Card[]>([]);
  useEffect(() => {
    getAllCards().then((res: AxiosResponse) => {
      console.log(user._id);

      let CardWithLike: any = [];
      for (let card of res.data) {
        for (let like of card.likes) {
          if (like == user._id) {
            CardWithLike.push(card);
          }
        }
      }

      setFav(CardWithLike);
    });
  }, [changingOfCardsFlag,user]);
    function checkLike(card: Card) {
      if (
        card.likes.find((likeId: string) => {
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

    return (
      <>
        <MyNavbar allCards={[]}/>
        <div className="container">
          <div className="row">
            {fav.map((card) => {
              return (
                <div
                  key={card._id}
                  className="col-lg-4 col-sm-12 my-3"
                  style={{ height: "10%" }}
                >
                  <div className="card" style={{ height: "40rem" }}>
                    <div className="card-header">{card.title}</div>
                    {/*like function */}
                    {
                      <button
                        onClick={(e) => {
                          patchLike(card).then((res) => {
                            console.log(res.data);

                            resetCards();
                          });
                        }}
                      >
                        {checkLike(card)}
                      </button>
                    }
                    <div className="h-50">
                      <img
                        style={{ height: "300px" }}
                        src={card.image.url}
                        className="card-img-top"
                        alt={card.image.alt}
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
                        {card.address.city} {card.address.coutry}
                      </p>
                    </div>
                    <div className="card-footer">
                      <Link to="#" className="btn btn-primary">
                        More Information
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
}

export default FavCards;
