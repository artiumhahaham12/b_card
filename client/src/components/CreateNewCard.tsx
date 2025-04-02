import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { craeteNewCard } from "../services/cardsService";
import { ToastRes } from "../services/toastService";
import { Card } from "../interfaces/Card";
interface CreateNewCardProps {}

const CreateNewCard: FunctionComponent<CreateNewCardProps> = () => {
  let navigtor = useNavigate();
  let formikCreateCard = useFormik({
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",

      url: "",
      alt: "",

      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
      zip: 0,
    },
    validationSchema: yup.object({
      title: yup.string().required(),
      subtitle: yup.string().required(),
      description: yup.string().required(),
      phone: yup
        .string()
        .matches(/^(?:\+972|0)(?:[2-9]\d{7,8}|5[02458]\d{7})$/)
        .required(),
      email: yup.string().email().required(),
      web: yup.string().url().required(),

      url: yup
        .string()
        .url(),
      alt: yup.string(),

      state: yup.string(),
      country: yup.string().required(),
      city: yup.string().required(),
      street: yup.string().required(),
      houseNumber: yup.number().required(),
      zip: yup.number(),
    }),

    onSubmit: (values,{resetForm}) => {
      let values_new: Card = {
        title: values.title,
        subtitle: values.subtitle,
        description: values.description,
        phone: values.phone,
        email: values.email,
        web: values.web,
        image: {
          url: values.url,
          alt: values.alt,
        },
        address: {
          state: values.state,
          country: values.country,
          city: values.city,
          street: values.street,
          houseNumber: values.houseNumber,
          zip: values.zip,
        },
      };
      
      craeteNewCard(values_new)
        .then((res) => {

          ToastRes("success", "Card added success", "light", 1500);
          navigtor(-1)
        })
        .catch((error) => {
          console.log(error);
          ToastRes("error", `${error.response.data}`, "light", 3000);
          resetForm();

        });
    },
  });
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <form
        className=" d-table-cell container  m-0 m-auto align-middle"
        style={{ width: "100vw" }}
        onSubmit={formikCreateCard.handleSubmit}
      >
        <h2 className="d-block text-center ">Create New Card</h2>
        <div className="row">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="title"
                onChange={formikCreateCard.handleChange}
                onBlur={formikCreateCard.handleBlur}
                value={formikCreateCard.values.title}
                type="text"
                className="form-control"
                id="title"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="title">title * </label>
            </div>

            {formikCreateCard.touched.title &&
              formikCreateCard.errors.title && (
                <p className="text-warning">{formikCreateCard.errors.title}</p>
              )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="subtitle"
                onChange={formikCreateCard.handleChange}
                onBlur={formikCreateCard.handleBlur}
                value={formikCreateCard.values.subtitle}
                type="text"
                className="form-control"
                id="subtitle"
                placeholder="subtitle"
              ></input>
              <label htmlFor="subtitle">subtitle *</label>
            </div>

            {formikCreateCard.touched.subtitle &&
              formikCreateCard.errors.subtitle && (
                <p className="text-warning">
                  {formikCreateCard.errors.subtitle}
                </p>
              )}
          </div>
        </div>
        <div className="row   ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="description"
                onChange={formikCreateCard.handleChange}
                onBlur={formikCreateCard.handleBlur}
                value={formikCreateCard.values.description}
                type="text"
                className="form-control"
                id="description"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor=""> description * </label>
            </div>

            {formikCreateCard.touched.description &&
              formikCreateCard.errors.description && (
                <p className="text-warning">
                  {formikCreateCard.errors.description}
                </p>
              )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="phone"
                onChange={formikCreateCard.handleChange}
                onBlur={formikCreateCard.handleBlur}
                value={formikCreateCard.values.phone}
                type="phone"
                className="form-control"
                id="phone"
                placeholder="phone"
              ></input>
              <label htmlFor="phone">phone * </label>
            </div>

            {formikCreateCard.touched.phone &&
              formikCreateCard.errors.phone && (
                <p className="text-warning">{formikCreateCard.errors.phone}</p>
              )}
          </div>
        </div>
        <div className="row   ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="email"
                onChange={formikCreateCard.handleChange}
                onBlur={formikCreateCard.handleBlur}
                value={formikCreateCard.values.email}
                type="text"
                className="form-control"
                id="email"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="email">Email* </label>
            </div>

            {formikCreateCard.touched.email &&
              formikCreateCard.errors.email && (
                <p className="text-warning">{formikCreateCard.errors.email}</p>
              )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="web"
                onChange={formikCreateCard.handleChange}
                onBlur={formikCreateCard.handleBlur}
                value={formikCreateCard.values.web}
                type="text"
                className="form-control"
                id="web"
                placeholder="web"
                autoComplete="off"
              ></input>
              <label htmlFor="web">web * </label>
            </div>

            {formikCreateCard.touched.web && formikCreateCard.errors.web && (
              <p className="text-warning">{formikCreateCard.errors.web}</p>
            )}
          </div>
        </div>
        {/*  */}
        <div className="row  ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="url"
                onChange={formikCreateCard.handleChange}
                onBlur={formikCreateCard.handleBlur}
                value={formikCreateCard.values.url}
                type="text"
                className="form-control"
                id="url"
                placeholder="11"
                
              ></input>
              <label htmlFor="url">Image url </label>
            </div>

            {formikCreateCard.touched.url && formikCreateCard.errors.url && (
              <p className="text-warning">{formikCreateCard.errors.url}</p>
            )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="alt"
                onChange={formikCreateCard.handleChange}
                onBlur={formikCreateCard.handleBlur}
                value={formikCreateCard.values.alt}
                type="text"
                className="form-control"
                id="alt"
                placeholder="alt"
                autoComplete="off"
              ></input>
              <label htmlFor="alt">Image alt</label>
            </div>

            {formikCreateCard.touched.alt && formikCreateCard.errors.alt && (
              <p className="text-warning">{formikCreateCard.errors.alt}</p>
            )}
          </div>
        </div>
        <div className="row  ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="state"
                onChange={formikCreateCard.handleChange}
                onBlur={formikCreateCard.handleBlur}
                value={formikCreateCard.values.state}
                type="text"
                className="form-control"
                id="state"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="state">state</label>
            </div>

            {formikCreateCard.touched.state &&
              formikCreateCard.errors.state && (
                <p className="text-warning">{formikCreateCard.errors.state}</p>
              )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="country"
                onChange={formikCreateCard.handleChange}
                onBlur={formikCreateCard.handleBlur}
                value={formikCreateCard.values.country}
                type="text"
                className="form-control"
                id="country"
                placeholder="country"
                autoComplete="off"
              ></input>
              <label htmlFor="country">country * </label>
            </div>

            {formikCreateCard.touched.country &&
              formikCreateCard.errors.country && (
                <p className="text-warning">
                  {formikCreateCard.errors.country}
                </p>
              )}
          </div>
        </div>
        <div className="row  ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="city"
                onChange={formikCreateCard.handleChange}
                onBlur={formikCreateCard.handleBlur}
                value={formikCreateCard.values.city}
                type="text"
                className="form-control"
                id="city"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="city">city * </label>
            </div>

            {formikCreateCard.touched.city && formikCreateCard.errors.city && (
              <p className="text-warning">{formikCreateCard.errors.city}</p>
            )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="street"
                onChange={formikCreateCard.handleChange}
                onBlur={formikCreateCard.handleBlur}
                value={formikCreateCard.values.street}
                type="text"
                className="form-control"
                id="street"
                placeholder="street"
                autoComplete="off"
              ></input>
              <label htmlFor="street">street * </label>
            </div>

            {formikCreateCard.touched.street &&
              formikCreateCard.errors.street && (
                <p className="text-warning">{formikCreateCard.errors.street}</p>
              )}
          </div>
        </div>
        <div className="row  ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="houseNumber"
                onChange={formikCreateCard.handleChange}
                onBlur={formikCreateCard.handleBlur}
                defaultValue={""}
                type="number"
                className="form-control"
                id="houseNumber"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="houseNumber">HouseNumber * </label>
            </div>

            {formikCreateCard.touched.houseNumber &&
              formikCreateCard.errors.houseNumber && (
                <p className="text-warning">
                  {formikCreateCard.errors.houseNumber}
                </p>
              )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="zip"
                onChange={formikCreateCard.handleChange}
                onBlur={formikCreateCard.handleBlur}
                defaultValue={""}
                type="number"
                className="form-control"
                id="zip"
                placeholder="zip"
                autoComplete="off"
              ></input>
              <label htmlFor="zip">zip</label>
            </div>

            {formikCreateCard.touched.zip && formikCreateCard.errors.zip && (
              <p className="text-warning">{formikCreateCard.errors.zip}</p>
            )}
          </div>
        </div>
        <div className="col-sm-12 col-md-6 my-sm-1"></div>
        <div className="row">
          <div className="col-sm-12 col-md-6 my-sm-1">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                formikCreateCard.resetForm();
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
          disabled={!formikCreateCard.dirty || !formikCreateCard.isValid}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateNewCard;
