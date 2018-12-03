<template>
  <div class="pro-operation-page">
    <div class="row">
      <div class="col pro-operation-btn-left">
        <button class="btn btn-outline-dark pro-operation-button" @click="getConfigPage" :class="[showConfig? 'pro-operation-button-click' : '']" data-toggle="tooltip" data-placement="bottom" :title="$t('projectOperation.configTooltips')">{{$t('projectOperation.config')}}</button>
      </div>
      <div class="col pro-operation-btn-center">
        <button class="btn btn-outline-dark pro-operation-button" @click="getCompilePage" :class="[showCompile ? 'pro-operation-button-click' : '']" data-toggle="tooltip" data-placement="bottom" :title="$t('projectOperation.compileTooltips')">{{$t('projectOperation.compile')}}</button>
      </div>
      <div class="col pro-operation-btn-center">
        <button class="btn btn-outline-dark pro-operation-button" @click="getDeployPage" :class="[showDeploy ? 'pro-operation-button-click' : '']" data-toggle="tooltip" data-placement="bottom" :title="$t('projectOperation.deployTooltips')">{{$t('projectOperation.deploy')}}</button>
      </div>
      <div class="col pro-operation-btn-center">
        <button class="btn btn-outline-dark pro-operation-button" @click="getRunPage" :class="[showRun ? 'pro-operation-button-click' : '']" data-toggle="tooltip" data-placement="bottom" :title="$t('projectOperation.runTooltips')">{{$t('projectOperation.run')}}</button>
      </div>
      <div class="col pro-operation-btn-center">
        <button class="btn btn-outline-dark pro-operation-button" @click="getToolPage" :class="[showTool ? 'pro-operation-button-click' : '']" data-toggle="tooltip" data-placement="bottom" >{{$t('projectOperation.tool')}}</button>
      </div>
      <div class="col pro-operation-btn-center">
        <button class="btn btn-outline-dark pro-operation-button" @click="getRestfulPage" :class="[showRestful ? 'pro-operation-button-click' : '']" data-toggle="tooltip" data-placement="bottom" >{{$t('projectOperation.restful')}}</button>
      </div>
      <div class="col pro-operation-btn-right">
        <button class="btn btn-outline-dark pro-operation-button" @click="getTestPage" :class="[showTest ? 'pro-operation-button-click' : '']" data-toggle="tooltip" data-placement="bottom" >{{$t('projectOperation.test')}}</button>        
      </div>
    </div>
    <div class="pro-operation-border">
      <div v-show="showConfig" class="pro-operation-height">
        <config :isRecompile='isShowPreDeployAndPreRun'></config>
      </div>
      <div v-show="showCompile" class="pro-operation-height">
        <compile :isRecompile='isShowPreDeployAndPreRun'></compile>
      </div>
      <div v-show="showDeploy" class="pro-operation-height">
        <deploy :isShowPreDeployAndPreRun='isShowPreDeployAndPreRun'></deploy>
      </div>
      <div v-show="showRun" class="pro-operation-height">
        <run  :isShowPreDeployAndPreRun='isShowPreDeployAndPreRun'></run>
      </div>
      <div v-show="showTool" class="pro-operation-height">
        <tool  :isShowPreDeployAndPreRun='isShowPreDeployAndPreRun'></tool>
      </div>
      <div v-show="showTest" class="pro-operation-height">
        <Test  :isShowPreDeployAndPreRun='isShowPreDeployAndPreRun'></Test>
      </div>
      <div v-show="showRestful" class="pro-operation-height">
        <Restful  :isShowPreDeployAndPreRun='isShowPreDeployAndPreRun'></Restful>
      </div>
    </div>
  </div>
</template>

<script>
  import Compile from './Compile'
  import Config from './Config'
  import Deploy from './Deploy'
  import Run from './Run'
  import Tool from './Tool'
  import Test from './Test'
  import Restful from './Restful'
  import {mapState} from 'vuex'

  export default {
    props: ['useChineseLanguage','isShowPreDeployAndPreRun'],
    name: "project-operation",
    data() {
      return {
        showConfig: true,
        showCompile: false,
        showDeploy: false,
        showRun: false,
        showTool: false,
        showTest:false,
        showRestful:false,
        isUseChineseLang: this.$i18n.locale === 'zh' ? true : false,
      }
    },
    components: {
      Config,
      Compile,
      Deploy,
      Run,
      Tool,
      Test,
      Restful
    },
    watch: {
      '$route': 'getPage',
      'useChineseLanguage':function (val,oldval) {
        this.isUseChineseLang = val
      }
    },
    created() {
      this.getPage();
    },
    computed: {
      /*
        projectInfo:{
          info:{
            abi:'',
            code:'',
            contract_hash:'',
            created_at:'',
            id:'',
            info_author:'',
            info_desc:'',
            info_email:'',
            info_name:'',
            info_version:'',
            language:'',
            name:'',
            nvm_byte_code:'',
            type:'',
            updated_at:'',
            user_id:'',
            wat:''
        }，
        projectName:{
          info:{
            id:'',
            language:'',
            projectName:'',
          }
        }
       */
      ...mapState({
        projectInfo: state => state.ProjectInfoPage.ProjectInfo,
        projectName: state => state.ProjectInfoPage.ProjectName,
      })
    },
    methods: {
      showConfigPage(){
        this.showConfig = true
        this.showCompile = false
        this.showDeploy = false
        this.showRun = false
        this.showTool = false
        this.showTest = false
        this.showRestful = false
      },
      showCompilePage(){
        this.showConfig = false        
        this.showCompile = true
        this.showDeploy = false
        this.showRun = false
        this.showTool = false
        this.showTest = false
        this.showRestful = false
      },
      showDeployPage(){
        this.showConfig = false 
        this.showCompile = false
        this.showDeploy = true
        this.showRun = false
        this.showTool = false
        this.showTest = false
        this.showRestful = false
      },
      showRunPage(){
        this.showConfig = false 
        this.showCompile = false
        this.showDeploy = false
        this.showRun = true
        this.showTool = false
        this.showTest = false
        this.showRestful = false
      },
      showToolPage(){
        this.showConfig = false 
        this.showCompile = false
        this.showDeploy = false
        this.showRun = false
        this.showTool = true
        this.showTest = false
        this.showRestful = false
      },
      showTestPage(){
        this.showConfig = false 
        this.showCompile = false
        this.showDeploy = false
        this.showRun = false
        this.showTool = false
        this.showTest = true
        this.showRestful = false
      },
      showRestfulPage(){
        this.showConfig = false 
        this.showCompile = false
        this.showDeploy = false
        this.showRun = false
        this.showTool = false
        this.showTest = false
        this.showRestful = true
      },
      getConfigPage(){
        this.$router.push({ name:'IDE-Config',params:{projectName:this.projectName.info.projectName}})
      },
      getCompilePage(){
        this.$router.push({ name:'IDE-Compile',params:{projectName:this.projectName.info.projectName}})
      },
      getDeployPage(){
        this.$router.push({ name:'IDE-Deploy',params:{projectName:this.projectName.info.projectName}})
      },
      getRunPage(){
        this.$router.push({ name:'IDE-Run',params:{projectName:this.projectName.info.projectName}})
      },
      getToolPage(){
        this.$router.push({ name:'IDE-Tool',params:{projectName:this.projectName.info.projectName}})
      },
      getTestPage(){
        this.$router.push({ name:'IDE-Test',params:{projectName:this.projectName.info.projectName}})
      },
      getRestfulPage(){
        this.$router.push({ name:'IDE-Restful',params:{projectName:this.projectName.info.projectName}})
      },
      getPage(){
        if(this.$route.name === 'IDE-Config'){
          this.showConfigPage()
        } else if(this.$route.name === 'IDE-Compile'){
          this.showCompilePage()
        }else if(this.$route.name === 'IDE-Deploy'){
          this.showDeployPage()
        }else if(this.$route.name === 'IDE-Run'){
          this.showRunPage()
        }else if(this.$route.name === 'IDE-Tool'){
          this.showToolPage()
        }else if(this.$route.name === 'IDE-Test'){
          this.showTestPage()
        }else if(this.$route.name === 'IDE-Restful'){
          this.showRestfulPage()
        }
      },
    }
  }
</script>

<style scoped>
  .pro-operation-page{
    height: 100%;
  }
  .pro-operation-border{
    border:1px solid #C4C3C3;
    background-color: #ECF0F1;
    width: 100%;
    height: 100%;
    margin-top: -26px;
    padding-top: 26px;
  }
  .pro-operation-button {
    border-radius: 0;
    min-width: 100%;
    height: 26px;
    color: black;
    border-color: #C4C3C3;
    text-align: center;
    padding: 4px;
    font-size: 10px;
  }
  .pro-operation-button:hover,
  .pro-operation-button:active {
    background-color: #ECF0F1;
    color: black;
  }
  .pro-operation-button:focus{
    box-shadow:none !important;
    outline: none !important;
  }
  .pro-operation-button-click{
    background-color: #D2D2D2;
  }
  .pro-operation-btn-left{
    padding-right: 0px;
  }
  .pro-operation-btn-center{
    padding-left: 0px;
    padding-right: 0px;
  }
  .pro-operation-btn-right{
    padding-left: 0px;
  }
  .pro-operation-height{
    height: 100%;
  }
</style>
