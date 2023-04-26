import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import axios from 'axios'
import MemberNFT from '../contracts/MemberNFT.json'
import TokenBank from '../contracts/TokenBank.json'

const { MEMBER_NFT_ADDRESS, TOKEN_BANK_ADDRESS } = process.env;
const memberNFTAddress = MEMBER_NFT_ADDRESS;
const tokenBankAddress = TOKEN_BANK_ADDRESS;

export default function Home() {
  const [account, setAccount] = useState('')
  const [chainId, setChainId] = useState(false)
  const [tokenBalance, setTokenBalance] = useState('')
  const [bankBalance, setBankBalance] = useState('')
  const [bankTotalDeposit, setBankTotalDeposit] = useState('')
  const [nftOwner, setNftOwner] = useState(false)
  const [inputData, setInputData] = useState({ transferAddress: '', transferAmount: '', depositAmount: '', withdrawAmount: '' });
  const [items, setItems] = useState([])
  const mumbaiId = '0x13881'
  const zeroAddress = "0x0000000000000000000000000000000000000000";

  const checkMetaMaskInstalled =async () => {
    const { ethereum } = window as any;
    if (!ethereum) {
      alert('MetaMask をインストールしてください！');
    }
  }
  useEffect(() => {
    checkMetaMaskInstalled();
  }, []);

  return (
    <main className={'flex flex-col items-center bg-slate-100 text-blue-900 min-h-screen'}>
      <h2 className={'text-6xl font-bold my-12 mt-8'}>トークンコミュニティへようこそ！</h2>
      <div className='mt-8 mb-16 hover:rotate-180 hover:scale-105 transition duration-700 ease-in-out'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='160'
          height='160'
          viewBox='0 0 350 350'
        >
          <polygon points="0 0, 175 0, 175 175, 0 175" stroke="black" fill="#0000ff" />
          <polygon points="0 175, 175 175, 175 350, 0 350" stroke="black" fill="#ffc0cb" />
          <polygon points="175 0, 350 0, 350 175, 175 175" stroke="black" fill="#90EE90" />
          <polygon points="175 175, 350 175, 350 350, 175 350" stroke="black" fill="#ffff00" />
        </svg>
      </div>
    </main>
  )
}
