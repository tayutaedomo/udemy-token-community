require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MEMBER_NFT_ADDRESS: process.env.MEMBER_NFT_ADDRESS,
    TOKEN_BANK_ADDRESS: process.env.TOKEN_BANK_ADDRESS,
  },
};

module.exports = nextConfig;
