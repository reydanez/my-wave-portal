const { hexStripZeros } = require("ethers/lib/utils")
const { hardhatArguments } = require("hardhat")

const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();

    // compile contract & generate necessary files we need to work with our contract under "artifacts" directory
    // Then, Hardhat will create a local Eth network for just this contract.
    //      after script complets, it'll destry this local network. Like refreshing 
    //      your local server every time so it's easy to debug errors
    // Finallly, once it's deployed, waveContract.address will give us the addr of the deployed contract
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    await waveContract.getTotalWaves();

    const firstWaveTxn = await waveContract.wave();
    await firstWaveTxn.wait();

    await waveContract.getTotalWaves();

    const secondWaveTxn = await waveContract.connect(randomPerson).wave();
    await secondWaveTxn.wait();

    await waveContract.getTotalWaves();
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