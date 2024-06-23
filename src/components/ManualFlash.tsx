import {AssetExtended} from "@meshsdk/core";
import {Alert, Chip, Snackbar, Tooltip} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {useState} from "react";

export default function ManualFlash(props: {checkUrl: string, selectedAsset: AssetExtended}) {

    const {checkUrl, selectedAsset } = props;
    const [isOpen, setIsOpen] = useState(false);
    function handleClick() {
        navigator.clipboard.writeText(checkUrl);
        setIsOpen(true);
    }

    return (
        <>
            <h5>Manual Flash</h5>
            <p>If you don't have an NFC Writer, you can use your phone.
                Within the AppStore search for a compatible App and flash the following URL directly onto the NFC
                Chip</p>
            {selectedAsset.fingerprint ?
                <Tooltip title="Click to Copy">
                    <Chip avatar={<ContentCopyIcon/>} label={checkUrl} onClick={() => handleClick()}/>
                </Tooltip>
                : ""
            }
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={() => setIsOpen(false)}>
                <Alert
                    onClose={() => setIsOpen(false)}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Copied to clipboard
                </Alert>
            </Snackbar>
        </>
    )
}