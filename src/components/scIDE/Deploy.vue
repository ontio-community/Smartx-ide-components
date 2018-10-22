<template>
  <div class="deploy-page">

    <div class="deploy-card card-fee" >
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="card-header" data-toggle="tooltip" data-placement="bottom" :title="$t('deploy.infoTooltips')">{{$t('deploy.info')}}</div>
        <div class="deploy-card-scroll">
          <div class="card-body">
            <label class="card-text deploy-info-card-text">{{ $t('deploy.name') }}</label>
            <input class="deploy-input" v-model="deployContractInfo.name">
          </div>
          <div class="card-body">
            <label class="card-text deploy-info-card-text">{{ $t('deploy.version') }}</label>
            <input class="deploy-input" v-model="deployContractInfo.version">
          </div>
          <div class="card-body">
            <label class="card-text deploy-info-card-text">{{ $t('deploy.author') }}</label>
            <input class="deploy-input" v-model="deployContractInfo.author">
          </div>
          <div class="card-body">
            <label class="card-text deploy-info-card-text">{{ $t('deploy.email') }}</label>
            <input class="deploy-input" v-model="deployContractInfo.email">
          </div>
          <div class="card-body">
            <label class="card-text deploy-info-card-text card-last-body">{{ $t('deploy.desc') }}</label>
            <input class="deploy-input" v-model="deployContractInfo.desc">
          </div>
        </div>
      </div>
    </div>

    <div class="deploy-card card-result" >
      <div class="card border-secondary mb-3" style="gitmax-width: 20rem;">
        <div class="card-header" data-toggle="tooltip" data-placement="bottom" :title="$t('deploy.resultTooltips')">{{$t('deploy.result')}}</div>
        <div class="deploy-card-scroll">
          <div class="card-body deploy-card-scroll" v-if="deployInfo.info.result" >
            <p class="card-text-center card-text">{{deployInfo.info.result}}</p>
            <br/>
            <br/>
          </div>
          <div class="card-body" v-else>
            <p class="card-text card-text-center">{{this.deployStatus ? $t('deploy.deployed') : $t('deploy.noData')}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="deploy-card">
      <button class="btn btn-outline-success deploy-btn-submit" v-bind:disabled="waitingStatus" @click="doDeploy">{{waitingStatus ? $t('deploy.waiting') : $t('deploy.deploy')}}</button>
    </div>

    <!-- Error Modal -->
    <div class="modal fade devlop-modal" id="DeployError" tabindex="-1" role="dialog" >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="">{{$t('deploy.errorTitle')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <label class="error-modal-body-text">{{ErrorInfo}}</label>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary deploy-dialog-btn-close" data-dismiss="modal">{{$t('deploy.close')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import zh from './../../common/lang/zh'
  import en from './../../common/lang/en'
  import LangStorage from './../../helpers/lang'
  let Ont = require('ontology-ts-sdk');

  export default {
    name: "deploy",
    data() {
      return {
        waitingStatus: false,
        deployStatus : false,
        ErrorInfo: '',
      }
    },
    created(){
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
        deployContractInfo:{
          author:'',
          desc:'',
          email:'',
          name:'',
          version:'',
        }
        deployInfo:{
          info:{
            result:{
              Action:'',
              Desc:'',
              Error:'',
              Result:{
                GasConsumed:'',
                Notify:[{
                  ContractAddress:'',
                  States:[{
                    0:'',//Transfer type
                    1:'',//From,
                    2:'',//To
                    3:'',//GasConsumed
                  }]
                }]
                State:'',
                TxHash:''
              },
              Version:''
            }
          }
        }
        compileInfo:{
          abi{
            function:[{
              name:'',
              parameters:[{
                name:'',
                type:''
              }]
              returntype:''
            }],
            avm:'',
            contractHash:'',
            errdetail:'',
            haveReCompile:'',
            showCompileInfo: '',
          }
        }
       */
      ...mapState({
        projectInfo: state => state.ProjectInfoPage.ProjectInfo,
        projectName: state => state.ProjectInfoPage.ProjectName,
        deployContractInfo: state => state.DeployPage.DeployContractInfo,
        deployInfo: state => state.DeployPage.DeployInfo,
        compileInfo : state => state.CompilePage.CompileInfo
      })
    },
    mounted(){
    },
    watch: {
    },
    methods:{
      showRun(){
        this.$router.push({ name:'IDE-Run',params:{projectName:this.projectName.info.projectName}})
      },
      getContractHash(vmType){
        //will export a method in sdk
        let contractAddr = Ont.Crypto.Address.fromVmCode(this.compileInfo.avm);
        const hash = contractAddr.serialize();
        const codeHash = contractAddr.toHexString();
        // let contractHash = Ont.utils.num2hexstring(vmType) + hash.substr(2)
        this.$store.dispatch('setContractHash', codeHash)
        return codeHash
      },
     doDeploy(){
        if(!this.deployContractInfo.name || !this.deployContractInfo.version || !this.deployContractInfo.author ||
        !this.deployContractInfo.email || !this.deployContractInfo.desc) {
          //Need to be required for now.Will remove it when update on ontology-dapi
          this.ErrorInfo = (LangStorage.getLang('zh') === "zh") ? zh.deploy.emptyInfo : en.deploy.emptyInfo
          $('#DeployError').modal('show')
          this.waitingStatus = false
          return;
        }
        this.waitingStatus = true
        if(!this.compileInfo.avm) {
          this.ErrorInfo = (LangStorage.getLang('zh') === "zh") ? zh.deploy.errorCompile : en.deploy.errorCompile
          $('#DeployError').modal('show')
          this.waitingStatus = false
          return
        }

        //build deploycode tx
        const needStorage = true
        let avmCode = this.compileInfo.avm
        const name = this.deployContractInfo.name || ''
        const version = this.deployContractInfo.version || ''
        const author = this.deployContractInfo.author || ''
        const email = this.deployContractInfo.email || ''
        const desc = this.deployContractInfo.desc || ''


        let _self = this

        const params = {
          code : avmCode,
          name,
          version,
          author,
          email,
          description:desc,
          needStorage,
          gasPrice: 500,
          gasLimit: 21000000
        }

        this.$store.dispatch('getDapiProvider').then(provider => {
          if(!provider) {
            this.ErrorInfo = (LangStorage.getLang('zh') === "zh") ? zh.ide.noProvider : en.ide.noProvider
            $('#DeployError').modal('show')
            this.deployStatus = false
            this.waitingStatus = false
            return;
          }
          this.$store.dispatch('dapiDeploy', params).then(res => {
            //console.log(res)
            if(res === 'NO_ACCOUNT') {
              this.deployStatus = false
              this.waitingStatus = false
              this.ErrorInfo = (LangStorage.getLang('zh') === "zh") ? zh.ide.noProviderAccount : en.ide.noProviderAccount
              $('#DeployError').modal('show')
              return;
            }
            if(res === 'CANCELED') {
              this.deployStatus = false
              this.waitingStatus = false
              this.ErrorInfo = (LangStorage.getLang('zh') === "zh") ? zh.ide.deployFalseInProvider : en.ide.deployFalseInProvider
              $('#DeployError').modal('show')
              return;
            }
            let contractHash = this.getContractHash()
            this.$store.dispatch('setDeployInfo', res)
            this.deployStatus = true
            this.showRun()
            this.waitingStatus = false

            //save code to server
            let param = {
              id: _self.projectName.info.id,
              contract_hash: contractHash,
              info_name: _self.deployContractInfo.name,
              info_version: _self.deployContractInfo.version,
              info_author: _self.deployContractInfo.author,
              info_email: _self.deployContractInfo.email,
              info_desc: _self.deployContractInfo.desc,
            }
            this.$store.dispatch('saveProject', param)
            //console.log(res)
          })
        })
      },
    }
  }
</script>

<style scoped>
  .deploy-page{
    margin-left: 5px ;
    margin-right: 5px;
    height: 100%;
  }
  .deploy-btn-submit {
    border-radius: 0;
    width: 100%;
    color: white;
    border-color: #36a3bc;
    background-color: #36a3bc;
    font-size: 10px;
    padding: 8px 17.6px;
  }
  .deploy-btn-submit:hover,
  .deploy-btn-submit:active {
    background-color: #36a3bc;
    color: white;
  }
  .deploy-card{
    margin-top: 5px;
  }
  .card{
    max-width: 100% !important;
    height: 100% !important;
    border-radius:0;
  }
  .card-header{
    background-color: white;
    text-align: center;
    color: #36a3bc;
    padding-top: 6px !important;
    padding-bottom: 6px !important;
  }
  .card-body {
    padding-top: 15px !important;
    padding-bottom: 0 !important;
  }
  .card-last-body {
    padding-bottom: 15px !important;
  }
  .card-text{
    margin-bottom: 2px;
  }
  .card-text-center{
    text-align: center;
  }
  .card-fee{
    height: 45%;
  }
  .card-result{
    height: 30%;
    margin-bottom: -26px;
    padding-bottom: 26px;
  }

  .deploy-info-card-text {
    width: 70px;
    text-align: right;
  }

  .deploy-input{
    width: 70%;
    border-radius:0px;
  }
  .border-secondary{
    border-color: #C4C3C3 !important;
  }

  .deploy-dialog-btn-close{
    border-radius:0px;
  }
  .deploy-card-scroll{
    overflow-y:auto;
  }
  .devlop-modal{
    margin-top: 10%;
  }
  .error-modal-body-text{
    font-size: 16px;
  }
</style>
