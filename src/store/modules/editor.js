import * as types from "../mutation-type"
import {RuntimeStateStore} from 'ontology-ts-debugger'

export default {
    state : {
        OntEditor : {},
        Store : new RuntimeStateStore()
    },

    mutations : {
        [types.SET_EDITOR](state, payload) {
            state.OntEditor = payload.editor
        }
    }

}
