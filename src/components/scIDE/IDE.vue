<template>
  <div class="container-fluid ide" >
    <div class="row ide-title">
      <div class="col-auto mr-auto row">
        <a class="nav-link ide-nav-link ide-nav-link-button " data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">{{$t('ide.file')}}</a>
        <div class="dropdown-menu ide-dropdown-menu" x-placement="bottom-start">
          <div class="dropdown-item ide-dropdown-item custom-file">
            <input type="file" id="codeFile" @change="onCodeFileChange" class="custom-file"/>
             <label class="ide-file-label" for="codeFile" ><i class="fa fa-folder-open-o ide-fa"></i>{{$t('ide.open')}}</label>
          </div>
          <div class="dropdown-item ide-dropdown-item custom-file">
            <label class="ide-file-label" @click="saveProject"><i class="fa fa-file-text-o ide-fa"></i>{{$t('ide.save')}}</label>
          </div>
        </div>
      </div>
      <label class="ide-project-file" id="ide-project-file">{{fileName}}</label>
      <div class="col align-self-center ide-txt col-auto">
        <!--<label>https://smart-contract.ont/sc-address/2Rx9ckd121</label>-->
        <!-- <i class="fa fa-mail-forward ide-fa-mail-forward" @click="share" :title="$t('ide.share')"></i> -->
      </div>
    </div>
    <div class="row ide-content">
      <!--      <div class="ide-structure col-lg-2 col-md-2 col-sm-2 col-xs-12">
              <project-structure></project-structure>
            </div>
            <div class="ide-ide col-lg-7 col-md-7 col-sm-7 col-xs-12">
              <project-ide></project-ide>
            </div>
            <div class="ide-operation col-lg-3 col-md-3 col-sm-3 col-xs-12">
              <project-operation></project-operation>
            </div>-->
      <div class="ide-ide col-lg-8 col-md-8 col-sm-8 col-xs-12">
        <project-ide v-on:isShowLoadingModal="isShowIdeLoadingModal" v-on:showPreDeployAndPreRun="isShowPreDeployAndPreRun"></project-ide>
      </div>
      <div class="ide-operation col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <project-operation :useChineseLanguage="isUseChineseLang" :ok='showPreDeployAndPreRun'></project-operation>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal" id="come-soon" tabindex="-1" role="dialog" >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Comming soon</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label class="ide-modal-text">Comming soon.....</label>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{$t('deploy.close')}}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal ide-modal" id="ide-loading" tabindex="-1" role="dialog" v-show="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{$t('ide.waiting')}}</h5>
            <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
            <!--<span aria-hidden="true">&times;</span>-->
            <!--</button>-->
          </div>
          <div class="modal-body">
            <label class="ide-modal-text">{{$t('ide.waitingInfo')}}</label>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>


    <div class="container_div"  @click="hideMask()" ><!-- 遮罩 -->
      <div id="bg"></div>
      <div id="show">
        <div id="ide-mask-editor" class="ide-mask-editor">
          <div class="popover fade show bs-popover-left ide-mask-editor-popover"  role="tooltip">
            <div class="arrow" style="top:34px"></div>
            <h1 class="popover-header">{{$t('ide.editorPopover')}}</h1>
            <div class="popover-body">{{$t('ide.editorPopoverInfo')}}</div>
          </div>
          <div id="ide-mask-operation" class="ide-mask-operation">
            <div class="popover fade show bs-popover-bottom ide-mask-operation-popover"  role="tooltip">
              <div class="arrow" style="left:124px"></div>
              <h1 class="popover-header">{{$t('ide.operationPopover')}}</h1>
              <div class="popover-body">{{$t('ide.operationPopoverInfo')}}</div>
            </div>
          </div>
        </div>
        <div id="ide-mask-output" class="ide-mask-output">
          <div class="popover fade show bs-popover-bottom ide-mask-output-popover"  role="tooltip">
            <div class="arrow" style="left:124px"></div>
            <h1 class="popover-header">{{$t('ide.outputPopover')}}</h1>
            <div class="popover-body">{{$t('ide.outputPopoverInfo')}}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import ProjectStructure from './ProjectStructure'
  import ProjectIde from './ProjectIde'
  import ProjectOperation from './ProjectOperation'
  import LangStorage from './../../helpers/lang'
  import {mapState} from 'vuex'
  import zh from './../../common/lang/zh'
  import en from './../../common/lang/en'


  export default {
    props: ['useChineseLanguage'],
    name: "ide",
    data(){
      return{
        fileName: '',
        codeFileInfo: '',
        isUseChineseLang: this.$i18n.locale === 'zh' ? true : false,
        isShowWasm:false,
        showPreDeployAndPreRun: false
      }
    },
    created(){
      this.showTopNavGreen()
    },
    mounted(){
      if(this.ProjectName.info.id) {
        $('#ide-loading').modal('show')
      }

    },
    components: {
      ProjectStructure,
      ProjectIde,
      ProjectOperation
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
        editor：''，
        projectList:{
          info:[{
            id:'',
            language:'',
            languageType:'',
            name:''
          }]
        },
       */
      ...mapState({
        projectInfo: state => state.ProjectInfoPage.ProjectInfo,
        ProjectName: state => state.ProjectInfoPage.ProjectName,
        editor: state => state.EditorPage.OntEditor,
        projectList: state => state.ProjectListPage.ProjectList,
      })
    },
    watch: {
      'useChineseLanguage':function (val,oldval) {
        this.isUseChineseLang = val
      }
    },
    methods: {
      saveProject(){
        let param={
          code: this.editor.getValue(),
          id: this.projectInfo.info.id,
        }
        this.$store.dispatch('saveProject', param)
      },
      isShowIdeLoadingModal($data){
        $('#ide-loading').modal('hide')
        if($.isEmptyObject(this.projectList.info)&&this.$route.params.isCreateProject){
          this.showMask()
        }
        //this.showMask()
      },
      isShowOutputWasm($data){
        this.isShowWasm=$data
      },
      isShowPreDeployAndPreRun($data){
        this.showPreDeployAndPreRun = $data
      },
      showMask(){
        document.getElementById("bg").style.display ="block";
        document.getElementById("show").style.display ="block";
      },
      hideMask(){
        document.getElementById("bg").style.display ="";
        document.getElementById("show").style.display ="";
      },
      showTopNavGreen(){
        this.$emit('isShowTopNav',false) //Show the white topnav or not //是否显示白色的topnav
        this.$emit('isShowLogoClick', false)//Show the logo click or not //是否使logo点击可返回
      },
      onCodeFileChange() {
        let files = document.getElementById("codeFile").files
        if (!files.length){
          this.FileName= 'Choose File'
          return
        }
        this.fileName = files[0].name
        this.codeFileInfo = files[0]
        this.checkFileType(this.codeFileInfo)
      },
      checkFileType($codeFileInfo){
        let fileNameType = this.fileName.substring(this.fileName.length-3,this.fileName.length)
        if((fileNameType === ".py"&&this.projectInfo.info.language === "1") ||
          (fileNameType === ".js"&&this.projectInfo.info.language === "3") ||
          (fileNameType === ".cs"&&this.projectInfo.info.language === "2")){

          document.getElementById('ide-project-file').style.color = 'black'
          this.readFile($codeFileInfo,this)

        }else{

          let lang = LangStorage.getLang('zh')
          if(lang === "zh"){
            this.fileName = zh.ide.fileWrong
          }else{
            this.fileName = en.ide.fileWrong
          }
          document.getElementById('ide-project-file').style.color = 'red'
        }
      },
      readFile($file,_self){
        var reader = new FileReader();
        reader.onload = function() {
          _self.editor.setValue(this.result)
        }
        reader.readAsText($file);
      },
      share(){
        $('#come-soon').modal('show')
      },
    }
  }
</script>
<style scoped>
  .ide{
    height: 100%;
    font-size: 12px !important;
    padding-top: 5px;
  }
  .ide-nav-link{
    margin-left: 15px;
    margin-bottom: 6px;
    color:black;
  }
  .ide-nav-link-button {
    border:1px solid #C4C3C3;
    min-width: 100%;
    height: 20px;
    color: black;
    text-align: center;
    padding: 0 4px 0 4px;
  }
  .ide-nav-link-button:hover,
  .ide-nav-link-button:active {
    background-color: #ECF0F1;
    color: black;
  }
  .ide-fa-mail-forward{
    cursor: pointer;
  }
  .ide-project-file{
    margin-left: 10px;
  }
  .ide-content{
    margin-top: -35px;
    padding-top: 30px;
    height: 100%;
  }
  .ide-txt{
    text-align: center;
    margin-right: 5px;
  }
  .ide-fa{
    width: 15px;
    margin: 0px 10px 0px 10px;
  }
  .ide-dropdown-menu{
    padding: 0;
  }
  .ide-dropdown-item{
    padding: 4px
  }
  .ide-structure{
    padding-right: 5px;
  }
  .ide-ide{
    padding-right: 0px;
  }
  .ide-operation{
    padding-left: 5px;
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
    border-left: 1px solid #BCBEC1;
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
    height: 20px;
    width: 100%;
  }
  .ide-modal{
    margin-top: 10%;
  }

  #bg{
    display: none;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index:1001;
    -moz-opacity: 0.3;
    opacity:.30;
    filter: alpha(opacity=30);
  }

  #show{
    display: none;
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    padding-top:75px;
    padding-left: 10px;
    z-index:1002;
    overflow: auto;
  }
  .ide-mask-editor{
    width: 66.7%;
    height: 69%;
    border: 2px solid white;
    z-index:1003;
  }
  .ide-mask-editor-popover{
    position: relative;
    margin-top: 7%;
    float:right;
    z-index:1004;
  }
  .ide-mask-output{
    margin-top: 0.6%;
    width: 66.7%;
    height: 29%;
    border: 2px solid white;
    z-index:1003;
  }
  .ide-mask-output-popover{
    position: relative;
    margin: 0 auto;
    margin-top: 8px;
    z-index:1004;
  }
  .ide-mask-operation{
    margin-top: 0.6%;
    width: 49.2%;
    height: 90px;
    margin-left: 100.2%;
    border: 2px solid white;
    z-index:1003;
  }
  .ide-mask-operation-popover{
    margin: 0 auto;
    margin-top: 182px;
    margin-left: 75%;
    z-index:1004;
  }
</style>
