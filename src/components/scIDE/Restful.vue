<template>
  <div class="restful-page restful-card-scroll-y">

    <div class="restful-card" >
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="restful-card-scroll-x">
          <div class="card-body restful-cart-body restful-card-text-nowrap" >
            <div>
              <p class="card-text restful-card restful-card-text-title" style="margin-top: 0px"><strong>{{ $t('test.selectNet') }}</strong></p>
              <label class="card-text"><input name="restfulNet" type="radio" v-model="network" value="0"/><strong style="margin-left: 4px">{{ $t('test.mainNet') }}</strong></label>
              <label class="card-text" style="margin-left: 8px"><input name="restfulNet" type="radio" v-model="network" value="1"/><strong style="margin-left: 4px">{{ $t('test.testNet') }}</strong></label>
              <label class="card-text test-title-text" style="margin-left: 8px"><input name="restfulNet" type="radio" v-model="network" value="2" @change="getPrivateNet"/><strong style="margin-left: 4px">{{ $t('restful.privateNet') }}</strong></label>
              <label class="test-private-net-input" v-show="network === '2'" >{{privateNet}}</label>

            </div>

          </div>
        </div>
      </div>
    </div>

    <div v-for="(restfulInfo,index) in restfulInfos" v-show="network!=='2'">
      <div class="restful-card" >
        <div class="card border-secondary mb-3" style="max-width: 20rem;">
          <div class="restful-card-scroll-x">
            <div class="card-body restful-cart-body restful-card-text-nowrap" >
              <p class="card-text-title">{{index+1}}.{{restfulInfo.description}}</p>
              <p class="restful-card-text"><span :class="[restfulInfo.type ==='GET' ? 'restful-card-text-get' : 'restful-card-text-post']">{{restfulInfo.type}}</span>:{{restfulInfo.urlDescribe}}</p>
              <div v-for="param in restfulInfo.params">
                <div class="restful-card-text">
                  <a>{{param.name}}:</a>
                  <input v-model="param.value"/>
                </div>
              </div>
              <button class="btn btn-outline-success restful-btn-submit" @click="sendMsgToRestful(index)" v-bind:disabled="!isShowRunButton">
                {{!isShowRunButton &&(connectingNum === index) ? $t('restful.waiting') : $t('restful.send')}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-for="(restfulInfo,index) in restfulInfos" v-show="network==='2'">
      <div  v-show="restfulInfo.dapi">
        <div class="restful-card" >
          <div class="card border-secondary mb-3" style="max-width: 20rem;">
            <div class="restful-card-scroll-x">
              <div class="card-body restful-cart-body restful-card-text-nowrap" >
                <p class="card-text-title">{{index+1}}.{{restfulInfo.description}}</p>
                <p class="restful-card-text"><span :class="[restfulInfo.type ==='GET' ? 'restful-card-text-get' : 'restful-card-text-post']">{{restfulInfo.type}}</span>:{{restfulInfo.urlDescribe}}</p>
                <div v-for="param in restfulInfo.params">
                  <div class="restful-card-text">
                    <a>{{param.name}}:</a>
                    <input v-model="param.value"/>
                  </div>
                </div>
                <button class="btn btn-outline-success restful-btn-submit" @click="sendMsgToRestfulByDapi(index)" v-bind:disabled="!isShowRunButton">
                  {{!isShowRunButton &&(connectingNum === index) ? $t('restful.waiting') : $t('restful.send')}}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal restful-modal" id="restful-success-model" tabindex="-1" role="dialog" v-show="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{$t('restful.modelSuccessTitle')}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <json-viewer :value="restfulSuccessInfo" :expand-depth=1></json-viewer>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary restful-dialog-btn" data-dismiss="modal">{{$t('restful.ok')}}</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {Restful} from '../../helpers/restful'
  import JsonViewer from 'vue-json-viewer'
  import LangStorage from './../../helpers/lang'
  import zh from './../../common/lang/zh'
  import en from './../../common/lang/en'
  import { client } from 'ontology-dapi';

  export default {
    name: "tool",
    data() {
      return {
        restfulInfos:'',
        restfulSuccessInfo:'',
        isShowRunButton:true,
        connectingNum:0,
        network:'1',
        privateNet:'',
      }
    },
    components: {
      JsonViewer,
    },
    created(){
      this.restfulInfos = Restful
    },
    methods: {
      getPrivateNet(){
        let msg = client.api.network.getNetwork()
        let _self = this
        msg.then(function(value) {
          if(value.type === 'MAIN'){
            _self.privateNet = "Main Net"
          }else if(value.type === 'TEST'){
            _self.privateNet = "Test Net"
          }else{
            _self.privateNet = value.address
          }
        })
      },
      sendMsgToRestful($num){
        let _self = this

        this.isShowRunButton = false
        this.connectingNum = $num
        let restfulInfo = this.restfulInfos[$num]

        let url
        if(this.network === '0'){
          url =process.env.RESTFUL_SERVER_MAIN+restfulInfo.url
        }else if(this.network === '1'){
          url =process.env.RESTFUL_SERVER_TEST+restfulInfo.url
        }

        if(restfulInfo.type === 'GET'){
          for(let i=0;i<restfulInfo.params.length;i++){
            if (restfulInfo.params[i].value === ''){
              _self.isShowRunButton = true
              let title = (LangStorage.getLang('zh') === "zh") ? zh.restful.errorTitle : en.restful.errorTitle
              let content = (LangStorage.getLang('zh') === "zh") ? zh.restful.noValue : en.restful.noValue
              _self.showErrorModel(title,content,true)
              return
            }
            if(restfulInfo.params[i].name !== 'raw'){
              url = url + restfulInfo.params[i].value
            }
          }
          for(let i=0;i<restfulInfo.params.length;i++){
            if(restfulInfo.params[i].name === 'raw'){
              url = url + '?raw='+restfulInfo.params[i].value
            }
          }
          console.log(url)

          $.ajax({
            type: restfulInfo.type,
            url: url,
            dataType: "json",
            success: function (response) {
              _self.isShowRunButton = true
              _self.restfulSuccessInfo = response
              console.log(_self.restfulSuccessInfo)
              $('#restful-success-model').modal('show')
            },
            error: function (data, textStatus, errorThrown) {
              _self.isShowRunButton = true
              console.log(data)
              let title = (LangStorage.getLang('zh') === "zh") ? zh.restful.errorTitle : en.restful.errorTitle
              let content = (LangStorage.getLang('zh') === "zh") ? zh.restful.errorContent : en.restful.errorContent
              _self.showErrorModel(title,content,true)
            },
            complete: function (XMLHttpRequest, textStatus) {
              _self.isShowRunButton = true
            }
          })

        }else if(restfulInfo.type === 'POST'){
          let param
          for(let i=0;i<restfulInfo.params.length;i++){
            if (restfulInfo.params[i].value === ''){
              _self.isShowRunButton = true
              let title = (LangStorage.getLang('zh') === "zh") ? zh.restful.errorTitle : en.restful.errorTitle
              let content = (LangStorage.getLang('zh') === "zh") ? zh.restful.noValue : en.restful.noValue
              _self.showErrorModel(title,content,true)
              return
            }
          }
          switch(restfulInfo.url)
          {
            case '/api/v1/transaction':
              param = {
                "Action":"sendrawtransaction",
                "Version":"1.0.0",
                "Data": restfulInfo.params[0].value
              }
              url = url + '?preExec='+restfulInfo.params[1].value
              console.log(url)
              break;

            default:
              return
          }

          $.ajax({
            type: restfulInfo.type,
            url: url,
            dataType: "json",
            data: JSON.stringify(param),
            success: function (response) {
              _self.isShowRunButton = true
              _self.restfulSuccessInfo = response
              console.log(_self.restfulSuccessInfo)
              $('#restful-success-model').modal('show')
            },
            error: function (data, textStatus, errorThrown) {
              _self.isShowRunButton = true
              console.log(data)
              let title = (LangStorage.getLang('zh') === "zh") ? zh.restful.errorTitle : en.restful.errorTitle
              let content = (LangStorage.getLang('zh') === "zh") ? zh.restful.errorContent : en.restful.errorContent
              _self.showErrorModel(title,content,true)
            },
            complete: function (XMLHttpRequest, textStatus) {
              _self.isShowRunButton = true
            }
          })
        }
      },
      sendMsgToRestfulByDapi($num){
        this.isShowRunButton = false
        this.connectingNum = $num
        let restfulInfo = this.restfulInfos[$num]

        let msg
        let param
        switch(restfulInfo.url)
        {
          case '/api/v1/block/height':
            msg = client.api.network.getBlockHeight()
            break;

          case '/api/v1/contract/':
            param = {
              hash:restfulInfo.params[0].value
            }
            msg = client.api.network.getContract(param)
            break;

          case '/api/v1/smartcode/event/transactions/':
            param = {
              value:restfulInfo.params[0].value
            }
            msg = client.api.network.getSmartCodeEvent(param)
            break;

          case '/api/v1/smartcode/event/txhash/':
            param = {
              value:restfulInfo.params[0].value
            }
            msg = client.api.network.getSmartCodeEvent(param)
            break;


          case '/api/v1/storage/':
            param={
              contract:restfulInfo.params[0].value,
              key:restfulInfo.params[1].value
            }
            msg = client.api.network.getStorage(param)
            break;

          case '/api/v1/balance/':
            param ={
              address:restfulInfo.params[0].value
            }
            msg = client.api.network.getBalance(param)
            break;

          case '/api/v1/unboundong/':
            param ={
              address:restfulInfo.params[0].value
            }
            msg = client.api.network.getUnboundOng(param)
            break;

          case '/api/v1/grantong/':
            param ={
              address:restfulInfo.params[0].value
            }
            msg = client.api.network.getGrantOng(param)
            break;

          case '/api/v1/block/details/height/':
            param ={
              block:parseInt(restfulInfo.params[0].value)
            }
            msg = client.api.network.getBlock(param)
            console.log(msg)
            break;

          case '/api/v1/node/connectioncount':
            msg = client.api.network.getNodeCount()
            break;

          case '/api/v1/block/transactions/height/':
            param ={
              height:restfulInfo.params[0].value
            }
            msg = client.api.network.getBlockTxsByHeight(param)
            break;


          case '/api/v1/block/details/hash/':
            param ={
              block:restfulInfo.params[0].value
            }
            msg = client.api.network.getBlock(param)
            break;

          case '/api/v1/block/hash/':
            param ={
              height:restfulInfo.params[0].value
            }
            msg = client.api.network.getBlockHash(param)
            break;

          case '/api/v1/transaction/':
            param ={
              txHash:restfulInfo.params[0].value
            }
            msg = client.api.network.getTransaction(param)
            break;

          case '/api/v1/block/height/txhash/':
            param ={
              hash:restfulInfo.params[0].value
            }
            msg = client.api.network.getBlockHeightByTxHash(param)
            break;

          case '/api/v1/merkleproof/':
            param = {
              txHash:restfulInfo.params[0].value
            }
            msg = client.api.network.getMerkleProof(param)
            break;

          case '/api/v1/gasprice':
            msg = client.api.network.getGasPrice()
            break;

          case '/api/v1/allowance/':
            param ={
              asset:restfulInfo.params[0].value,
              fromAddress:restfulInfo.params[1].value,
              toAddressl:restfulInfo.params[2].value
            }
            msg = client.api.network.getAllowance(param)
            break;

          case '/api/v1/mempool/txcount':
            msg = client.api.network.getMempoolTxCount()
            break;

          case '/api/v1/mempool/txstate/':
            param ={
              hash:restfulInfo.params[0].value
            }
            msg = client.api.network.getMempoolTxState(param)
            break;

          case '/api/v1/version':
            msg = client.api.network.getVersion()
            break;

          case '/api/v1/networkid':
            msg = client.api.network.getNetwork()
            break;

          default:
            this.isShowRunButton = true
            return
        }

        this.isShowRunButton = true

        let _self = this
        msg.then(function(value) {
          _self.restfulSuccessInfo = value
        })
        console.log(this.restfulSuccessInfo)
        $('#restful-success-model').modal('show')


      },
      showErrorModel($title,$content,$isShowCloseButton){
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
  .restful-page{
    margin-left: 5px ;
    margin-right: 5px;
    height: 100%;
  }
  .restful-card{
    margin-top: 5px;
  }
  .card{
    max-width: 100% !important;
    height: 100% !important;
    border-radius:0px;
    margin-bottom: 0px !important;
  }
  .card-header{
    background-color: white;
    text-align: center;
    color: #36a3bc;
    padding-top: 6px !important;
    padding-bottom: 6px !important;
  }
  .restful-card-text{
    margin-bottom: 8px;
  }
  .card-text-title{
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: bold;
  }
  .border-secondary{
    border-color: #C4C3C3 !important;
  }
  .restful-card-scroll-x{
    overflow-x:auto;
  }
  .restful-card-scroll-y{
    overflow-y:auto;
  }
  .restful-card-text-weight{
    font-weight: bold;
  }
  .restful-cart-body{
    padding: 15px 20px 15px 20px;
  }
  .restful-btn-submit {
    border-radius: 0;
    width: 100px;
    color: white;
    border-color: #36a3bc;
    background-color: #36a3bc;
    font-size: 10px;
    padding: 4px 9px;
  }
  .restful-btn-submit:hover,
  .restful-btn-submit:active {
    background-color: #36a3bc;
    color: white;
  }
  .restful-card-text-nowrap{
    white-space:nowrap;
  }
  .restful-modal{
    margin-top: 10%;
  }
  .restful-dialog-btn{
    background-color: #36a3bc;
    border-radius:0px;
  }
  .restful-dialog-btn-close{
    border-radius:0px;
  }
  .restful-card-text-title{
    font-size: 14px;
    margin-top: 8px;
  }
  .restful-card-text-get{
    color:#2aae79
  }
  .restful-card-text-post{
    color:#ffad0e
  }

</style>
