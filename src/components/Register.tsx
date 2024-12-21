
import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import User from "../interfaces/User";
import { userRegister } from "../services/usersService";

import { ToastRes } from "../services/toastService";
interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
  let navigtor = useNavigate();
  let formikRegister = useFormik({
    initialValues: {
      first: "",
      middle: "",
      last: "",
      phone: "",
      email: "",
      password: "",
      url: "",
      alt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      HouseNumber: 0,
      zip: 0,
      isBusiness: false,
    },
    validationSchema: yup.object({
      first: yup.string().min(2).required(),
      middle: yup.string(),
      last: yup.string().min(2).required(),
      phone: yup
        .string()
        .matches(
          /^(?:\+972|0)(?:[2-9]\d{7,8}|5[02458]\d{7})$/,
          "Not valid isreal phone number!"
        ),
      email: yup.string().email().required(),
      password: yup
        .string()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "not valid password, have to be at least one upper case letter, one special charchter, one number and one lowercase letter, at leat 8 digits."
        )
        .required(),
      url: yup.string(),
      alt: yup.string(),
      state: yup.string(),
      country: yup.string().required(),
      city: yup.string().required(),
      street: yup.string().required(),
      HouseNumber: yup.number(),
      zip: yup.number(),
    }),

    onSubmit: (values) => {
      let values_new:User = {
        name: {
          first: values.first,
          middle: values.middle,
          last: values.last,
        },
        phone: values.phone,
        email: values.email,
        password: values.password,
        image: {
          url: values.url,
          alt: values.alt,
        },
        address: {
          state: values.state,
          country: values.country,
          city: values.city,
          street: values.street,
          houseNumber: values.HouseNumber,
          zip: values.zip,
        },
        isBusiness: values.isBusiness,
        };
        console.log(values_new);
        userRegister(values_new).then((res) => {
            
            ToastRes("success", `you added successfuly ${values.first}`, `light`, 3000)
            navigtor("/")
        }).catch((error) => {
            let errorLog: string = (Object.entries(error)[5][1] as any).data as string;
            ToastRes(
                "error",
                errorLog,
              `light`,
              3000
            );


        })
      },
    
  });
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <form
          className=" d-table-cell container  m-0 m-auto align-middle"
          style={{ width: "100vw" }}
          onSubmit={formikRegister.handleSubmit}
        >
          <h2 className="d-block text-center ">SIGN UP</h2>
          <div className="row">
            <div className=" col-sm-12 col-md-6 my-sm-1">
              <div className="  form-floating my-1 w-100">
                <input
                  name="first"
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  value={formikRegister.values.first}
                  type="text"
                  className="form-control"
                  id="first"
                  placeholder=""
                  autoComplete="off"
                ></input>
                <label htmlFor="first">first name * </label>
              </div>

              {formikRegister.touched.first && formikRegister.errors.first && (
                <p className="text-warning">{formikRegister.errors.first}</p>
              )}
            </div>
            <div className="col-sm-12 col-md-6 my-sm-1">
              <div className="  form-floating w-100">
                <input
                  name="middle"
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  value={formikRegister.values.middle}
                  type="text"
                  className="form-control"
                  id="middle"
                  placeholder="middle"
                ></input>
                <label htmlFor="middle">middle</label>
              </div>

              {formikRegister.touched.middle &&
                formikRegister.errors.middle && (
                  <p className="text-warning">{formikRegister.errors.middle}</p>
                )}
            </div>
          </div>
          <div className="row   ">
            <div className=" col-sm-12 col-md-6 my-sm-1">
              <div className="  form-floating my-1 w-100">
                <input
                  name="last"
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  value={formikRegister.values.last}
                  type="text"
                  className="form-control"
                  id="last"
                  placeholder=""
                  autoComplete="off"
                ></input>
                <label htmlFor="last">last name * </label>
              </div>

              {formikRegister.touched.last && formikRegister.errors.last && (
                <p className="text-warning">{formikRegister.errors.last}</p>
              )}
            </div>
            <div className="col-sm-12 col-md-6 my-sm-1">
              <div className="  form-floating w-100">
                <input
                  name="phone"
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  value={formikRegister.values.phone}
                  type="phone"
                  className="form-control"
                  id="phone"
                  placeholder="phone"
                ></input>
                <label htmlFor="phone">phone * </label>
              </div>

              {formikRegister.touched.phone && formikRegister.errors.phone && (
                <p className="text-warning">{formikRegister.errors.phone}</p>
              )}
            </div>
          </div>
          <div className="row   ">
            <div className=" col-sm-12 col-md-6 my-sm-1">
              <div className="  form-floating my-1 w-100">
                <input
                  name="email"
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  value={formikRegister.values.email}
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder=""
                  autoComplete="off"
                ></input>
                <label htmlFor="email">Email* </label>
              </div>

              {formikRegister.touched.email && formikRegister.errors.email && (
                <p className="text-warning">{formikRegister.errors.email}</p>
              )}
            </div>
            <div className="col-sm-12 col-md-6 my-sm-1">
              <div className="  form-floating w-100">
                <input
                  name="password"
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  value={formikRegister.values.password}
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="password"
                  autoComplete="off"
                ></input>
                <label htmlFor="password">password * </label>
              </div>

              {formikRegister.touched.password &&
                formikRegister.errors.password && (
                  <p className="text-warning">
                    {formikRegister.errors.password}
                  </p>
                )}
            </div>
          </div>
          {/*  */}
          <div className="row  ">
            <div className=" col-sm-12 col-md-6 my-sm-1">
              <div className="  form-floating my-1 w-100">
                <input
                  name="url"
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  value={formikRegister.values.url}
                  type="text"
                  className="form-control"
                  id="url"
                  placeholder=""
                  autoComplete="off"
                ></input>
                <label htmlFor="url">Image url </label>
              </div>

              {formikRegister.touched.url && formikRegister.errors.url && (
                <p className="text-warning">{formikRegister.errors.url}</p>
              )}
            </div>
            <div className="col-sm-12 col-md-6 my-sm-1">
              <div className="  form-floating w-100">
                <input
                  name="alt"
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  value={formikRegister.values.alt}
                  type="text"
                  className="form-control"
                  id="alt"
                  placeholder="alt"
                  autoComplete="off"
                ></input>
                <label htmlFor="alt">Image alt</label>
              </div>

              {formikRegister.touched.alt && formikRegister.errors.alt && (
                <p className="text-warning">{formikRegister.errors.alt}</p>
              )}
            </div>
          </div>
          <div className="row  ">
            <div className=" col-sm-12 col-md-6 my-sm-1">
              <div className="  form-floating my-1 w-100">
                <input
                  name="state"
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  value={formikRegister.values.state}
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder=""
                  autoComplete="off"
                ></input>
                <label htmlFor="state">state</label>
              </div>

              {formikRegister.touched.state && formikRegister.errors.state && (
                <p className="text-warning">{formikRegister.errors.state}</p>
              )}
            </div>
            <div className="col-sm-12 col-md-6 my-sm-1">
              <div className="  form-floating w-100">
                <input
                  name="country"
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  value={formikRegister.values.country}
                  type="text"
                  className="form-control"
                  id="country"
                  placeholder="country"
                  autoComplete="off"
                ></input>
                <label htmlFor="country">country * </label>
              </div>

              {formikRegister.touched.country &&
                formikRegister.errors.country && (
                  <p className="text-warning">
                    {formikRegister.errors.country}
                  </p>
                )}
            </div>
          </div>
          <div className="row  ">
            <div className=" col-sm-12 col-md-6 my-sm-1">
              <div className="  form-floating my-1 w-100">
                <input
                  name="city"
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  value={formikRegister.values.city}
                  type="text"
                  className="form-control"
                  id="city"
                  placeholder=""
                  autoComplete="off"
                ></input>
                <label htmlFor="city">city * </label>
              </div>

              {formikRegister.touched.city && formikRegister.errors.city && (
                <p className="text-warning">{formikRegister.errors.city}</p>
              )}
            </div>
            <div className="col-sm-12 col-md-6 my-sm-1">
              <div className="  form-floating w-100">
                <input
                  name="street"
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  value={formikRegister.values.street}
                  type="text"
                  className="form-control"
                  id="street"
                  placeholder="street"
                  autoComplete="off"
                ></input>
                <label htmlFor="street">street * </label>
              </div>

              {formikRegister.touched.street &&
                formikRegister.errors.street && (
                  <p className="text-warning">{formikRegister.errors.street}</p>
                )}
            </div>
          </div>
          <div className="row  ">
            <div className=" col-sm-12 col-md-6 my-sm-1">
              <div className="  form-floating my-1 w-100">
                <input
                  name="HouseNumber"
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  defaultValue={""}
                  type="number"
                  className="form-control"
                  id="HouseNumber"
                  placeholder=""
                  autoComplete="off"
                ></input>
                <label htmlFor="HouseNumber">HouseNumber * </label>
              </div>

              {formikRegister.touched.HouseNumber &&
                formikRegister.errors.HouseNumber && (
                  <p className="text-warning">
                    {formikRegister.errors.HouseNumber}
                  </p>
                )}
            </div>
            <div className="col-sm-12 col-md-6 my-sm-1">
              <div className="  form-floating w-100">
                <input
                  name="zip"
                  onChange={formikRegister.handleChange}
                  onBlur={formikRegister.handleBlur}
                  defaultValue={""}
                  type="number"
                  className="form-control"
                  id="zip"
                  placeholder="zip"
                  autoComplete="off"
                ></input>
                <label htmlFor="zip">zip</label>
              </div>

              {formikRegister.touched.zip && formikRegister.errors.zip && (
                <p className="text-warning">{formikRegister.errors.zip}</p>
              )}
            </div>
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="d-inline-block">
              <input
                name="isBusiness"
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                type="checkbox"
                className=""
                id="isBusiness"
                placeholder="isBusiness"
                autoComplete="off"
              ></input>
              <label htmlFor="isBusiness" className="mx-1 d-inline-block">
                is business account?
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 my-sm-1">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  formikRegister.resetForm();
                }}
              >
                <i className="fa-solid fa-arrows-rotate"></i>
              </button>
            </div>
            <div className="col-sm-12 col-md-6 my-sm-1">
              <button
                className="btn btn-danger w-100"
                onClick={() => {
                  navigtor("/");
                  ToastRes("error", "all data was canceled!", "light", 2000);
                }}
              >
                CANCEL
              </button>
            </div>
          </div>

          <button
            className="btn btn-primary m-0 m-auto my-2 d-block w-100"
            type="submit"
            disabled={!formikRegister.dirty || !formikRegister.isValid}
          >
            Sign Up
          </button>
        </form>
      </div>
    );
};
export default Register;
