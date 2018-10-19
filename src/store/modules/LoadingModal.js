import $ from 'jquery'
import * as types from "../mutation-type";

export default {
  state: {
    ModalInfo: {
      title: '',
      content:'',
      isShowCloseButton:true,
    },

  },
  mutations: {
    [types.SET_MODAL_TITLE](state, payload) {
      state.ModalInfo.title = payload.info
    },
    [types.SET_MODAL_CONTENT](state, payload) {
      state.ModalInfo.content = payload.info
    },
    [types.SET_MODAL_SHOW_CLOSE_BUTTON](state, payload) {
      state.ModalInfo.isShowCloseButton = payload.info
    },
  },
  actions: {
    showLoadingModals({dispatch, commit},$payload) {

      commit({
        type: types.SET_MODAL_TITLE,
        info: $payload.title
      })

      commit({
        type: types.SET_MODAL_CONTENT,
        info: $payload.content
      })

      commit({
        type: types.SET_MODAL_SHOW_CLOSE_BUTTON,
        info: $payload.isShowCloseButton
      })

      $("#loadingModal").modal('show')
    },
    hideLoadingModals({dispatch, commit}) {
      // Wait for the animation to end
      //$('#loadingModal').on('shown.bs.modal', function () {
        $("#loadingModal").modal('hide')
      //})
    }
  }
}
