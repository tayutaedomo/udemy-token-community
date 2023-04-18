const { expect } = require("Chai");
const { ethers } = require("hardhat");

describe("MemberNFT コントラクト", function () {
  it("トークンの名前とシンボルがセットされるべき", async function () {
    const name = "MemberNFT";
    const symbol = "MEM";

    const MemberNFT = await ethers.getContractFactory("MemberNFT");
    const memberNFT = await MemberNFT.deploy();
    await memberNFT.deployed();

    expect(await memberNFT.name()).to.equal(name);
    expect(await memberNFT.symbol()).to.equal(symbol);
  });

  it("デプロイアドレスが owner にセットされるべき", async function () {
    const [owner] = await ethers.getSigners();

    const MemberNFT = await ethers.getContractFactory("MemberNFT");
    const memberNFT = await MemberNFT.deploy();
    await memberNFT.deployed();

    expect(await memberNFT.owner()).to.equal(owner.address);
  });
});
