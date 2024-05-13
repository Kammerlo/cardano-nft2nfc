import {MintController} from "../../shared/MintController.ts";
import {BlockFrostIPFS} from "@blockfrost/blockfrost-js";

/**
 * Filling the static methods of the MintController class, since Blockfrost is only available in NodeJS.
 * To avoid mixing the server and client code, we are filling the methods here.
 */

MintController.addToIPFS = path => {
    const API = new BlockFrostIPFS(import.meta.env.BLOCKFROST_API_KEY);
    return API.add(path);
}

MintController.pinToIPFS = path => {
    const API = new BlockFrostIPFS(import.meta.env.BLOCKFROST_API_KEY);
    return API.pin(path);
}

MintController.getStatus = path => {
    const API = new BlockFrostIPFS(import.meta.env.BLOCKFROST_API_KEY);
    return API.listByPath(path);
}
