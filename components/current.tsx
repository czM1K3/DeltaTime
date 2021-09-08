import { QueryResult } from "@apollo/client";
import { FC } from "react";
import { Exact } from "../.cache/__types__";
import { CurrentQuery } from "../lib/graphql/current.graphql";
import styles from "../styles/Home.module.scss";

type CurrentProps = {
    current: QueryResult<CurrentQuery, Exact<{
        classId: string;
    }>>;
};

const Current: FC<CurrentProps> = ({ current }) => {
    if (current.loading) return <h2 className={styles.class}>...</h2>;
    if (current.error) return <h2 className={styles.class}>Chyba</h2>;
    if (!current.data.timetableCurrent)
        return <h2 className={styles.class}></h2>;
    return (
        <h2 className={styles.class}>
            {current.data.timetableCurrent.filter((v, i, s) => s.indexOf(v) === i).join("/") ?? ""}
        </h2>
    );
};
export default Current;
