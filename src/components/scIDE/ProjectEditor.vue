<template>
  <div class="project-editor-div">

    <div class="project-editor-div">

      <div id="editorCSharp" class="project-editor" v-show="showEditorCSharp"></div>

      <div id="editorPython" class="project-editor" v-show="showEditorPython">from boa.interop.System.Runtime import Log

def Main(operation, args):
  if operation == 'Hello':
    msg = args[0]
    return Hello(msg)

  return False


def Hello(msg):
  Log(msg)
  return True
      </div>

      <div id="editorJavaScript" class="project-editor" v-show="showEditorJavaScript"></div>
      <small class="form-text text-muted">{{$t('ide.annotation')}}</small>
    </div>

  </div>
</template>

<script type="text/javascript">
import {PROJECT_LANGAUGE} from '../../helpers/consts'
import {mapState} from 'vuex'
import {SET_EDITOR} from '../../store/mutation-type'

  function toggleBreakpoint(_self, line) {
    let editor = _self.projectEditor;
    let session = editor.getSession();
    if (session.getBreakpoints()[line] === undefined) {
      session.setBreakpoint(line);
      if (_self.debug !== undefined) {
        _self.debug.addLineBreakpoint(line + 1);
      }
    } else {
      session.clearBreakpoint(line);
      if (_self.debug !== undefined) {
        _self.debug.removeLineBreakpoint(line + 1);
      }
    }
  }

  export default {
    name: "project-editor",
    data(){
      return{
        code : '',
        showEditorPython: false,
        showEditorCSharp: false,
        showEditorJavaScript: false,
      }
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
        projectEditor：''，
       */
      ...mapState({
        projectInfo: state => state.ProjectInfoPage.ProjectInfo,
        ProjectName: state => state.ProjectInfoPage.ProjectName,
        projectEditor: state => state.EditorPage.OntEditor,
        debug: state => state.RunPage.Debugger,
      })
    },
    watch: {
/*      '$route': 'getPage',*/
      'useChineseLanguage':function (val,oldval) {
        this.isUseChineseLang = val
      }
    },
    mounted() {
      //console.log(this.ProjectName)
      this.getEditor(this.ProjectName.info.language)
      let _self = this
      this.$store.dispatch('getProject', this.ProjectName).then(function (response) {
        //_self.projectEditor.setValue(_self.projectInfo.info.code || '')
        _self.$store.dispatch('getPublicLibraryProject').then(function(res){
          _self.$emit('isShowLoadingModal',false);
          _self.$store.dispatch('setHaveReCompile', true)
        })
      })

    },
    methods: {
      getCode(){
        let code = this.Editor.getValue()
        this.$store.dispatch('setProjectCode', code)
      },
      getEditor($codeLang) {
        let editor
        if ($codeLang === PROJECT_LANGAUGE.C_SHARP){
          this.showEditorCSharp = true
          editor = ace.edit("editorCSharp")
          editor.session.setMode("ace/mode/csharp")

        }else if($codeLang === PROJECT_LANGAUGE.PYTHON){
          this.showEditorPython = true
          editor = ace.edit("editorPython")
          editor.session.setMode("ace/mode/python")

        }else if($codeLang === PROJECT_LANGAUGE.JAVASCRIPT){
          this.showEditorJavaScript = true
          editor = ace.edit("editorJavaScript")
          editor.session.setMode("ace/mode/javascript")
        }

        editor.setTheme("ace/theme/crimson_editor")
        editor.setAutoScrollEditorIntoView(true)
        editor.setFontSize(16)
        editor.setOptions({
          enableBasicAutocompletion: true, //Auto prompt completion, shortcut CTRL +shift+space//自动提示补全，快捷键ctrl+shift+space
          enableSnippets: true,
          enableLiveAutocompletion: false,
          minLines: 2,

        })
        //Use CTRL+ALT+H to acess the hotkeys informations
        //CTRL+ALT+H可显示快捷键列表。
        editor.commands.addCommand({
          name: "showKeyboardShortcuts",
          bindKey: {win: "Ctrl-Alt-h", mac: "Command-Alt-h"},
          exec: function (editor) {
            ace.config.loadModule("ace/ext/keybinding_menu", function (module) {
              module.init(editor);
            })
          }
        })
        // Use F2 to toggle breakpoint
        editor.commands.addCommand({
          name: "toggleBreakpoint",
          bindKey: {win: "F2", mac: "F2"},
          exec: function (editor) {
            let selection = editor.getSelection();
            if (!selection.isMultiLine()) {
              let line = selection.getRange().start.row;
              toggleBreakpoint(_self, line);
            }
          }
        })
        // Use F8 to step over line
        let _self = this
        editor.commands.addCommand({
          name: "debugStepOverLine",
          bindKey: {win: "F8", mac: "F8"},
          exec: function (editor) {
            if (_self.debug !== undefined) {
              _self.debug.stepOverLine();
            }
          }
        })
        // Use F9 to continue running
        editor.commands.addCommand({
          name: "debugContinue",
          bindKey: {win: "F9", mac: "F9"},
          exec: function (editor) {
            if (_self.debug !== undefined) {
              _self.debug.continue();
            }
          }
        })

        //Listen for changes
        //监听改变事件:
        editor.getSession().on('change', function(e) {
          _self.$emit('showPreDeployAndPreRun',Math.random());
        });

        editor.on('guttermousedown', function(e) {
          toggleBreakpoint(_self, e.getDocumentPosition().row);
        });

        this.$store.commit({
           type : SET_EDITOR,
            editor : editor
        })
      },
    }
  }

</script>

<style scoped>
  .project-editor {
    width: 100%;
    height: 100%;
    font-size: 12px !important;
  }
  .project-editor-div{
    height: 100%;
  }
</style>
