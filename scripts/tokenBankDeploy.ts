import fs from "fs";
import { ethers } from "hardhat";
import "dotenv/config";

const {
  MEMBER_NFT_ADDRESS,
  WALLET_ADDRESS_1,
  WALLET_ADDRESS_2,
  WALLET_ADDRESS_3,
  WALLET_ADDRESS_4,
} = process.env;

const memberNFTAddress = MEMBER_NFT_ADDRESS;

const main = async () => {
  const addr1 = WALLET_ADDRESS_1;
  const addr2 = WALLET_ADDRESS_2;
  const addr3 = WALLET_ADDRESS_3;
  const addr4 = WALLET_ADDRESS_4;

  // デプロイ
  const TokenBank = await ethers.getContractFactory("TokenBank");
  const tokenBank = await TokenBank.deploy(
    "TokenBank",
    "TBK",
    memberNFTAddress
  );
  await tokenBank.deployed();
  console.log(`Contract deployed to: ${tokenBank.address}`);

  // トークンを移転する
  const tx1 = await tokenBank.transfer(addr2, 300);
  await tx1.wait();
  console.log("Transferred to adder2");

  const tx2 = await tokenBank.transfer(addr3, 200);
  await tx2.wait();
  console.log("Transferred to adder3");

  const tx3 = await tokenBank.transfer(addr4, 100);
  await tx3.wait();
  console.log("Transferred to adder4");

  // Verify で使用する address を書き出す
  const contractData = [
    `TOKEN_BANK_ADDRESS="${tokenBank.address}"`,
    `TOKEN_BANK_NAME="TokenBank"`,
    `TOKEN_BANK_SYMBOL="TBK"`,
  ];
  fs.writeFileSync("./.env", `${contractData.join("\n")}\n`, {
    flag: "a",
  });

  // フロントエンドアプリが読み込む contracts.js は別途手動で生成する
};

const tokenBankDeploy = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

tokenBankDeploy();
