# MerkleDrop

When you air drop your ERC20 token to thousands of accounts,  only a few people out of the set will actually claim your token and you don’t want to spam the
ethereum blockchain or pay the gas cost required to initialise all of those balances.

Merkle proofs are a way to provide proof that a certain value is part of a set of data without the need of exposing the complete set of data. 
More specifically, in the Merkle Drop, a Merkle Proof that a Ethereum address is included within the Merkle Root of the Merkle Drop Smart Contract needs to be 
provided to the Merkle Drop Smart Contract in order for an Eligible Party to Claim its allocated token.

## Implementation

Given a file containing the mapping of addresses to balances, build a Merkle tree using merklejs. Fetch the merkle root and generate proof for each 
set of address and balances for verification. On verification the tokens for the assigned amount will be initialized for users to claim/mint.
This proof is basically a route to the address/balance pair in the merkle tree. 

## Usage

Step 1 - confirming if an Ethereum address is an Eligible Party Ethereum address: If the Ethereum address is an Eligible Party Ethereum address, 
        the Merkle Proof will automatically be generated. If the Ethereum address is not an Eligible Party Ethereum address a corresponding notification 
        will be presented.
        
Step 2 - Submitting the Merkle Proof to the Merkle Drop Smart Contract: you will be able to Claim tokens directly  by using a web3 provider such as Metamask. 
         If a Merkle Proof is successfully generated, the tokens can be claimed.
