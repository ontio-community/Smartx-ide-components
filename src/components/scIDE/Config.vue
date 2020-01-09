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

  .deploy-page{
    margin-left: 5px ;
    margin-right: 5px;
    height: 100%;
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

  .card-info{
    height: 35%;
    margin-top: -65px;
    padding-top: 69px;
  }
  .card-fee{
    height: 45%;
  }
  .card-result{
    height: 20%;
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
    padding-bottom: 15px !important;
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

  .card-info{
    height: 35%;
    margin-top: -65px;
    padding-top: 69px;
  }
  .card-fee{
    height: 45%;
  }
  .card-result{
    height: 20%;
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

  .deploy-custom-file-input {
    width: 100%;
    height:36px;
    opacity: 0;
  }
  .deploy-custom-file-label {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 36px;
    padding: .5rem 1.1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-left: 1px solid #BCBEC1;
    margin-bottom: 0px;
  }
  .deploy-custom-file-label::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: block;
    padding: .5rem .75rem;
    color: #495057;
    content: "Browse";
    background-color: #e9ecef;
    border-left: 1px solid #BCBEC1;
    min-width: 55px;
    text-align: center;
  }
  .deploy-custom-zh-text-file-label {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 36px;
    padding: .5rem 1.1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-left: 1px solid #BCBEC1;
    margin-bottom: 0px;
  }
  .deploy-custom-zh-text-file-label::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    display: block;
    padding: .5rem .75rem;
    color: #495057;
    content: "浏览";
    background-color: #e9ecef;
    border-left: 1px solid #BCBEC1;
    min-width: 55px;
    text-align: center;
  }
  .deploy-dialog-btn{
    background-color: #36a3bc;
    border-radius:0px;
  }
  .deploy-err-message {
    color: #ff0264 !important;
  }
  .input-group-text{
    border-radius:0px;
  }
  .devlop-custom-file{
    height: 36px;
  }
  .deploy-input-group-append{
    min-width: 55px;
  }
  .deploy-btn-submit-wallet{
    width: 49%;
    display: inline-block;
  }
  .link-applyOng {
      float: right;
      font-size:14px;
  }
  .balance-refresh-icon {
    font-size:16px;
    margin-left:10px;
    cursor: pointer;
  }
  .ide-file-label {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 30px;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    border: 1px solid #BCBEC1;
    padding: 6px 4px 4px 4px;
    font-size: 10px;
  }
  .ide-file-label:hover,
  .ide-file-label:active {
    background-color: #ECF0F1;
    color: black;
  }
  .ide-modal-text{
    font-size: 16px;
  }
  .custom-file{
    width: 100%;
  }
</style>
<template>
    <div class="config-page">

        <div class="deploy-card card-info" >
            <div class="card border-secondary mb-3" style="max-width: 20rem;">
                <div class="card-header">{{$t('config.vmType')}}</div>
                <div class="deploy-card-scroll">
                <div class="card-body">
                    <p class="card-text test-title-text test-card-text-title" style="margin-top: 0px"><strong>{{ $t('config.selectVmType') }}</strong></p>
                    <label class="card-text test-title-text"><input name="vmType" type="radio" :checked="vmType === VM_TYPE.NEOVM " @change="changeVmType(VM_TYPE.NEOVM)"/><strong style="margin-left: 4px">{{ $t('config.NEO_VM') }}</strong></label>
                    <label class="card-text test-title-text" style="margin-left: 8px; margin-bottom:10px;"><input name="vmType" type="radio" :checked="vmType === VM_TYPE.WASMVM"  @change="changeVmType(VM_TYPE.WASMVM)"/><strong style="margin-left: 10px;">{{ $t('config.WASM_VM') }}</strong></label>                    
                    <div class="dropdown-item ide-dropdown-item custom-file" v-if="vmType === VM_TYPE.WASMVM">
                        <input type="file" id="wasmFileInput" @change="onWasmFileChange" class="deploy-custom-file-input"/>
                        <label class="ide-file-label" for="wasmFileInput" ><i class="fa fa-folder-open-o ide-fa"></i>{{wasmFileName}}</label>
                    </div>
                </div>
                </div>
            </div>
        </div>
       
        <div class="deploy-card card-info" >z
            <div class="card border-secondary mb-3" style="max-width: 20rem;">
                <div class="card-header">{{$t('deploy.networkInfo')}}</div>
                <div class="deploy-card-scroll">
                <div class="card-body">
                    <p class="card-text test-title-text test-card-text-title" style="margin-top: 0px"><strong>{{ $t('test.selectNet') }}</strong></p>
                    <label class="card-text test-title-text"><input name="deployNet" type="radio" :checked="network === 'MAIN_NET' " @change="changeNetwork('MAIN_NET')"/><strong style="margin-left: 4px">{{ $t('test.mainNet') }}</strong></label>
                    <label class="card-text test-title-text" style="margin-left: 8px"><input name="deployNet" type="radio" :checked="network === 'TEST_NET' "  @change="changeNetwork('TEST_NET')"/><strong style="margin-left: 4px">{{ $t('test.testNet') }}</strong></label>
                    <label class="card-text test-title-text" style="margin-left: 8px"><input name="deployNet" type="radio" :checked="network === 'PRIVATE_NET' "  @change="changeNetwork('PRIVATE_NET', privateNet)"/><strong style="margin-left: 4px">{{ $t('test.privateNet') }}</strong></label>
                    <input class="test-private-net-input" v-show="network === 'PRIVATE_NET'&& !isHidePrivateNetInput" v-model="privateNet" >
                    <button v-show="network === 'PRIVATE_NET' " @click="changeNetwork('PRIVATE_NET', privateNet)" >ok</button>
                    <a v-show="network === 'PRIVATE_NET' && isHidePrivateNetInput">{{privateNet}}</a>
                </div>
                </div>
            </div>
        </div>
        <div class="deploy-card">
            <button class="btn btn-outline-success deploy-btn-submit deploy-btn-submit-wallet" data-toggle="modal" data-target="#WalletFileInfoInDeploy">{{$t('deploy.selectWallet')}}</button>
            <button class="btn btn-outline-success deploy-btn-submit deploy-btn-submit-wallet" style="float: right" data-toggle="modal" data-target="#GenerateWallet">{{$t('deploy.generateWallet')}}</button>
            </div>
            <div class="deploy-card card-info" >
            <div class="card border-secondary mb-3" style="max-width: 20rem;">
                <div class="card-header">{{$t('deploy.walletInfo')}}</div>
                <div class="deploy-card-scroll">
                
                <div  class="card-body">
                    <span class="card-text"><strong>{{ $t('deploy.address') }}</strong></span>
                    <span class="card-text">{{ wallet.address }}</span>
                    <a-icon type="reload" class="balance-refresh-icon" @click="handleRefresh"/>
                </div>
                <div  class="card-body card-last-body">
                    <span class="card-text"><strong>GAS:</strong></span>
                    <span class="card-text">{{ balance.gas}}</span>

                    <!-- <a  class="link-applyOng"  href="https://developer.ont.io/applyOng" target="_blank">{{$t('config.applyOng')}} <a-icon type="arrow-right" /></a> -->
                </div>
                </div>
            </div>
        </div>

         <!--Wallet Modal -->
    <div class="modal fade devlop-modal" id="WalletFileInfoInDeploy" tabindex="-1" role="dialog" >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{$t('deploy.selectWallet')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form>
          <div class="modal-body">
            <div class="form-group">
              <div class="custom-file devlop-custom-file">
                <input type="file" @change="onFileChange" class="deploy-custom-file-input" id="exampleInputFileInDeploy" aria-describedby="fileHelp"
                       name="file" v-validate data-vv-rules="required" data-vv-scope="unlockWallet">
                <label id="deploy-input-file-label" class="deploy-custom-file-label" for="exampleInputFileInDeploy" >{{FileName}}</label>
              </div>
              <small class="form-text text-muted deploy-err-message" v-show="errors.has('file')">{{ errors.first('file') }}</small>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input :type="[isShowPassword ? 'text' : 'password']"
                       v-model="password"
                       v-validate data-vv-rules="required|min:6" 
                       data-vv-scope="unlockWallet"
                       class="form-control deploy-input" name="password" :placeholder="$t('deploy.enterPw')">
                <div class="input-group-append deploy-input-group-append" @click="viewPassword">
                    <span class="input-group-text">
                      <i class="fa" :class="[isShowPassword ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
                    </span>
                </div>
              </div>
              <small class="form-text text-muted deploy-err-message" v-show="errors.has('password')">{{ errors.first('password') }}</small>
            </div>
          </div>
            </form>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary deploy-dialog-btn-close" data-dismiss="modal">{{$t('deploy.close')}}</button>
            <button type="button" class="btn btn-primary deploy-dialog-btn" v-bind:disabled="waitingUnlockWallet" :data-dismiss="[closeDialog ? 'modal' : '']" @click="unlockWalletFile">{{waitingUnlockWallet ? $t('deploy.waitingUnlock') : $t('deploy.unlock')}}</button>
          </div>
        </div>
      </div>
    </div>

    <!--Enter Wallet Password Modal -->
    <div class="modal fade devlop-modal" id="enterWalletPassword" tabindex="-1" role="dialog" >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" >{{$t('deploy.selectWallet')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <div class="input-group">
                <input :type="[isShowPassword ? 'text' : 'password']"
                       v-model="getWalletPrivateKeyPassowrd"
                       class="form-control deploy-input" name="password" :placeholder="$t('deploy.enterPw')">
                <div class="input-group-append deploy-input-group-append" @click="viewPassword">
                    <span class="input-group-text">
                      <i class="fa" :class="[isShowPassword ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
                    </span>
                </div>
              </div>
              <small class="form-text text-muted deploy-err-message" v-show="errors.has('password')">{{ errors.first('password') }}</small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary deploy-dialog-btn-close" data-dismiss="modal">{{$t('deploy.close')}}</button>
            <button type="button" class="btn btn-primary deploy-dialog-btn" v-bind:disabled="waitingUnlockWallet" :data-dismiss="[closeDialog ? 'modal' : '']" @click="getWalletPrivateKey">{{waitingUnlockWallet ? $t('deploy.waitingUnlock') : $t('deploy.unlock')}}</button>
          </div>
        </div>
      </div>
    </div>

    <!--Generate Wallet -->
    <div class="modal fade devlop-modal" id="GenerateWallet" tabindex="-1" role="dialog" >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" >{{$t('deploy.generateWallet')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <div class="input-group">
                <input :type="[isShowPassword ? 'text' : 'password']"
                       v-model="generateWalletPassword"
                       class="form-control deploy-input" name="password" :placeholder="$t('deploy.enterPw')">
                <div class="input-group-append deploy-input-group-append" @click="viewPassword">
                    <span class="input-group-text">
                      <i class="fa" :class="[isShowPassword ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
                    </span>
                </div>
              </div>
              <small class="form-text text-muted deploy-err-message" v-show="errors.has('password')">{{ errors.first('password') }}</small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary deploy-dialog-btn-close" data-dismiss="modal">{{$t('deploy.close')}}</button>
            <button type="button" class="btn btn-primary deploy-dialog-btn" v-bind:disabled="waitingUnlockWallet" :data-dismiss="[closeDialog ? 'modal' : '']" @click="generateWallet">{{waitingUnlockWallet ? $t('deploy.waitingGenerate') : $t('deploy.generate')}}</button>
          </div>
        </div>
      </div>
    </div>

    <!--Select wasm file Modal -->
    <div class="modal fade devlop-modal" id="selectWasmFileModal" tabindex="-1" role="dialog" >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{$t('config.selectWasmFile')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <div class="custom-file devlop-custom-file">
                <input type="file" @change="onWasmFileChange" class="deploy-custom-file-input" id="wasmFileInput" aria-describedby="fileHelp"
                       name="file" v-validate data-vv-rules="required" data-vv-scope="selectWasmFile">
                <label id="deploy-input-file-label" class="deploy-custom-file-label" for="wasmFileInput" >{{wasmFileName}}</label>
              </div>
              <small class="form-text text-muted deploy-err-message" v-show="errors.has('file')">{{ errors.first('file') }}</small>
            </div>
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary deploy-dialog-btn-close" data-dismiss="modal">{{$t('deploy.close')}}</button>
            <button type="button" class="btn btn-primary deploy-dialog-btn"  :data-dismiss="[closeDialog ? 'modal' : '']" @click="openWasmFile">{{$t('config.confirm')}}</button>
          </div>
        </div>
      </div>
    </div>

    </div>

</template>
<script>
import {mapState} from 'vuex'
const zh = require('./../../common/lang/zh')
import en from './../../common/lang/en'
import LangStorage from './../../helpers/lang'
import Sleep from './../../helpers/sleep'
import FileHelper from './../../common/ont-wallet/file-generate-and-get'
import OWallet from './../../common/ont-wallet/wallet'
import {VM_TYPE} from './../../helpers/consts'

const mixin = {
    data () {
        return {
            VM_TYPE: VM_TYPE
        }
    }
}
let Ont = require('ontology-ts-sdk');
export default {
  name: "Config",
  mixins: [mixin],
  data() {
      return {
          privateNet: '',
          isHidePrivateNetInput: false,
          waitingStatus: false,
        ErrorInfo: '',
        showWalletInfo: false,
        password: '',
        isShowPassword: false,
        FileName: '',
        WalletFile: '',
        wasmFileName: this.$t('config.selectWasmFile'),
        wasmFile: '',
        closeDialog : false,
        waitingUnlockWallet: false,
        privateNet:'http://127.0.0.1',
        getWalletPrivateKeyPassowrd:'',
        generateWalletPassword:'',
      }
  },
  computed: {
      ...mapState({
          network: state => state.Config.network,
          wallet: state => state.Config.wallet,
          balance: state => state.Config.wallet.balance,
          vmType: state => state.Config.vmType,
          editor: state => state.EditorPage.OntEditor,
      })
  },

  mounted() {
      this.$store.dispatch('updateConfigBalance')
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
      changeNetwork(network, url) {
          if(network === 'PRIVATE_NET') {
              if(!url) {
                  alert('Please enter the url of your private net');
                  return;
              }
          }
          this.$store.dispatch('changeNetWork', {network, url})
      },
      changeVmType(vmType) {
          this.$store.dispatch('changeVmType', {vmType})
          this.$store.dispatch('clearCompileInfo')
          this.editor.setValue('')
          this.wasmFileName = this.$t('config.selectWasmFile')
          this.wasmFIle = '';
          if(vmType === this.VM_TYPE.WASMVM) {
              $('#selectWasmFileModal').modal('show')
          }
      },
      handleRefresh(){
        this.$store.dispatch('updateConfigBalance')
      },
      privateNetInputState() {

      },
      viewPassword() {
        this.isShowPassword = !this.isShowPassword
      },
      onFileChange() {
        let files = document.getElementById("exampleInputFileInDeploy").files
        if (!files.length){
          this.FileName = (LangStorage.getLang('zh') === "zh") ? zh.login.chooseFile : en.login.chooseFile
          return
        }
        this.FileName = files[0].name
        this.WalletFile = files[0]
      },
      onWasmFileChange() {
        let files = document.getElementById("wasmFileInput").files
        if (!files.length){
          this.wasmFileName = this.$t('config.selectWasmFile')
          return
        }
        this.wasmFileName = files[0].name
        this.wasmFIle = files[0]
        this.checkFileType(files[0])
      },
      checkFileType($codeFileInfo){
        let fileNameType = this.wasmFileName.substring(this.wasmFileName.length-3,this.wasmFileName.length)
        if(this.wasmFileName.indexOf('wasm') > -1){
          document.getElementById('ide-project-file').style.color = 'black'
          this.readFile($codeFileInfo,this)

        }else{

          this.wasmFileName = 'Please select wasm file'
          document.getElementById('ide-project-file').style.color = 'red'
        }
      },
      readFile($file,_self){
        var reader = new FileReader();
        reader.onload = function() {
            if (_self.wasmFileName.indexOf('wasm') > -1) {
                const vmCode = Ont.utils.ab2hexstring(this.result);
                _self.editor.setValue(vmCode)
                _self.$store.commit('SET_AVM', vmCode);
            } else {
                _self.editor.setValue(this.result)
            }    
            _self.$message.success('Open file succeed!')   
            $('#selectWasmFileModal').modal('hide')    
            
        }
        if(_self.wasmFileName.indexOf('wasm') > -1) {
            reader.readAsArrayBuffer($file);
        } else {
            reader.readAsText($file);
        }
      },
      unlockWalletFile(){
        let _self = this
        this.$validator.validateAll('unlockWallet').then(result => {
          if (result) {
              debugger
            this.waitingUnlockWallet = true
            Sleep.sleep(200).then(() => {
              FileHelper.readWalletFile(this.WalletFile).then((walletFile) => {
                if(walletFile) {
                  let account = OWallet.decryptWalletFile(JSON.parse(walletFile), this.password)
                  if(account ) {
                    _self.getNetworkWalletInfo(account,_self)
                    _self.showWalletInfo = true
                    $("#WalletFileInfoInDeploy").modal("hide");
                  }else{
                    let title = (LangStorage.getLang('zh') === "zh") ? zh.deploy.errorTitle : en.deploy.errorTitle
                    let content = (LangStorage.getLang('zh') === "zh") ? zh.deploy.errowWalletPassword : en.deploy.errowWalletPassword
                    this.showErrorModel(title,content,true)
                    $("#WalletFileInfoInDeploy").modal("hide");
                  }
                }else{
                }
              })
              this.waitingUnlockWallet = false
            })
          }
        }).catch(err => {
            console.log(err)
        })
      },
      openWasmFile() {

      },
      getNetworkWalletInfo($account,_self){
        _self.$store.commit('UPDATE_CONFIG_ADDRESS', {address: $account.address})
        _self.$store.commit('UPDATE_CONFIG_PRIKEY', { privateKey: $account.privateKey.key})
        _self.$store.dispatch('updateConfigBalance')
      },
      showEnterWalletPassword(){
        if(this.deployWalletInfo.info) {
          $("#enterWalletPassword").modal("show");
        }else{
          let title = (LangStorage.getLang('zh') === "zh") ? zh.deploy.errorTitle : en.deploy.errorTitle
          let content = (LangStorage.getLang('zh') === "zh") ? zh.deploy.errorWallet : en.deploy.errorWallet
          this.showErrorModel(title,content,true)
        }
      },
      getWalletPrivateKey(){
        this.waitingUnlockWallet = true
        let account = this.deployWalletInfo.info.account
        let privateKey = OWallet.getAccountPrivateKey(account,this.getWalletPrivateKeyPassowrd)

        if(privateKey){
          this.waitingUnlockWallet = false
          $("#enterWalletPassword").modal("hide");
          this.doDeploy(privateKey)
        }else{
          this.waitingUnlockWallet = false
          let title = (LangStorage.getLang('zh') === "zh") ? zh.deploy.errorTitle : en.deploy.errorTitle
          let content = (LangStorage.getLang('zh') === "zh") ? zh.deploy.errowWalletPassword : en.deploy.errowWalletPassword
          this.showErrorModel(title,content,true)
          $("#enterWalletPassword").modal("hide");
        }

      },
      generateWallet(){
        let privateKey = Ont.Crypto.PrivateKey.random()
        const wif = privateKey.serializeWIF();
        let body = {
          label: this.label,
          privateKey: privateKey,
          password: this.generateWalletPassword,
          wif: wif
        }
        let account = OWallet.createJsonWalletWithPrivateKey(body)
        $("#GenerateWallet").modal("hide");

      },
  }
};
</script>
