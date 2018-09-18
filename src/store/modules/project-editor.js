import * as types from "../mutation-type"
import axios from 'axios'
import {OP_TYPE} from '../../helpers/consts'

export default {
  state: {
    WatMemory: {
      info: '',
    },
  },
  mutations: {
    [types.SET_WAT_MEMORY](state, payload) {
      state.WatMemory.info = payload.info
    },
  },
  actions: {
    setWatMemory({dispatch, commit},$payload) {
      console.log($payload)
      commit({
        type: types.SET_WAT_MEMORY,
        info: $payload
      })
    },
  }
}
