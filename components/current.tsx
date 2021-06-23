import { FC } from "react";
import styles from "../styles/Home.module.scss";

type input = {
    current: any;
};

const Current: FC<input> = ({ current }) => {
    if (current.loading) return <h2 className={styles.class}>...</h2>;
    if (current.error) return <h2 className={styles.class}>Chyba</h2>;
    if (!current.data.timetableCurrent)
        return <h2 className={styles.class}></h2>;
    return (
        <h2 className={styles.class}>
            {current.data.timetableCurrent.join("/") ?? ""}
        </h2>
    );
};
export default Current;
