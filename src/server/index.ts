import './utils/blockfrostHelper.ts';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import {BlockFrostIPFS} from "@blockfrost/blockfrost-js";

const apiKey = process.env.BLOCKFROST_API_KEY == undefined ? "" : process.env.BLOCKFROST_API_KEY;
const API = new BlockFrostIPFS({projectId: apiKey});

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
    API.add(req.file.path).then((response) => {
      API.pin(response.ipfs_hash).then((response) => {
        res.send(response.ipfs_hash);
      });
    });
});

app.get('/status/:hash', function(req, res) {
    console.log(req);
    API.listByPath(req.params.hash).then((response) => {
        res.send(response);
    });
});