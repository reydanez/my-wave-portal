// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    // we can track total waves by variable or senders list
    //uint256 totalWaves;
    address[] senders;
    
    constructor() {
        console.log("Wow my first smart contract! Now everybody do the waaaave!");
    }

    function wave() public {
        //totalWaves += 1;
        senders.push(msg.sender);
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", senders.length);
        return senders.length;
    }
}