// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./interface/ILiquidityValueCalculator.sol";

contract LiquidityValueCalculator is ILiquidityValueCalculator {

  address public factory;
  constructor(address factory_) {
    factory = factory_;
  }

  function pairInfo(address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB, uint totalLiquidity) {

  }

  function computeLiquidityShareValue(uint liquidity, address tokenA, address tokenB) external view returns (uint tokenAAmount, uint tokenBAmount) {}
}
