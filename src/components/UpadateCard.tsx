import { useFormik } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Card } from "../interfaces/Card";
import { ToastRes } from "../services/toastService";
import { getCardById, updateCard } from "../services/cardsService";
import { error } from "console";
interface UpadateCardProps {}

const UpadateCard: FunctionComponent<UpadateCardProps> = ({}) => {
  let navigtor = useNavigate();
  let { id } = useParams();
  let [card, setCard] = useState<Card>({
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
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
      zip: 0,
    },
  });
  useEffect(() => {
    getCardById(id as string)
      .then((res) => {
        setCard(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  let formikUpdateCard = useFormik({
    initialValues: {
      title: card.title,
      subtitle: card.subtitle,
      description: card.description,
      phone: card.phone,
      email: card.email,
      web: card.web,

      url: card.image.url,
      alt: card.image.alt,

      state: card.address.state,
      country: card.address.country,
      city: card.address.city,
      street: card.address.street,
      houseNumber: card.address.houseNumber,
      zip: card.address.zip,
    },
    enableReinitialize: true,
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
        .matches(
          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
          "Enter a valid URL"
        ),
      alt: yup.string(),

      state: yup.string(),
      country: yup.string().required(),
      city: yup.string().required(),
      street: yup.string().required(),
      houseNumber: yup.number().required(),
      zip: yup.number(),
    }),

    onSubmit: (values) => {
      let values_new = {
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
      console.log(values_new);
      updateCard(values_new, id as string)
        .then((res) => {
          console.log(res.data);
          ToastRes("success", "Card updated success", "light", 1500);
          navigtor("/my-Cards");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <form
        className=" d-table-cell container  m-0 m-auto align-middle"
        style={{ width: "100vw" }}
        onSubmit={formikUpdateCard.handleSubmit}
      >
        <h2 className="d-block text-center ">Create New Card</h2>
        <div className="row">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="title"
                onChange={formikUpdateCard.handleChange}
                onBlur={formikUpdateCard.handleBlur}
                value={formikUpdateCard.values.title}
                type="text"
                className="form-control"
                id="title"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="title">title * </label>
            </div>

            {formikUpdateCard.touched.title &&
              formikUpdateCard.errors.title && (
                <p className="text-warning">{formikUpdateCard.errors.title}</p>
              )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="subtitle"
                onChange={formikUpdateCard.handleChange}
                onBlur={formikUpdateCard.handleBlur}
                value={formikUpdateCard.values.subtitle}
                type="text"
                className="form-control"
                id="subtitle"
                placeholder="subtitle"
              ></input>
              <label htmlFor="subtitle">subtitle *</label>
            </div>

            {formikUpdateCard.touched.subtitle &&
              formikUpdateCard.errors.subtitle && (
                <p className="text-warning">
                  {formikUpdateCard.errors.subtitle}
                </p>
              )}
          </div>
        </div>
        <div className="row   ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="description"
                onChange={formikUpdateCard.handleChange}
                onBlur={formikUpdateCard.handleBlur}
                value={formikUpdateCard.values.description}
                type="text"
                className="form-control"
                id="description"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor=""> description * </label>
            </div>

            {formikUpdateCard.touched.description &&
              formikUpdateCard.errors.description && (
                <p className="text-warning">
                  {formikUpdateCard.errors.description}
                </p>
              )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="phone"
                onChange={formikUpdateCard.handleChange}
                onBlur={formikUpdateCard.handleBlur}
                value={formikUpdateCard.values.phone}
                type="phone"
                className="form-control"
                id="phone"
                placeholder="phone"
              ></input>
              <label htmlFor="phone">phone * </label>
            </div>

            {formikUpdateCard.touched.phone &&
              formikUpdateCard.errors.phone && (
                <p className="text-warning">{formikUpdateCard.errors.phone}</p>
              )}
          </div>
        </div>
        <div className="row   ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="email"
                onChange={formikUpdateCard.handleChange}
                onBlur={formikUpdateCard.handleBlur}
                value={formikUpdateCard.values.email}
                type="text"
                className="form-control"
                id="email"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="email">Email* </label>
            </div>

            {formikUpdateCard.touched.email &&
              formikUpdateCard.errors.email && (
                <p className="text-warning">{formikUpdateCard.errors.email}</p>
              )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="web"
                onChange={formikUpdateCard.handleChange}
                onBlur={formikUpdateCard.handleBlur}
                value={formikUpdateCard.values.web}
                type="text"
                className="form-control"
                id="web"
                placeholder="web"
                autoComplete="off"
              ></input>
              <label htmlFor="web">web * </label>
            </div>

            {formikUpdateCard.touched.web && formikUpdateCard.errors.web && (
              <p className="text-warning">{formikUpdateCard.errors.web}</p>
            )}
          </div>
        </div>
        {/*  */}
        <div className="row  ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="url"
                onChange={formikUpdateCard.handleChange}
                onBlur={formikUpdateCard.handleBlur}
                value={formikUpdateCard.values.url}
                type="text"
                className="form-control"
                id="url"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="url">Image url </label>
            </div>

            {formikUpdateCard.touched.url && formikUpdateCard.errors.url && (
              <p className="text-warning">
                {formikUpdateCard.errors.url as string}
              </p>
            )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="alt"
                onChange={formikUpdateCard.handleChange}
                onBlur={formikUpdateCard.handleBlur}
                value={formikUpdateCard.values.alt}
                type="text"
                className="form-control"
                id="alt"
                placeholder="alt"
                autoComplete="off"
              ></input>
              <label htmlFor="alt">Image alt</label>
            </div>

            {formikUpdateCard.touched.alt && formikUpdateCard.errors.alt && (
              <p className="text-warning">
                {formikUpdateCard.errors.alt as string}
              </p>
            )}
          </div>
        </div>
        <div className="row  ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="state"
                onChange={formikUpdateCard.handleChange}
                onBlur={formikUpdateCard.handleBlur}
                value={formikUpdateCard.values.state}
                type="text"
                className="form-control"
                id="state"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="state">state</label>
            </div>

            {formikUpdateCard.touched.state &&
              formikUpdateCard.errors.state && (
                <p className="text-warning">
                  {formikUpdateCard.errors.state as string}
                </p>
              )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="country"
                onChange={formikUpdateCard.handleChange}
                onBlur={formikUpdateCard.handleBlur}
                value={formikUpdateCard.values.country}
                type="text"
                className="form-control"
                id="country"
                placeholder="country"
                autoComplete="off"
              ></input>
              <label htmlFor="country">country * </label>
            </div>

            {formikUpdateCard.touched.country &&
              formikUpdateCard.errors.country && (
                <p className="text-warning">
                  {formikUpdateCard.errors.country as string}
                </p>
              )}
          </div>
        </div>
        <div className="row  ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="city"
                onChange={formikUpdateCard.handleChange}
                onBlur={formikUpdateCard.handleBlur}
                value={formikUpdateCard.values.city}
                type="text"
                className="form-control"
                id="city"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="city">city * </label>
            </div>

            {formikUpdateCard.touched.city && formikUpdateCard.errors.city && (
              <p className="text-warning">
                {formikUpdateCard.errors.city as string}
              </p>
            )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="street"
                onChange={formikUpdateCard.handleChange}
                onBlur={formikUpdateCard.handleBlur}
                value={formikUpdateCard.values.street}
                type="text"
                className="form-control"
                id="street"
                placeholder="street"
                autoComplete="off"
              ></input>
              <label htmlFor="street">street * </label>
            </div>

            {formikUpdateCard.touched.street &&
              formikUpdateCard.errors.street && (
                <p className="text-warning">
                  {formikUpdateCard.errors.street as string}
                </p>
              )}
          </div>
        </div>
        <div className="row  ">
          <div className=" col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating my-1 w-100">
              <input
                name="houseNumber"
                onChange={formikUpdateCard.handleChange}
                onBlur={formikUpdateCard.handleBlur}
                defaultValue={""}
                type="number"
                className="form-control"
                id="houseNumber"
                placeholder=""
                autoComplete="off"
              ></input>
              <label htmlFor="houseNumber">HouseNumber * </label>
            </div>

            {formikUpdateCard.touched.houseNumber &&
              formikUpdateCard.errors.houseNumber && (
                <p className="text-warning">
                  {formikUpdateCard.errors.houseNumber as string}
                </p>
              )}
          </div>
          <div className="col-sm-12 col-md-6 my-sm-1">
            <div className="  form-floating w-100">
              <input
                name="zip"
                onChange={formikUpdateCard.handleChange}
                onBlur={formikUpdateCard.handleBlur}
                defaultValue={""}
                type="number"
                className="form-control"
                id="zip"
                placeholder="zip"
                autoComplete="off"
              ></input>
              <label htmlFor="zip">zip</label>
            </div>

            {formikUpdateCard.touched.zip && formikUpdateCard.errors.zip && (
              <p className="text-warning">
                {formikUpdateCard.errors.zip as string}
              </p>
            )}
          </div>
        </div>
        <div className="col-sm-12 col-md-6 my-sm-1"></div>
        <div className="row">
          <div className="col-sm-12 col-md-6 my-sm-1">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                formikUpdateCard.resetForm();
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
          disabled={!formikUpdateCard.dirty || !formikUpdateCard.isValid}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default UpadateCard;
