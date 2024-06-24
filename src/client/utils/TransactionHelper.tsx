import {BrowserWallet, ForgeScript, Mint, Transaction} from "@meshsdk/core";


export default class TransactionHelper {


    public static async buildTransaction(mint: Mint | undefined, wallet: BrowserWallet) {
        if (mint !== undefined && mint.recipient !== undefined) {
            const forgingScript = ForgeScript.withOneSignature(mint.recipient.toString());
            const tx = new Transaction({initiator: wallet}).mintAsset(
                forgingScript,
                mint,
            );
            return await tx.build();
        }
    }

    static async signTransaction(transaction: string, wallet: BrowserWallet) {
        return await wallet.signTx(transaction);
    }

    static async submitTransaction(signedTransaction: string, wallet: BrowserWallet) {
        return await wallet.submitTx(signedTransaction);
    }
}
