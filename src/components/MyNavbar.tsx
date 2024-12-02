import { FunctionComponent, useContext } from "react";
import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../Css/myNavbar.css"
import { SearchContext } from "../App";
import { useFormik } from "formik";
import * as yup from "yup"
interface MyNavbarProps {
  
}
 
const MyNavbar: FunctionComponent<MyNavbarProps> = ( ) => {
  let navigator = useNavigate()
  const searchChangeFunction:any = useContext(SearchContext);
  
  let searchChange = searchChangeFunction.changeSearch 
  const searchForm = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: yup.object({
      search: yup.string().min(1).required(""),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      searchChange(values.search)
      console.log(values);
      
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
              <Nav className="me-auto myNavbar">
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
                    >
                  </input>
                  {searchForm.errors.search && searchForm.touched.search && <p>{searchForm.errors.search}</p>}
                  <button
                    className="btn btn-outline-success"
                    type="submit"
                    
                  >
                    Search
                  </button>
                </form>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
}
 
export default MyNavbar;