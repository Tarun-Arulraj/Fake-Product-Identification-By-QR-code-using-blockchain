// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SalesRegistry {
    struct Sale {
        string sellerCode;
        string productSN;
    }

    Sale[] public sales;

    function recordSale(string memory _sellerCode, string memory _productSN) public {
        sales.push(Sale(_sellerCode, _productSN));
    }

    function getSale(uint index) public view returns (string memory, string memory) {
        require(index < sales.length, "Invalid sale index");
        Sale memory s = sales[index];
        return (s.sellerCode, s.productSN);
    }

    function getSalesCount() public view returns (uint) {
        return sales.length;
    }

    // 🔍 Verify if a Sale exists with both sellerCode and productSN
    function saleExists(string memory _sellerCode, string memory _productSN) public view returns (bool) {
        for (uint i = 0; i < sales.length; i++) {
            if (
                keccak256(bytes(sales[i].sellerCode)) == keccak256(bytes(_sellerCode)) &&
                keccak256(bytes(sales[i].productSN)) == keccak256(bytes(_productSN))
            ) {
                return true;
            }
        }
        return false;
    }
}
