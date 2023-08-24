import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "@/constants";

export default function LotteryEntrace() {
    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: "",
        contractAddress: "",
        functionName: "",
        params: {},
        msgValue: "",
    });

    return <div></div>;
}
