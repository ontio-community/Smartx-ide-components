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
              <div class="test-function-header-fa" @click="downloadJson">{{ $t('test.download') }}</div>
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

            <button class="btn btn-outline-success test-btn-submit" @click="runTest()">{{runStatus ? $t('run.waiting') : $t('run.run')}}</button>

            <div class="test-line"></div>

            <div v-for="num in testFunctionNum">
              <div class="test-project-delete"  @click="spliceTestFunction(num)">
                <img src="./../../../src/assets/project/delete.png" alt="">
              </div>
              <div class="test-function-bord">
                <p class="card-text test-card-text-title" style="margin-top: 0px"><strong>{{$t('test.function')}} {{num+1}}</strong></p>
                <p class="card-text test-card-text-title"><strong>{{ $t('run.selectFuc') }}</strong></p>
                <div style="display: flex;">
                  <select class="form-control test-card-select test-card-select-function-name" v-model="optionId[num]" @change="getParameter(optionId[num],num)">
                    <option disabled selected >{{$t('run.selectFucOption')}}</option>
                    <option v-for="(abiVal,index) in compileInfo.abi.functions"
                            :value="index"
                            v-if="abiVal.name !== 'Main'">
                      {{abiVal.name }}
                    </option>
                  </select>
                  <p class="card-text test-title-text test-title-test-run-function"><input type="checkbox" v-model="testFunctions.isRun[num]" /><strong style="margin-left: 4px">{{ $t('test.runThisFunc') }}</strong></p>
                </div>

                <div v-show="testFunctions.isRun[num]">
                  <div class="test-input-and-txt" v-for="parameter in testFunctions.params[num]" @change="changeParameterTypeTip(parameter)">
                    <select v-model="parameter.type" style="margin-right: 5px;">
                      <option value="ByteArray">ByteArray</option>
                      <option value="String">String</option>
                      <option value="Integer">Integer</option>
                      <option value="Boolean">Boolean</option>
                    </select>
                    <p class="card-text">{{parameter.name}}:</p>
                    <input class="run-input" v-model="parameter.value" :placeholder="parameter.typeTip" >
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
  import Sleep from './../../helpers/sleep'

  export default {
    name: "tool",
    data() {
      return {
        accountPrivateKey:'063441409768bb701301a44d67a7dbaf75d73479101c4241d7da2f8e9962840f',
        //accountPrivateKey:'',
        showAddAccountEdit:false,
        optionId: [''],
        functionName : '',
        functionParameters : [[]],
        addressId:[''],
        runStatus:false,
        testFunctions: {
          functionName: [''],
          params: [''],
          account:[''],
          isRun:[false],
          preExec: ['0'],
        },
        network:'0',
        testFunctionNum:[0],
        privateNet:'http://127.0.0.1:20334/',
      }
    },
    computed: {
      ...mapState({
        projectInfo: state => state.ProjectInfoPage.ProjectInfo,
        compileInfo: state => state.CompilePage.CompileInfo,
        runInfo : state => state.RunPage.RunInfo,
        testAccountInfo : state =>state.TestPage.testAccountInfo,
        deployInfo : state =>state.TestPage.DeployInfo,
        deployContractInfo: state =>state.TestPage.DeployContractInfo,
      })
    },
    created(){
      this.isShowAddAccountEdit()
      this.showTestFunctions()
    },
    watch: {
      compileInfo : function(newInfo, oldInfo) {
        this.showTestFunctions()
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
        if(this.compileInfo.abi.functions){
          this.emptyTestFunction()
          let functionCount = this.compileInfo.abi.functions.length
          for(let i = 0;i<functionCount;i++){
            this.addTestFunction(i)
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
        this.functionParameters.push('')
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
        this.functionParameters= []
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
        this.functionParameters.splice($functionId,1)
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
        let _self = this
        let i = 0
        var interval = setInterval(function(){
          if(i>_self.testFunctionNum.length-1){
            clearInterval(interval);
            this.runStatus = false;
            return;
          }
          let testFunction = {
            functionName: _self.testFunctions.functionName[i],
            params: _self.testFunctions.params[i],
            isRun: _self.testFunctions.isRun[i],
            preExec: _self.testFunctions.preExec[i],
            account: _self.testFunctions.account[i],
          }
          if(testFunction.isRun){
            _self.runContract(testFunction)
          }
          i = i+1
        }, 3000);
      },
      sleep(numberMillis) {
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
          now = new Date();
          if (now.getTime() > exitTime)
            return;
        }
      },
      runContract($testFunction) {
        this.runStatus = true;

        if(!this.runInfo.contractHash) {
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
          return;
        }
        //validate and format parameters
        const parameters = $testFunction.params.slice();
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


        let payerAddress = $testFunction.account.address
        let payerPri = $testFunction.account.privateKey
        const payer = new Ont.Crypto.Address(payerAddress)
        const privateKey = new Ont.Crypto.PrivateKey(payerPri)
        let util = Ont.utils
        const contractAddr = new Ont.Crypto.Address(util.reverseHex(contractHash));

        let _self = this
        try {
          if($testFunction.preExec==='0'){
            const tx = Ont.TransactionBuilder.makeInvokeTransaction($testFunction.functionName, $testFunction.params, contractAddr, '500', '20000',payer);
            Ont.TransactionBuilder.signTransaction(tx, privateKey);
            let res
            if(this.network === '0'){
              res = new Ont.RestClient().sendRawTransaction(tx.serialize(), false, false);
              console.log(new Ont.RestClient('http://dappnode1.ont.io/').getUrl())
            }else if(this.network === '1'){
              res = new Ont.RestClient().sendRawTransaction(tx.serialize(), false, false);
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
            const tx = Ont.TransactionBuilder.makeInvokeTransaction($testFunction.functionName, $testFunction.params, contractAddr, '500', '20000');
            let res
            if(this.network === '0'){
              res = new Ont.RestClient().sendRawTransaction(tx.serialize(), true, false);
              console.log(new Ont.RestClient('http://dappnode1.ont.io/').getUrl())
            }else if(this.network === '1'){
              res = new Ont.RestClient().sendRawTransaction(tx.serialize(), true, false);
            }else{
              res = new Ont.RestClient('http://127.0.0.1:20334/').sendRawTransaction(tx.serialize(), true, false);
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
        let testFunctionJson={
          defaultWallet:'' ,
          networks:'',
          password:'',
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
            host: "http://127.0.0.1",
            prot:20336
          }
        }
        testFunctionJson.networks = {
          defaultNet:defaultNet,
          testNet:{
            host: "http://polaris3.ont.io",
            prot:20336
          },
          mainNet:{
            host: "http://dappnode1.ont.io",
            prot:20336
          },
          privateNet:{
            host: "http://127.0.0.1",
            prot:20336
          }
        }

        let functionParams={}
        for(let i=0 ;i<this.testFunctionNum.length ;i++){
          let preExec
          if(this.testFunctions.preExec[i] === '0'){
            preExec = false
          }else{
            preExec = true
          }

          let params = {}
          console.log(this.testFunctions.params.length)
          for(let j=0 ;j<this.testFunctions.params.length ;j++){
            let param = {}
            param[this.testFunctions.params[i][j].name]=this.testFunctions.params[i][j].value
            console.log(param)

          }
          let functionParam ={}
          functionParam[this.testFunctions.functionName[i]] = {
            params: params,
            signers:'',
            preExec: preExec
          }
          console.log(functionParam)
        }
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
</style>
