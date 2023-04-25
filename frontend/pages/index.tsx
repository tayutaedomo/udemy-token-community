import { Head } from 'next/document'
import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import MemberNFT from '../contracts/MemberNFT.json'
import TokenBank from '../contracts/TokenBank.json'

const { MEMBER_NFT_ADDRESS, TOKEN_BANK_ADDRESS } = process.env;
const memberNFTAddress = MEMBER_NFT_ADDRESS;
const tokenBankAddress = TOKEN_BANK_ADDRESS;

export default function Home() {
  return (
    <main className={''}>
      aaa
    </main>
  )
}
