const { ethers, JsonRpcProvider } = require("ethers");

const infuraUrl = "https://rpc.mantle.xyz";
const provider = new ethers.providers.JsonRpcProvider(infuraUrl);

const mainWalletPrivateKey = "PRIVATE KEY";
const mainWallet = new ethers.Wallet(mainWalletPrivateKey, provider);

const secondaryWalletAddress = "RECEIVER ADDRESS";

async function sendTransaction() {
  try {
    const transaction = {
      to: secondaryWalletAddress,
      value: ethers.utils.parseEther("0.0001"),
      gasLimit: 21000, // Set the gas limit here (adjust if necessary)
    };

    const tx = await mainWallet.sendTransaction(transaction);
    await tx.wait();

    console.log(`Transaction sent: ${tx.hash}`);
  } catch (error) {
    console.error(`Error sending transaction: ${error}`);
  }
}

async function send1000Transactions() {
  for (let i = 0; i < 70; i++) {
    await sendTransaction();
    if (i < 69) {
      await new Promise(resolve => setTimeout(resolve, 14000));
    }
  }
}

send1000Transactions();
