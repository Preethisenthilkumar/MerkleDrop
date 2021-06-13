// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20.sol";
import "./MerkleProof.sol";

contract MerkleDrop is ERC20 {
    bytes32 immutable public root;
    mapping (address => bool) public withdrawn;
    
    event redeemed(address account, uint256 amount);

    constructor()
    
    {
        root = 0xfae9f7f550da16e796005dbddbae3d8d7b504f8e03ff4744a206c41476ff84e9;
    }

    
     function redeem(address account, uint256 amount, bytes32[] calldata proof)
    external
    {
        require(_verify(_leaf(account, amount), proof), "Invalid merkle proof");
        require(! withdrawn[account], "You have already withdrawn your entitled tokens.");
        withdrawn[account] = true;
        _mint(account, amount);
        
        emit redeemed(account, amount);
    }
    
    function verifyAccount(address account, uint256 amount, bytes32[] calldata proof)
    external view returns(bool)
    {
            return (_verify(_leaf(account, amount), proof));
    }

    function _leaf(address account, uint256 amount)
    internal pure returns (bytes32)
    {
        return keccak256(abi.encodePacked(amount, account));
    }

    function _verify(bytes32 leaf, bytes32[] memory proof)
    internal view returns (bool)
    {
        return MerkleProof.verify(proof, root, leaf);
    }
    
    
    
    
}
