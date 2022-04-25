import { expect } from "chai";
import { ethers } from "hardhat";

describe("Tokens", function () {
  it("Should increase the number of projects depending on how many are minted in the constructor", async function () {
    const Token = await ethers.getContractFactory("Tokens");
    const token = await Token.deploy();
    await token.deployed();

    expect(await token.project()).to.equal(5);
  });

  it("Should set the owner correctly", async function () {
    const Token = await ethers.getContractFactory("Tokens");
    const token = await Token.deploy();
    await token.deployed();

    const [owner] = await ethers.getSigners();
    expect(await token.owner()).to.equal(owner.address);
  });

  it("Should mint new tokens correctly", async function () {
    const Token = await ethers.getContractFactory("Tokens");
    const token = await Token.deploy();
    await token.deployed();

    const [owner] = await ethers.getSigners();
    const mintTx = await token.mint(10, 0);
    // wait until the transaction is mined
    await mintTx.wait();
    expect(await token.project()).to.equal(6);
    expect(await token.balanceOf(owner.address, 5)).to.equal(10);
  });
});
