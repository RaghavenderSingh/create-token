const { 
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,  
} = require("@solana/web3.js");
import { 
    createCreateMetadataAccountV3Instruction,
    PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
} from '@metaplex-foundation/mpl-token-metadata';
const { connection, utils } = require('./utils');
const config = require('../config/config');

async function createMetadata() {
    try {
        const tokenInfo = utils.loadTokenInfo();
        const wallet = utils.loadOrCreateWallet();
        const mintPublicKey = new PublicKey(tokenInfo.tokenMint);

        const [metadataAccount] = PublicKey.findProgramAddressSync(
            [
                Buffer.from('metadata'),
                TOKEN_METADATA_PROGRAM_ID.toBuffer(),
                mintPublicKey.toBuffer(),
            ],
            TOKEN_METADATA_PROGRAM_ID
        );

        const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
            {
                metadata: metadataAccount,
                mint: mintPublicKey,
                mintAuthority: wallet.publicKey,
                payer: wallet.publicKey,
                updateAuthority: wallet.publicKey,
            },
            {
                createMetadataAccountArgsV3: {
                    data: {
                        name: config.TOKEN_METADATA.name,
                        symbol: config.TOKEN_METADATA.symbol,
                        uri: config.TOKEN_METADATA.uri,
                        sellerFeeBasisPoints: 0,
                        creators: null,
                        collection: null,
                        uses: null,
                    },
                    isMutable: true,
                    collectionDetails: null,
                },
            }
        );

        const transaction = new Transaction().add(createMetadataInstruction);
        const signature = await sendAndConfirmTransaction(
            connection, 
            transaction, 
            [wallet]
        );
        
        console.log('Metadata created successfully!');
        console.log('Transaction signature:', signature);
        
        return signature;
    } catch (error) {
        console.error('Error creating metadata:', error);
        throw error;
    }
}

module.exports = { createMetadata };