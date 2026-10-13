// SPDX-License-Identifier: Apache-2.0
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const MONAD_TESTNET_RPC = process.env.MONAD_RPC || "https://testnet-rpc.monad.xyz";
const MONAD_CHAIN_ID = Number(process.env.MONAD_CHAIN_ID || 10143);
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x" + "00".repeat(32); // dummy for compile
const MONAD_EXPLORER = process.env.MONAD_EXPLORER || "https://testnet.monadexplorer.com";

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      viaIR: true
    }
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: { chainId: 31337 },
    monadTestnet: {
      url: MONAD_TESTNET_RPC,
      chainId: MONAD_CHAIN_ID,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
      gasPrice: 153_000_000_000  // 153 gwei (1.5x current Monad Testnet ~102 gwei; fixed 10-13)
    }
  },
  etherscan: {
    apiKey: {
      monadTestnet: "no-api-key-needed"
    },
    customChains: [
      {
        network: "monadTestnet",
        chainId: MONAD_CHAIN_ID,
        urls: {
          apiURL: `${MONAD_EXPLORER}/api`,
          browserURL: MONAD_EXPLORER
        }
      }
    ]
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
