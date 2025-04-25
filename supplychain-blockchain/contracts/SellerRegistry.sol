// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./ProductRegistry.sol";

contract SellerRegistry {
    struct Seller {
        string name;
        string brand;
        string code;
        string phone;
        string manager;
        string addr;
        string manufacturerID;
    }

    Seller[] public sellers;
    ProductRegistry public productRegistry;

    constructor(address _productRegistryAddress) {
        productRegistry = ProductRegistry(_productRegistryAddress);
    }

    function registerSeller(
        string memory _name,
        string memory _brand,
        string memory _code,
        string memory _phone,
        string memory _manager,
        string memory _addr,
        string memory _manufacturerID
    ) public {
        require(
            productRegistry.manufacturerExists(_manufacturerID),
            "Manufacturer ID does not exist in ProductRegistry"
        );

        sellers.push(Seller(_name, _brand, _code, _phone, _manager, _addr, _manufacturerID));
    }

    function getSeller(uint index)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(index < sellers.length, "Index out of range");
        Seller memory s = sellers[index];
        return (s.name, s.brand, s.code, s.phone, s.manager, s.addr, s.manufacturerID);
    }

    function getSellerCount() public view returns (uint) {
        return sellers.length;
    }

    function sellerExists(string memory sellerCode) public view returns (bool) {
        for (uint i = 0; i < sellers.length; i++) {
            if (keccak256(bytes(sellers[i].code)) == keccak256(bytes(sellerCode))) {
                return true;
            }
        }
        return false;
    }

    function getSellerByCode(string memory sellerCode)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        for (uint i = 0; i < sellers.length; i++) {
            if (keccak256(bytes(sellers[i].code)) == keccak256(bytes(sellerCode))) {
                Seller memory s = sellers[i];
                return (s.name, s.brand, s.code, s.phone, s.manager, s.addr, s.manufacturerID);
            }
        }
        revert("Seller not found");
    }
}
