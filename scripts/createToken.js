const { 
    Keypair,
    SystemProgram,
    Transaction,
} = require("@solana/web3.js");
const { 
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    TOKEN_PROGRAM_ID,
} = require("@solana/spl-token");
const { connection, utils } = require('./utils');
const config = require('../config/config');

async function createToken(initialSupply = 1000000000) {
    try {
        const wallet = utils.loadOrCreateWallet();
        await utils.checkAndAirdropSol(wallet);
        
        console.log('Creating token mint...');
        const mint = await createMint(
            connection,
            wallet,
            wallet.publicKey,
            wallet.publicKey,
            config.TOKEN_METADATA.decimals
        );
        console.log('Token mint created:', mint.toString());

        console.log('Creating token account...');
        const tokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            wallet,
            mint,
            wallet.publicKey
        );

        console.log('Minting tokens...');
        const mintTx = await mintTo(
            connection,
            wallet,
            mint,
            tokenAccount.address,
            wallet,
            utils.calculateAmount(initialSupply)
        );

        const tokenInfo = {
            tokenMint: mint.toString(),
            tokenAccount: tokenAccount.address.toString(),
            mintAuthority: wallet.publicKey.toString(),
            decimals: config.TOKEN_METADATA.decimals,
            mintSignature: mintTx
        };

        utils.saveTokenInfo(tokenInfo);
        
        return tokenInfo;
    } catch (error) {
        console.error('Error creating token:', error);
        throw error;
    }
}

module.exports = { createToken };