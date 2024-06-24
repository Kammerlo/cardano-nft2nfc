import {useEffect} from 'react';
import {Alert, Button, Grid, Snackbar} from "@mui/material";
import { useState } from "react";
import {AssetMetadata, BrowserWallet, Mint} from "@meshsdk/core";
import TransactionHelper from "../utils/TransactionHelper.tsx";
import MintNFTUserInput from "../components/MintNFTUserInput.tsx";
import {CodeBlock} from "react-code-blocks";
import "./../App.css";

const CreateNFT = (props : ({wallet : BrowserWallet | undefined, setTxHash :  (value: React.SetStateAction<string>) => void, txHash : string, setAssetName : (value: React.SetStateAction<string>) => void})) => {

    const {wallet, setTxHash, txHash, setAssetName} = props;
    const [transaction, setTransaction] = useState<string>("");
    const [signedTransaction, setSignedTransaction] = useState("");
    const [mintDTO, setMintDTO] = useState<MintDTO>({name: "", address: "", ipfsImageName: "", ipfsImageUrl: "", assetQuantity: "1"} as MintDTO);
    const [addresses, setAddresses] = useState<string[]>([]);
    const [mint, setMint] = useState<Mint>();
    const [isTxSnackBarOpen, setIsTxSnackBarOpen] = useState(false);
    const [isErrorSnackBarOpen, setIsErrorSnackBarOpen] = useState(false);
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        if (wallet) {
            wallet.getUsedAddresses().then((response) => {
                setAddresses(response);
                console.log(response);
            });
        }
    }, [wallet]);

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
        if(mint?.recipient !== undefined && mint.recipient !== "" && wallet) {
            TransactionHelper.buildTransaction(mint, wallet).then((response) => {
                if(response != undefined) {
                    setTransaction(response);
                }
            });
        }
    }

    function signTransaction() {
        if(wallet) {
            TransactionHelper.signTransaction(transaction, wallet).then((response) => {
                setSignedTransaction(response);
            }).catch(() => {
                setIsErrorSnackBarOpen(true);
                setErrorText("Error signing transaction. Wallet not connected.");
            }) ;
        }
    }

    function submitTransaction() {
        if(wallet) {
            TransactionHelper.submitTransaction(signedTransaction, wallet).then((response) => {
                setTxHash(response);
                setIsTxSnackBarOpen(true);
                setAssetName(mintDTO.name);
            });
        }
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={4}>
                    <MintNFTUserInput addresses={addresses} setMintDTO={setMintDTO} mintDTO={mintDTO}/>
                </Grid>
                <Grid item xs={8} height={"initial"}>
                    <CodeBlock text={JSON.stringify(mint, null, 4)} language='json'></CodeBlock>
                    {signedTransaction ?
                        <>
                            <h5> Signed Transaction: </h5>
                            <textarea rows={5} maxLength={100} placeholder={signedTransaction} contentEditable={false}
                                      style={{width: "100%"}}/>
                        </>
                        :
                        <>
                            <h5>Raw Transaction Bytes: </h5>
                            <textarea rows={5} maxLength={100} placeholder={transaction} contentEditable={false}
                                               style={{width: "100%"}}/>
                        </>
                }


                    {signedTransaction ?
                    <Button onClick={submitTransaction}>Submit this transaction</Button>
                        : <Button onClick={signTransaction}>Sign this transaction</Button>
                    }
                        <div style={{overflow: "scroll", overflowY: "hidden", overflowX: "hidden"}}>Tx Hash: {txHash}</div>
                    </Grid>
                <Snackbar open={isTxSnackBarOpen} autoHideDuration={6000} onClose={() => setIsTxSnackBarOpen(false)}>
                    <Alert
                        onClose={() => setIsTxSnackBarOpen(false)}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Transaction successfully submitted. Tx Hash: {txHash}
                    </Alert>
                </Snackbar>
                <Snackbar open={isErrorSnackBarOpen} autoHideDuration={6000} onClose={() => setIsErrorSnackBarOpen(false)}>
                    <Alert
                        onClose={() => setIsErrorSnackBarOpen(false)}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {errorText}
                    </Alert>
                </Snackbar>
            </Grid>
        </>
    )
}

export default CreateNFT;