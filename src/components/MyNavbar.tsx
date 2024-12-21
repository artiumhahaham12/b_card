import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Button, Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { SearchContext, ThemeContext, UserContext } from "../App";
import { useFormik } from "formik";
import * as yup from "yup";
import { Card } from "../interfaces/Card";
import styles from "../Css/MyNavbar.module.css";
import { Context } from "vm";
import { theme } from "flowbite-react";
import { error, log } from "console";
import User from "../interfaces/User";
import { getToken, getUserById } from "../services/usersService";
import { jwtDecode } from "jwt-decode";
interface MyNavbarProps {
  allCards: Array<Card>;
}

const MyNavbar: FunctionComponent<MyNavbarProps> = ({ allCards }) => {
  let { theme, toggleTheme } = useContext<Context>(ThemeContext);
  let { user, setUser } = useContext(UserContext);
  let [navUser, setNavUser] = useState<User>({_id:""} as User);

  let navigator = useNavigate();
  const { search, changeSearch } = useContext<any>(SearchContext);
  useEffect(() => {
    console.log(user._id);
    if (getToken() != null) {
      
      getUserById((jwtDecode(getToken() ?? "")as any)._id as string).then((res) => {
        setNavUser(res.data);
        console.log(res.data);
        
      }).catch((error) => {
        console.log(error);
      })
    }
  }, [user]);
  useEffect(() => {
    console.log(navUser);
    
  },[navUser])

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
        if (card.title.includes(values.search) ) {
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
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand
            onClick={() => {
              navigator("/");
            }}
          >
            Bcard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={styles["myNavbar"]}>
              <div className="">
                <Nav.Link
                  onClick={() => {
                    navigator("/about");
                  }}
                  className=" d-inline-block mx-md-0 mx-3"
                >
                  About
                </Nav.Link>
                <Nav.Link
                  onClick={() => {
                    navigator("/fav");
                  }}
                  className=" d-inline-block mx-md-0 mx-3"
                >
                  Favorites
                </Nav.Link>
                {user.isBusiness && (
                  <Nav.Link
                    onClick={() => {
                      navigator("/my-cards");
                    }}
                    className=" d-inline-block mx-md-0 mx-3"
                  >
                    My Cards
                  </Nav.Link>
                )}
                {user.isAdmin && (
                  <Nav.Link
                    onClick={() => {
                      navigator("/sandbox");
                    }}
                    className=" d-inline-block mx-md-0 mx-3"
                  >
                    SandBox
                  </Nav.Link>
                )}
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

              {!getToken() && (
                <Nav.Link
                  onClick={() => {
                    navigator("/register");
                  }}
                  className=" d-inline-block btn btn-success"
                >
                  Sign Up
                </Nav.Link>
              )}
              {!getToken() && (
                <Nav.Link
                  onClick={() => {
                    navigator("/login");
                  }}
                  className=" d-inline-block btn btn-success"
                >
                  Login
                </Nav.Link>
              )}
              <div className="">
                {getToken() != null && (navUser._id as string) != "" && (
                  <>
                    <div className={styles["profile-img"]}>
                      {navUser.image.url != "" ? (
                        <img
                          style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                          }}
                          src={navUser.image.url || ""}
                          alt={navUser.image.alt || ""}
                        />
                      ) : (
                        <>
                          <i className="fa-solid fa-user"></i>
                        </>
                      )}
                      <button
                        className="border border-1 rounded-5 m-md-0 mx-md-5 m-2"
                        style={{
                          padding: "10px",
                          width: "45px",
                        }}
                        onClick={() => {
                          toggleTheme();
                        }}
                      >
                        {theme != "dark" ? (
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
                      <div
                        className={`${styles["hidden-profile"]} m-md-0 mx-md-5 m-2`}
                      >
                        <p>
                          {navUser.name.first} {navUser.name.last}
                        </p>
                        <p>{navUser.email}</p>
                        {user.isAdmin && <p>{"Admin"}</p>}
                        {user.isBusiness && <p>{"Business"}</p>}
                        <hr className="text-light" />
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            localStorage.removeItem("token");
                            navigator("/login");

                            setUser({ _id: "" });
                          }}
                        >
                          logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};


export default MyNavbar;
