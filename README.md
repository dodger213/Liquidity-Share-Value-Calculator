# Liquidity-Share-Value-Calculator

A Solidity smart contract for calculating liquidity share values in Uniswap V2 pairs.

## Overview

The LiquidityValueCalculator contract provides functionality to compute the value of liquidity shares in terms of both tokens in a Uniswap V2 pair. This is particularly useful for liquidity providers who want to know the underlying value of their LP tokens.

## Features

- Calculate the exact amount of both tokens represented by LP tokens
- Compatible with any Uniswap V2 pair
- Gas-efficient calculations
- View functions that don't modify state

## Contract Details

### Constructor
- Takes a Uniswap V2 factory address as parameter
- Stores the factory address for pair calculations

### Main Functions

#### computeLiquidityShareValue
```solidity
function computeLiquidityShareValue(
    uint liquidity,
    address tokenA,
    address tokenB
) external view returns (uint tokenAAmount, uint tokenBAmount)
```
- Input: Liquidity amount and addresses of both tokens
- Output: Equivalent amounts of tokenA and tokenB
- Uses current reserves and total supply for accurate calculations

#### pairInfo (Internal)
```solidity
function pairInfo(
    address tokenA,
    address tokenB
) internal view returns (uint reserveA, uint reserveB, uint totalLiquidity)
```
- Retrieves current reserves and total supply from the pair
- Handles token ordering based on addresses
- Returns reserveA, reserveB, and total liquidity

## Dependencies
- Uniswap V2 Core
- Uniswap V2 Periphery
- Solidity ^0.8.27

## License
This project is licensed under the MIT License - see the [MIT](./LICENSE) file for details.
