const { PublicKey } = require("@solana/web3.js");
const { 
    getOrCreateAssociatedTokenAccount,
    transfer,
    getAccount,
} = require("@solana/spl-token");
const { connection, utils } = require('./utils');

async function sendTokens(recipientAddress, amount) {
    try {
        const tokenInfo = utils.loadTokenInfo();
        const wallet = utils.loadOrCreateWallet();
        
        const mintPublicKey = new PublicKey(tokenInfo.tokenMint);
        const recipientPublicKey = new PublicKey(recipientAddress);

        const senderTokenAccount = await getAccount(
            connection,
            new PublicKey(tokenInfo.tokenAccount)
        );

        console.log('Creating/getting recipient token account...');
        const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            wallet,
            mintPublicKey,
            recipientPublicKey
        );

        const transferAmount = utils.calculateAmount(amount);
        console.log(`Sending ${amount} tokens...`);
        const transferTx = await transfer(
            connection,
            wallet,
            senderTokenAccount.address,
            recipientTokenAccount.address,
            wallet.publicKey,
            transferAmount
        );

        console.log('Transfer successful! Transaction signature:', transferTx);
        
        return {
            signature: transferTx,
            recipientTokenAccount: recipientTokenAccount.address.toString(),
            amount: transferAmount.toString()
        };
    } catch (error) {
        console.error('Error sending tokens:', error);
        throw error;
    }
}

module.exports = { sendTokens };
