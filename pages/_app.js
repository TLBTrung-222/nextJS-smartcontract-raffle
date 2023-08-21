import "@/styles/globals.css";
import { MoralisProvider } from "react-moralis";

export default function App({ Component, pageProps }) {
    return (
        // initializeOnMount: the optionality to hook into a web server to add some more features to our website
        // but we want our app is completely open source and don't want any additional feature, so we will turn it off
        <MoralisProvider initializeOnMount={false}>
            <Component {...pageProps} />
        </MoralisProvider>
    );
}
