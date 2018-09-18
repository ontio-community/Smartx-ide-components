import * as types from "../mutation-type"
import axios from 'axios'
import {OP_TYPE, NODE_URL} from '../../helpers/consts'
import { client, Parameter } from 'ontology-dapi';
let Ont = require('ontology-ts-sdk');

export default {
  state: {
    DeployInfo:{
      info: '',
    },
    DeployContractInfo:{
      name: '',
      version: '',
      author: '',
      email: '',
      desc: '',
    }
  },
  mutations: {
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
    }
  },
  actions: {
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
     const {code, name, version, author, email, description, needStorage, gasPrice, gasLimit} = params
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
