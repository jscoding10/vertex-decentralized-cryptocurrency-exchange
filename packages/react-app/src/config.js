import { Goerli } from "@usedapp/core";

export const ROUTER_ADDRESS = "0xE25650eEdbcb6552eB7cfA6F8fCEe89130ED261E"; // Router address from Cranq

export const DAPP_CONFIG = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: "https://eth-goerli.g.alchemy.com/v2/EmUkyC9TVnMYdKx7VEJ6v-kwCbt7veSI", // Alchemy URL
  },
};