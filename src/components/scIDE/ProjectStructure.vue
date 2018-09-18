<template>
  <div class="pro-structure-border">
    <div class="pro-structure-page">
      <div >
        <i class="fa pro-structure-fa pro-structure-caret" :class="[isShowProjectFile ? 'fa-caret-down' : 'fa-caret-right']"  @click="showProjectFile"></i>
        <i class="fa fa-folder pro-structure-fa"></i>
        <label class="pro-structure-project-name">{{projectInfo.info.projectName}}</label>
      </div>
      <div class="pro-structure-file" v-show="isShowProjectFile">
        <i class="fa fa-file-text pro-structure-fa"></i>
        <label>{{projectInfo.info.fileName}}</label>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "project-structure",
    data(){
      return{
        projectName: '',
        isShowProjectFile: true
      }
    },
    created () {
      this.getProjectInfo()
    },
    computed: {
      ...mapState({
        projectInfo: state => state.ProjectInfoPage.ProjectInfo,
      })
    },

    methods: {
      showProjectFile(){
        this.isShowProjectFile = !this.isShowProjectFile
      },
      getProjectInfo() {
        let projectInfo = sessionStorage.getItem('ProjectInfo')
        if(projectInfo) {
          this.$store.dispatch('setProjectInfo', JSON.parse(projectInfo))
        }
      }
    }
  }
</script>

<style scoped>
  .pro-structure-border{
    border:1px solid #C4C3C3;
    background-color: #ECF0F1;
    width: 100%;
    height: 100%;
  }
  .pro-structure-page{
    margin: 10px;
  }
  .pro-structure-fa {
  }
  .pro-structure-file{
    margin-left: 36px;
  }
  .pro-structure-project-name{
    font-weight: bold;
  }
  .pro-structure-caret{
    width: 12px;
  }
</style>
