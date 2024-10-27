const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LiquidityValueCalculator", function () {
  let liquidityCalculator: any;
  let factory: any;
  let tokenA: any;
  let tokenB: any;
  let pair: any;
  let owner: any;

  beforeEach(async function () {
    // Get signers
    [owner] = await ethers.getSigners();

    // Deploy mock tokens
    const MockToken = await ethers.getContractFactory("MockERC20");
    tokenA = await MockToken.deploy("Token A", "TKNA");
    tokenB = await MockToken.deploy("Token B", "TKNB");

    // Deploy mock factory
    const MockFactory = await ethers.getContractFactory("MockUniswapV2Factory");
    factory = await MockFactory.deploy();

    // Deploy mock pair
    const MockPair = await ethers.getContractFactory("MockUniswapV2Pair");
    pair = await MockPair.deploy();

    // Setup mock factory to return our mock pair
    await factory.setPair(tokenA.address, tokenB.address, pair.address);

    // Deploy LiquidityValueCalculator
    const LiquidityValueCalculator = await ethers.getContractFactory("LiquidityValueCalculator");
    liquidityCalculator = await LiquidityValueCalculator.deploy(factory.address);
  });

  describe("Constructor", function () {
    it("Should set the factory address correctly", async function () {
      expect(await liquidityCalculator.factory()).to.equal(factory.address);
    });
  });

  describe("computeLiquidityShareValue", function () {
    beforeEach(async function () {
      // Setup mock reserves and total supply
      await pair.setReserves(
        ethers.utils.parseEther("100"), // reserve0
        ethers.utils.parseEther("200"), // reserve1
        1234567 // blockTimestampLast (not used in our tests)
      );
      await pair.setTotalSupply(ethers.utils.parseEther("1000"));
    });

    it("Should calculate correct liquidity share values when tokenA < tokenB", async function () {
      // Ensure tokenA has lower address than tokenB
      const [lowerToken, higherToken] = tokenA.address.toLowerCase() < tokenB.address.toLowerCase()
        ? [tokenA, tokenB]
        : [tokenB, tokenA];

      const liquidity = ethers.utils.parseEther("100"); // 10% of total supply
      const [tokenAAmount, tokenBAmount] = await liquidityCalculator.computeLiquidityShareValue(
        liquidity,
        lowerToken.address,
        higherToken.address
      );

      expect(tokenAAmount).to.equal(ethers.utils.parseEther("10")); // 10% of reserve0
      expect(tokenBAmount).to.equal(ethers.utils.parseEther("20")); // 10% of reserve1
    });

    it("Should calculate correct liquidity share values when tokenA > tokenB", async function () {
      // Ensure tokenA has higher address than tokenB
      const [lowerToken, higherToken] = tokenA.address.toLowerCase() > tokenB.address.toLowerCase()
        ? [tokenB, tokenA]
        : [tokenA, tokenB];

      const liquidity = ethers.utils.parseEther("500"); // 50% of total supply
      const [tokenAAmount, tokenBAmount] = await liquidityCalculator.computeLiquidityShareValue(
        liquidity,
        higherToken.address,
        lowerToken.address
      );

      expect(tokenAAmount).to.equal(ethers.utils.parseEther("50")); // 50% of reserve0
      expect(tokenBAmount).to.equal(ethers.utils.parseEther("100")); // 50% of reserve1
    });
  });
});
