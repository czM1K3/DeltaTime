import { AppProps } from "next/app";
import "../styles/globals.css";
import "../fonts/index.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apollo";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const apolloClient = useApollo(null);
    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
};

export default MyApp;
