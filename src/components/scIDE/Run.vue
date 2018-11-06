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
              <option v-for="(abiVal,index) in compileInfo.abi.functions"
                      :value="index"
                      v-if="abiVal.name !== 'Main'">
                {{abiVal.name }}
              </option>
            </select>
            <br/>
            <div class="run-input-and-txt" v-for="parameter in this.functionParameters" @change="changeParameterTypeTip(parameter)">
              <select v-model="parameter.type" style="margin-right: 5px;">
                <option value="ByteArray">ByteArray</option>
                <option value="String">String</option>
                <option value="Integer">Integer</option>
                <option value="Boolean">Boolean</option>
              </select>
              <p class="card-text">{{parameter.name}}:</p>
              <input class="run-input" v-model="parameter.value" :placeholder="parameter.typeTip" >
            </div>
          </div>
          <div class="card-body" v-else>
            <p class="card-text">{{$t('compile.noData')}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="run-card">
      <button class="btn btn-outline-success run-btn-submit" 
              v-bind:disabled="runStatus" @click="debugContract()">{{runStatus ? $t('run.waiting') : $t('run.debugRun')}}</button>
      <button class="btn btn-outline-success run-btn-submit"
              id="preRun" data-toggle="tooltip" data-placement="top" :title="$t('run.preRuntips')"
              v-bind:disabled="runStatus" @click="runContract(true)">{{runStatus ? $t('run.waiting') : $t('run.preRun')}}</button>
      <button class="btn btn-outline-success run-btn-submit" 
               v-bind:disabled="runStatus" @click="runContract(false)">{{runStatus ? $t('run.waiting') : $t('run.run')}}</button>
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
  import * as types from './../../store/mutation-type'
  import { OP_TYPE } from './../../helpers/consts';
  let Ont = require('ontology-ts-sdk');
  let Debugger = require('ontology-ts-debugger').Debugger;

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
    const parameters = self.functionParameters.slice();
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
        functionParameters : [],
        ErrorInfo: '',
        runStatus: false
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
        compileInfo: state => state.CompilePage.CompileInfo,
        runInfo : state => state.RunPage.RunInfo,
        projectEditor: state => state.EditorPage.OntEditor,
        store : state => state.EditorPage.Store
      })
    },
    mounted(){
    },
    watch: {
      runInfo : function(newInfo, oldInfo) {
        this.optionId = ''
        this.functionName = ''
        this.functionParameters = []
      }
    },
    methods: {
      getParameter($optionId){
        let funcObj = this.compileInfo.abi.functions[$optionId]
        this.functionName = funcObj.name
        let params = []
        for(let p of funcObj.parameters) {
          if(p.name) {
            let o = new Ont.Parameter(p.name, p.type, '')
            o.typeTip = this.getParameterTypeTip(p.type)
            console.log(o)
            params.push(o)
          }
        }
        this.functionParameters = params
      },
      changeParameterTypeTip(parameter) {
        parameter.typeTip = this.getParameterTypeTip(parameter.type)
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
        this.runStatus = true;

        if (!validateRun(this)) {
          this.runStatus = false;
          return;
        }

        let args = Ont.ScriptBuilder.buildSmartContractParam(this.functionName, this.functionParameters);
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
      },
      runContract(preExec) {
        this.runStaus = true;
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
        const parameters = this.functionParameters.slice();
        for(let p of parameters) {
          if(p.name && !p.value) {
            alert('Parameter '+ p.name + ' is required.')
            this.$store.commit({
              type : types.SET_RUN_STATUS,
              running : false
            })
            return;
          }
          if(p.type === 'ByteArray' && p.value.length%2 !== 0) {
            alert('Parameter ' + p.name + ' is not valid hex string.')
            this.runStatus = false;
            return;
          }
          if(p.type === 'Integer') {
            p.value = parseInt(p.value)
          }
          if(p.type === 'Boolean') {
            p.value = Boolean(p.value);
          }
        }

        let contractHash = this.runInfo.contractHash

        const params = {
          contract: contractHash,
          method: this.functionName,
          parameters: parameters,
          gasPrice: 500,
          gasLimit: 20000,
          requireIdentity: false
        }
        this.$store.dispatch('getDapiProvider').then(provider => {
          if(!provider) {
            alert(this.$t('ide.noProvider'))
            this.runStatus = false;
            return;
          }
          if(preExec) {
            this.$store.dispatch('dapiInvokeRead', params).then(res => {
              console.log(res);
              this.runStatus = false;
              return;
            })
          } else {
            this.$store.dispatch('dapiInvoke', params).then(res => {
              console.log(res)
              this.runStatus = false
              if(res === 'NO_ACCOUNT') {
                alert(this.$t('ide.noProviderAccount'));
                return;
              }
            })
          }
        })
      },
    }
  }
</script>

<style scoped>
  .run-page{
    margin-left: 5px ;
    margin-right: 5px;
    height: 100%;
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
    height: 30%;
  }
  .card-Option{
    height: 40%;
    margin-bottom: -26px;
    padding-bottom: 26px;
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
  .run-card{
    margin-top: 5px;
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
</style>
