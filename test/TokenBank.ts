import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory } from "ethers";
import { expect } from "chai";

describe("TokenBank コントラクト", function () {
  const name = "TokenBank";
  const symbol = "TBK";

  let TokenBank: ContractFactory;
  let tokenBank: Contract;
  let owner: SignerWithAddress;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    TokenBank = await ethers.getContractFactory("TokenBank");
    tokenBank = await TokenBank.deploy(name, symbol);
    await tokenBank.deployed();
  });

  describe("デプロイ", function () {
    it("トークンの名前とシンボルがセットされるべき", async function () {
      expect(await tokenBank.name()).to.equal(name);
      expect(await tokenBank.symbol()).to.equal(symbol);
    });

    it("デプロイアドレスが owner にセットされるべき", async function () {
      expect(await tokenBank.owner()).to.equal(owner.address);
    });

    it("owner に総額が割り当てられるべき", async function () {
      const ownerBalance = await tokenBank.balanceOf(owner.address);
      expect(await tokenBank.totalSupply()).to.equal(ownerBalance);
    });
  });
});
