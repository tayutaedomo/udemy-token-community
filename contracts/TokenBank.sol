// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract TokenBank {
    // Token の名前
    string private _name;

    // Token のシンボル
    string private _symbol;

    // Token の総供給数
    uint256 constant _totalSupply = 1000;

    // TokenBank が預かっている Token の総額
    uint256 private _bankTotalDeposit;

    // TokenBank のオーナー
    address public owner;

    // アカウントアドレスごとの Token 残高
    mapping(address => uint256) private _balances;

    // TokenBank が預かっている Token 残高
    mapping(address => uint256) private _tokenBankBalances;
}
