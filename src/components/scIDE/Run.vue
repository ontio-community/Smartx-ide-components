<template>
  <div class="run-page">
  
    <!--Basic Info-->
    <div class="run-card card-basic-info" >
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="card-header">{{$t('run.basicInfo')}}</div>
        <div class="run-card-scroll">
          <div class="card-body" v-if="runInfo.contractHash">
            <div>
              <p><strong>{{ $t('run.tradingHash') }}</strong></p>
              <p>{{ runInfo.contractHash }}</p>
            </div>
          </div>
          <div class="card-body" v-else>
            <p class="card-text">{{$t('compile.noData')}}</p>
          </div>
        </div>
      </div>
    </div>

    <!--Option-->
   <div class="run-card card-Option">
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="card-header">{{ $t('run.option') }}</div>
        <div class="run-card-scroll">
           <div class="card-body" v-if="compileInfo.abi">
            <p class="card-text"><strong>{{ $t('run.selectFuc') }}</strong></p>
            <select class="form-control run-card-select" v-model="optionId" @change="getParameter(optionId)">
              <option disabled selected >{{$t('run.selectFucOption')}}</option>
              <option v-for="(abiVal,index) in compileInfo.abi.functions" :key="index"
                      :value="abiVal.name"
                      v-if="abiVal.name !== 'Main'">
                {{abiVal.name }}
              </option>
            </select>
            <br/>
            <div >
                <sc-parameter :parameter="parameter" v-for="(parameter,index) of this.parameters" :key="parameter.name"></sc-parameter>
            </div>
          </div>
          <div class="card-body" v-else>
            <p class="card-text">{{$t('compile.noData')}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="run-card run-btns">
      <button class="btn btn-outline-success run-btn-submit" 
              v-bind:disabled="runStatus" @click="debugContract()">{{runStatus&&runDebug ? $t('run.waiting') : $t('run.debugRun')}}</button>
      <button class="btn btn-outline-success run-btn-submit"
              id="preRun" data-toggle="tooltip" data-placement="top" :title="$t('run.preRuntips')"
              v-bind:disabled="runStatus" @click="runContract(true)">{{runStatus&&runPreRun ? $t('run.waiting') : $t('run.preRun')}}</button>
      <button class="btn btn-outline-success run-btn-submit" 
               v-bind:disabled="runStatus" @click="runContract(false)">{{runStatus&&runOnly ? $t('run.waiting') : $t('run.run')}}</button>
    </div>

    <!--Wallet Modal -->
    <div class="modal fade devlop-modal" id="WalletFileInfoInRun" tabindex="-1" role="dialog" >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{$t('deploy.selectWallet')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <div class="custom-file run-custom-file">
                <input type="file" @change="onFileChange" class="run-custom-file-input" id="exampleInputFileInRun" aria-describedby="fileHelp"
                       name="file" v-validate data-vv-rules="required">
                <label id="run-input-file-label" class="run-custom-file-label" for="exampleInputFileInRun" >{{FileName}}</label>
              </div>
              <small class="form-text text-muted run-err-message" v-show="errors.has('file')">{{ errors.first('file') }}</small>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input :type="[isShowPassword ? 'text' : 'password']"
                       v-model="password"
                       v-validate data-vv-rules="required|min:6"
                       class="form-control run-input-in-modal" name="password" :placeholder="$t('deploy.enterPw')">
                <div class="input-group-append run-input-group-append" @click="viewPassword">
                    <span class="input-group-text">
                      <i class="fa" :class="[isShowPassword ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
                    </span>
                </div>
              </div>
              <small class="form-text text-muted run-err-message" v-show="errors.has('password')">{{ errors.first('password') }}</small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary run-dialog-btn-close" data-dismiss="modal">{{$t('deploy.close')}}</button>
            <button type="button" class="btn btn-primary run-dialog-btn" v-bind:disabled="waitingUnlockWallet" :data-dismiss="[closeDialog ? 'modal' : '']" @click="unlockWalletFile">{{waitingUnlockWallet ? $t('deploy.waitingUnlock') : $t('deploy.unlock')}}</button>
          </div>
        </div>
      </div>
    </div>

    <!--Enter Wallet Password Modal -->
    <div class="modal fade devlop-modal" id="enterWalletPasswordInRun" tabindex="-1" role="dialog" >
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
                       class="form-control run-input-in-modal" name="password" :placeholder="$t('deploy.enterPw')">
                <div class="input-group-append run-input-group-append" @click="viewPassword">
                    <span class="input-group-text">
                      <i class="fa" :class="[isShowPassword ? 'fa-eye' : 'fa-eye-slash']" aria-hidden="true"></i>
                    </span>
                </div>
              </div>
              <small class="form-text text-muted run-err-message" v-show="errors.has('password')">{{ errors.first('password') }}</small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary run-dialog-btn-close" data-dismiss="modal">{{$t('deploy.close')}}</button>
            <button type="button" class="btn btn-primary run-dialog-btn" v-bind:disabled="waitingUnlockWallet" :data-dismiss="[closeDialog ? 'modal' : '']" @click="getWalletPrivateKey">{{waitingUnlockWallet ? $t('deploy.waitingUnlock') : $t('deploy.unlock')}}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Modal -->
    <div class="modal fade run-modal" id="RunError" tabindex="-1" role="dialog" >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" >{{$t('run.errorTitle')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label class="error-modal-body-text">{{$t('run.errorTitle')}}</label>
            <p class="error-modal-body-text">{{ErrorInfo}}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary run-dialog-btn-close" data-dismiss="modal">{{$t('run.close')}}</button>
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
  import {PROJECT_LANGAUGE} from '../../helpers/consts'
  import * as types from './../../store/mutation-type'
  import { OP_TYPE } from './../../helpers/consts';
  let Ont = require('ontology-ts-sdk');
  let Debugger = require('ontology-ts-debugger').Debugger;
  import Sleep from './../../helpers/sleep'
  import FileHelper from './../../common/ont-wallet/file-generate-and-get'
  import OWallet from './../../common/ont-wallet/wallet'
  import ScParameter from './ScParameter'
  import * as ParamsHelper from './../../helpers/params'

  function validateRun(self) {
    if(!self.functionName) {
      self.ErrorInfo = (LangStorage.getLang('zh') === "zh") ? zh.run.errorFunction : en.run.errorFunction
      $('#RunError').modal('show')
      self.$store.commit({
        type : types.SET_RUN_STATUS,
        running : false
      })
      return false;
    }
    //validate and format parameters
    const parameters = self.parameters.slice();
    for(let p of parameters) {
      if(p.name && !p.value) {
        alert('Parameter '+ p.name + ' is required.')
        self.$store.commit({
          type : types.SET_RUN_STATUS,
          running : false
        })
        return false;
      }
      if(p.type === 'ByteArray' && p.value.length%2 !== 0) {
        alert('Parameter ' + p.name + ' is not valid hex string.')
        self.runStatus = false;
        return;
      }
      if(p.type === 'Integer') {
        p.value = parseInt(p.value)
      }
    }

    return true;
  }

  export default {
    name: "run",
    data() {
      return {
        optionId: '',
        functionName : '',
        functionParameters : {},
        parameters: [],
        ErrorInfo: '',
        runStatus: false,
        runDebug:false,
        runPreRun:false,
        runOnly:false,
        showWalletInfo: false,
        password: '',
        isShowPassword: false,
        FileName: '',
        WalletFile: '',
        closeDialog : false,
        waitingUnlockWallet: false,
        networkInRun:'1',
        privateNet:'http://127.0.0.1:20334',
        isHidePrivateNetInput:false,
        getWalletPrivateKeyPassowrd:'',
        runContractParam:''
      }
    },
    created(){
    },
    components: {
      ScParameter
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
        runInfo:{
          contractHash:'',
        }
       */
      ...mapState({
        projectInfo: state => state.ProjectInfoPage.ProjectInfo,
        ProjectName: state => state.ProjectInfoPage.ProjectName,
        compileInfo: state => state.CompilePage.CompileInfo,
        // functionParameters: state => state.RunPage.functionParameters,
        runInfo : state => state.RunPage.RunInfo,
        projectEditor: state => state.EditorPage.OntEditor,
        store : state => state.EditorPage.Store,
        runWalletInfo: state => state.RunPage.RunWalletInfo,

        configWallet: state => state.Config.wallet,
        nodeUrl : state => state.Config.nodeUrl
      })
    },
    mounted(){
      if(this.compileInfo.abi && this.compileInfo.abi.functions.length > 0) {
        for(let f of this.compileInfo.abi.functions) {
          this.functionParameters[f.name] = f.parameters.map((p)=> new Ont.Parameter(p.name, p.type, ''))
        }
      }
    },
    watch: {
      runInfo : function(newInfo, oldInfo) {
        this.optionId = ''
        this.functionName = ''
        this.functionParameters = []
      },
      compileInfo: function(newInfo, oldInfo) {
        for(let f of newInfo.abi.functions) {
          this.functionParameters[f.name] = f.parameters.map((p)=> new Ont.Parameter(p.name, p.type, ''))
        }
      }
    },
    methods: {
      privateNetInputState(){
        this.isHidePrivateNetInput = !this.isHidePrivateNetInput
        if(this.isHidePrivateNetInput){
          if(this.runWalletInfo.info){
            this.getNetworkWalletInfo(this.runWalletInfo.info,this)
          }
        }else{

        }
      },
      onFileChange() {
        let files = document.getElementById("exampleInputFileInRun").files
        if (!files.length){
          this.FileName = (LangStorage.getLang('zh') === "zh") ? zh.login.chooseFile : en.login.chooseFile
          return
        }
        this.FileName = files[0].name
        this.WalletFile = files[0]
      },
      unlockWalletFile(){
        let _self = this
        this.$validator.validateAll().then(result => {
          if (result) {
            this.waitingUnlockWallet = true
            Sleep.sleep(200).then(() => {
              FileHelper.readWalletFile(this.WalletFile).then((walletFile) => {
                if(walletFile) {
                  let account = OWallet.decryptWalletFile(JSON.parse(walletFile), this.password)
                  if(account ) {
                    _self.getNetworkWalletInfo(account,_self)
                    _self.showWalletInfo = true
                    $("#WalletFileInfoInRun").modal("hide");
                  }else{
                    let title = (LangStorage.getLang('zh') === "zh") ? zh.deploy.errorTitle : en.deploy.errorTitle
                    let content = (LangStorage.getLang('zh') === "zh") ? zh.deploy.errowWalletPassword : en.deploy.errowWalletPassword
                    this.showLoadingModal(title,content,true)
                    $("#WalletFileInfoInRun").modal("hide");
                  }
                }else{
                }
              })
              this.waitingUnlockWallet = false
            })
          }else{
          }
        })
      },
      getNetworkAsset(){
        if(this.runWalletInfo.info){
          this.getNetworkWalletInfo(this.runWalletInfo.info.account,this)
        }
      },
      getNetworkWalletInfo($account,_self){
        let defaultNet
        if(this.networkInRun === '0'){
          defaultNet = process.env.NODE_URL
        }else if(this.networkInRun === '1'){
          defaultNet = "https://polaris1.ont.io:10334"
        }else{
          defaultNet = this.privateNet
        }
        let payload = {
          network: defaultNet,
          account: $account
        }
        _self.$store.dispatch('setRunWallet', payload).then(result => {

        })
      },
      showEnterWalletPassword(){
        if(this.runWalletInfo.info) {
          $("#enterWalletPasswordInRun").modal("show");
        }else{
          let title = (LangStorage.getLang('zh') === "zh") ? zh.run.errorTitle : en.run.errorTitle
          let content = (LangStorage.getLang('zh') === "zh") ? zh.run.errorWallet : en.run.errorWallet
          this.showLoadingModal(title,content,true)
        }
      },
      getWalletPrivateKey(){
        this.waitingUnlockWallet = true
        let account = this.runWalletInfo.info.account
        let privateKey = OWallet.getAccountPrivateKey(account,this.getWalletPrivateKeyPassowrd)

        if(privateKey){
          this.waitingUnlockWallet = false
          $("#enterWalletPasswordInRun").modal("hide");
          this.runContrateNoPreExec(privateKey)
        }else{
          this.waitingUnlockWallet = false
          let title = (LangStorage.getLang('zh') === "zh") ? zh.deploy.errorTitle : en.deploy.errorTitle
          let content = (LangStorage.getLang('zh') === "zh") ? zh.deploy.errowWalletPassword : en.deploy.errowWalletPassword
          this.showLoadingModal(title,content,true)
          $("#enterWalletPasswordInRun").modal("hide");
        }
      },
      viewPassword() {
        this.isShowPassword = !this.isShowPassword
      },
      getParameter($optionId){
        this.parameters = this.functionParameters[$optionId]
        this.functionName = $optionId
        // let funcObj = this.compileInfo.abi.functions[$optionId]
        // this.functionName = funcObj.name
        // let params = []
        // for(let p of funcObj.parameters) {
        //   if(p.name) {
        //     let o = new Ont.Parameter(p.name, p.type, '')
        //     o.typeTip = this.getParameterTypeTip(p.type)
        //     console.log(o)
        //     params.push(o)
        //   }
        // }
        // this.functionParameters = params
      },
      changeParameterTypeTip(parameter) {
        parameter.typeTip = this.getParameterTypeTip(parameter.type)
        if(parameter.type !== 'Boolean') {
          console.log(parameter)
          parameter.value = '';
        }
      },
      getParameterTypeTip(type) {
        let typeTip = ''
        switch (type) {
          case 'ByteArray':
            typeTip = 'Enter hex string';
            break;
          case 'String' :
            typeTip = 'Enter string';
            break;
          case 'Integer' :
            typeTip = 'Enter integer';
            break;
          case 'Boolean' :
            typeTip = 'Enter bool';
            break;
          default : {
          }
        }
        return typeTip;
      },
      debugContract: async function() {
        let codeLang = this.ProjectName.info.language
        console.log(codeLang)
        if(codeLang === PROJECT_LANGAUGE.PYTHON){
          this.runStatus = true;
          this.runDebug = true

        if (!validateRun(this)) {
          this.runStatus = false;
          return;
        }

        // const parameters = this.formatAndValidateParameters(this.parameters);
        const parameters = ParamsHelper.formatAndValidateParameters(this.parameters);
        if(!parameters) {
          this.runStaus = false;
          return;
        }

        const abiFunc = new Ont.AbiFunction(this.functionName, '', parameters);
        const args = Ont.ScriptBuilder.serializeAbiFunction(abiFunc);

        // let args = Ont.ScriptBuilder.buildSmartContractParam(this.functionName, this.parameters);
        console.log(args);

        let avm = new Buffer(this.compileInfo.avm, 'hex');
        let lineMappings = {};
        let lineToMethod = {};
        let debugMap = this.compileInfo.debug.map;
        debugMap.forEach((m) => {
          lineMappings[m.file_line_no] = {start: m.start, end: m.end};
          lineToMethod[m.file_line_no] = m.method;
        });

        let funcMap = {};
        this.compileInfo.funcmap.Functions.forEach((f) => {
          funcMap[f.Method] = f.VarMap;
        });

        let self = this;
        let debug = new Debugger(avm, lineMappings, (payload) => {
          console.log(payload);
          let line;
          let locals;
          let method;
          if (payload.line !== undefined) {
            line = payload.line - 1;
            let selection = self.projectEditor.selection;
            self.projectEditor.gotoLine(payload.line, 0);
            self.projectEditor.navigateLineStart();
            let session = self.projectEditor.getSession();
            session.addGutterDecoration(payload.line - 1, 'ace_breakpoint_active');

            if (payload.altStack.count() > 0) {
              let stack = payload.altStack.peek(0).getArray();
              method = lineToMethod[line + 1];
              if (method != null) {
                let map = funcMap[method];
                if (map != null) {
                  locals = [];
                  Object.entries(map).forEach((k, v) => {
                    locals.push({
                      name: k[0],
                      value: stack[v]
                    });
                  });
                }
              }
            }
          }
          let evaluationStack = [];
          for (let i = 0; i < payload.evaluationStack.count(); i++) {
            evaluationStack.push(payload.evaluationStack.peek(i));
          }
          let altStack = [];
          for (let i = 0; i < payload.altStack.count(); i++) {
            if (method != null && i === 0) {
              altStack.push([method, payload.altStack.peek(i)]);
            } else {
              altStack.push([null, payload.altStack.peek(i)]);
            }
          }
          let history = payload.history.slice().reverse();
          this.$store.commit({
            type: types.SET_DEBUGGER_STATE,
            line,
            evaluationStack,
            altStack,
            history,
            locals
          });
        }, this.store, (notification) => {
          this.$store.commit({
            type: types.APPEND_OUTPUT_LOG,
            log: notification.states,
            op: OP_TYPE.Notify
          });
        }, (log) => {
          this.$store.commit({
            type: types.APPEND_OUTPUT_LOG,
            log: log.message,
            op: OP_TYPE.Log
          });
        });

        this.$store.commit({
          type: types.SET_DEBUGGER,
          debug
        });

        let breakpoints = this.projectEditor.getSession().getBreakpoints();
        for (let [i, value] of breakpoints.entries()) {
          if (value !== undefined) {
            debug.addLineBreakpoint(i + 1);
          }
        }

        try {
          let { result, notifications, logs } = await debug.execute([new Buffer(args, 'hex')]);

          let formattedResult = result.toString();

          this.$store.commit({
            type: types.APPEND_OUTPUT_LOG,
            log: formattedResult,
            op: OP_TYPE.Invoke
          });
        } catch (e) {
          this.$store.commit({
            type: types.APPEND_OUTPUT_LOG,
            log: e.toString(),
            op: OP_TYPE.Error
          });
        }

        this.$store.commit({
          type: types.SET_DEBUGGER
        });
        this.$store.commit({
          type: types.SET_DEBUGGER_STATE
        });

          this.runStatus = false;
          this.runDebug = false
        }else{
          let title = (LangStorage.getLang('zh') === "zh") ? zh.run.comingSoonTitle : en.run.comingSoonTitle
          let error = (LangStorage.getLang('zh') === "zh") ? zh.run.comingSoon : en.run.comingSoon
          this.runStatus = false;
          this.runDebug = false
          this.showLoadingModal(title,error,true)
        }
      },
      runContrateNoPreExec($privateKey){
        let _self = this

        let payerAddress = this.runWalletInfo.info.address
        const payer = new Ont.Crypto.Address(payerAddress)

        let params = this.runContractParam
        console.log(params.parameters)
        const tx = Ont.TransactionBuilder.makeInvokeTransaction(params.method, params.parameters, params.contractAddr, params.gasPrice, params.gasLimit,payer);
        Ont.TransactionBuilder.signTransaction(tx, $privateKey);
        console.log(tx)
        let res
        if(this.networkInRun === '0'){
          res = new Ont.RestClient(process.env.NODE_URL).sendRawTransaction(tx.serialize(), false, false);
        }else if(this.networkInRun === '1'){
          res = new Ont.RestClient("https://polaris1.ont.io:10334").sendRawTransaction(tx.serialize(), false, false);
        }else{
          res = new Ont.RestClient(this.privateNet).sendRawTransaction(tx.serialize(), false, false);
        }

        res.then(function(value) {
          console.log(value)
          _self.$store.commit({
            type: types.APPEND_OUTPUT_LOG,
            log: value,
            op: OP_TYPE.Invoke
          })
        }, function(error) {
          console.log(error)
          _self.$store.commit({
            type: types.APPEND_OUTPUT_LOG,
            log: error,
            op: OP_TYPE.Invoke
          })
        });

        this.runStatus = false
        this.runOnly = false
      },
      async runContract(preExec) {
        if(!this.configWallet.address || !this.configWallet.privateKey) {
          alert('Please select the wallet at first.')
          return;
        }
        const account = new Ont.Crypto.Address(this.configWallet.address);
        const privateKey = new Ont.Crypto.PrivateKey(this.configWallet.privateKey);

        let _self = this
        this.runStaus = true;
        if(preExec){
          this.runPreRun = true
        }else{
          this.runOnly = true
        }
        let errorTitle = (LangStorage.getLang('zh') === "zh") ? zh.run.errorTitle : en.run.errorTitle

        if(!this.functionName) {
          this.ErrorInfo = (LangStorage.getLang('zh') === "zh") ? zh.run.errorFunction : en.run.errorFunction
          this.showLoadingModal(errorTitle,this.ErrorInfo,true)
          this.$store.commit({
            type : types.SET_RUN_STATUS,
            running : false
          })
          return;
        }
        if(!this.runInfo.contractHash) {
          this.ErrorInfo = (LangStorage.getLang('zh') === "zh") ? zh.run.noContractHash : en.run.noContractHash
          this.showLoadingModal(errorTitle,this.ErrorInfo,true)
          this.$store.commit({
            type : types.SET_RUN_STATUS,
            running : false
          })
          return;
        }
        //validate and format parameters
        // const parameters = this.formatAndValidateParameters(this.parameters);
        const parameters = ParamsHelper.formatAndValidateParameters(this.parameters);
        if(!parameters) {
          this.runStaus = false;
          return;
        }
        
        let contractHash = this.runInfo.contractHash
        let util = Ont.utils
        const contractAddr = new Ont.Crypto.Address(util.reverseHex(contractHash));

        const params = {
          contractAddr: contractAddr,
          method: this.functionName,
          parameters: parameters,
          gasPrice: '500',
          gasLimit: '60000'
        }
        
          const tx = Ont.TransactionBuilder.makeInvokeTransaction(
            params.method,
            params.parameters,
            params.contractAddr,
            params.gasPrice,
            params.gasLimit,
            account
            );
          Ont.TransactionBuilder.signTransaction(tx, privateKey);
          const socketClient = new Ont.WebsocketClient('ws://' + this.nodeUrl + ':20335');
          try {
            const res = await socketClient.sendRawTransaction(tx.serialize(), preExec, !preExec);
            if(res.Result) {
              this.$store.commit({
                type: types.APPEND_OUTPUT_LOG,
                log: res.Result,
                op: OP_TYPE.Invoke
              })
            }
          } catch(err) {
            this.$store.commit({
              type: types.APPEND_OUTPUT_LOG,
              log: err.message || JSON.stringify(err),
              op: OP_TYPE.Invoke
            })
             console.log(err.message)
          }
          this.runStatus = false;
          this.runPreRun = false
        
      },
      showLoadingModal($title,$content,$isShowCloseButton){
        let payload = {
          title:$title,
          content:$content,
          isShowCloseButton:$isShowCloseButton
        }
        this.$store.dispatch('showLoadingModals',payload)
      }

  }
    
  }
</script>

<style scoped>
  .run-page{
    margin-left: 5px ;
    margin-right: 5px;
    height: 100%;
    position:relative;
  }
  .run-btn-submit {
    border-radius: 0;
    width: 100%;
    color: white;
    border-color: #36a3bc;
    background-color: #36a3bc;
    font-size: 10px;
    padding: 8px 17.6px;
    margin-bottom:15px;
  }
  .run-btn-submit:hover,
  .run-btn-submit:active {
    background-color: #18bae2;
    color: white;
  }
  .run-card{
    margin-top: 5px;
  }
  .card{
    max-width: 100% !important;
    height: 100% !important;
    border-radius:0px;
  }
  .card-info{
    height: 30%;
  }
  .card-header{
    background-color: white;
    text-align: center;
    color: #36a3bc;
    padding-top: 6px !important;
    padding-bottom: 6px !important;
  }
  .card-text{
    margin-bottom: 2px;
  }
  .border-secondary{
    border-color: #C4C3C3 !important;
  }
  .card-basic-info{
    height: 20%;
  }
  .card-Option{
    height: calc(80% - 40px);
    padding-bottom: 60px;
  }
  .run-card-select{
    margin-top: 5px;
    line-height:1;
    padding:0px 50px 0px 10px;
  }
  .run-input-and-txt{
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
  }
  .run-input{
    width: 50%;
    height: 24px;
    margin-left: 16px;
  }
  .run-card-scroll{
    overflow-y:auto;
  }
  .run-modal{
    margin-top: 10%;
  }
  .run-dialog-btn-close{
    border-radius:0px;
  }
  .error-modal-body-text{
    font-size: 16px;
  }
  .run-input-radio {
    margin-left: 16px;
  }

  .run-info-card-text {
    width: 70px;
    text-align: right;
  }

  .run-input-in-modal{
    width: 70%;
    border-radius:0px;
  }
  .border-secondary{
    border-color: #C4C3C3 !important;
  }
  .run-custom-file-input {
    width: 100%;
  }
  .run-custom-file-label {
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
  .run-custom-file-label::after {
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
  .run-custom-zh-text-file-label {
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
  .run-custom-zh-text-file-label::after {
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
  .run-dialog-btn{
    background-color: #36a3bc;
    border-radius:0px;
  }
  .run-err-message {
    color: #ff0264 !important;
  }
  .input-group-text{
    border-radius:0px;
  }
  .run-custom-file{
    height: 36px;
  }
  .run-input-group-append{
    min-width: 55px;
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

.run-btns {
     display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}

.run-btns button {
  width:30%;
  margin-bottom:10px;
}
</style>
