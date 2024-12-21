import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import User from "../interfaces/User";
import { getToken, getUserById, updateUser, userRegister } from "../services/usersService";

import { ToastRes } from "../services/toastService";
import { AxiosResponse } from "axios";
interface UpdateUserProps {}

const UpdateUser: FunctionComponent<UpdateUserProps> = () => {
    let { id } = useParams()
    let [userToUpdate,setUserToUpadate] =useState<User>()
    let navigtor = useNavigate();
    useEffect(() => {
        getUserById(id as string).then((res) => {
            setUserToUpadate(res.data);
        }).catch((error) => {
            console.log(error);
        })
    },[])
  let formikUpdateUser = useFormik({
    initialValues: {
      first: userToUpdate?.name.first as string,
      middle: userToUpdate?.name.middle as string,
      last: userToUpdate?.name.last as string,
      phone: userToUpdate?.phone as string,
      email: userToUpdate?.email as string,
      
      url: userToUpdate?.image.url as string,
      alt: userToUpdate?.image.alt as string,
      state: userToUpdate?.address.state as string,
      country: userToUpdate?.address.country as string,
      city: userToUpdate?.address.city as string,
      street: userToUpdate?.address.street as string,
      HouseNumber: userToUpdate?.address.houseNumber as number,
      zip: userToUpdate?.address.zip as number,
      
    },
    enableReinitialize: true,
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
      let values_new:any = {
        name: {
          first: values.first,
          middle: values.middle,
          last: values.last,
        },
        phone: values.phone,
        
        
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
        
      };
      console.log(values_new);
      updateUser((userToUpdate as User)._id as string,values_new)
        .then((res:AxiosResponse) => {
          console.log(res.data);
          ToastRes(
            "success",
            `user updated success successfuly ${values.first}`,
            `light`,
            3000
          );
          navigtor("/sandbox");
        })
        .catch((error) => {
          let errorLog: string = (Object.entries(error)[5][1] as any)
            .data as string;
            ToastRes("error", errorLog, `light`, 3000);
            console.log(errorLog);
            
        });
    },
  });
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <form
        className=" d-table-cell container  m-0 m-auto align-middle"
        style={{ width: "100vw" }}
        onSubmit={formikUpdateUser.handleSubmit}
      >
        <h2 className="d-block text-center ">{userToUpdate?._id}</h2>
        <div className="row">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="first"
                onChange={formikUpdateUser.handleChange}
                onBlur={formikUpdateUser.handleBlur}
                value={formikUpdateUser.values.first}
                type="text"
                className="form-control"
                id="first"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="first">first name * </label>
            </div>

            {formikUpdateUser.touched.first &&
              formikUpdateUser.errors.first && (
                <p className="text-warning">{formikUpdateUser.errors.first}</p>
              )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="middle"
                onChange={formikUpdateUser.handleChange}
                onBlur={formikUpdateUser.handleBlur}
                value={formikUpdateUser.values.middle}
                type="text"
                className="form-control"
                id="middle"
                placeholder="middle"
              ></input>
              <label htmlFor="middle">middle</label>
            </div>

            {formikUpdateUser.touched.middle &&
              formikUpdateUser.errors.middle && (
                <p className="text-warning">{formikUpdateUser.errors.middle}</p>
              )}
          </div>
        </div>
        <div className="row   ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="last"
                onChange={formikUpdateUser.handleChange}
                onBlur={formikUpdateUser.handleBlur}
                value={formikUpdateUser.values.last}
                type="text"
                className="form-control"
                id="last"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="last">last name * </label>
            </div>

            {formikUpdateUser.touched.last && formikUpdateUser.errors.last && (
              <p className="text-warning">{formikUpdateUser.errors.last}</p>
            )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="phone"
                onChange={formikUpdateUser.handleChange}
                onBlur={formikUpdateUser.handleBlur}
                value={formikUpdateUser.values.phone}
                type="phone"
                className="form-control"
                id="phone"
                placeholder="phone"
              ></input>
              <label htmlFor="phone">phone * </label>
            </div>

            {formikUpdateUser.touched.phone &&
              formikUpdateUser.errors.phone && (
                <p className="text-warning">{formikUpdateUser.errors.phone}</p>
              )}
          </div>
        </div>
       
        {/*  */}
        <div className="row  ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="url"
                onChange={formikUpdateUser.handleChange}
                onBlur={formikUpdateUser.handleBlur}
                value={formikUpdateUser.values.url}
                type="text"
                className="form-control"
                id="url"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="url">Image url </label>
            </div>

            {formikUpdateUser.touched.url && formikUpdateUser.errors.url && (
              <p className="text-warning">{formikUpdateUser.errors.url}</p>
            )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="alt"
                onChange={formikUpdateUser.handleChange}
                onBlur={formikUpdateUser.handleBlur}
                value={formikUpdateUser.values.alt}
                type="text"
                className="form-control"
                id="alt"
                placeholder="alt"
                autoComplete="off"
              ></input>
              <label htmlFor="alt">Image alt</label>
            </div>

            {formikUpdateUser.touched.alt && formikUpdateUser.errors.alt && (
              <p className="text-warning">{formikUpdateUser.errors.alt}</p>
            )}
          </div>
        </div>
        <div className="row  ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="state"
                onChange={formikUpdateUser.handleChange}
                onBlur={formikUpdateUser.handleBlur}
                value={formikUpdateUser.values.state}
                type="text"
                className="form-control"
                id="state"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="state">state</label>
            </div>

            {formikUpdateUser.touched.state &&
              formikUpdateUser.errors.state && (
                <p className="text-warning">{formikUpdateUser.errors.state}</p>
              )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="country"
                onChange={formikUpdateUser.handleChange}
                onBlur={formikUpdateUser.handleBlur}
                value={formikUpdateUser.values.country}
                type="text"
                className="form-control"
                id="country"
                placeholder="country"
                autoComplete="off"
              ></input>
              <label htmlFor="country">country * </label>
            </div>

            {formikUpdateUser.touched.country &&
              formikUpdateUser.errors.country && (
                <p className="text-warning">
                  {formikUpdateUser.errors.country}
                </p>
              )}
          </div>
        </div>
        <div className="row  ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="city"
                onChange={formikUpdateUser.handleChange}
                onBlur={formikUpdateUser.handleBlur}
                value={formikUpdateUser.values.city}
                type="text"
                className="form-control"
                id="city"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="city">city * </label>
            </div>

            {formikUpdateUser.touched.city && formikUpdateUser.errors.city && (
              <p className="text-warning">{formikUpdateUser.errors.city}</p>
            )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="street"
                onChange={formikUpdateUser.handleChange}
                onBlur={formikUpdateUser.handleBlur}
                value={formikUpdateUser.values.street}
                type="text"
                className="form-control"
                id="street"
                placeholder="street"
                autoComplete="off"
              ></input>
              <label htmlFor="street">street * </label>
            </div>

            {formikUpdateUser.touched.street &&
              formikUpdateUser.errors.street && (
                <p className="text-warning">{formikUpdateUser.errors.street}</p>
              )}
          </div>
        </div>
        <div className="row  ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="HouseNumber"
                onChange={formikUpdateUser.handleChange}
                onBlur={formikUpdateUser.handleBlur}
                value={formikUpdateUser.values.HouseNumber}
                defaultValue={""}
                type="number"
                className="form-control"
                id="HouseNumber"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="HouseNumber">HouseNumber * </label>
            </div>

            {formikUpdateUser.touched.HouseNumber &&
              formikUpdateUser.errors.HouseNumber && (
                <p className="text-warning">
                  {formikUpdateUser.errors.HouseNumber}
                </p>
              )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="zip"
                onChange={formikUpdateUser.handleChange}
                onBlur={formikUpdateUser.handleBlur}
                value={formikUpdateUser.values.zip}
                defaultValue={""}
                type="number"
                className="form-control"
                id="zip"
                placeholder="zip"
                autoComplete="off"
              ></input>
              <label htmlFor="zip">zip</label>
            </div>

            {formikUpdateUser.touched.zip && formikUpdateUser.errors.zip && (
              <p className="text-warning">{formikUpdateUser.errors.zip}</p>
            )}
          </div>
        </div>
        
        <div className="row">
          <div className="col-sm-12 col-md-6 my-sm-1">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                formikUpdateUser.resetForm();
              }}
            >
              <i className="fa-solid fa-arrows-rotate"></i>
            </button>
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <button
              className="btn btn-danger w-100"
              onClick={() => {
                navigtor(-1);
                ToastRes("error", "nothing heppened", "light", 2000);
              }}
            >
              CANCEL
            </button>
          </div>
        </div>

        <button
          className="btn btn-primary m-0 m-auto my-2 d-block w-100"
          type="submit"
          disabled={!formikUpdateUser.dirty || !formikUpdateUser.isValid}
        >
          Update
        </button>
      </form>
    </div>
  );
};
export default UpdateUser;
