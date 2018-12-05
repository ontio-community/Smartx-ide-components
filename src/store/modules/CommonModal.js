const state = {
    visible: false,
    modalId: ''
}

const mutations = {
    SHOW_COMMON_MODAL(state, {modalId}) {
        state.visible = true;
        state.modalId = modalId;
    },
    HIDE_COMMON_MODAL(state, {modalId}) {
        state.visible = false;
        state.modalId = modalId;        
    }
}

const actions = {

}

export default {
    state,
    mutations,
    actions
}
