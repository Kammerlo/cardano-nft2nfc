import React from 'react';
import {Button, Select, TextField} from "@mui/material";
import { useState } from "react";

const CreateNFT = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [transaction, setTransaction] = useState("");
    const [mintNFT, setMintNFT] = useState<MintNFT>({} as MintNFT);


    // useEffect(() => {
    // componentDidMount();
    // }, []);


    function buildTransaction() {
        setTransaction(TransactionHelper.buildTransaction(mintNFT));
    }

    // function submitTransaction() {
    //     backendService.submit(transaction).then((response) => {
    //         setTxHash(response.data);
    //     });
    // }

    function signTransaction() {
        // signMessage("" + transaction).then((response) => {
        //     console.log(response);
        //
        // });
    }

    function handleChange (e: React.ChangeEvent<HTMLInputElement>, key: string) : void {
        // { [key] : e.target.value}
        setMintNFT(prevState => ({
            ...prevState,
            [key]: e.target.value
        })
        );
    }

    return (
        <div>
            <TextField label="Name" onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChange(e, "name")}/>
            <TextField label="Description" onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChange(e, "description")}/>
            <TextField label="IPFS Image URL" onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChange(e, "ipfsImageUrl")}/>
            <TextField label="IPFS Image Name" onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChange(e, "ipfsImageName")}/>
            <TextField label="Policy Name" onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChange(e, "poliyName")}/>
            <Select onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChange(e, "address")}>
                {/*{usedAddresses.map((address) => {*/}
                {/*    return <MenuItem value={address}>{address}</MenuItem>*/}
                {/*})*/}
                {/*}*/}
            </Select>
            <Button onClick={buildTransaction}>Build Transaction</Button>
            <div>Transaction Hex: {transaction}</div>
            <Button onClick={signTransaction}> Sign This Transaction</Button>
        </div>
    )
}

export default CreateNFT;