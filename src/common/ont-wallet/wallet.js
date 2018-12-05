let Ont = require('ontology-ts-sdk');
let Crypto = Ont.Crypto
import {DEFAULT_SCRYPT} from '../../helpers/consts'
import FileHelper from './../../common/ont-wallet/file-generate-and-get'

function formatScryptParams(scrypt) {
  return {
    cost: scrypt.n || 16384,
    blockSize: scrypt.r || 8,
    parallel: scrypt.p || 8,
    size: scrypt.dkLen || 64
  }
}
export default {
  decryptWalletFile($walletFile, $password) {
    const wallet = $walletFile
    const account = wallet.accounts[0]
    const enc = new Crypto.PrivateKey(account.key);
    const address = new Crypto.Address(account.address)
    const params = formatScryptParams(wallet.scrypt);
    let pri;
    try {
      pri = enc.decrypt($password, address, account.salt, params)
      account.privateKey = pri;// set private key here, user does not need to enter password later
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
