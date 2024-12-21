import { FunctionComponent } from "react";
import styles from "../Css/Sppinner.module.css"

interface SppinerProps {
    
}
 
const Sppiner: FunctionComponent<SppinerProps> = () => {
    return (
        <div className={styles['loader-container']}>
            <div className={styles.spinner}></div>
    </div>);
}
 
export default Sppiner;
