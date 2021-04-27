import { FC } from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { getString, getDeltaTime } from "../lib/time";
import { useIndexQuery } from "../lib/graphql/index.graphql";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css"
import Current from "../components/current";
import { useCurrentQuery } from "../lib/graphql/current.graphql";

const Home: FC = () => {
    const [datum, setDatum] = useState("");
    const [deltatime, setDeltatime] = useState(getDeltaTime());
    const [selected, setSelected] = useState("");
    const { data, loading, error } = useIndexQuery();
    const current = useCurrentQuery({variables: {classId: selected}});

    useEffect(() => {
        const interval = setInterval(() => {
            setDeltatime(getDeltaTime());
            setDatum(getString(deltatime));
        }, 500);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        if (selected) {
            current.refetch();
        }
    }, [deltatime, selected]);

    const onSelect = ({value}) => {
        setSelected(value);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{datum}</title>
                <link rel="icon" href="/logo.ico" />
            </Head>
            {
                loading ? "" : error ? "" : <Dropdown options={data.timetableAll.map(x => {
                    return {
                        value: x.classId,
                        label: x.label
                    }
                })} placeholder="Nevybráno" className={styles.classes} onChange={onSelect} />  
            }
            <h1 className={styles.time}>{datum}</h1>
            <Current current={current} />
        </div>
    );
};
export default Home;
