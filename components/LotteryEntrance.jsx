import { useMoralis, useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "@/constants";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function LotteryEntrace() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
    const [entranceFee, setEntraceFee] = useState("0");

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

    return (
        <div>
            Hi from lottery entrace
            {raffleAddress ? (
                <div>
                    <button
                        onClick={async () => {
                            await enterRaffe();
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
