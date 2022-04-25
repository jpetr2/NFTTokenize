//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Tokens is ERC1155, Ownable {
    uint256 public project = 0;

    constructor() ERC1155("https://tokens.frtn.nl/api/item/{id}.json") {
        mint(3000,0, "");
    }

    function mint(uint amount, uint decimals, bytes memory data) public onlyOwner {
        if(decimals == 0) {
            _mint(msg.sender, project++, amount, data);
        } else {
            _mint(msg.sender, project++, amount**decimals, data);
        }
    }
}