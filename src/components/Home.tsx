import {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import MyNavbar from "./MyNavbar";
import { getAllCards, patchLike } from "../services/cardsService";
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

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  let navigator = useNavigate()
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
      return <i className="fa-solid fa-heart text-danger"> </i>;
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
  useEffect(() => {
    console.log(search);
  }, [search]);

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
          setPage(Math.ceil(allCards.length / 8 ));
        }
        break;
        break;
      case "left":
        if (page < allCards.length / 8 ) {
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
  useEffect(() => {
    console.log(user);
  }, [user]);
  /* useEffect(() => {
    let userId = jwtDecode(
      (localStorage.getItem("token") as string) || ""
    ) as any;
    if (userId._id != undefined) {
      setUser(userId);
    }
  }, []); 
  */
  return (
    <div className={styles.Home} >
      <MyNavbar allCards={allCards} />
      {/* <PaginationHomePage pagesNumber={allCards.length} setPage={changePage} page={page}
      /> */}
      {!search.length && (
        <div className=" position-fixed bottom-0 z-3 bg-white d-flex text-center w-100 justify-content-center">
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

      <div className="conteiner ">
        <div className="row">
          {!search.length ? (
            onlyEight.length ? (
              onlyEight.map((card: Card) => {
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
                          {card.address.city} {card.address.country}
                        </p>
                      </div>
                      <div className="card-footer">
                        <button className="btn btn-primary" onClick={
                          () => {
                            navigator(`/details/${card._id}`);
                          }
                        }>
                          More Information
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>no cards</>
            )
          ) : (
            search.map((card: Card) => {
              console.log(card);

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
                            resetCards();
                            changeSearch(card);
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
                        {card.address.city} {card.address.country}
                      </p>
                    </div>
                    <div className="card-footer">
                       <button className="btn btn-primary" onClick={
                          () => {
                            navigator(`/details/${card._id}`);
                          }
                        }>
                          More Information
                        </button>
                      </div>
                    </div>
                  </div>
                
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
