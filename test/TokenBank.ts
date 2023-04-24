import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract, ContractFactory } from "ethers";
import { expect } from "chai";

describe("TokenBank コントラクト", function () {
  const name = "TokenBank";
  const symbol = "TBK";
  const zeroAddress = "0x0000000000000000000000000000000000000000";

  let TokenBank: ContractFactory;
  let tokenBank: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
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

  describe("アドレス間トランザクション", function () {
    this.beforeEach(async function () {
      await tokenBank.transfer(addr1.address, 500);
    });

    it("トークンの移転ができるべき", async function () {
      const startAddr1Balance = await tokenBank.balanceOf(addr1.address);
      const startAddr2Balance = await tokenBank.balanceOf(addr2.address);

      await tokenBank.connect(addr1 as any).transfer(addr2.address, 100);

      const endAddr1Balance = await tokenBank.balanceOf(addr1.address);
      const endAddr2Balance = await tokenBank.balanceOf(addr2.address);

      expect(endAddr1Balance).to.equal(startAddr1Balance.sub(100));
      expect(endAddr2Balance).to.equal(startAddr2Balance.add(100));
    });

    it("ゼロアドレス宛の移転は失敗すべき", async function () {
      await expect(tokenBank.transfer(zeroAddress, 100)).to.be.revertedWith(
        "Zero address cannot be specified for 'to'!"
      );
    });

    it("残高不足の場合は移転に失敗すべき", async function () {
      await expect(
        tokenBank.connect(addr1 as any).transfer(addr2.address, 510)
      ).to.be.revertedWith("Insufficient balance!");
    });

    it("移転後には TokenTransfer イベントが発行されるべき", async function () {
      await expect(tokenBank.connect(addr1 as any).transfer(addr2.address, 100))
        .emit(tokenBank, "TokenTransfer")
        .withArgs(addr1.address, addr2.address, 100);
    });
  });
});
