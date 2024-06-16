import {BrowserWallet, AssetExtended } from "@meshsdk/core";
import {useEffect, useState} from "react";
import {Box, Button, Card, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function FlashNFT(props : ({wallet : BrowserWallet, txHash : string})) {

    const [assets, setAssets] = useState<AssetExtended[]>([]);
    // const [selectedAsset, setSelectedAsset] = useState<AssetExtended>({} as AssetExtended);
    useEffect(() => {
        // let filteredUtxo : AssetExtended[];
        console.log(props.txHash);
        try {
            props.wallet.getUtxos().then((response) => {
                const filter = response.filter((utxo) => utxo.input.txHash === '0ac2aa00eac8fd68edf5d5ccd11b8d4aefd439ac57b60f3514b2a7cd9f0223ed'); // TODO replace with props.txHash
                if(filter.length === 0) {
                    console.log("No UTXO found");
                    return;
                }
                const utxo = filter[0].output.amount.map((amount): any => amount['unit']) as string[]; // map down to a list of units
                props.wallet.getAssets().then((response) => {

                    const filteredUtxo = response.filter((asset) => utxo.includes(asset.unit));
                    console.log(filteredUtxo);
                    setAssets(filteredUtxo);
                });
            });


        } catch (e) {
            console.log("Wallet not connected");
        }
    }, [props.wallet]);

    return (
        <>
            {assets.map((asset) => {
                return (
                    <Card variant="outlined" sx={{ maxWidth: 360 }}>
                        <Box sx={{ p: 2 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography gutterBottom variant="h5" component="div">
                                    {asset.assetName}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {asset.quantity}
                                </Typography>
                            </Stack>
                            <Typography color="text.secondary" variant="body2">
                                {asset.fingerprint}
                            </Typography>
                        </Box>
                    </Card>
                )
            })}
            <Button onClick={flashNFC}>Flash NFC</Button>
        </>
    )
}