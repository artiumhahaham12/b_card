import { FunctionComponent, useContext, useEffect, useState } from "react";
import MyNavbar from "./MyNavbar";
import { getAllCards } from "../services/cardsService";
import { Card } from "../interfaces/Card";
import { Link } from "react-router-dom";
import { SearchContext } from "../App";
import { error } from "console";
import PaginationHomePage from "./PaginationHomePage";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  let [allCards, setAllCards] = useState<Card[]>([
    {
      _id: "",
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      image: {
        url: "",
        alt: "",
        _id: "",
      },
      address: {
        state: "",
        coutry: "",
        city: "",
        street: "",
        houseNumber: 0,
        zip: 0,
        _id: "",
      },
      bizNumber: 0,
      likes: [],

      user_id: "",
      createdAt: "",
      __v: 0,
    },
  ]);
  let [onlyEight, setOnlyEight] = useState<Card[]>([
    {
      _id: "",
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      image: {
        url: "",
        alt: "",
        _id: "",
      },
      address: {
        state: "",
        coutry: "",
        city: "",
        street: "",
        houseNumber: 0,
        zip: 0,
        _id: "",
      },
      bizNumber: 0,
      likes: [],

      user_id: "",
      createdAt: "",
      __v: 0,
    },
  ]);
  useEffect(() => {
    getAllCards()
      .then((res) => {
        setAllCards(res.data);
        let eight = [];
        
        let start = (page - 1) * 8;
        let end = start + 8;
        eight = allCards.slice(start, end);
        setOnlyEight(eight);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const searchChangeFunction = useContext(SearchContext);
  let [page, setPage] = useState<number>(1);
  let changePage = (page: number) => {
    setPage(page);
  };
  useEffect(() => {
    console.log(page);
    let ourEight:any = [];
    let start = (page-1) * 8;
    let end = start + 8;
    setOnlyEight(allCards.slice(start, end))

    console.log(ourEight);
  }, [page]);
  function pageMove(command: string) {
    switch (command) {
      case "right":
        if (page < allCards.length / 8 - 1) setPage((page) => page ++);
        break;
      case "left":
        if (page > 1) setPage((page) => page --);
        break;
      default:
        break;
    }
  }
  return (
    <div className="">
      <MyNavbar />
      {/* <PaginationHomePage pagesNumber={allCards.length} setPage={changePage} page={page}
      /> */}{page}
      <button className="" onClick={() => {pageMove("right")}}>
        left
      </button>
      <button className="" onClick={() => {pageMove("left")}}>
        right
      </button>
      <div className="conteiner " style={{ padding: "2rem 10rem" }}>
        <div className="row">
          {onlyEight.length ? (
            onlyEight.map((card) => {
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
                        style={{ height: "100%" }}
                        src={card.image.url}
                        className="card-img-top"
                        alt={card.image.alt}
                      ></img>
                    </div>
                    <div className="card-body h-75">
                      <p className="card-text  overflow-y-hidden">
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
            })
          ) : (
            <>no cards</>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
