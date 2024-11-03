# Solana Token Project

A complete Solana token management project that allows you to create, manage, and transfer tokens on the Solana blockchain. This project includes functionality for token creation, metadata management, and token transfers.

## Features

- 🪙 Create new SPL tokens with custom supply
- 📝 Add metadata to tokens using Metaplex
- 💸 Transfer tokens between wallets
- 🔄 Automatic wallet creation and SOL airdrop handling
- ⚙️ Configurable token parameters

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Solana CLI (optional, for additional tools)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/RaghavenderSingh/create-token.git
cd solana-token-project
```

2. Install dependencies:

```bash
npm install
```

3. Configure your token:
   Edit `config/config.js` to set your token's parameters:

```javascript
TOKEN_METADATA: {
    name: "My Custom Token",
    symbol: "MCT",
    description: "A custom token with full functionality",
    image: "YOUR_IMAGE_URL",
    decimals: 9,
}
```

## Usage

### Creating a Token

Create a new token with the default supply (1 billion tokens):

```bash
npm run create-token
```

This will:

- Create a new token mint
- Initialize a token account
- Mint the initial supply
- Save token information to `token-info.json`

### Adding Metadata

Add metadata to your token using the Metaplex standard:

```bash
npm run create-metadata
```

This adds:

- Token name
- Symbol
- Description
- Image URL (if configured)

### Transferring Tokens

Transfer tokens to another wallet:

```bash
npm run transfer
```

When prompted, provide:

- Recipient's wallet address
- Amount of tokens to transfer

## Project Structure

```
solana-token-project/
├── scripts/
│   ├── createToken.js     # Token creation logic
│   ├── createMetadata.js  # Metadata creation logic
│   ├── transfer.js        # Token transfer logic
│   └── utils.js           # Shared utilities
├── config/
│   └── config.js          # Project configuration
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Configuration

The project uses `config/config.js` for main configuration:

- `NETWORK`: Solana network endpoint (default: devnet)
- `COMMITMENT`: Transaction commitment level
- `TOKEN_METADATA`: Token-specific configuration

## Important Files

- `token-info.json`: Created after token creation, contains important token addresses
- `keypair.json`: Your wallet keypair (automatically created if not present)

## Security Notes

- Keep your `keypair.json` secret and never commit it to version control
- The project automatically creates a new wallet if none exists
- Always verify transaction details before signing

## Development

To extend or modify the project:

1. Utilities are in `utils.js`
2. Token creation logic is in `createToken.js`
3. Metadata creation is in `createMetadata.js`
4. Transfer functionality is in `transfer.js`

## Error Handling

The project includes comprehensive error handling:

- Wallet creation/loading errors
- Network connection issues
- Transaction failures
- Invalid input validation

## Dependencies

- `@solana/web3.js`: Core Solana web3 functionality
- `@solana/spl-token`: SPL Token program interface
- `@metaplex-foundation/mpl-token-metadata`: Token metadata program

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is MIT licensed.
