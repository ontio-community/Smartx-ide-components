import * as types from "../mutation-type"
import axios from 'axios'
import {OP_TYPE, NODE_URL} from '../../helpers/consts'
import { client, Parameter } from 'ontology-dapi';
let Ont = require('ontology-ts-sdk');

const vmType = Number(sessionStorage.getItem('smartx_vmType')) || 1
export default {
  state: {
    DeployWalletInfo: {
      info: '',
    },
    DeployInfo:{
      info: '',
    },
    DeployContractInfo:{
      name: '',
      version: '',
      author: '',
      email: '',
        desc: '',
      vmType
    }
  },
  mutations: {
    [types.SET_DEPLOY_WALLET_INFO](state, payload) {
      state.DeployWalletInfo.info = payload.info
    },
    [types.SET_DEPLOY_INFO](state, payload) {
      state.DeployInfo.info = payload.info
    },
    [types.SET_DEPLOY_CONTRACT_INFO](state, payload) {
      state.DeployContractInfo = payload.result
    },
    [types.CLEAR_DEPLOY_CONTRACT_INFO](state) {
      state.DeployContractInfo.name = ''
      state.DeployContractInfo.version = ''
      state.DeployContractInfo.author = ''
      state.DeployContractInfo.email = ''
        state.DeployContractInfo.desc = ''
        state.DeployContractInfo.vmType = ''
      },
      UPDATE_CONFIG_VM_TYPE(state, { vmType }) { 
        state.DeployContractInfo.vmType = vmType
      }
  },
  actions: {
    setDeployWallet({dispatch, commit},$payload) {

      let account = $payload.account
      let network = $payload.network

      let wallet ={
        account: account,
        address: account.address,
        ont: '',
        ong: ''
      }

      commit({
        type: types.SET_DEPLOY_WALLET_INFO,
        info: wallet
      })

      let url = network+'/api/v1/balance/'+account.address
      $.ajax({
        type: 'GET',
        url: url,
        dataType: "json",
        success: function (response) {
          //console.log(response)
          let ont = response.Result.ont
          let ong = response.Result.ong/1000000000

          wallet.ont = ont
          wallet.ong = ong
          commit({
            type: types.SET_DEPLOY_WALLET_INFO,
            info: wallet
          })
        },
        error: function (data, textStatus, errorThrown) {
          return data
        },
        complete: function (XMLHttpRequest, textStatus) {
        }
      })
    },
    setDeployInfo({dispatch, commit},$info){
      //TODO:测试数据，等待ts-sdk提供算法
      let deployInfo ={
        result: $info
      }

      commit({
        type: types.SET_DEPLOY_INFO,
        info: deployInfo
      })
    },

    clearDeployContractInfo({dispatch, commit}){
      commit({
        type: types.CLEAR_DEPLOY_CONTRACT_INFO,
      })
    },

   async dapiDeploy({dispatch, commit}, params) {
     const {code, name, version, author, email, description, vmType, gasPrice, gasLimit} = params
     try {
       const account = await client.api.asset.getAccount();
     } catch (err) {
       return 'NO_ACCOUNT';
     }
     try {
       const result = await client.api.smartContract.deploy({
         code,
         name,
         version,
         author,
         email,
         description,
         needStorage,
         gasPrice,
         gasLimit
       });
      //  alert('onScDeploy finished, result:' + JSON.stringify(result));
       console.log('onScDeploy finished, result:' + JSON.stringify(result))
       commit({
         type: types.APPEND_OUTPUT_LOG,
         log: result,
         op: OP_TYPE.Deploy
       })
       return result;
     } catch (e) {
       let log = e;
       if (e === 'OTHER') {
         log = 'Not enough ONG to pay for the deploy fee.'
       } else {
          log = 'Canceled.'
       }
       commit({
         type: types.APPEND_OUTPUT_LOG,
         log: log,
         op: OP_TYPE.Deploy
       })
       console.log('onScDeploy error:', e);
       return 'CANCELED';
     }
    },
    async getDapiProvider({dispatch, commit}) {
      try {
        const result = await client.api.provider.getProvider();
        console.log('onGetProvider: ' + JSON.stringify(result));
        return result;
      } catch (e) {
        console.log('No dAPI provider istalled.');
        return null;
      }
    }
  }
}
