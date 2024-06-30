import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import * as fs from "fs";
import * as IPFS from 'ipfs-core';
import {configDotenv} from "dotenv";
import path from 'path';
import * as http from "http";
configDotenv();

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const apiKey = process.env.BLOCKFROST_API_KEY == undefined ? "" : process.env.BLOCKFROST_API_KEY;

const blockFrostAPI = new BlockFrostAPI({projectId: apiKey})
const PORT = +(process.env.PORT || "3000");

const app = express();

console.log("test")
app.use(cors())
app.use(express.static(path.join(__dirname, '../../dist')));
app.use(['/check*', '/nft*'], express.static(path.join(__dirname, '../../dist/index.html')));

// Create a Multer instance with a destination folder for file uploads
const upload = multer({ dest: 'uploads/' });
app.post('/pin', upload.single('file'), async function(req, res) {
    const ipfs = await IPFS.create()
    if(req.file == undefined) {
        res.send("No file uploaded");
        return;
    }
    const buffer = fs.readFileSync(req.file.path)
    const result = await ipfs.add(buffer)
    res.send(result.path)
});

app.get('/ipfsstatus/:hash', async function(req, res) {
    // blockFrostIPFS.listByPath(req.params.hash).then((response) => {
    //     res.send(response.path);
    // });
    // const a = await ipfs.get(req.params.hash)
    // ipfs.pin()
    // console.log(a)
    // TODO need to fix status checking
    console.log(req.params.hash)
    res.send("pinned")

});

app.get('/asset/info/:fingerprint', async function(req, res) {
    console.log(req.params.fingerprint)
    try {
    blockFrostAPI.assetsById(req.params.fingerprint).then((response) => {
        res.send(response)
    })
    } catch (e) {
        console.log(e);
    }
})

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server Listen At ${PORT}`);
});