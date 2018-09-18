import * as types from "../mutation-type"

export default {
    state : {
        OntEditor : {}
    },

    mutations : {
        [types.SET_EDITOR](state, payload) {
            state.OntEditor = payload.editor
        }
    }

}
