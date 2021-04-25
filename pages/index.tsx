import { FC } from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { getString, getDeltaTime } from "../lib/time";
import { initializeApollo } from "../lib/apollo";
import { ClassListDocument, useClassListQuery } from "../lib/graphql/classList.graphql";

const Home: FC = () => {
    const [datum, setDatum] = useState("");
    const { data, loading, error } = useClassListQuery();

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
            <p className={styles.classes}>{loading ? "Loading" : error ? "Error" : data.timetableAll.map(x => x.label + " ").sort()}</p>
            <h1 className={styles.time}>{datum}</h1>
        </div>
    );
};
export default Home;

export const getStaticProps = async () => {
    const apolloClient = initializeApollo();
    await apolloClient.query({
        query: ClassListDocument,
    })

    return {
        props: {
            initialApolloState: apolloClient.cache.extract(),
        }
    }
}
