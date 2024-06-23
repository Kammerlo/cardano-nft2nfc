import {Accordion, AccordionDetails, AccordionSummary, Box, Card, Grid, Stack} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {AssetExtended} from "@meshsdk/core";
import Typography from "@mui/material/Typography";


export default function SelectNFT(props: {selectedAsset : AssetExtended, setSelectedAsset :  React.Dispatch<React.SetStateAction<AssetExtended>>, assets : AssetExtended[]}) {

    const {setSelectedAsset, selectedAsset, assets} = props;

    function handleAssetClick(asset: AssetExtended) : void {
    console.log(asset);
    setSelectedAsset(asset);
}

    function getCard(asset: AssetExtended) {
    return <Card variant="outlined" sx={{ maxWidth: 360 }} style={{border: asset.unit === selectedAsset.unit ? '2px solid red' : ''}} onClick={() => handleAssetClick(asset)}>
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
    </Card>;
}

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                Select NFT
            </AccordionSummary>
            <AccordionDetails>
                <Box style={{maxHeight: '40vh', overflow: 'auto'}}>
                    <Grid container>
                        {assets.map((asset) => {
                            return (
                                <Grid item xs={3}>
                                    {getCard(asset)}
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}