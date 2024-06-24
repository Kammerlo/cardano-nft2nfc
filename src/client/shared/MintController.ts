import {describeBackendMethods} from "remult";
import {AddResponse, ListResponse, PinResponse} from "@blockfrost/blockfrost-js/lib/types/ipfs";
export class MintController {

    static addToIPFS:(path: string) => Promise<AddResponse>;
    static pinToIPFS:(path: string) => Promise<PinResponse>;
    static getStatus:(path: string) => Promise<ListResponse>;

    static async pinFileToIPFS(blob: string) : Promise<AddResponse> {
        const addResponsePromise = this.addToIPFS(blob);
        return addResponsePromise;
    }

    static async getIPFSStatus(path: string) : Promise<ListResponse> {
        return this.getStatus(path);
    }
}
describeBackendMethods(MintController, {
    pinFileToIPFS: {allowed: true}
})