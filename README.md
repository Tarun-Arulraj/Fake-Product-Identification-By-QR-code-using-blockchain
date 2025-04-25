# 🔒 Fake Product Identification by QR Code Using Blockchain

This project presents a blockchain-based system for identifying fake products using QR codes. By registering products on a blockchain platform and generating unique QR codes, the system enables consumers to verify product authenticity. Smart contracts automate the verification process, detecting counterfeit products and alerting stakeholders. This decentralized, tamper-proof system promotes transparency, trust, and security in the supply chain.

## 📌 Features

- **Manufacturer Registration**: Register manufacturers with unique identification codes.
- **Product Registration**: Manufacturers can register products, each assigned a unique serial number and QR code.
- **Seller Registration**: Register sellers who can access product inventories.
- **Product Sale Recording**: Record the sale of products from manufacturers to sellers.
- **Inventory Querying**: Sellers can query their inventory to view product details and sale status.
- **QR Code Scanning**: Consumers can scan QR codes to verify product authenticity.

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Blockchain**: Ethereum, Solidity
- **Smart Contracts**:
  - `SellerRegistry.sol`
  - `ProductRegistry.sol`
  - `ProductSaleRegistry.sol`
- **Web3 Integration**: Web3.js
- **QR Code Scanning**: html5-qrcode

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MetaMask](https://metamask.io/) browser extension
- [Ganache](https://trufflesuite.com/ganache/) for local blockchain development

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Tarun-Arulraj/Fake-Product-Identification-By-QR-code-using-blockchain.git
   cd Fake-Product-Identification-By-QR-code-using-blockchain
   
### Install dependencies:

npm install

### Start the development server:

npm start

The application will run at http://localhost:3000.

### Blockchain Setup

Navigate to the blockchain directory:

cd supplychain-blockchain

### Install Truffle globally (if not already installed):

npm install -g truffle

### Compile smart contracts:

truffle compile

### Deploy smart contracts to Ganache:

Ensure Ganache is running.

### In a new terminal, deploy contracts:

truffle migrate

### Connect MetaMask to Ganache:

Open MetaMask.

Add a new network with the following details:

Network Name: Ganache

New RPC URL: http://127.0.0.1:7545

Chain ID: 1337

Import an account from Ganache using its private key.

### 🤝 Contact

For any inquiries or support, please contact:

Email: tarunarulraj23@gmail.com
