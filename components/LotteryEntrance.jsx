import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "@/constants";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

export default function LotteryEntrace() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
    const [entranceFee, setEntraceFee] = useState("0");
    const [numberOfPlayers, setNumberOfPlayers] = useState("0");
    const [recentWinner, setRecentWinner] = useState("");

    const dispatch = useNotification();

    //* get raffle address
    const chainId = parseInt(chainIdHex);
    const raffleAddress =
        chainId in contractAddresses ? contractAddresses[chainId][0] : null;

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    });

    const { runContractFunction: enterRaffe } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    });

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    });

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    });

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled]);

    async function updateUI() {
        const entranceFeeFromCall = await getEntranceFee(); // return a big number
        const numberOfPlayersFromCall = await getNumberOfPlayers();
        const recentWinnerFromCall = await getRecentWinner();
        setEntraceFee(entranceFeeFromCall);
        setNumberOfPlayers(numberOfPlayersFromCall);
        setRecentWinner(recentWinnerFromCall);
    }

    // handleSuccess receive the transaction response as parameter
    const handleSuccess = async function (tx) {
        await tx.wait(1);
        handleNewNotification();
        updateUI();
    };

    const handleNewNotification = function () {
        dispatch({
            type: "success",
            title: "Tx Notification",
            message: "Trasaction completed!",
            position: "topR",
        });
    };

    return (
        <div>
            Hi from lottery entrace
            {raffleAddress ? (
                <div>
                    <button
                        onClick={async () => {
                            await enterRaffe({
                                onSuccess: handleSuccess, // this indicate the transaction has sent to Metamask
                                onError: (error) => {
                                    console.log(error);
                                },
                            });
                        }}
                    >
                        Enter raffle
                    </button>
                    Entrance fee: {ethers.utils.formatEther(entranceFee)} ETH
                    Number of players: {numberOfPlayers.toString()}
                    Recent winner: {recentWinner.toString()}
                </div>
            ) : (
                <div>No raffle address detected</div>
            )}
        </div>
    );
}
