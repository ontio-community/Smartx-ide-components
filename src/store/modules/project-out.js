import * as types from '../mutation-type'
import {OP_TYPE} from '../../helpers/consts'

function formatLog(log, op){
    let d = (new Date()).toLocaleString()
    let type = ' ' + op + ': '
    const result = d + type + (typeof log === 'object' ? JSON.stringify(log) : log)
    setOutputScroll()
    return result
}
//scroll down for beter display
function setOutputScroll(){
    var p = document.getElementById('pro-output-box')
    let h = p.scrollHeight, w = p.scrollWidth
    p.scrollTo(h + 30, w)
}

export default {
    state : {
        OutputInfo : {
            logs : [],
            events : []
        }
    },
    mutations : {
        [types.APPEND_OUTPUT_EVENT](state, payload) {
            state.OutputInfo.events = state.OutputInfo.events.concat( this.formatLog(payload.event, payload.op) )
        },
        [types.APPEND_OUTPUT_LOG](state, payload) {
            state.OutputInfo.logs = state.OutputInfo.logs.concat(formatLog(payload.log, payload.op))
        },
        [types.CLEAR_OUTPUT_EVENTS](state, payload) {
            state.OutputInfo.events = []
        },
        [types.CLEAR_OUTPUT_LOGS](state, payload) {
            state.OutputInfo.logs = []
        },
    },
  actions: {
    
  }

}
