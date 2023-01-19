const Web3 = require("web3")
const HDWalletProvider = require("@truffle/hdwallet-provider")

const protocol = "https"
const ip = "api.avax-test.network"

Web3.providers.HttpProvider.prototype.sendAsync =
  Web3.providers.HttpProvider.prototype.send
const provider = new Web3.providers.HttpProvider(
  `${protocol}://${ip}/ext/bc/C/rpc`
)

const privateKeys = [
  "5a8ee599396960956f70643fb2d3b93de9e4264c74884bc117e98e8935e4af43"
]

module.exports = {
  networks: {
    /* development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     }, */
     fuji: {
      provider: () => {
        return new HDWalletProvider({
          privateKeys: privateKeys,
          providerOrUrl: provider,
        })
      },
      chainId: 43113,
        gas: 8000000,           
        gasPrice: 30000000000,
        network_id: "*"
     }
  },
  compilers: {
    solc: {
      version: "0.8.17" // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};
