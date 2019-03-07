pragma solidity ^0.4.17;

contract Loyalty {

    struct Product {
        string name;
        uint value;
        uint id;
        string vendor;
        address vendorAddress;
    }

    struct Purchase {
        address buyerAddress;
        string vendor;
        uint productId;
        bool isFinalized;
    }

    Purchase [] public purchaseList;
    address public manager;
    mapping(uint => Product) public productMapping;
    Product[] public productList;

    function Loyalty() public {
        manager = msg.sender;
    }

    function createProduct(string name, uint value, uint id, string vendor, address vendorAddress) public {
        require(msg.sender == manager);
        Product memory newProduct = Product({
            name: name,
            value: value,
            id: id,
            vendor: vendor,
            vendorAddress: vendorAddress
        });

        productMapping[newProduct.id] = newProduct;
        productList.push(newProduct);
    }

    function purchaseProduct(uint id) public payable {
        require(msg.value > productMapping[id].value);
        productMapping[id].vendorAddress.transfer(msg.value);

        Purchase memory newPurchase = Purchase({
            buyerAddress: msg.sender,
            vendor: productMapping[id].vendor,
            productId: productMapping[id].id,
            isFinalized: false
        });

        purchaseList.push(newPurchase);
    }

    function grantPoints(address customerAddress) public payable{
        customerAddress.transfer(msg.value);
    }

    function finalizePurchase(uint index) public {
        require(!purchaseList[index].isFinalized);
        purchaseList[index].isFinalized = true;
    }
}
