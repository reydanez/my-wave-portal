const { hexStripZeros } = require("ethers/lib/utils")
const { hardhatArguments } = require("hardhat")

const main = async () => {
    // compile contract & generate necessary files we need to work with our contract under "artifacts" directory
    // Then, Hardhat will create a local Eth network for just this contract.
    //      after script complets, it'll destry this local network. Like refreshing 
    //      your local server every time so it's easy to debug errors
    // Finallly, once it's deployed, waveContract.address will give us the addr of the deployed contract
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1")
    });
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);

    // Get contract balance
    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log(
        "Contract balance",
        hre.ethers.utils.formatEther(contractBalance)
    );

    // let's try to send two waves
    let waveTxn = await waveContract.wave("This is wave #1");
    await waveTxn.wait(); // wait for the transaction to be mined

    let waveTxn2 = await waveContract.wave("This is wave #2");
    await waveTxn2.wait();

    // get contract balance to see what happened
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0); // exit Node process without error
    } catch (error) {
        console.log(error);
        process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception" error
    }
    // Read more about Node exit ('process.exit(num) status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
