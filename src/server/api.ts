import {remultExpress} from "remult/remult-express";
import {MintController} from "../shared/MintController.ts";

export const api = remultExpress({
    controllers: [MintController]
});