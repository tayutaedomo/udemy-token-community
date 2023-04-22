// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract TokenBank {
    /// @dev Token の名前
    string private _name;

    /// @dev Token のシンボル
    string private _symbol;

    /// @dev Token の総供給数
    uint256 constant _totalSupply = 1000;

    /// @dev TokenBank が預かっている Token の総額
    uint256 private _bankTotalDeposit;

    /// @dev TokenBank のオーナー
    address public owner;

    /// @dev アカウントアドレスごとの Token 残高
    mapping(address => uint256) private _balances;

    /// @dev TokenBank が預かっている Token 残高
    mapping(address => uint256) private _tokenBankBalances;

    /// @dev Token 移転時のイベント
    event TokenTransfer(address indexed from, address indexed to, uint256 amount);

    /// @dev Token 預入時のイベント
    event TokenDeposit(address indexed from, uint256 amount);

    /// @dev Token 引出時のイベント
    event TokenWithdraw(address indexed to, uint256 amount);
}
