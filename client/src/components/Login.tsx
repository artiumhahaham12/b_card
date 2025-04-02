import { Context, FunctionComponent, useContext, useEffect } from "react";
import User from "../interfaces/User";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { getUserById, userLogin } from "../services/usersService";
import { ToastRes } from "../services/toastService";
import { UserContext } from "../App";
import { jwtDecode, JwtPayload } from "jwt-decode";
interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  let navigator = useNavigate();
  let { user, setUser } = useContext<any>(UserContext);
  let formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required()
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      password: yup
        .string()
        .required()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        ),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const token = await userLogin(values);
        localStorage.setItem("token", token.data as string);

        let userId = jwtDecode(
          (localStorage.getItem("token") as string) || ""
        ) as any;
        setUser(userId);

        ToastRes("success", "login success", "light", 3000);
        navigator("/");
      } catch (error: any) {
        ToastRes("error", `${error.response.data}`, "light", 3000);
      }
    },
  });

  return (
    <>
      <div
        className="d-flex flex-col vh-100 align-items-center justify-content-center "
        style={{ width: "" }}
      >
        <form
          className="container align-items-center"
          style={{ width: "30rem", height: "20rem" }}
          onSubmit={formikLogin.handleSubmit}
        >
          <h5 className="row text-center d-block w-100 fs-1">Login</h5>
          <div className="form-floating row mb-2">
            <input
              name="email"
              onChange={formikLogin.handleChange}
              onBlur={formikLogin.handleBlur}
              value={formikLogin.values.email}
              type="email"
              className="form-control col"
              id="floatingInput"
              placeholder="name@example.com"
            ></input>
            <label htmlFor="floatingInput">Email address</label>
          </div>
          {formikLogin.touched.email && formikLogin.errors.email && (
            <p>{formikLogin.errors.email}</p>
          )}
          <div className="form-floating row mt-2">
            <input
              name="password"
              onChange={formikLogin.handleChange}
              onBlur={formikLogin.handleBlur}
              value={formikLogin.values.password}
              type="password"
              className="form-control col"
              id="floatingPassword"
              placeholder="Password"
            ></input>
            <label htmlFor="floatingPassword">Password</label>
          </div>
          {formikLogin.touched.password && formikLogin.errors.password && (
            <p>{formikLogin.errors.password}</p>
          )}
          <div className="row">
            <div className="col-sm-12 col-md-6 my-sm-1">
              <button
                type="button"
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  formikLogin.resetForm();
                }}
              >
                <i className="fa-solid fa-arrows-rotate"></i>
              </button>
            </div>
            <div className="col-sm-12 col-md-6 my-sm-1">
              <button
                type="button"
                className="btn btn-danger w-100"
                onClick={() => {
                  ToastRes("info", "log in was stopped", "light", 2000);
                  navigator("/");
                }}
              >
                CANCEL
              </button>
            </div>
          </div>
          <div className="row">
            <button
              className="row btn btn-outline-primary mt-2 w-50 m-0 m-auto d-block "
              type="submit"
              disabled={!formikLogin.dirty || !formikLogin.isValid}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
