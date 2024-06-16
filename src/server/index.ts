import './utils/blockfrostHelper.ts';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import {BlockFrostIPFS} from "@blockfrost/blockfrost-js";
// import PCSC from "@tockawa/nfc-pcsc";
// import { NFC, CONNECT_MODE_CARD } from 'nfc-pcsc';

const apiKey = process.env.BLOCKFROST_API_KEY == undefined ? "" : process.env.BLOCKFROST_API_KEY;
const blockFrostIPFS = new BlockFrostIPFS({projectId: apiKey});

// const nfc = new NFC();
//
// nfc.on('reader', async reader => {
//     console.log(reader.reader.name)
//     reader.autoProcessing = false
//     reader.on('card', card => {
//         console.log('card detected', card)
//
//
//     });
//     reader.on('error', err => {
//         console.log(err)
//     })
//     reader.on('card.off', card => {
//         console.log("card remove", card, reader)
//     })
// })
// nfc.on('error', err => {
//     console.log(err)
// })

const app = express();
app.use(cors())
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Create a Multer instance with a destination folder for file uploads
const upload = multer({ dest: 'uploads/' });
app.post('/pin', upload.single('file'), function(req, res) {
    if(req.file == undefined) {
        res.send("No file uploaded");
        return;
    }
    blockFrostIPFS.add(req.file.path).then((response) => {
      blockFrostIPFS.pin(response.ipfs_hash).then((response) => {
        res.send(response.ipfs_hash);
      });
    });
});

app.get('/ipfsstatus/:hash', function(req, res) {
    blockFrostIPFS.listByPath(req.params.hash).then((response) => {
        res.send(response);
    });
});
