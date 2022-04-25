import { expect } from "chai";
import { ethers } from "hardhat";

describe("Tokens", function () {
  it("Should increase the number of projects depending on how many are minted in the constructor", async function () {
    const Token = await ethers.getContractFactory("Tokens");
    const token = await Token.deploy();
    await token.deployed();
    const [owner] = await ethers.getSigners();
    expect(await token.project()).to.equal(1);
    expect(await token.balanceOf(owner.address, 0)).to.equal(3000);

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

    const mintTx = await token.mint(10, 0, "0x00");
    // wait until the transaction is mined
    await mintTx.wait();
    const [owner] = await ethers.getSigners();
    expect(await token.project()).to.equal(2);
    expect(await token.balanceOf(owner.address, 1)).to.equal(10);
  });
});
