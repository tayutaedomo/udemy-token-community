require("dotenv").config();

const { TOKEN_BANK_ADDRESS, TOKEN_BANK_NAME, TOKEN_BANK_SYMBOL } = process.env;

module.exports = [TOKEN_BANK_NAME, TOKEN_BANK_SYMBOL, TOKEN_BANK_ADDRESS];
