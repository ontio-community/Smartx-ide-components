let Ont = require('ontology-ts-sdk');
let Crypto = Ont.Crypto
import {DEFAULT_SCRYPT} from '../../helpers/consts'
import FileHelper from './../../common/ont-wallet/file-generate-and-get'
export default {
  decryptWalletFile($walletFile, $password) {
    const wallet = $walletFile
    const account = wallet.accounts[0]
    const enc = new Crypto.PrivateKey(account.key);
    const address = new Crypto.Address(account.address)

    try {
      enc.decrypt($password, address, account.salt, DEFAULT_SCRYPT)
      return account
    } catch (err) {
      console.log(err)
      return null;
    }
  },

  getAccountPrivateKey($account,$password){
    const enc = new Crypto.PrivateKey($account.key);
    const address = new Crypto.Address($account.address)

    try {
      let privateKey = enc.decrypt($password, address, $account.salt, DEFAULT_SCRYPT)
      return privateKey
    } catch (err) {
      console.log(err)
      return false;
    }
  },

  createJsonWalletWithPrivateKey(body) {
    let wallet = Ont.Wallet.create(body.label || "")
    wallet.scrypt.n = 16384;

    console.log(wallet)
    let params = {
      cost: 16384,
      blockSize: 8,
      parallel: 8,
      size: 64
    };

    let account = Ont.Account.create(body.privateKey, body.password, body.label, params)
    console.log(account)
    account.isDefault = true;

    // 生成下载钱包的内容
    wallet.addAccount(account);
    account = account.toJsonObj();
    FileHelper.downloadFile(wallet.toJsonObj(),'wallet.dat')
    return account
  }
}
