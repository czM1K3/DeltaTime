import { FC } from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { getString, getDeltaTime } from "../lib/time";

const Home: FC = () => {
    const [datum, setDatum] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDatum(getString(getDeltaTime()));
        }, 500);
        return () => clearInterval(interval);
    });

    return (
        <div className={styles.container}>
            <Head>
                <title>{datum}</title>
                <link rel="icon" href="/logo.ico" />
            </Head>
            <h1 className={styles.time}>{datum}</h1>
        </div>
    );
};
export default Home;
