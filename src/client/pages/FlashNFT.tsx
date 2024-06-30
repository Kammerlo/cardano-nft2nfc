import { BrowserWallet, AssetExtended } from "@meshsdk/core";
import { useEffect, useState } from "react";
import { Box, Button, Card, Grid, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import SelectNFT from "../components/SelectNFT.tsx";
import ManualFlash from "../components/ManualFlash.tsx";

export default function FlashNFT(props : ({wallet : BrowserWallet | undefined, txHash : string, assetName : string})) {

    const { wallet, assetName } = props;
    const [assets, setAssets] = useState<AssetExtended[]>([]);
    const [selectedAsset, setSelectedAsset] = useState<AssetExtended>({} as AssetExtended);
    const [checkUrl, setCheckUrl] = useState<string>("");
    useEffect(() => {
        if(wallet) {
            wallet.getAssets().then((response) => {

                    console.log(response);
                    setAssets(response);
                    if(assetName) {
                        const selectedAsset = response.find((asset) => asset.assetName === assetName);
                        setSelectedAsset(selectedAsset as AssetExtended);
                    }
                });
        }
    }, [wallet]);

    useEffect(() => {
        console.log(window.location.origin);
        setCheckUrl(window.location.origin + "/check/" + selectedAsset.unit);
    }, [selectedAsset]);



    return (
        <>
           <SelectNFT selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} assets={assets}/>
            <Grid container>
                <Grid xs={4}>
                    <Card variant="outlined" sx={{ maxWidth: 360 }}>
                        <Box sx={{ p: 2 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography gutterBottom variant="h5" component="div">
                                    {selectedAsset.assetName ? selectedAsset.assetName : "No asset Selected"}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    {selectedAsset.quantity}
                                </Typography>
                            </Stack>
                            <Typography color="text.secondary" variant="body2">
                                {selectedAsset.fingerprint}
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
                <Grid xs={4}>
                    <Button>Flash NFC - Not implemented Yet</Button>
                </Grid>
            </Grid>
            <ManualFlash checkUrl={checkUrl} selectedAsset={selectedAsset}/>
        </>
    )
}