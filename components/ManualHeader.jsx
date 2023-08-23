import { useEffect } from "react";
import { useMoralis } from "react-moralis";

export default function ManualHeader() {
    const {
        enableWeb3,
        account,
        isWeb3Enabled,
        Moralis,
        deactivateWeb3,
        isWeb3EnableLoading,
    } = useMoralis();

    useEffect(() => {
        // If user has connected wallet, no need to do anything.
        // If the wallet is connecting to our web (i.e local storage has "connected"-"injected" pair),
        // just need to help user to reconnect automatically, if not, user need to hit the "connect" button
        if (isWeb3Enabled) return;
        else {
            if (typeof window !== "undefined") {
                if (window.localStorage.getItem("connected")) {
                    // reconnect wallet
                    enableWeb3();
                }
            }
        }
    }, [isWeb3Enabled]);

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`);
            // if user disconnect their account, deleted the memory key-value pair and set isWeb3Enabled to false
            if (account == null) {
                window.localStorage.removeItem("connected");
                deactivateWeb3(); // this will set isWeb3Enabled to false
                console.log("Null account founded");
            }
        });
    }, []);

    return (
        <div>
            {" "}
            {account ? (
                // shorten the account address (our metamask address)
                <div>
                    Connected to {account.slice(0, 6)}...
                    {account.slice(account.length - 4)}{" "}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3();
                        // add a value-key pair to remember when user has connected wallet.
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem(
                                "connected",
                                "injected"
                            ); //inject here mean our metamask wallet
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}{" "}
        </div>
    );
}
