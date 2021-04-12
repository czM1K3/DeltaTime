import { AppProps } from "next/app";
import "../styles/globals.css";
import "../fonts/index.css"

const MyApp = ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};

export default MyApp;
