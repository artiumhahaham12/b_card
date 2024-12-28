import { FunctionComponent } from "react";
import MyNavbar from "./MyNavbar";
import { object } from "yup";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <div className="vh-100 vw-100 d-flex flex-column">
      <MyNavbar allCards={[]} isHome={false} />
      <div className="vw-100">
        <img
          style={{
            height: "20rem",
            width: "100%",
          }}
          src={
            "https://th.bing.com/th/id/OIP.2OU-hM6q6kv4GpdbTC3yMwHaEK?rs=1&pid=ImgDetMain"
          }
          className="card-img-top"
          alt={"react project hero"}
        ></img>
      </div>
      <div className="d-flex flex-column m-0  mt-2 vw-100 align-items-center mb-5">
        <h2 className="display-1">Bcard</h2>
        <p className="fs-4">find some one to your needs</p>
        <div className="d-flex flex-column m-0  mt-5 vw-100 align-items-center ">
          <h2 className="display-1">About Us</h2>
          <p className=" w-75  fs-4 text-center">
            Bcard is a platform that allows you to create your own card and
            share it with others. You can create a card with your information
            and share it with others. You can also search for other users' cards
            and contact them. You can also like other users' cards and save them
            to your favorites. good luck!
          </p>
        </div>
        <div style={{ height: "100px" }}></div>
      </div>
    </div>
  );
};

export default About;
