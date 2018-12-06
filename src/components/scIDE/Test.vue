<template>
  <div class="test-page test-card-scroll-y">


    <div class="test-card" >
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="card-header">{{$t('test.account')}}</div>
        <div class="test-card-scroll-y">
          <div class="card-body">
            <div class="test-account-address" v-for="(account,index) in testAccountInfo.info">
              <label class="card-text">{{$t('test.accountAddress')}}{{index+1}}:</label>
              <label class="card-text">{{account.address}}</label>
              <label class="card-text test-account-delete" @click="spliceAccount(index)">{{$t('test.delete')}}</label>
            </div>

            <div v-if="showAddAccountEdit">
              <label class="card-text">{{$t('test.accountPrivateKey')}}</label>
              <input v-model="accountPrivateKey"/>
              <button class="btn btn-outline-success test-btn-submit-small" @click="addAccountByPrivateKey">{{$t('test.ok')}}</button>
            </div>

            <div class="test-account-button">
              <button class="btn btn-outline-success test-btn-submit-small"  @click="addAccount()">{{$t('test.addAccount')}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="test-card" >
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="card-header">
          <div class="row">
            <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 card-header-text">
              <div>{{$t('test.testFunction')}}</div>
            </div>
            <div class="row test-function-header-btn-div">
              <div class="test-function-header-fa" @click="downloadJson"><i class="fa fa-download test-fa-trash"></i></div>
            </div>
          </div>
        </div>
        <div class="test-card-scroll-y">
          <div class="card-body">

            <div style="margin-bottom: 10px">
              <p class="card-text test-title-text test-card-text-title" style="margin-top: 0px"><strong>{{ $t('test.selectNet') }}</strong></p>
              <label class="card-text test-title-text"><input name="testFunctionNet" type="radio" v-model="network" value="0"/><strong style="margin-left: 4px">{{ $t('test.mainNet') }}</strong></label>
              <label class="card-text test-title-text" style="margin-left: 8px"><input name="testFunctionNet" type="radio" v-model="network" value="1"/><strong style="margin-left: 4px">{{ $t('test.testNet') }}</strong></label>
              <label class="card-text test-title-text" style="margin-left: 8px"><input name="testFunctionNet" type="radio" v-model="network" value="2"/><strong style="margin-left: 4px">{{ $t('test.privateNet') }}</strong></label>
              <input class="test-private-net-input" v-show="network === '2'" v-model="privateNet" >
            </div>

            <div style="margin-bottom: 10px">
              <p class="card-text test-title-text test-card-text-title" style="margin-top: 0px"><strong>{{ $t('test.selectContractHash') }}</strong></p>
              <label class="card-text test-title-text"><input name="selectContractHash" type="radio" v-model="selectContractHash" value="0"/><strong style="margin-left: 4px">{{ $t('test.currentContractHash') }}</strong></label>
              <label class="card-text test-title-text" style="margin-left: 8px"><input name="selectContractHash" type="radio" v-model="selectContractHash" value="1"/><strong style="margin-left: 4px">{{ $t('test.Other') }}</strong></label>
              <input class="test-private-net-input" v-show="selectContractHash === '1'" v-model="otherContractHash" >
            </div>

            <div style="margin-bottom: 10px">
              <div class="">
                <label class="run-input-label">{{ $t('deploy.gasPrice') }}</label>
                <input class="run-input" v-model="gasPrice">
              </div>

              <div class="">
                <label class="run-input-label">{{ $t('deploy.gasLimit') }}</label>
                <input class="run-input" v-model="gasLimit">
              </div>
            </div>

            <button class="btn btn-outline-success test-btn-submit" v-bind:disabled="runStatus"  @click="runTest()">{{runStatus ? $t('run.waiting') : $t('run.run')}}</button>

            <div class="test-line"></div>

            <div v-for="(num, index) in testFunctionNum" :key="index">
              <div class="test-project-delete"  @click="spliceTestFunction(num)">
                <img src="./../../../src/assets/project/delete.png" alt="">
              </div>
              <div class="test-function-bord">
                <p class="card-text test-card-text-title" style="margin-top: 0px"><strong>{{$t('test.function')}} {{num+1}}</strong></p>
                <p class="card-text test-card-text-title"><strong>{{ $t('run.selectFuc') }}</strong></p>
                <div style="display: flex;">
                  <select class="form-control test-card-select test-card-select-function-name" v-model="optionId[num]" @change="getParameter(optionId[num],num)">
                    <option disabled selected >{{$t('run.selectFucOption')}}</option>
                    <option v-for="(abiVal,index) in compileInfo.abi.functions" :key="index"
                            :value="index"
                            v-if="abiVal.name !== 'Main'">
                      {{abiVal.name }}
                    </option>
                  </select>
                  <p class="card-text test-title-text test-title-test-run-function"><input type="checkbox" v-model="testFunctions.isRun[num]" /><strong style="margin-left: 4px">{{ $t('test.runThisFunc') }}</strong></p>
                </div>

                <div v-show="testFunctions.isRun[num]">
                  <!-- <div class="test-input-and-txt" v-for="parameter in testFunctions.params[num]" @change="changeParameterTypeTip(parameter)">
                    <select v-model="parameter.type" style="margin-right: 5px;">
                      <option value="ByteArray">ByteArray</option>
                      <option value="String">String</option>
                      <option value="Integer">Integer</option>
                      <option value="Boolean">Boolean</option>
                    </select>
                    <p class="card-text">{{parameter.name}}:</p>
                    <input class="run-input" v-model="parameter.value" :placeholder="parameter.typeTip" >
                  </div> -->
                  <div >
                    <sc-parameter :parameter="parameter" v-for="(parameter) of functionParameters[testFunctions.functionName[num]]" :key="parameter.name"></sc-parameter>
                  </div> 

                  <p class="card-text test-title-text test-card-text-title"><strong>{{ $t('test.selectRunType') }}</strong></p>
                  <label class="card-text test-title-text"><input :name="'testPreExec'+num" type="radio" v-model="testFunctions.preExec[num]" value="0"/><strong style="margin-left: 4px">{{ $t('test.run') }}</strong></label>
                  <label class="card-text test-title-text" style="margin-left: 8px"><input :name="'testPreExec'+num" type="radio" v-model="testFunctions.preExec[num]" value="1"/><strong style="margin-left: 4px">{{ $t('test.preRun') }}</strong></label>

                  <p class="card-text test-title-text test-card-text-title"><strong>{{ $t('test.selectAccount') }}</strong></p>
                  <select class="form-control test-card-select" v-model="addressId[num]" @change="getAddress(addressId[num],num)">
                    <option disabled selected >{{$t('run.selectFucOption')}}</option>
                    <option v-for="(account,index) in testAccountInfo.info"
                            :value="index">
                      {{account.address }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <button class="btn btn-outline-success test-btn-submit test-btn-add-function" @click="addTestFunction(0)">{{$t('test.addFunction')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let Ont = require('ontology-ts-sdk');
  import zh from './../../common/lang/zh'
  import en from './../../common/lang/en'
  import LangStorage from './../../helpers/lang'
  import {mapState} from 'vuex'
  import { OP_TYPE } from './../../helpers/consts';
  import * as types from './../../store/mutation-type'
  import FileHelper from "./../../common/ont-wallet/file-generate-and-get";
  import Sleep from './../../helpers/sleep'
  import ScParameter from './ScParameter'
  import * as ParamsHelper from './../../helpers/params'

  export default {
    name: "Testing",
    components: {
      ScParameter
    },
    data() {
      return {
        //accountPrivateKey:'063441409768bb701301a44d67a7dbaf75d73479101c4241d7da2f8e9962840f',
        accountPrivateKey:'',
        showAddAccountEdit:false,
        optionId: [''],
        functionName : '',
        functionParameters : {},
        addressId:[''],
        runStatus:false,
        testFunctions: {
          functionName: [''],
          params: [''],
          account:[''],
          isRun:[false],
          preExec: ['0'],
        },
        network:'1',
        selectContractHash:'0',
        otherContractHash:'',
        testFunctionNum:[],
        privateNet:'http://127.0.0.1:20334/',
        runFunctionNumber:0,
        gasPrice: '500',
        gasLimit: '60000'
      }
    },
    computed: {
      ...mapState({
        projectInfo: state => state.ProjectInfoPage.ProjectInfo,
        compileInfo: state => state.CompilePage.CompileInfo,
        runInfo : state => state.RunPage.RunInfo,
        testAccountInfo : state =>state.TestPage.testAccountInfo,
        testJson : state =>state.TestPage.testFunctionJson,
        deployContractInfo: state => state.DeployPage.DeployContractInfo,
        deployInfo: state => state.DeployPage.DeployInfo,
      })
    },
    created(){
      this.isShowAddAccountEdit()
    },
   
    watch: {
      compileInfo : function(newInfo, oldInfo) {
        if(this.compileInfo.abi && this.compileInfo.abi.functions.length > 0) {
          for(let f of this.compileInfo.abi.functions) {
            this.functionParameters[f.name] = f.parameters.map((p)=> new Ont.Parameter(p.name, p.type, ''))
          }
        }
        this.showTestFunctions()
      },
      network: function(newVal, oldVal) {
        if(newVal === '2') {
          this.gasPrice = '0';
        } else {
          this.gasPrice = '500'
        }
      }
    },
    methods: {
      addAccountByPrivateKey(){
        if(this.accountPrivateKey.length !==64){
          let title = (LangStorage.getLang('zh') === "zh") ? zh.test.errorPrivateKey : en.test.errorPrivateKey
          let content = (LangStorage.getLang('zh') === "zh") ? zh.test.errorPrivateKeyContent : en.test.errorPrivateKeyContent
          let payload = {
            title:title,
            content:content,
            isShowCloseButton:true
          }
          this.$store.dispatch('showLoadingModals',payload)
        }else{

          let payload={
            privateKey:this.accountPrivateKey,
            testAccount:this.testAccountInfo.info,
          }
          this.$store.dispatch('addAccount',payload)
          this.showAddAccountEdit = false
        }
      },
      addAccount(){
        if(!this.showAddAccountEdit){
          this.showAddAccountEdit = true
        }
      },
      isShowAddAccountEdit(){
        if(this.testAccountInfo.info.length === 0){
          this.showAddAccountEdit = true
        }
      },
      showTestFunctions(){
        if(this.testFunctionNum.length === 0 ){
          if(this.compileInfo.abi.functions){
            this.emptyTestFunction()
            let functionCount = this.compileInfo.abi.functions.length
            for(let i = 0;i<functionCount;i++){
              this.addTestFunction(i)
              if(this.testFunctions.functionName[0] === "Main"){
                this.spliceTestFunction(0)
              }
            }
          }
        }
      },
      getParameter($optionId,$num){
        let funcObj = this.compileInfo.abi.functions[$optionId]
        this.testFunctions.functionName[$num] = funcObj.name
        let params = []
        for(let p of funcObj.parameters) {
          if(p.name) {
            let o = new Ont.Parameter(p.name, p.type, '')
            o.typeTip = this.getParameterTypeTip(p.type)
            params.push(o)
          }
        }
        this.testFunctions.params[$num] = params
      },
      getAddress($addressId,$num){
        this.testFunctions.account[$num] = this.testAccountInfo.info[$addressId]
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
      changeParameterTypeTip(parameter) {
        parameter.typeTip = this.getParameterTypeTip(parameter.type)
      },
      addTestFunction($functionId){
        this.testFunctionNum.push(this.testFunctionNum.length)
        this.testFunctions.functionName.push('')
        this.testFunctions.params.push('')
        this.testFunctions.account.push('')
        this.testFunctions.isRun.push(false)
        this.testFunctions.preExec.push('0')
        // this.functionParameters.push('')
        this.optionId.push($functionId)
        this.getParameter($functionId,this.testFunctionNum.length-1)
        this.addressId.push('')
      },
      emptyTestFunction(){
        this.testFunctionNum =[]
        this.testFunctions.functionName = []
        this.testFunctions.params = []
        this.testFunctions.account = []
        this.testFunctions.isRun = []
        this.testFunctions.preExec = []
        // this.functionParameters= []
        this.optionId = []
        this.testFunctions.params = []
        this.addressId = []
      },
      spliceTestFunction($functionId){
        this.testFunctionNum.splice($functionId,1)
        let num = this.testFunctionNum.length
        for (let i=0;i<num;i++){
          this.testFunctionNum[i]=i
        }
        this.testFunctions.functionName.splice($functionId,1)
        this.testFunctions.params.splice($functionId,1)
        this.testFunctions.account.splice($functionId,1)
        this.testFunctions.isRun.splice($functionId,1)
        this.testFunctions.preExec.splice($functionId,1)
        // this.functionParameters.splice($functionId,1)
        this.optionId.splice($functionId,1)
        this.addressId.splice($functionId,1)
      },
      spliceAccount($accountId){
        let payload={
          accountId:$accountId,
          testAccount:this.testAccountInfo.info,
        }
        this.$store.dispatch('spliceAccount',payload)
      },
      runTest(){
        this.runStatus = true;
        let _self = this
        let i = 0

        if(_self.testFunctionNum.length === 0){
          let title = (LangStorage.getLang('zh') === "zh") ? zh.test.runError : en.test.runError
          let content = (LangStorage.getLang('zh') === "zh") ? zh.run.noFunction : en.run.noFunction
          let payload = {
            title:title,
            content:content,
            isShowCloseButton:true
          }
          this.$store.dispatch('showLoadingModals',payload)
          this.$store.commit({
            type : types.SET_RUN_STATUS,
            running : false
          })
          this.runStatus = false;
          return;
        }

        let isRunNum = 0
        for(let i=0;i<this.testFunctionNum.length;i++){
          if(this.testFunctions.isRun[i]){
            isRunNum = isRunNum+1
          }
        }
        if(isRunNum === 0){
          let title = (LangStorage.getLang('zh') === "zh") ? zh.test.runError : en.test.runError
          let content = (LangStorage.getLang('zh') === "zh") ? zh.run.noFunction : en.run.noFunction
          let payload = {
            title:title,
            content:content,
            isShowCloseButton:true
          }
          this.$store.dispatch('showLoadingModals',payload)
          this.$store.commit({
            type : types.SET_RUN_STATUS,
            running : false
          })
          this.runStatus = false;
          return;
        }

        for(let i=0;i<this.testFunctionNum.length;i++){
          if(this.testFunctions.isRun[i]&&(this.testFunctions.preExec[i]==='0')&&!this.testFunctions.account[i]){
            let num = i+1
            let title = (LangStorage.getLang('zh') === "zh") ? zh.test.runError : en.test.runError
            let content = (LangStorage.getLang('zh') === "zh") ? zh.test.noAccountError_1+num+zh.test.noAccountError_2: en.test.noAccountError_1+num
            let payload = {
              title:title,
              content:content,
              isShowCloseButton:true
            }
            this.$store.dispatch('showLoadingModals',payload)
            this.$store.commit({
              type : types.SET_RUN_STATUS,
              running : false
            })
            this.runStatus = false;
            return;

          }
        }

        if( !this.runInfo.contractHash && !this.otherContractHash) {
          let title = (LangStorage.getLang('zh') === "zh") ? zh.test.runError : en.test.runError
          let content = (LangStorage.getLang('zh') === "zh") ? zh.run.noContractHash : en.run.noContractHash
          let payload = {
            title:title,
            content:content,
            isShowCloseButton:true
          }
          this.$store.dispatch('showLoadingModals',payload)
          this.$store.commit({
            type : types.SET_RUN_STATUS,
            running : false
          })
          this.runStatus = false;
          return;
        }

        let testFuns=[]
        for(let i=0;i<this.testFunctionNum.length;i++){
          if(this.testFunctions.isRun[i]){
            const functionName = _self.testFunctions.functionName[i]
            let testFun = {
              functionName,
              // params: _self.testFunctions.params[i],
              params: _self.functionParameters[functionName],
              isRun: _self.testFunctions.isRun[i],
              preExec: _self.testFunctions.preExec[i],
              account: _self.testFunctions.account[i],
            }
            testFuns.push(testFun)
          }
        }

        this.runFunctionNumber=0
        this.runTestFunction(testFuns[this.runFunctionNumber],testFuns)
      },
      runTestFunction($testFun,$testFuns){
        this.runContract($testFun)
        this.runFunctionNumber = this.runFunctionNumber+1
        if(this.runFunctionNumber<$testFuns.length){
          if($testFun.preExec === '0'){
            Sleep.sleep(6000).then(() => {
              this.runTestFunction($testFuns[this.runFunctionNumber], $testFuns)
            })
          }else{
            Sleep.sleep(1000).then(() => {
              this.runTestFunction($testFuns[this.runFunctionNumber], $testFuns)
            })
          }
        }else{
          this.$store.commit({
            type : types.SET_RUN_STATUS,
            running : false
          })
          this.runStatus = false;
          return
        }
      },
      runContract($testFunction) {
        if(this.gasPrice =='' || !this.gasLimit) {
          let title = (LangStorage.getLang('zh') === "zh") ? zh.test.runError : en.test.runError
          let content = (LangStorage.getLang('zh') === "zh") ? zh.run.errorGasPriceLimit : en.run.errorGasPriceLimit
          let payload = {
            title:title,
            content:content,
            isShowCloseButton:true
          }
          this.$store.dispatch('showLoadingModals',payload)
          this.runStatus = false;
          return;
        }

        if(!$testFunction.functionName) {
          let title = (LangStorage.getLang('zh') === "zh") ? zh.test.runError : en.test.runError
          let content = (LangStorage.getLang('zh') === "zh") ? zh.run.errorFunction : en.run.errorFunction
          let payload = {
            title:title,
            content:content,
            isShowCloseButton:true
          }
          this.$store.dispatch('showLoadingModals',payload)
          this.runStatus = false;
          return;
        }

        const parameters = ParamsHelper.formatAndValidateParameters($testFunction.params);
        if(!parameters) {
          this.runStatus = false;
          return;
        }
        //validate and format parameters
        // const parameters = $testFunction.params.slice();
        // for(let p of parameters) {
        //   if(p.name && !p.value) {
        //     alert('Parameter '+ p.name + ' is required.')
        //     this.$store.commit({
        //       type : types.SET_RUN_STATUS,
        //       running : false
        //     })
        //     return;
        //   }
        //   if(p.type === 'ByteArray' && p.value.length%2 !== 0) {
        //     alert('Parameter ' + p.name + ' is not valid hex string.')
        //     this.runStatus = false;
        //     return;
        //   }
        //   if(p.type === 'Integer') {
        //     p.value = parseInt(p.value)
        //   }
        //   if(p.type === 'Boolean') {
        //     p.value = Boolean(p.value);
        //   }
        // }

        let contractHash
        if(this.selectContractHash === "0"){
          contractHash = this.runInfo.contractHash
        }else{
          if(this.otherContractHash.length!==40){
            let title = (LangStorage.getLang('zh') === "zh") ? zh.test.runError : en.test.runError
            let content = (LangStorage.getLang('zh') === "zh") ? zh.run.contractHashError : en.run.contractHashError
            let payload = {
              title:title,
              content:content,
              isShowCloseButton:true
            }
            this.$store.dispatch('showLoadingModals',payload)
            this.runStatus = false;
            return;
          }else{
            contractHash = this.otherContractHash
          }
        }


        let util = Ont.utils
        const contractAddr = new Ont.Crypto.Address(util.reverseHex(contractHash));

        let _self = this
        try {
          if($testFunction.preExec==='0'){
            let payerAddress = $testFunction.account.address
            let payerPri = $testFunction.account.privateKey
            const payer = new Ont.Crypto.Address(payerAddress)
            const privateKey = new Ont.Crypto.PrivateKey(payerPri)

            const tx = Ont.TransactionBuilder.makeInvokeTransaction($testFunction.functionName, parameters, contractAddr, this.gasPrice, this.gasLimit ,payer);
            Ont.TransactionBuilder.signTransaction(tx, privateKey);
            console.log(tx)
            let res
            if(this.network === '0'){
              res = new Ont.RestClient(process.env.NODE_URL).sendRawTransaction(tx.serialize(), false, false);
            }else if(this.network === '1'){
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

          }else{
            console.log($testFunction.params)
            const tx = Ont.TransactionBuilder.makeInvokeTransaction($testFunction.functionName, parameters, contractAddr, '500', '20000');
            console.log(tx)
            let res
            if(this.network === '0'){
              res = new Ont.RestClient(process.env.NODE_URL).sendRawTransaction(tx.serialize(), true, false);
            }else if(this.network === '1'){
              res = new Ont.RestClient("https://polaris1.ont.io:10334").sendRawTransaction(tx.serialize(), true, false);
            }else{
              res = new Ont.RestClient(this.privateNet).sendRawTransaction(tx.serialize(), true, false);
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
          }
        } catch(err) {
          console.log(err)
          this.$store.commit({
            type : types.SET_RUN_STATUS,
            running : false
          })
          this.runStatus = false;
        }
      },
      downloadJson(){
        let testFunctionJson = this.setTestJson()
        let fileName = this.projectInfo.info.name+"_test.json"
        FileHelper.downloadFile(testFunctionJson,fileName)
      },
      setTestJson(){
        let testFunctionJson={
          contractHash:this.compileInfo.contractHash,
          networks:'',
          deployConfig:'',
          invokeConfig:''
        }

        let defaultNet
        if(this.network === '0'){
          defaultNet = {
            host: "http://dappnode1.ont.io",
            prot:20336
          }
        }else if(this.network === '1'){
          defaultNet = {
            host: "http://polaris3.ont.io",
            prot:20336
          }
        }else{
          defaultNet = {
            host: this.privateNet,
            prot:20336
          }
        }

        testFunctionJson.deployConfig = {
          name:this.deployContractInfo.name,
          version:this.deployContractInfo.version,
          author:this.deployContractInfo.author,
          email:this.deployContractInfo.email,
          desc:this.deployContractInfo.desc,
        }

        testFunctionJson.invokeConfig = {
          abi:this.projectInfo.info.name+'_abi.json',
          defaultPayer:'',
          defaultSigner:'',
          gasPrice:this.gasPrice,
          gasLimit:this.gasLimit,
          functions:[]
        }
        for(let i=0 ; i<this.testFunctionNum.length;i++){
          let testFunction ={
            name:'',
            params:'',
            signers:'',
            preExec:''
          }
          testFunction.name = this.testFunctions.functionName[i]

          testFunction.params={}
          for(let j=0 ; j<this.testFunctions.params[i].length ; j++){
            let key = this.testFunctions.params[i][j].name
            let value
            switch(this.testFunctions.params[i][j].type)
            {
              case 'ByteArray':
                value =  'ByteArray:'+ this.testFunctions.params[i][j].value

                break;
              case 'String':
                value =  this.testFunctions.params[i][j].value

                break;
              case 'Integer':
                value =  parseInt(this.testFunctions.params[i][j].value)

                break;
              case 'Boolean':
                if(this.testFunctions.params[i][j].value === "true"){
                  value =  true
                }else if(this.testFunctions.params[i][j].value === "false"){
                  value =  false
                }else{
                  value =  ''
                }
                break;
              default:
                value =''
                break;
            }
            testFunction.params[key] = value

          }

          testFunction.signers = {}
          if(this.testFunctions.preExec[i] === "0"){
            testFunction.preExec = false
          }else{
            testFunction.preExec = true
          }

          testFunctionJson.invokeConfig.functions[i] = testFunction
        }

        console.log(testFunctionJson)
        this.$store.dispatch('setTestJson',testFunctionJson)
        return testFunctionJson
      },
      getTestJson(){
/*        let testFuns = this.testJson.info.invokeConfig.functions
        this.emptyTestFunction()
        console.log(testFuns)
        for(let i=0 ; i<testFuns.length ; i++){
          this.testFunctions.functionName[i]=testFuns[i].name
        }*/

      }
    }
  }
</script>

<style scoped>
  .test-page{
    margin-left: 5px ;
    margin-right: 5px;
    height: 100%;
  }
  .card{
    max-width: 100% !important;
    height: 100% !important;
    border-radius:0px;
    margin-bottom: 10px !important;
  }
  .test-card{
    margin-top: 5px;
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
  .test-card-select{
    margin-top: 6px;
    line-height:1;
    padding:0px 50px 0px 10px;
    margin-bottom: 6px;
  }
  .test-card-scroll-y{
    overflow-y:auto;
  }
  .test-btn-submit-small {
    border-radius: 0;
    color: white;
    border-color: #36a3bc;
    background-color: #36a3bc;
    font-size: 10px;
    padding: 2px 17.6px;
    margin-top: -1px;
  }
  .test-btn-submit-small:hover,
  .test-btn-submit-small:active {
    background-color: #36a3bc;
    color: white;
  }
  .test-account-button{
    margin-top: 10px;
  }
  .test-input-and-txt{
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
  }
  .test-account-address{
    margin-bottom: 4px;
  }

  select.form-control:not([size]):not([multiple]) {
    height:28px;
  }
  .form-control {
    font-size: 1em;
  }
  .test-title-text{
    margin-top: 4px;
  }
  .test-function-bord{
    border: 1px solid #CCCCCC;
    background-color: #fbfbfc;
    padding: 16px 10px;
    margin:0 -2% 2% -2%;
    border-radius: 5px;
  }
  .test-btn-submit {
    border-radius: 5px;
    width: 104%;
    color: white;
    border-color: #36a3bc;
    background-color: #36a3bc;
    font-size: 10px;
    padding: 8px 17.6px;
    margin:0 -2% 2% -2%;
  }
  .test-btn-submit:hover,
  .test-btn-submit:active {
    background-color: #18bae2;
    color: white;
  }
  .test-card-text-title{
    font-size: 14px;
    margin-top: 8px;
  }
  .test-card-select-function-name{
    width: 50%;
  }
  .test-title-test-run-function{
    margin-left: 20px;
    margin-top: 11px;
  }
  .test-btn-add-function {
    border-radius: 5px;
    width: 104%;
    color: #36a3bc;
    border-color: #36a3bc;
    background-color: white;
    font-size: 10px;
    padding: 8px 17.6px;
    margin-bottom:15px;
  }
  .test-btn-add-function:hover,
  .test-btn-add-function:active {
    background-color: #36a3bc;
    color: white;
  }
  .test-btn-add-function:focus{
    box-shadow:none !important;
    outline: none !important;
  }
  .test-private-net-input{
    width: 40%;
    height: 20px;
    margin-left: 8px;
  }
  .run-input{
    width: 50%;
    height: 22px;
    margin-left: 16px;
  }
  .test-function-header-btn-div{
    text-align: right;
    margin-left: 8%;
  }
  .test-function-header-fa{
    font-size: 10px;
    margin-top: 1px;
    cursor: pointer;
    color: black;
    font-weight: bolder;
    text-decoration:underline
  }
  .card-header-text{
    padding-left: 20%;
    padding-top: 2px;
  }
  .test-project-delete {
    position: absolute;
    margin-top: -6px;
    margin-left: -3%;
    width: 70px;
    height: 70px;
    overflow: hidden;
    cursor: pointer;
  }
  .test-account-delete{
    margin-left: 6px;
    color:#36a3bc;
    cursor: pointer;
    font-weight: bolder;
    text-decoration:underline
  }
  .test-line{
    border: 0.5px solid #CCCCCC;
    margin-left: -2%;
    margin-right: -2%;
    height: 0px;
    margin-bottom: 10px;
  }
  .test-fa-trash{
    font-size: 18px;
    margin-top: 4px;
    cursor: pointer;
    color: black;
  }

  .run-input-label {
    width:80px;
  }

</style>
