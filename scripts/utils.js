const { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL } = require("@solana/web3.js");
const fs = require('fs');
const config = require('../config/config');

const connection = new Connection(config.NETWORK, config.COMMITMENT);

const utils = {
    loadOrCreateWallet: () => {
        try {
            if (!fs.existsSync('keypair.json')) {
                const wallet = Keypair.generate();
                fs.writeFileSync('keypair.json', JSON.stringify(Array.from(wallet.secretKey)));
                console.log('Created new wallet');
                return wallet;
            }
            const secretKey = new Uint8Array(JSON.parse(fs.readFileSync('keypair.json')));
            return Keypair.fromSecretKey(secretKey);
        } catch (error) {
            console.error('Error loading wallet:', error);
            throw error;
        }
    },

    checkAndAirdropSol: async (wallet, minBalance = 1) => {
        try {
            const balance = await connection.getBalance(wallet.publicKey);
            console.log(`Current balance: ${balance / LAMPORTS_PER_SOL} SOL`);
            
            if (balance < minBalance * LAMPORTS_PER_SOL) {
                console.log('Requesting airdrop...');
                const signature = await connection.requestAirdrop(
                    wallet.publicKey,
                    2 * LAMPORTS_PER_SOL
                );
                await connection.confirmTransaction(signature);
                console.log('Airdrop completed');
            }
        } catch (error) {
            console.error('Error in airdrop:', error);
            throw error;
        }
    },

    saveTokenInfo: (info) => {
        fs.writeFileSync('token-info.json', JSON.stringify(info, null, 2));
        console.log('Token information saved to token-info.json');
    },

    loadTokenInfo: () => {
        if (!fs.existsSync('token-info.json')) {
            throw new Error('token-info.json not found. Please create token first.');
        }
        return JSON.parse(fs.readFileSync('token-info.json'));
    },

    calculateAmount: (amount, decimals = config.TOKEN_METADATA.decimals) => {
        return Math.floor(amount * Math.pow(10, decimals));
    }
};

module.exports = { connection, utils };
