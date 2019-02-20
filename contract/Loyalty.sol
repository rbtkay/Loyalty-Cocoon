pragma solidity ^0.4.17;

contract Loyalty {

    struct Product {
        string name;
        uint value;
        uint id;
        string vendor;
    }

    struct Purchase {
        string buyer;
        string vendor;
        Product product;
    }

    Purchase [] public purchaseList;
    address public manager;
    mapping(uint => Product) productMapping;
    Product [] public productList;

    function createProduct(string name, uint value, uint id, string vendor) public {
        // require(msg.sender == manager);
        Product memory newProduct = Product({
            name: name,
            value: value,
            id: id,
            vendor: vendor
        });

        productMapping[newProduct.id] = newProduct;
        productList.push(newProduct);
    }
}
