import { FunctionComponent, useContext } from "react";
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { SearchContext, ThemeContext } from "../App";
import { useFormik } from "formik";
import * as yup from "yup";
import { Card } from "../interfaces/Card";
import styles from "../Css/MyNavbar.module.css";
import { Context } from "vm";
import { theme } from "flowbite-react";
import { log } from "console";
interface MyNavbarProps {
  allCards: Array<Card>;
}

const MyNavbar: FunctionComponent<MyNavbarProps> = ({ allCards }) => {
  let { Theme, setTheme } = useContext<Context>(ThemeContext);
  console.log(theme);

  function changeTheme() {
    if (Theme.color == "#000") {
      setTheme({
        color: "#fff",
        backGroundColor: "#000",
      });
    } else {
      setTheme({
        color: "#000",
        backGroundColor: "#fff",
      });
    }
  }
  let navigator = useNavigate();
  const { search, changeSearch } = useContext<any>(SearchContext);

  let body = document.getElementsByTagName("body");
  body[0].style.backgroundColor = Theme.backGroundColor;

  const searchForm = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: yup.object({
      search: yup.string().min(1).required(""),
    }),
    onSubmit: (values, { resetForm }) => {
      /* search filter */
      let searchedCards = allCards.filter((card) => {
        values.search = values.search.trim().toLocaleLowerCase();
        card.title = card.title.trim().toLocaleLowerCase();
        if (card.title == values.search || card.description == values.search) {
          return card;
        }
      });
      changeSearch(searchedCards);

      resetForm();
    },
  });
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigator("/");
            }}
          >
            Bcard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={styles.myNavbar}>
              <div className="">
                <Nav.Link
                  onClick={() => {
                    navigator("/");
                  }}
                  className=" d-inline-block"
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigator("/");
                  }}
                  className=" d-inline-block"
                >
                  About
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigator("/fav");
                  }}
                  className=" d-inline-block"
                >
                  Favorites
                </Nav.Link>
              </div>
              <form className="form d-flex " onSubmit={searchForm.handleSubmit}>
                <input
                  className="form-control "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="search"
                  value={searchForm.values.search}
                  onChange={searchForm.handleChange}
                  onBlur={searchForm.handleBlur}
                ></input>
                {searchForm.errors.search && searchForm.touched.search && (
                  <p>{searchForm.errors.search}</p>
                )}
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
              <button
                className="border border-1 rounded-5"
                style={{
                  backgroundColor: `${Theme.backGroundColor}`,
                  padding: "10px",
                }}
                onClick={() => {
                  changeTheme();
                }}
              >
                {Theme.backGroundColor != "#000" ? (
                  <i
                    className="fa-solid fa-sun"
                    style={{ color: "yellow" }}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-moon"
                    style={{ color: "white" }}
                  ></i>
                )}
              </button>
              <Nav.Link
                onClick={() => {
                  navigator("/register");
                }}
                className=" d-inline-block btn btn-success"
              >
                Sign Up
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigator("/login");
                }}
                className=" d-inline-block btn btn-success"
              >
                Login
              </Nav.Link>
              <div className=""></div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
