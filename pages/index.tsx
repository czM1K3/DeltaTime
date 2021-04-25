import { FC } from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { getString, getDeltaTime } from "../lib/time";
import { useClassListQuery } from "../lib/graphql/classList.graphql";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css"

const Home: FC = () => {
    const [datum, setDatum] = useState("");
    const [deltatime, setDeltatime] = useState(getDeltaTime());
    const [current, setCurrent] = useState("");
    const [selected, setSelected] = useState("");
    const { data, loading, error } = useClassListQuery();

    useEffect(() => {
        const interval = setInterval(() => {
            setDeltatime(getDeltaTime());
            setDatum(getString(deltatime));
        }, 500);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        if (selected) {
            
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
            {/* <p className={styles.classes}>{loading ? "Loading" : error ? "Error" : data.timetableAll.map(x => x.label + " ").sort()}</p> */}
            <h1 className={styles.time}>{datum} {current}</h1>
        </div>
    );
};
export default Home;
