import './utils/blockfrostHelper.ts';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import * as http from "http";
import { WebSocketServer } from "ws";
import * as fs from "fs";
import * as IPFS from 'ipfs-core';

const apiKey = process.env.BLOCKFROST_API_KEY == undefined ? "" : process.env.BLOCKFROST_API_KEY;

const blockFrostAPI = new BlockFrostAPI({projectId: apiKey})
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server})
const ipfs = await IPFS.create()
wss.on("connection", (ws: WebSocket) => {
    console.log("Connected")
    ws.onmessage = async (message) => {
        console.log("Got Data", message.data)
        let i = 0;
        while(i < 100) {
            try {
                blockFrostAPI.txs(message.data).then(value => {
                    console.log(value)
                })
                console.log("Tx is live")
            } catch (e) {
                i++
                console.log("Transaction not yet online")

            }
            await sleep(10000)
        }


    }
});

async function sleep(ms: number): Promise<void> {
    return new Promise(
        (resolve) => setTimeout(resolve, ms));
}


app.use(cors())

// Create a Multer instance with a destination folder for file uploads
const upload = multer({ dest: 'uploads/' });
app.post('/pin', upload.single('file'), async function(req, res) {
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

app.get('/nft/info/:fingerprint', async function(req, res) {
    console.log(req.params.fingerprint)
    blockFrostAPI.assetsById(req.params.fingerprint).then((response) => {
        res.send(response)
    })
})


server.listen(PORT, () => {
    console.log(`Server Listen At ${PORT}`);
});