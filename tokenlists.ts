/**
 * This file creates a list of user tokens and their corresponding balances based on a given address.
 * The tokens to be listed are defined in a configuration file.
 */

import Web3 from "web3";
import { balanceOfABI } from "./balanceABI.js";
import configs from "./config.json";

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://mainnet.infura.io/v3/" + configs.apiKey
  )
);
const tokenContracts = configs.tokens;

// User whose token balances we are going to check
const tokenHolder = "0x075e72a5eDf65F0A5f44699c7654C1a76941Ddc8";

/**
 * Get user token balance.
 * @param contract web3.eth.Contract
 * @returns user balance on the given contract
 */
async function getTokenBalance(contract: any) {
  const result = await contract.methods.balanceOf(tokenHolder).call();
  const formattedResult = web3.utils.fromWei(result, "ether");

  return formattedResult;
}

/**
 * Show all user's token balances as defined in the config file.
 */
async function getAllTokenBalance() {
  for (const tokenContract of tokenContracts) {
    const contract = new web3.eth.Contract(balanceOfABI, tokenContract.address);

    const tokenBalance = await getTokenBalance(contract);
    console.log(tokenContract.tokenId, tokenBalance);
  }
}

getAllTokenBalance();
