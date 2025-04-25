// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract ProductRegistry {
    struct Product {
        string manufacturerID;
        string productName;
        string productSN;
        string productBrand;
        uint256 productPrice;
        address manufacturer;
    }

    mapping(string => Product) public products;
    string[] public productList;

    event ProductRegistered(
        string manufacturerID,
        string productName,
        string productSN,
        string productBrand,
        uint256 productPrice,
        address indexed manufacturer
    );

    function registerProduct(
        string memory _manufacturerID,
        string memory _productName,
        string memory _productSN,
        string memory _productBrand,
        uint256 _productPrice
    ) public {
        require(bytes(products[_productSN].productSN).length == 0, "Product with this Serial Number already exists");

        products[_productSN] = Product(
            _manufacturerID,
            _productName,
            _productSN,
            _productBrand,
            _productPrice,
            msg.sender
        );

        productList.push(_productSN);

        emit ProductRegistered(
            _manufacturerID,
            _productName,
            _productSN,
            _productBrand,
            _productPrice,
            msg.sender
        );
    }

    function getProduct(string memory _productSN)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint256,
            address
        )
    {
        Product memory p = products[_productSN];
        return (
            p.manufacturerID,
            p.productName,
            p.productSN,
            p.productBrand,
            p.productPrice,
            p.manufacturer
        );
    }

    function productExists(string memory productSN) public view returns (bool) {
        return bytes(products[productSN].productSN).length > 0;
    }

    function manufacturerExists(string memory _manufacturerID) public view returns (bool) {
        for (uint i = 0; i < productList.length; i++) {
            if (
                keccak256(bytes(products[productList[i]].manufacturerID)) ==
                keccak256(bytes(_manufacturerID))
            ) {
                return true;
            }
        }
        return false;
    }

    function getProductListLength() public view returns (uint) {
        return productList.length;
    }
}
