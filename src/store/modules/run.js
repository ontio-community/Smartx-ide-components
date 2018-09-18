import * as types from "../mutation-type"
import axios from 'axios'
import { OP_TYPE, NODE_URL } from "../../helpers/consts";
import { client, ParameterType } from 'ontology-dapi';
let Ont = require('ontology-ts-sdk');


export default {
  state: {
    RunStatus : {
      running : false
    },
    RunInfo: {
      contractHash:'',
    },

  },
  mutations: {
    [types.SET_RUN_STATUS](state, payload) {
      state.RunStatus.running = payload.running
    },
    [types.SET_CONTRACT_HASH](state, payload) {
      state.RunInfo = Object.assign({}, { contractHash: payload.info} )
    },
    [types.CLEAR_CONTRACT_HASH](state) {
      state.RunInfo.contractHash = ''
    },
  },
  actions: {
    setContractHash({dispatch, commit},$contractHash) {
      commit({
        type: types.SET_CONTRACT_HASH,
        info: $contractHash
      })
    },
    clearContractHash({dispatch, commit}){
      commit({
        type: types.CLEAR_CONTRACT_HASH,
      })
    },
    async dapiInvoke({commit}, params) {
      const {contract, method, parameters, gasPrice, gasLimit, requireIdentity} = params
      try {
        const account = await client.api.asset.getAccount();
      } catch (err) {
        console.log(err)
        return 'NO_ACCOUNT';
      }
      try {
        const result = await client.api.smartContract.invoke({
          contract,
          method,
          parameters,
          gasPrice,
          gasLimit,
          requireIdentity
        });
        console.log('onScCall finished, result:' + JSON.stringify(result));
        commit({
          type: types.APPEND_OUTPUT_LOG,
          log: result,
          op: OP_TYPE.Invoke
        })
        return result;
      } catch (e) {
        let log = e;
        console.log('onScCall error:', e);
        if(e === 'OTHER') {
          log = 'Not enough ONG to pay for the transaction fee.'
        }
        commit({
          type: types.APPEND_OUTPUT_LOG,
          log: log,
          op: OP_TYPE.Invoke
        })
        return e;
      }
    },
    async dapiInvokeRead({ commit }, params) {
      const { contract, method, parameters} = params
      try {
        const result = await client.api.smartContract.invokeRead({
          contract,
          method,
          parameters
        });
        console.log('onScCall finished, result:' + JSON.stringify(result));
        commit({
          type: types.APPEND_OUTPUT_LOG,
          log: result,
          op: OP_TYPE.Invoke
        })
        return result;
      } catch (e) {
        let log = e;
        console.log('onScCall error:', e);
        if (e === 'OTHER') {
          log = 'Other errors'
        }
        commit({
          type: types.APPEND_OUTPUT_LOG,
          log: log,
          op: OP_TYPE.Invoke
        })
        return e;
      }
    }
  }
}
