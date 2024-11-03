const { clusterApiUrl } = require("@solana/web3.js");

module.exports = {
    NETWORK: clusterApiUrl('devnet'),
    COMMITMENT: 'confirmed',
    TOKEN_METADATA: {
        name: "My Custom Token",
        symbol: "MCT",
        description: "A custom token with full functionality",
        image: "YOUR_IMAGE_URL", // Replace with your image URL
        decimals: 9,
    }
};