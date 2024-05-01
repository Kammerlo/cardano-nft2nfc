import React, {useEffect} from 'react';
import {Box, Button, Grid, SelectChangeEvent} from "@mui/material";
import { useState } from "react";
import {BrowserWallet} from "@meshsdk/core";
import TransactionHelper from "../utils/TransactionHelper.tsx";
import MintNFTUserInput from "../components/MintNFTUserInput.tsx";

const CreateNFT = (props : ({wallet : BrowserWallet})) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [transaction, setTransaction] = useState("");
    const [signedTransaction, setSignedTransaction] = useState("");
    const [mintDTO, setMintDTO] = useState<MintDTO>({} as MintDTO);
    const [addresses, setAddresses] = useState<string[]>([]);
    const [txHash, setTxHash] = useState("");

    useEffect(() => {
        if (props.wallet.getUsedAddresses != undefined) {
            props.wallet.getUsedAddresses().then((response) => {
                setAddresses(response);
                console.log(response);
            });

        }
    }, [props.wallet]);


    function handleChange (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>, key: string) : void {
        // { [key] : e.target.value}
        setMintDTO(prevState => ({
            ...prevState,
            [key]: e.target.value
        })
        );
    }

    function signAndSubmit() {
        TransactionHelper.buildTransaction(mintDTO, props.wallet).then((response) => {
            setTransaction(response);
        });
        TransactionHelper.signTransaction(transaction, props.wallet).then((response) => {
            setSignedTransaction(response);
        });
        TransactionHelper.submitTransaction(signedTransaction, props.wallet).then((response) => {
            setTxHash(response);
        });
    }

    return (
        <>
                <Grid container md={12}>
                    <Grid item md={12}>
            <MintNFTUserInput handleChange={handleChange} addresses={addresses}/>
                    </Grid>
            <Button onClick={signAndSubmit}>Submit this transaction</Button>
            <div>Tx Hash: {txHash}</div>
                </Grid>
        </>
    )
}

export default CreateNFT;