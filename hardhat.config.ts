import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const infuraKey: string = process.env.INFURA_API_KEY as string;
const privateKey: string = process.env.PRIVATE_KEY ? process.env.PRIVATE_KEY as string : "";
const etherscanKey: string = process.env.ETHERSCAN_KEY ? process.env.ETHERSCAN_KEY as string : "";
const basescanKey: string = process.env.BASESCAN_KEY ? process.env.BASESCAN_KEY as string : "";
const bscscanKey: string = process.env.BSCSCAN_KEY ? process.env.BSCSCAN_KEY as string : "";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
      // viaIR: true,
    },
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${infuraKey}`,
      accounts: [`0x${privateKey}`],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${infuraKey}`,
      accounts: [`0x${privateKey}`],
    },
    base_sepolia: {
      url: "https://base-sepolia.blockpi.network/v1/rpc/public",
      accounts: [`0x${privateKey}`],
    },
    base_mainnet: {
      url: "https://mainnet.base.org",
      accounts: [`0x${privateKey}`],
    },
    holesky_testnet: {
      url: "https://ethereum-holesky-rpc.publicnode.com",
      accounts: [`0x${privateKey}`],
    },
    hardhat: {
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: etherscanKey,
      sepolia: etherscanKey,
      basemainnet: basescanKey,
      baseSepolia: basescanKey, // etherscan: ED2NED96C214Y891MR98PZZ1Q45VTFYZRV BSC: 1UME8V5UP4AZHYDF7RWC78GTIXXRPJHTQY Base: 1SZX9N4CQNAX489BHPEW27C2FG5PPP4MB1
      holesky: etherscanKey,
      bscTestnet: bscscanKey
    },
  },
  gasReporter: {
    enabled: true,
  },
  sourcify: {
    enabled: true,
  },
};

export default config;
