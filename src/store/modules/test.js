import * as types from "../mutation-type"
import {OP_TYPE, PROJECT_LANGAUGE} from '../../helpers/consts'
import URL_API from "../../../config/prod.env";
import axios from "axios/index";
let Ont = require('ontology-ts-sdk');

export default {
  state: {
    testAccountInfo: {
      info: []
    },
    testFunctions: {
      functionName: [''],
      params: [''],
      accountAddress:[''],
      Exec:[1],
      preExec: [0],
    },
    testFunctionNum:{
      info:[0]
    },
    testFunctionJson:{
      info:''
    }
  },
  mutations: {
    [types.SET_TEST_ACCOUNT](state, payload) {
      state.testAccountInfo.info = payload.info
    },
    [types.SET_TEST_FUNCTION_JSON](state, payload) {
      state.testFunctionJson.info = payload.info
    },
  },
  actions: {
    addAccount({dispatch, commit},$payload) {

      let crypto = Ont.Crypto
      let accountPrivateKey = new crypto.PrivateKey($payload.privateKey)
      let accountPublicKey = accountPrivateKey.getPublicKey()
      let accountAddress = Ont.Crypto.Address.fromPubKey(accountPublicKey).toBase58()

      let account = {
        address:accountAddress,
        privateKey:accountPrivateKey.key
      }
      let testAccounts = $payload.testAccount
      testAccounts.push(account)

      commit({
        type: types.SET_TEST_ACCOUNT,
        info:testAccounts
      })

    },
    spliceAccount({dispatch, commit},$payload) {
      let accountId = $payload.accountId
      let testAccount = $payload.testAccount

      testAccount.splice(accountId,1)
      commit({
        type: types.SET_TEST_ACCOUNT,
        info:testAccount
      })

    },
    setTestJson({dispatch, commit},$payload) {

      commit({
        type: types.SET_TEST_FUNCTION_JSON,
        info:$payload
      })
    }

  }
}
