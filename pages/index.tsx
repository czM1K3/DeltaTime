import { FC } from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import { getString, getDeltaTime } from "../lib/time";
import { useIndexQuery } from "../lib/graphql/index.graphql";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Current from "../components/current";
import { useCurrentQuery } from "../lib/graphql/current.graphql";
import { useCookies } from "react-cookie";
import { GoMarkGithub } from "react-icons/go";
import Link from "next/link";
import Lunch from "../components/lunch";

const Home: FC = () => {
    const [deltatime, setDeltatime] = useState(0);
    const [datum, setDatum] = useState("Načítání");
    const { data, loading, error } = useIndexQuery();
    const [cookie, setCookie] = useCookies(["selected"]);
    const current = useCurrentQuery({
        variables: { classId: cookie.selected ?? "" },
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const currentDeltaTime = getDeltaTime();
            setDeltatime(currentDeltaTime);
            setDatum(getString(currentDeltaTime));
        }, 500);
        return () => clearInterval(interval);
    });

    useEffect(() => {
        if (cookie.selected) {
            current.refetch();
        }
    }, [deltatime, cookie.selected]);

    const onSelect = ({ value }) => {
        setCookie("selected", value, {
            path: "/",
            maxAge: 30 * 24 * 60 * 60,
            sameSite: true,
        });
    };

    return (
        <div className={styles.container}>
            <Head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta
                    name="description"
                    content="DELTA - Střední škola informatiky a ekonomie, s.r.o."
                />
                <meta
                    name="keywords"
                    content="DELTA - Střední škola informatiky a ekonomie, s.r.o."
                />
                <title>{datum}</title>
                <link rel="icon" href="/logo.ico" />

                <link rel="manifest" href="/manifest.json" />
                <link
                    href="/icons/favicon-16x16.png"
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                />
                <link
                    href="/icons/favicon-32x32.png"
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                />
                <link
                    rel="apple-touch-icon"
                    href="/icons/apple-touch-icon.png"
                ></link>
                <meta name="theme-color" content="#317EFB" />
            </Head>
            {loading ? (
                ""
            ) : error ? (
                ""
            ) : (
                <Dropdown
                    options={data.timetableAll
                        .map((x) => {
                            return {
                                value: x.classId,
                                label: x.label,
                            };
                        })
                        .sort((a, b) => a.label.localeCompare(b.label))}
                    placeholder="Nevybráno"
                    className={styles.classes}
                    onChange={onSelect}
                    value={cookie.selected ?? ""}
                />
            )}
            <h1 className={styles.time}>{datum}</h1>
            <Current current={current} />
            { !loading && !error && data.lunch ? <Lunch lunch={data.lunch} />:<></> }
            <Link href="https://github.com/czM1K3/DeltaTime">
                <GoMarkGithub className={styles.github} />
            </Link>
        </div>
    );
};

export default Home;
