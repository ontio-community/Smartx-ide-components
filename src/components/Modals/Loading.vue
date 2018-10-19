<template>
  <div class="modal fade" aria-hidden="true" data-backdrop="static" id="loadingModal">

    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{modalInfo.title}}</h5>
          <button v-show="modalInfo.isShowCloseButton" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <label class="modal-text">{{modalInfo.content}}</label>
        </div>
        <div class="modal-footer">
          <button v-show="modalInfo.isShowCloseButton" type="button" class="btn btn-secondary modal-btn-close" data-dismiss="modal">{{$t('deploy.close')}}</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "loading-modals",
    computed: {
      ...mapState({
        modalInfo: state => state.LoadingModalPage.ModalInfo,
      })
    },

  }
  /**
   * 【 Usage 】
   *
   * Start:
   * let payload = {
            title:title,
            content:content,
            isShowCloseButton:true
          }
   * this.$store.dispatch('showLoadingModals',payload)
   *
   * Automatic end:
   * Routing changes, automatically hidden.
   *
   * End of the manual:
   * this.$store.dispatch('hideLoadingModals')
   */
</script>

<style scoped>
  .modal-dialog {
    -webkit-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    -o-transform: translate(0, -50%);
    transform: translate(0, -50%);
  }

  .modal-dialog {
    position: absolute;
    width: auto;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 25%;
  }
  .modal-text{
    font-size: 16px;
  }
  .modal-btn-close{
    border-radius:0px;
  }
</style>
