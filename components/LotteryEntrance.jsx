import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "@/constants";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

export default function LotteryEntrace() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
    const [entranceFee, setEntraceFee] = useState("0");

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

    useEffect(() => {
        if (isWeb3Enabled) {
            async function updateUI() {
                const entranceFeeFromCall = await getEntranceFee(); // return a big number
                setEntraceFee(entranceFeeFromCall);
            }
            updateUI();
        }
    }, [isWeb3Enabled]);

    // handleSuccess receive the transaction response as parameter
    const handleSuccess = async function (tx) {
        await tx.wait(1);
        handleNewNotification();
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
                                onSuccess: handleSuccess,
                                onError: (error) => {
                                    console.log(error);
                                },
                            });
                        }}
                    >
                        Enter raffle
                    </button>
                    Entrance fee: {ethers.utils.formatEther(entranceFee)} ETH
                </div>
            ) : (
                <div>No raffle address detected</div>
            )}
        </div>
    );
}
