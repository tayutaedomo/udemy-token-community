import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "dotenv/config";

const {
  SEPOLIA_API_URL,
  MUMBAI_API_URL,
  PRIVATE_KEY,
  // ETHERSCAN_API_KEY,
  POLYGONSCAN_API_KEY,
} = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: SEPOLIA_API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mumbai: {
      url: MUMBAI_API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    // apiKey: ETHERSCAN_API_KEY,
    apiKey: POLYGONSCAN_API_KEY,
  },
};

export default config;
