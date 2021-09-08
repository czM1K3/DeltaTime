import { AppProps } from "next/app";
import "../styles/globals.scss";
import "../fonts/index.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const apolloClient = useApollo(pageProps.initialApolloState);
    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
};

export default MyApp;
