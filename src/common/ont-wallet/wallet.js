let Ont = require('ontology-ts-sdk');
let Crypto = Ont.Crypto
import {DEFAULT_SCRYPT} from '../../helpers/consts'
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

  }
}
