// WETH (Wrapped Ethereum is ETH in the form of ERC-20 token)

const { getNamedAccounts, ethers } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config.js")

const AMOUNT = ethers.utils.parseEther("0.02")

async function getWeth() {
    const wethTokenAddress = networkConfig[network.config.chainId].wethToken
    //get account
    const { deployer } = await getNamedAccounts()

    // call the "deposit" function on the weth contract
    // abi, contract address
    // 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2

    // get abi from IWeth, contract address from 0xC...c2, and connect to deployer
    const iWeth = await ethers.getContractAt("IWeth", wethTokenAddress, deployer)

    // send eth to get weth token
    const tx = await iWeth.deposit({ value: AMOUNT })
    // wait one block
    await tx.wait(1)
    // call balanceOf on our iWeth erc-20 token
    const wethBalance = await iWeth.balanceOf(deployer)
    console.log(`Got ${wethBalance.toString()} WETH`)
}

module.exports = { getWeth, AMOUNT }
