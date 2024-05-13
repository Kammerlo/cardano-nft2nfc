import {Box, Button, CircularProgress, MenuItem, Select, SelectChangeEvent, Stack, TextField} from "@mui/material";
import React, {useState} from "react";
import {DropzoneArea} from "mui-file-dropzone";
import axios from "axios";
import CheckIcon from '@mui/icons-material/Check';


const MintNFTUserInput = (props : {addresses : string[], setMintDTO :  React.Dispatch<React.SetStateAction<MintDTO>>, mintDTO : MintDTO }) => {

    const [files, setFiles] = useState<(File)[]>([]);
    const { addresses, setMintDTO, mintDTO } = props;
    const [ pinned, setPinned ] = useState<boolean>(true);
    const [intervalFunc, setIntervalFunc] = useState<NodeJS.Timeout>();

    async function pinIPFS() {

        const formData = new FormData();
        formData.append("file", files[0]);
        axios.post("http://localhost:3000/pin", formData).then((response) => {
            setPinned(false);
            setMintDTO({...mintDTO, ipfsImageUrl: "ipfs://" + response.data})
            updateIPFSImageName(files[0].name);
            setIntervalFunc(
                setInterval(() => {
                    axios.get("http://localhost:3000/status/" + response.data).then((response) => {
                        console.log(response);
                        if(response.data.state === "pinned") {
                            setPinned(true);
                            clearInterval(intervalFunc);
                        }
                    });
                }, 5000)
            );
        });

    }



    function updateIPFSImageName(name: string) {
        if(mintDTO.ipfsImageName === "") {
            setMintDTO({...mintDTO, ipfsImageName: name});
        }
    }

    return (
            <Stack spacing={1}>
                <Select onChange={(e : SelectChangeEvent<string> ) => setMintDTO({...mintDTO, address: e.target.value})}>
                    {addresses.map((address) => {
                        return <MenuItem id={address} style={{textOverflow: "ellipsis"}} value={address}>{address}</MenuItem>
                    })
                    }
                </Select>
                <TextField label="Name" value={mintDTO.name} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setMintDTO({...mintDTO, name: e.target.value})}/>
                <Box component={"section"}  display={"flex"}>
                    <DropzoneArea acceptedFiles={["image/jpeg", "image/png"]} filesLimit={1} onChange={(files) => setFiles(files)}/>
                </Box>
                {mintDTO.ipfsImageUrl === "" ?
                <Button onClick={pinIPFS}>Pin Image</Button> :
                    pinned ?
                        <CircularProgress/> : <CheckIcon/>
                }
                <TextField label="IPFS Image Name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMintDTO({...mintDTO, ipfsImageName: e.target.value})}/>
                <TextField defaultValue={1} type="number" label="Asset Quantity" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMintDTO({...mintDTO, assetQuantity: e.target.value})}/>
            </Stack>
        )
}

export default MintNFTUserInput;