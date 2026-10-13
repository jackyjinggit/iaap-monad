// SPDX-License-Identifier: Apache-2.0
/**
 * Hardhat deployment script for MonorepAdapter to Monad Testnet.
 *
 * Usage:
 *   PRIVATE_KEY=0x... npx hardhat run scripts/deploy.js --network monadTestnet
 *
 * Outputs:
 *   - Deployed contract address (printed)
 *   - block explorer URL (printed)
 */
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("=".repeat(64));
  console.log("IAAP Monad Adapter — Deployment");
  console.log("=".repeat(64));
  console.log("Network       :", hre.network.name);
  console.log("Deployer      :", deployer.address);
  const bal = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Balance (MON) :", hre.ethers.formatEther(bal));
  console.log("-".repeat(64));

  const MonorepAdapter = await hre.ethers.getContractFactory("MonorepAdapter");
  console.log("Deploying MonorepAdapter ...");
  const adapter = await MonorepAdapter.deploy();
  await adapter.waitForDeployment();

  const address = await adapter.getAddress();
  const txHash = adapter.deploymentTransaction()?.hash ?? "(unknown)";

  console.log("✅ MonorepAdapter deployed");
  console.log("   Contract address    :", address);
  console.log("   Deployment tx hash  :", txHash);

  const explorer = process.env.MONAD_EXPLORER || "https://testnet.monadexplorer.com";
  console.log("   Explorer (contract) :", `${explorer}/address/${address}`);
  console.log("   Explorer (tx)       :", `${explorer}/tx/${txHash}`);

  console.log("-".repeat(64));
  console.log("Next steps:");
  console.log("1. Record this contract address into the front-end (frontend/index.html).");
  console.log("2. Enable GitHub Pages from `gh-pages` branch.");
  console.log("3. Verify submission checklist (docs/submission/05_Submission_Checklist.md).");
  console.log("=".repeat(64));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
