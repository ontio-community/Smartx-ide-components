<style scoped>

</style>

<template>
    <div>
        <a-modal
            :title="title"
            :visible="visible && modalId === stateModalId"
            @ok="handleOk"
            @cancel="handleCancel"
            :footer="footer"
            >
            <slot></slot>
            
        </a-modal>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: 'CommonModal',
    props:['modalId', 'title', 'footer'],
    computed:{
       ...mapState({
           visible: state => state.CommonModal.visible,
           stateModalId: state => state.CommonModal.modalId
       })
    },
    methods:{
        handleCancel(){
            this.$store.commit('HIDE_COMMON_MODAL', {modalId: this.modalId})
        },
        handleOk() {
            this.$store.commit('HIDE_COMMON_MODAL', {modalId: this.modalId})
            this.$emit('modalOk', this.modalId)
        }
    }
    
}
</script>
