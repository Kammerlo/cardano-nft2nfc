import {useEffect} from 'react';
import {Button, Grid} from "@mui/material";
import { useState } from "react";
import {AssetMetadata, BrowserWallet, Mint} from "@meshsdk/core";
import TransactionHelper from "../utils/TransactionHelper.tsx";
import MintNFTUserInput from "../components/MintNFTUserInput.tsx";
import {CodeBlock} from "react-code-blocks";
import "./../App.css";

const CreateNFT = (props : ({wallet : BrowserWallet, setTxHash :  (value: React.SetStateAction<string>) => void})) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [transaction, setTransaction] = useState<string>("");
    const [signedTransaction, setSignedTransaction] = useState("");
    const [mintDTO, setMintDTO] = useState<MintDTO>({name: "", address: "", ipfsImageName: "", ipfsImageUrl: "", assetQuantity: "1"} as MintDTO);
    const [addresses, setAddresses] = useState<string[]>([]);
    const [txHash, setTxHash] = useState("");

    const [mint, setMint] = useState<Mint>();

    useEffect(() => {
        if (props.wallet.getUsedAddresses != undefined) {
            props.wallet.getUsedAddresses().then((response) => {
                setAddresses(response);
                console.log(response);
            });
        }
    }, [props.wallet]);

    useEffect(() => {
        const assetMetadata: AssetMetadata = {
            "name": mintDTO.ipfsImageName,
            "image": mintDTO.ipfsImageUrl,
            "mediaType": "image/jpg",
        };
        setMint({
            assetName: mintDTO.name,
            assetQuantity: mintDTO.assetQuantity,
            metadata: assetMetadata,
            label: '721',
            recipient: mintDTO.address
        } as Mint);
        buildTransaction();
    }, [mintDTO]);

    function buildTransaction() {
        if(mint?.recipient !== undefined && mint.recipient !== "") {
            TransactionHelper.buildTransaction(mint, props.wallet).then((response) => {
                if(response != undefined) {
                    setTransaction(response);
                }
            });
        }
    }

    function signTranscation() {
        TransactionHelper.signTransaction(transaction, props.wallet).then((response) => {
            setSignedTransaction(response);
        });
    }

    function submitTransaction() {
        TransactionHelper.submitTransaction(signedTransaction, props.wallet).then((response) => {
            setTxHash(response);
            props.setTxHash(response); // TODO could be done better
        });
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <MintNFTUserInput addresses={addresses} setMintDTO={setMintDTO} mintDTO={mintDTO}/>
                </Grid>
                <Grid item xs={8} height={"initial"}>
                    <CodeBlock text={JSON.stringify(mint, null, 4)} language='json'></CodeBlock>
                    <h5>Transaction Bytes: </h5>
                    <textarea rows={2} maxLength={100} placeholder={transaction} contentEditable={false} style={{width: "100%"}}/>
                    <Button onClick={signTranscation}>Sign this transaction</Button>
                    <div style={{overflow: "scroll", overflowY: "hidden", overflowX: "hidden"}}>Tx Hash: {signedTransaction}</div>
                    <Button onClick={submitTransaction}>Submit this transaction</Button>
                    <div style={{overflow: "scroll", overflowY: "hidden", overflowX: "hidden"}}>Tx Hash: {txHash}</div>
                </Grid>
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </>
    )
}

export default CreateNFT;