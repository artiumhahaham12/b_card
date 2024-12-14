import { FunctionComponent, useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import MyNavbar from "./MyNavbar";
import { Link, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";
import { Card } from "../interfaces/Card";
import { deleteCard, getAllCards } from "../services/cardsService";
import { ToastRes } from "../services/toastService";
import { error } from "console";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
  let navigator = useNavigate();
  let { user } = useContext(UserContext);

  let [changingOfCardsFlag, setChangingOfCardsFlag] = useState<boolean>(false);
  let [myCards, setMyCards] = useState<Card[]>([]);
  useEffect(() => {
    getAllCards().then((res: AxiosResponse) => {
      console.log(user._id);
      let my: Card[];
      my = res.data.filter((card: Card) => {
        return card.user_id === user._id;
      });
      setMyCards(my);
    });
  }, [changingOfCardsFlag, user]);
  useEffect(() => {
    console.log(myCards);
  }, [myCards]);
  return (
    <>
      <MyNavbar allCards={[]} />
      <button
        className="btn btn-success m-0 m-auto d-block my-2"
        onClick={() => {
          navigator("/add-Card");
        }}
      >
        Create New Card
      </button>
      <div className="container">
        <div className="row">
          {myCards.map((card: Card) => {
            console.log("Image URL:", card.image.url);
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
                      src={card.image.url}
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
                      Address: {card.address.street} {card.address.houseNumber}
                      {", "}
                      {card.address.city} {card.address.country}
                    </p>
                  </div>
                  <div className="card-footer d-flex justify-content-evenly">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        navigator(`/details/${card._id}`);
                      }}
                    >
                      More Information
                    </button>
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        navigator(`/update-Card/${card._id}`);
                      }}
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        /* delete function */
                        deleteCard(card, card._id as string)
                          .then((res) => {
                            ToastRes(
                              "success",
                              "Card Deleted uccess",
                              "light",
                              1500
                            );
                            console.log(res.data);
                          })
                          .catch((error) => {
                            ToastRes(
                              "error",
                              "something wrong try later",
                              "light",
                              2000
                            );
                          });
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyCards;