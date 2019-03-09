pragma solidity ^0.4.17;

contract Loco {

    uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (address => uint256) public balances;
    address public manager;
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    string public name;
    uint8 public decimals;
    string public symbol;

    function Loco(
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol
    ) public {
        manager = msg.sender;
        name = _tokenName;              // "Loyalty Cocoon"
        decimals = _decimalUnits;       // 0
        symbol = _tokenSymbol;          // "LOCO"
    }

    function transferFrom(address _from, uint256 _value, address _to) public returns (bool success) {
        require(balances[_from] >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        Transfer(_from, _to, _value);
        return true;
    }

    function grantPoints(address _to, uint _value) public returns (bool success) {
        require(msg.sender == manager);
        uint previous = balances[_to];
        balances[_to] += _value;
        if (balances[_to] > previous)
        {
            Transfer(msg.sender, _to, _value);
            return true;
        }
        else
            return false;
    }
}
