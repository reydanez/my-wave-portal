// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

    // events are ways to communicate with a client application or front-end website that something has happened on the blockchain
    event NewWave(address indexed from, uint256 timestamp, string message);

    // a struct is a custom datatype where we can customize what we want to hold inside it
    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // the timestamp when the user waved.
    }
    
    // declare a var waves that lets me store an array of structs
    // This is what lets me hold all the waves anyone ever sends to me
    Wave[] waves;

    constructor() payable {
        console.log("I AM A SMART CONTRACT AND I AM CREATED. HELLO!");
    }

    // requires a string called _message: the message our user sends us from the frontend web ui
    function wave(string memory _message) public {
        totalWaves += 1;
        console.log("%s has waved w/ message %s", msg.sender, _message);

        // store the wave data in the array
        waves.push(Wave(msg.sender, _message, block.timestamp));

        // emit/execute the NewWave event when this wave() function is called
        emit NewWave(msg.sender, block.timestamp, _message);

        // initialize a prizeAmount denominated in ether
        uint256 prizeAmount = 0.0001 ether;
        require (
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );

        // send prizeAmount money to sender
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }

    // this will make it easy to retrieve the waves from our website
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
    
    function getTotalWaves() public view returns (uint256) {
        // Optional: Add this line if you want to see the contract print the value!
        // We'll also print it over in run.js as well.
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}