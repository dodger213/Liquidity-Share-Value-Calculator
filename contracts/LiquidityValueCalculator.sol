// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "./interface/ILiquidityValueCalculator.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";
import "@uniswap/v2-periphery/contracts/libraries/UniswapV2Library.sol";

contract LiquidityValueCalculator is ILiquidityValueCalculator {
    address public factory;
    
    constructor(address factory_) {
        factory = factory_;
    }

    /**
     * @dev Returns the pair info of tokenA and tokenB
     * @param tokenA The amount of liquidity to compute the value of
     * @param tokenB The amount of liquidity to compute the value of
     */
    function pairInfo(
        address tokenA,
        address tokenB
    )
        internal
        view
        returns (uint reserveA, uint reserveB, uint totalLiquidity)
    {
        IUniswapV2Pair pair = IUniswapV2Pair(
            UniswapV2Library.pairFor(factory, tokenA, tokenB)
        );
        (uint reserve0, uint reserve1, ) = pair.getReserves();
        (reserveA, reserveB) = tokenA < tokenB
            ? (reserve0, reserve1)
            : (reserve1, reserve0);
        totalLiquidity = pair.totalSupply();
    }

    /**
     * @dev Computes the value of a liquidity share in terms of tokenA and tokenB
     */
    function computeLiquidityShareValue(
        uint liquidity,
        address tokenA,
        address tokenB
    ) external view returns (uint tokenAAmount, uint tokenBAmount) {
        (uint reserveA, uint reserveB, uint totalLiquidity) = pairInfo(
            tokenA,
            tokenB
        );
        tokenAAmount = (liquidity * reserveA) / totalLiquidity;
        tokenBAmount = (liquidity * reserveB) / totalLiquidity;
    }
}