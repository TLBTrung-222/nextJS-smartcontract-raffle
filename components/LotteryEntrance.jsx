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

    const {
        runContractFunction: getEntranceFee,
        isLoading,
        isFetching,
    } = useWeb3Contract({
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
        <div className="p-5">
            Hi from lottery entrace
            {raffleAddress ? (
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () => {
                            await enterRaffe({
                                onSuccess: handleSuccess, // this indicate the transaction has sent to Metamask
                                onError: (error) => {
                                    console.log(error);
                                },
                            });
                        }}
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Enter Raffle"
                        )}
                    </button>
                    <div>
                        {" "}
                        Entrance fee: {ethers.utils.formatEther(
                            entranceFee
                        )}{" "}
                        ETH
                    </div>
                    <div> Number of players: {numberOfPlayers.toString()}</div>
                    <div> Recent winner: {recentWinner.toString()}</div>
                </div>
            ) : (
                <div>No raffle address detected</div>
            )}
        </div>
    );
}
