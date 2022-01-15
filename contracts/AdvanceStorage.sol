//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract AdvanceStorage {
    address public owner;
    address[] public ownerAddress;
    uint256[] public numbers;

    constructor() {
        owner = msg.sender;
        ownerAddress.push(msg.sender);
    }

    modifier onlyOwner() {
        require((owner == msg.sender) || (ownerAddress[0] == msg.sender));
        _;
    }

    function getCurrentOwner() public view returns (address) {
        return owner;
    }

    function changeOwner(address newAddress)
        public
        onlyOwner
        returns (bool, address)
    {
        owner = newAddress;
        ownerAddress.push(newAddress);
        return (true, newAddress);
    }

    function getOwners() public view returns (address[] memory) {
        return ownerAddress;
    }
}
