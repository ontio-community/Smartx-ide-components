<template>
  <div class="compile-page">
    <div class="compile-card">
      <button class="btn btn-outline-success compile-btn-submit"
              v-bind:disabled="waitingStatus"
              @click="doCompile"  data-toggle="tooltip" data-placement="bottom" :title="$t('compile.compileTooltips')">
        <i class="fa fa-play-circle compile-btn-fa"></i>
        {{waitingStatus ? $t('compile.waiting') : $t('compile.compile')}}
      </button>
    </div>

    <div class="compile-card card-abi" v-show="compileInfo.showCompileInfo">
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="card-header">
          <div class="row">
            <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 card-header-text">
              <div data-toggle="tooltip" data-placement="bottom" :title="$t('compile.abiTooltips')">{{$t('compile.abi')}}</div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
              <div @click="saveAbi"><i class="fa fa-download compile-fa-trash"></i></div>
            </div>
          </div>
        </div>

        <div class="compile-card-scroll">
          <div class="card-body" v-if="compileInfo.abi">
            <div>
              <label><strong>{{$t('compile.hash')}}</strong></label>
              <span>{{ compileInfo.contractHash }}</span>
            </div>

            <div>
              <label><strong>{{$t('compile.entryPoint')}}</strong></label>
              <span>{{ compileInfo.abi.entrypoint }}</span>
            </div>

            <div>
              <label><strong>{{$t('compile.functionList')}}</strong></label>
              <div class="function-list-margin function-code-style">
                <p v-for="abiVal in compileInfo.abi.functions">
                  <span v-if="abiVal.parameters.length === 0">
                    {{ abiVal.name + '( )' }}
                  </span>
                  <span v-else>
                    {{ abiVal.name + '('}}
                    <span v-for="(param, index) in abiVal.parameters">
                      {{ param.type + ' ' + param.name}}
                      <span v-if="index !== abiVal.parameters.length-1">{{', '}}</span>
                    </span>
                    {{ ')' }}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div class="card-body" v-else>
            <p class="card-text">{{$t('compile.noData')}}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="compile-card card-output-info" id="mmm" v-show="compileInfo.showCompileInfo">
      <div class="card border-secondary mb-3" style="max-width: 20rem;">
        <div class="card-header">
          <div class="row">
            <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10 card-header-text">
              <div data-toggle="tooltip" data-placement="bottom" :title="$t('compile.nvmTooltips')">{{$t('compile.outputInfo')}}</div>
            </div>
            <div class="row compile-avm-btn-div">
              <div @click="saveAVM"><i class="fa fa-download compile-fa-trash"></i></div>
              <div><button class="nav-link ide-nav-link compile-btn-copy" @click="copyAvm" data-clipboard-target="#compileAvm" ><i class="fa fa-copy compile-fa-trash"></i></button></div>
            </div>
          </div>
        </div>
        <div class="compile-card-scroll">
          <div class="card-body" v-if="compileInfo.avm">
            <!-- <p id="compileAvm" class="card-text">{{compileInfo.avm}}</p> -->
            <textarea name="avm" id="compileAvm" class="card-text" @change="setAvm" :value="compileInfo.avm"></textarea>
          </div>
          <div class="card-body" v-else>
            <!-- <p class="card-text">{{$t('compile.noData')}}</p> -->
            <textarea name="avm" id="compileAvm" class="card-text" @change="setAvm" :value="compileInfo.avm"></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="compile-card" v-show="compileInfo.showCompileInfo">
      <button class="btn btn-outline-success compile-btn-submit" @click="showDeploy">{{$t('compile.next')}}</button>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Clipboard from 'clipboard';
  import FileHelper from "./../../common/ont-wallet/file-generate-and-get";

  export default {
    props:["isRecompile"],
    name: "compile",
    data() {
      return {
        waitingStatus: false,
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
        editor：''，
       */
      ...mapState({
        projectInfo: state => state.ProjectInfoPage.ProjectInfo,
        projectName: state => state.ProjectInfoPage.ProjectName,
        compileInfo: state => state.CompilePage.CompileInfo,
        editor     : state => state.EditorPage.OntEditor,
      })
    },
    watch: {
      'isRecompile' : 'isShowCompilePage'
    },
    methods:{
      isShowCompilePage(){
        this.$router.push({ name:'IDE-Compile',params:{projectName:this.projectName.info.projectName}})
        this.$store.dispatch('setHaveReCompile', false)
      },
      setAvm(e) {
        const avm = e.target.value
        this.$store.dispatch('setAvm', avm)
      },
      doCompile(){
        this.waitingStatus = true
        let code = this.editor.getValue()
        if(!code) {
          //no source code
          this.waitingStatus = false
          return;
        }
        let payload = {
          code : code,
          type : this.projectInfo.info.language
        }
        let _self = this
        this.$store.dispatch('axiosCompile', payload).then(res => {
          _self.waitingStatus = false
          //save code to server

          let param = {
            id: _self.projectName.info.id,
            code: _self.editor.getValue(),
            nvm_byte_code: _self.compileInfo.avm,
            abi: JSON.stringify(_self.compileInfo.abi)
          }
          this.$store.dispatch('saveProject', param)
          this.$store.dispatch('setHaveReCompile', true)

        })
      },
      showDeploy(){
        this.$router.push({ name:'IDE-Deploy',params:{projectName:this.projectName.info.projectName}})
      },
      copyAvm(){
        let clipboard = new Clipboard('.nav-link');
      },
      saveAbi(){
        FileHelper.downloadFile(this.compileInfo.abi,"abi.json")
      },
      saveAVM(){
        const AVMName = this.projectName.info.projectName + '.avm'
        FileHelper.downloadFile(this.compileInfo.avm,AVMName)
      },
    }
  }
</script>

<style scoped>
  .compile-page{
    margin-left: 5px ;
    margin-right: 5px;
    height: 100%;
  }
  .compile-btn-submit {
     border-radius: 0;
     width: 100%;
     color: white;
     border-color: #36a3bc;
     background-color: #36a3bc;
    font-size: 10px;
    padding: 8px 17.6px;
   }
  .compile-btn-submit:hover,
  .compile-btn-submit:active {
    background-color: #36a3bc;
    color: white;
  }
  .compile-btn-copy {
    border-radius: 0;
    border:0px solid #C4C3C3;
    background-color: white;
    height: 20px;
    color: black;
    text-align: center;
    padding: 0 4px 0 4px;
    margin-left: 6px;
  }
  .compile-btn-copy:hover,
  .compile-btn-copy:active {
    border:0px solid #C4C3C3;
    background-color: white;
    color: black;
  }
  .compile-btn-copy:focus{
    background-color: white;
    color: black;
    box-shadow:none !important;
    outline: none !important;
  }

  .compile-btn-fa{
    margin-right: 10px;
  }
  .compile-card{
    margin-top: 5px;
  }

  .function-list-margin {
    margin-left: 15px;
  }
  .function-code-style {
    font-family: Monaco, Menlo, 'Ubuntu Mono', Consolas, source-code-pro, monospace;
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
  .border-secondary{
    border-color: #C4C3C3 !important;
  }
  .card-text{
    text-align: left;
    width:100%;
    height:200px;
  }
  .card-abi{
    height: 50%;
    margin-top: -65px;
    padding-top: 69px;
  }
  .card-output-info{
    height: 50%;
    margin-bottom: -21px;
    padding-bottom: 21px;
  }
  .compile-card-scroll{
    overflow-y:auto;
  }
  .card-header-text{
    padding-left: 20%;
    padding-top: 2px;
  }
  .compile-fa-trash{
    font-size: 18px;
    margin-top: 4px;
    cursor: pointer;
    color: black;
  }
  .compile-avm-btn-div{
    text-align: right;
    margin-left: 4%;
  }
</style>
