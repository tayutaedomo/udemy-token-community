import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

describe("MemberNFT コントラクト", function () {
  const name = "MemberNFT";
  const symbol = "MEM";
  const tokenURI1 = "hoge1";
  const tokenURI2 = "hoge2";

  let MemberNFT: ContractFactory;
  let memberNFT: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    MemberNFT = await ethers.getContractFactory("MemberNFT");
    memberNFT = await MemberNFT.deploy();
    await memberNFT.deployed();
  });

  it("トークンの名前とシンボルがセットされるべき", async function () {
    expect(await memberNFT.name()).to.equal(name);
    expect(await memberNFT.symbol()).to.equal(symbol);
  });

  it("デプロイアドレスが owner にセットされるべき", async function () {
    expect(await memberNFT.owner()).to.equal(owner.address);
  });

  it("owner は NFT 作成できるべき", async function () {
    await memberNFT.nftMint(addr1.address, tokenURI1);
    expect(await memberNFT.ownerOf(1)).to.equal(addr1.address);
  });

  it("NFT 作成のたびに tokenId がインクリメントされるべき", async function () {
    await memberNFT.nftMint(addr1.address, tokenURI1);
    await memberNFT.nftMint(addr1.address, tokenURI2);
    expect(await memberNFT.tokenURI(1)).to.equal(tokenURI1);
    expect(await memberNFT.tokenURI(2)).to.equal(tokenURI2);
  });

  it("owner 以外は NFT 作成に失敗すべき", async function () {
    await expect(
      memberNFT.connect(addr1 as any).nftMint(addr1.address, tokenURI1)
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("NFT 作成後に 'TokenURIChanged' イベントが発行されるべき", async function () {
    await expect(memberNFT.nftMint(addr1.address, tokenURI1))
      .to.emit(memberNFT, "TokenURIChanged")
      .withArgs(addr1.address, 1, tokenURI1);
  });
});
