// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract ProductSaleRegistry {
    struct Sale {
        string productSN;
        string consumerCode;
        address seller;
        uint256 timestamp;
    }

    mapping(string => Sale) public sales;

    event ProductSold(string productSN, string consumerCode, address indexed seller, uint256 timestamp);

    function recordSale(string memory _productSN, string memory _consumerCode) public {
        require(bytes(_productSN).length > 0, "Product Serial Number is required");
        require(bytes(_consumerCode).length > 0, "Consumer Code is required");
        require(bytes(sales[_productSN].productSN).length == 0, "Sale for this Serial Number already exists");

        sales[_productSN] = Sale({
            productSN: _productSN,
            consumerCode: _consumerCode,
            seller: msg.sender,
            timestamp: block.timestamp
        });

        emit ProductSold(_productSN, _consumerCode, msg.sender, block.timestamp);
    }

    function getSale(string memory _productSN) public view returns (string memory, string memory, address, uint256) {
        Sale memory s = sales[_productSN];
        return (s.productSN, s.consumerCode, s.seller, s.timestamp);
    }

    function saleExists(string memory _productSN) public view returns (bool) {
        return bytes(sales[_productSN].productSN).length > 0;
    }
}