// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

interface MemberToken {
    function balanceOf(address owner) external view returns (uint256);
}

contract TokenBank {
    MemberToken public memberToken;

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

    constructor(string memory name_, string memory symbol_, address ntfContract_) {
        _name = name_;
        _symbol = symbol_;
        owner = msg.sender;
        _balances[owner] = _totalSupply;
        memberToken = MemberToken(ntfContract_);
    }

    /// @dev NFT メンバーのみ
    modifier onlyMember() {
        require(memberToken.balanceOf(msg.sender) > 0, "not NFT member");
        _;
    }

    /// @dev オーナー以外
    modifier notOwner() {
        require(msg.sender != owner, "Owner cannot execute");
        _;
    }

    /// @dev Token の名前を返す
    function name() public view returns (string memory) {
        return _name;
    }

    /// @dev Token のシンボルを返す
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /// @dev Token の総供給数を返す
    function totalSupply() public pure returns (uint256) {
        return _totalSupply;
    }

    /// @dev 指定アカウントアドレスの Token 残高を返す
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    /// @dev Token を移転する
    function transfer(address to, uint256 amount) public onlyMember {
        if (owner == msg.sender) {
            require(_balances[owner] - _bankTotalDeposit >= amount, "Amounts greater than the total supply cannot be transferred");
        }

        address from = msg.sender;
        _transfer(from, to, amount);
    }

    /// @dev 実際の移転処理
    function _transfer(address from, address to, uint256 amount) internal {
        require(to != address(0), "Zero address cannot be specified for 'to'!");

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "Insufficient balance!");

        _balances[from] = fromBalance - amount;
        _balances[to] += amount;
        emit TokenTransfer(from, to, amount);
    }

    /// @dev TokenBank が預かっている Token の総額を返す
    function bankTotalDeposit() public view returns (uint256) {
        return _bankTotalDeposit;
    }

    /// @dev TokenBank が預かっている指定のアドレスの Token 数を返す
    function bankBalanceOf(address account) public view returns (uint256) {
        return _tokenBankBalances[account];
    }

    /// @dev Token を預ける
    function deposit(uint256 amount) public onlyMember notOwner {
        address from = msg.sender;
        address to = owner;

        _transfer(from, to, amount);
        _tokenBankBalances[from] += amount;
        _bankTotalDeposit += amount;
        emit TokenDeposit(from, amount);
    }

    /// @dev Token を引き出す
    function withdraw(uint256 amount) public onlyMember notOwner {
        address to = msg.sender;
        address from = owner;
        uint256 toTokenBankBalance = _tokenBankBalances[to];

        require(toTokenBankBalance >= amount, "An amount greater than your tokenBank balance!");

        _transfer(from, to, amount);
        _tokenBankBalances[to] -= amount;
        _bankTotalDeposit -= amount;
        emit TokenWithdraw(to, amount);
    }
}
