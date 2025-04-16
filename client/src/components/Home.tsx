import {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import MyNavbar from "./MyNavbar";
import { deleteCard, getAllCards, patchLike } from "../services/cardsService";
import { Card } from "../interfaces/Card";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext, ThemeContext, UserContext } from "../App";
import { error } from "console";
import PaginationHomePage from "./PaginationHomePage";
import styles from "../Css/Home.module.css";
import { Context } from "vm";
import { jwtDecode } from "jwt-decode";
import { isCallLikeExpression } from "typescript";
import { string } from "yup";
import { Color } from "react-bootstrap/esm/types";
import Sppiner from "./Sppiner";
import { ToastRes } from "../services/toastService";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  let [isLoading, setIsLoading] = useState(true);
  let navigator = useNavigate();
  let [changingOfCardsFlag, setChangingOfCardsFlag] = useState<boolean>(false);
  function resetCards() {
    setChangingOfCardsFlag(!changingOfCardsFlag);
  }

  function checkLike(card: Card) {
    if (
      (card.likes as string[]).find((likeId: string) => {
        return likeId == user._id;
      })
    ) {
      return <i className="fa-solid fa-heart text-danger "> </i>;
    } else {
      return <i className="fa-regular fa-heart "> </i>;
    }
  }

  let [allCards, setAllCards] = useState<Card[]>([]);
  let [onlyEight, setOnlyEight] = useState<Card[]>([]);
  useEffect(() => {
    getAllCards()
      .then((res) => {
        setAllCards(res.data);
        setIsLoading(false);
        let eight = [];

        /* let start = (page - 1) * 8;
        let end = start + 8; */

        if (page == 1) {
          eight = res.data.slice(0, 7);
          setOnlyEight(eight);
        } else {
          let start = (page - 1) * 8;
          let end = start + 8;
          eight = res.data.slice(start, end);
          setOnlyEight(eight);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [changingOfCardsFlag]);
  let [page, setPage] = useState<number>(1);

  let { search, changeSearch } = useContext<any>(SearchContext);

  let changePage = (page: number) => {
    setPage(page);
  };
  useEffect(() => {
    let ourEight: any = [];
    let start = (page - 1) * 8;
    let end = start + 8;
    setOnlyEight(allCards.slice(start, end));
  }, [page]);
  function pageMove(command: string) {
    switch (command) {
      case "right":
        if (page > 1) {
          setPage((page) => page - 1);
        } else {
          setPage(Math.ceil(allCards.length / 8));
        }
        break;
        break;
      case "left":
        if (page < allCards.length / 8) {
          setPage((page) => page + 1);
        } else {
          setPage(1);
        }
        break;
      default:
        break;
    }
  }
  let { theme } = useContext<Context>(ThemeContext);
  let { user, setUser } = useContext<Context>(UserContext);

  
  return !isLoading ? (
    <div className={styles.Home}>
      <MyNavbar allCards={allCards} isHome={true} />
      {/* <PaginationHomePage pagesNumber={allCards.length} setPage={changePage} page={page}
      /> */}
      {!search.length && (
        <div className=" position-fixed bottom-0 z-3 d-flex text-center w-100 justify-content-center">
          <button
            className="fa-sharp fa-solid fa-arrow-left  border-0 fs-3"
            style={{ background: "0" }}
            onClick={() => {
              pageMove("right");
            }}
          ></button>
          <h6 className="d-inline mx-1 fs-1 fw-bold">{page}</h6>

          <button
            className="fa-sharp fa-solid fa-arrow-right  border-0 fs-3"
            style={{ background: "0" }}
            onClick={() => {
              pageMove("left");
            }}
          ></button>
        </div>
      )}

      <div className="conteiner  mb-5">
        <div className="row">
          {!search.length ? (
            onlyEight.length ? (
              onlyEight.map((card: Card) => {
                return user.isAdmin ? (
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
                      <div
                        className="card-body overflow-hidden "
                        style={{ height: "6rem" }}
                      >
                        <p
                          className="card-text overflow-y-hidden"
                          style={{ height: "4rem" }}
                        >
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
                ) : (
                  <>
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
                        <div
                          className="card-body overflow-hidden "
                          style={{ height: "6rem" }}
                        >
                          <p
                            className="card-text overflow-y-hidden"
                            style={{ height: "4rem" }}
                          >
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
                          {localStorage.token&&(

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
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <>no cards</>
            )
          ) : (<>
              <button className="" name="btn btn-secondary" onClick={() => {
                changeSearch([])
                resetCards()
              }}>
                BACK
              </button>
              {search.map((card: Card) => {
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
                          alt={card.image.alt}
                        ></img>
                      </div>
                      <div
                        className="card-body overflow-hidden "
                        style={{ height: "5rem" }}
                      >
                        <p
                          className="card-text overflow-y-hidden"
                          style={{ height: "3rem" }}
                        >
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
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <MyNavbar allCards={[]} isHome={true} />
      <Sppiner />
    </div>
  );
};
export default Home;
