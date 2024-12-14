import { FunctionComponent } from "react";
import MyNavbar from "./MyNavbar";

interface AboutProps {
    
}
 
const About: FunctionComponent<AboutProps> = () => {
    return (
      <div className="vh-100 vw-100 d-flex flex-column">
        <MyNavbar allCards={[]} />
        <div className="vw-100">
          <img
            style={{
              height: "400px",

              width: "100%",
            }}
            src={
              "https://th.bing.com/th/id/OIP.oXkke_WupXrLmCLULFAKegHaA0?w=429&h=80&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            }
            className="card-img-top"
            alt={"react project hero"}
          ></img>
        </div>
        <div className="d-flex flex-column m-0  mt-5 vw-100 align-items-center ">
          <h2 className="display-1">Bcard</h2>
        </div>
      </div>
    );
    
}
 
export default About;