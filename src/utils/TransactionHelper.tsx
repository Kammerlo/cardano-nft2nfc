import {AssetMetadata, BrowserWallet, ForgeScript, Mint, Transaction} from "@meshsdk/core";


export default class TransactionHelper {


    public static async buildTransaction (mintNFT : MintDTO, wallet : BrowserWallet) {
        const forgingScript = ForgeScript.withOneSignature(mintNFT.address);
        const assetMetadata: AssetMetadata = {
            "name": mintNFT.ipfsImageName,
            "image": mintNFT.ipfsImageUrl,
            "mediaType": "image/jpg",
        };
        const asset: Mint = {
            assetName: mintNFT.name,
            assetQuantity: '1',
            metadata: assetMetadata,
            label: '721',
            recipient: mintNFT.address
        };
        const tx = new Transaction({initiator: wallet}).mintAsset(
            forgingScript,
            asset,
        );
        return await tx.build();
    }

    static async signTransaction(transaction: string, wallet: BrowserWallet) {
        return await wallet.signTx(transaction);
    }

    static async submitTransaction(signedTransaction: string, wallet: BrowserWallet) {
        return await wallet.submitTx(signedTransaction);
    }
}
