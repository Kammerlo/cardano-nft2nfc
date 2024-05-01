import {Box, Button, Grid, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import React, { useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {BlockFrostIPFS} from "@blockfrost/blockfrost-js";


const MintNFTUserInput = (props : {handleChange : (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>, key: string) => void, addresses : string[]}) => {

    const [files, setFiles] = useState<(File & {preview:string})[]>([]);
    const { handleChange, addresses } = props;
    // const API = new BlockFrostAPI({
    //     projectId: import.meta.env.BLOCKFROST_API_KEY,
    // network: "preprod"})
    const IPFS = new BlockFrostIPFS({projectId: import.meta.env.BLOCKFROST_API_KEY});
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            console.log(acceptedFiles);
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div key={file.name}>
            <div>
                <img width={200}
                    src={file.preview}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    function pinIPFS() {
        console.log(import.meta.env.BLOCKFROST_API_KEY);
        console.log(files);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container md={12}>
                <Grid item md={12}>
                <TextField label="Name" onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChange(e, "name")}/>
                </Grid>
                <Grid item md={12}>
                    <TextField label="Description" onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChange(e, "description")}/>
                </Grid>
                <Grid item md={12}>
                    {/*<TextField label="IPFS Image URL" onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleChange(e, "ipfsImageUrl")}/>*/}
                    <div {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    <aside>
                        {thumbs}
                    </aside>
                    <Button onClick={pinIPFS}>Pin Image</Button>
                </Grid>
                <Grid item md={12}>
                <TextField label="IPFS Image Name"
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, "ipfsImageName")}/>
                </Grid>
                <Grid item md={12}>
                    <Select label="Wallet address" onChange={(e : SelectChangeEvent<string> ) => handleChange(e, "address")}>
                    {addresses.map((address) => {
                        return <MenuItem style={{textOverflow: "ellipsis"}} value={address}>{address}</MenuItem>
                        })
                    }
                </Select>
                </Grid>
            </Grid>
        </Box>
        )
}

export default MintNFTUserInput;