import {useParams} from "react-router-dom";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import {useEffect, useState} from "react";
import { components } from '@blockfrost/openapi';
import axios from "axios";
import {BrowserWallet} from "@meshsdk/core";

export default function NFTChecker (props: {wallet : BrowserWallet | undefined}) {
    const {wallet} = props;
    const {unit} = useParams();
    const [asset, setAsset] = useState({} as components['schemas']['asset']);
    const [ containedInWallet, setContainedInWallet ] = useState(false);
    const [ ipfsImageUrl, setIpfsImageUrl ] = useState("");
    // const {nft, setNft} = useState("");

    useEffect(() => {
        if(unit) {
            fetchNFT(unit);
        }


    }, [unit]); // todo replace with ComponentDidMount

    useEffect(() => {
        containsWalletAsset();
    }, [wallet]);

    function hexToString(hex: string) {
        let str = '';
        for (let n = 0; n < hex.length; n += 2) {
            str += String.fromCharCode(parseInt(hex.substring(n, n + 2), 16));
        }
        return str;
    }

    function containsWalletAsset() {
        if(wallet && unit) {
            wallet.getAssets().then((response) => {
                setContainedInWallet(response.find((asset) => asset.unit === unit) !== undefined);
            });
        }
    }

    function fetchNFT(nftUnit : string) {
        axios.get(window.location.origin + "/nft/info/" + nftUnit).then((response) => {
            setAsset(response.data);
            containsWalletAsset();
            if(response.data.onchain_metadata.image) {
                setIpfsImageUrl(response.data.onchain_metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/"));
            }
        });
    }

    return (
        <>
            <h4>Check NFT</h4>
            <div>This page is used for validating an NFT and proofing that it's your by connecting your wallet.</div>
            <br/>
            {unit ? <h6>Checking NFT: {unit} </h6>
                :
                <div>
                    <h6>The NFT Identifier is the policy_id + hex-encoded assetname</h6>
                    <h6>Enter NFT Fingerprint to check <TextField label="NFT Identifier" variant="outlined"/></h6>
                </div>
            }
            {/* TODO extract to component */}
            {asset.asset_name ?
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Asset Name</TableCell>
                                <TableCell>PolicyID</TableCell>
                                <TableCell>Mint Tx</TableCell>
                                <TableCell>Image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{hexToString(asset.asset_name)}</TableCell>
                                <TableCell>{asset.policy_id}</TableCell>
                                <TableCell>{asset.initial_mint_tx_hash}</TableCell>
                                {/*TODO need to check this error*/}
                                <TableCell><img src={ipfsImageUrl} alt={"NFT Image"}/></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                : "No asset available."
            }
            {wallet ?
                containedInWallet?
                        <h5>
                            <CheckCircleOutlineIcon style={{color : 'green'}}/> You own this Asset!
                        </h5>
                    :
                        <h5>
                            <CancelIcon style={{color : 'red'}}/> Asset is not contained in your wallet
                        </h5>
                :
                <div>Connect your wallet to check this NFT</div>}

        </>
    )
}