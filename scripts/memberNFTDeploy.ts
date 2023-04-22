import { ethers } from "hardhat";
import fs from "fs";
import "dotenv/config";

const { WALLET_ADDRESS_1, WALLET_ADDRESS_2 } = process.env;

const main = async () => {
  const addr1 = WALLET_ADDRESS_1;

  const tokenURIs = [1, 2, 3, 4].map((value) => {
    return `ipfs://bafybeigyod7ldrnytkzrw45gw2tjksdct6qaxnsc7jdihegpnk2kskpt7a/metadata${value}.json`;
  });

  // デプロイ
  const MemberNFT = await ethers.getContractFactory("MemberNFT");
  const memberNFT = await MemberNFT.deploy();
  await memberNFT.deployed();

  console.log(`Contract deployed: ${memberNFT.address}`);

  // NFT を mint する
  // const mintPromises = tokenURIs.map(
  //   async (tokenURI: string, index: number) => {
  //     console.log(`NFT#${index + 1}, Minting with ${addr1}, ${tokenURI}`);
  //     const tx = await memberNFT.nftMint(addr1, tokenURI);
  //     await tx.wait(); // トランザクションの完了を待つ
  //     console.log(`NFT#${index + 1} minted.`);
  //   }
  // );
  // await Promise.all(mintPromises);
  // API コールするため all ではなく for を使って直列に処理する
  for (const [index, tokenURI] of tokenURIs.entries()) {
    const addr = index % 2 === 0 ? WALLET_ADDRESS_1 : WALLET_ADDRESS_2;
    console.log(`NFT#${index + 1}, Minting to:${addr}, uri:${tokenURI}`);
    const tx = await memberNFT.nftMint(addr, tokenURI);
    await tx.wait(); // トランザクションの完了を待つ
    console.log(`NFT#${index + 1} minted...`);
  }

  fs.writeFileSync("./.env", `MEMBER_NFT_ADDRESS="${memberNFT.address}"\n`, {
    flag: "a",
  });
};

const memberNFTDeploy = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

memberNFTDeploy();
