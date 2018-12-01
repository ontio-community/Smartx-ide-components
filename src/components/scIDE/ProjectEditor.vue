<template>
  <div class="project-editor-div">

    <div class="project-editor-div">

      <div id="editorCSharp" class="project-editor" v-show="showEditorCSharp"></div>

      <div id="editorPython" class="project-editor" v-show="showEditorPython">from boa.interop.System.Runtime import Notify
from boa.interop.System.Storage import Put, Get, GetContext

def Main(operation, args):
    if operation == 'name':
        return name()
    if operation == 'hello':
        if len(args) != 1:
            return False
        msg = args[0]
        return hello(msg)
    if operation == 'testHello':
        if len(args) != 5:
            return False
        msgBool = args[0]
        msgInt = args[1]
        msgByteArray = args[2]
        msgStr = args[3]
        msgAddress = args[4]
        return testHello(msgBool, msgInt, msgByteArray,msgStr,msgAddress)
    if operation == 'testList':
        if len(args) != 1:
            return False
        msgList = args[0]
        return testList(msgList)
    if operation == 'testListAndStr':
        Notify([args])
        if len(args) != 2:
            return False
        msgList = args[0]
        msgStr = args[1]
        return testListAndStr(msgList, msgStr)
    if operation == 'testStructList':
        Notify(args)
        structList = args[0]
        return testStructList(structList)
    if operation == 'testStructListAndStr':
        if len(args) !=2:
            return False
        structList = args[0]
        msgStr = args[1]
        return testStructListAndStr(structList,msgStr)
    if operation == 'testMap':
        msg = args[0]
        return testMap(msg)
    if operation == 'testGetMap':
        if len(args) != 1:
            return False
        key = args[0]
        return testGetMap(key)
    if operation == 'testMapInMap':
        msg = args[0]
        return testMapInMap(msg)
    if operation == 'testGetMapInMap':
        if len(args) != 1:
            return False
        key = args[0]
        return testGetMapInMap(key)
    if operation == 'transferMulti':
        states = args[0]
        return transferMulti(states)
    return False

def name():
    return 'name'

def hello(msg):
    return msg

def testHello(msgBool, msgInt, msgByteArray,msgStr,msgAddress):
    Notify(["testHello",msgBool, msgInt, msgByteArray,msgStr,msgAddress])
    resList = []
    resList.append(msgBool)
    resList.append(msgInt)
    resList.append(msgByteArray)
    resList.append(msgStr)
    resList.append(msgAddress)
    return resList

def testList(msgList):
    Notify(["testMsgList", msgList])
    return msgList

def testListAndStr(msgList, msgStr):
    Notify(["testListAndStr",msgList,msgStr])
    resList = []
    resList.append(msgList)
    resList.append(msgStr)
    return resList

def testStructList(structList):
    Notify(["testStructList", structList])
    return structList
def testStructListAndStr(structList, msgStr):
    Notify(["testStructListAndStr", structList, msgStr])
    resList = []
    resList.append(structList)
    resList.append(msgStr)
    return resList

def testMap(msg):
    map = msg
    mapInfo = Serialize(map)
    Put(GetContext(), 'map_key', mapInfo)
    return map['key']
def testGetMap(key):
    mapInfo = Get(GetContext(), 'map_key')
    map = Deserialize(mapInfo)
    return map[key]

def testMapInMap(msg):
    map = msg 
    mapInfo = Serialize(map)
    Notify(["mapInfo",mapInfo])
    mapInfo2 = Serialize(map['key'])
    Put(GetContext(), 'map_key2', mapInfo2)
    return mapInfo
def testGetMapInMap(key):
    mapInfo = Get(GetContext(), 'map_key2')
    Notify(["testGetMapInMap",mapInfo])
    map = Deserialize(mapInfo)
    return map[key]

def transfer(from_acct,to_acct,amount):
    return True
def transferMulti(args):
    """
    :param args: the parameter is an array, containing element like [from, to, amount]
    :return: True means success, False or raising exception means failure.
    """
    for p in args:
        if len(p) != 3:
            # return False is wrong
            raise Exception("transferMulti params error.")
        if transfer(p[0], p[1], p[2]) == False:
            # return False is wrong since the previous transaction will be successful
            raise Exception("transferMulti failed.")
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
    let document = session.getDocument();
    let text = document.getLine(line).trim();
    if (session.getBreakpoints()[line] === undefined && text.length > 0 && !text.startsWith("#")) {
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
        debugLine: state => state.RunPage.DebuggerLine,
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
        let langTools = ace.require("ace/ext/language_tools");

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
          enableLiveAutocompletion: true,
          minLines: 2,

        })

        langTools.addCompleter({
          getCompletions: function(editor, session, pos, prefix, callback) {
            callback(null, [
              {value: "boa.interop.Ontology.Attribute", meta: "class", score: 1000000},
              {value: "boa.interop.Ontology.Contract", meta: "class", score: 1000000},
              {value: "boa.interop.Ontology.Header", meta: "class", score: 1000000},
              {value: "boa.interop.Ontology.Native", meta: "class", score: 1000000},
              {value: "boa.interop.Ontology.Transaction", meta: "class", score: 1000000},
              {value: "boa.interop.System.Block", meta: "class", score: 1000000},
              {value: "boa.interop.System.Blockchain", meta: "class", score: 1000000},
              {value: "boa.interop.System.Contract", meta: "class", score: 1000000},
              {value: "boa.interop.System.ExecutionEngine", meta: "class", score: 1000000},
              {value: "boa.interop.System.Header", meta: "class", score: 1000000},
              {value: "boa.interop.System.Runtime", meta: "class", score: 1000000},
              {value: "boa.interop.System.Storage", meta: "class", score: 1000000},
              {value: "boa.interop.System.StorageContext", meta: "class", score: 1000000},
              {value: "boa.interop.System.Transaction", meta: "class", score: 1000000},
              {value: "AsReadOnly", meta: "func", score: 1000000},
              {value: "CheckWitness", meta: "func", score: 1000000},
              {value: "Create", meta: "func", score: 1000000},
              {value: "Delete", meta: "func", score: 1000000},
              {value: "Deserialize", meta: "func", score: 1000000},
              {value: "Destroy", meta: "func", score: 1000000},
              {value: "Get", meta: "func", score: 1000000},
              {value: "GetAttributes", meta: "func", score: 1000000},
              {value: "GetBlock", meta: "func", score: 1000000},
              {value: "GetCallingScriptHash", meta: "func", score: 1000000},
              {value: "GetConsensusData", meta: "func", score: 1000000},
              {value: "GetContext", meta: "func", score: 1000000},
              {value: "GetContract", meta: "func", score: 1000000},
              {value: "GetData", meta: "func", score: 1000000},
              {value: "GetEntryScriptHash", meta: "func", score: 1000000},
              {value: "GetExecutingScriptHash", meta: "func", score: 1000000},
              {value: "GetHash", meta: "func", score: 1000000},
              {value: "GetHash", meta: "func", score: 1000000},
              {value: "GetHeader", meta: "func", score: 1000000},
              {value: "GetHeight", meta: "func", score: 1000000},
              {value: "GetIndex", meta: "func", score: 1000000},
              {value: "GetMerkleRoot", meta: "func", score: 1000000},
              {value: "GetNextConsensus", meta: "func", score: 1000000},
              {value: "GetPrevHash", meta: "func", score: 1000000},
              {value: "GetReadOnlyContext", meta: "func", score: 1000000},
              {value: "GetScript", meta: "func", score: 1000000},
              {value: "GetScriptContainer", meta: "func", score: 1000000},
              {value: "GetStorageContext", meta: "func", score: 1000000},
              {value: "GetTime", meta: "func", score: 1000000},
              {value: "GetTimestamp", meta: "func", score: 1000000},
              {value: "GetTransaction", meta: "func", score: 1000000},
              {value: "GetTransaction", meta: "func", score: 1000000},
              {value: "GetTransactionCount", meta: "func", score: 1000000},
              {value: "GetTransactionHeight", meta: "func", score: 1000000},
              {value: "GetTransactions", meta: "func", score: 1000000},
              {value: "GetTrigger", meta: "func", score: 1000000},
              {value: "GetType", meta: "func", score: 1000000},
              {value: "GetUsage", meta: "func", score: 1000000},
              {value: "GetVersion", meta: "func", score: 1000000},
              {value: "Invoke", meta: "func", score: 1000000},
              {value: "Log", meta: "func", score: 1000000},
              {value: "Migrate", meta: "func", score: 1000000},
              {value: "Notify", meta: "func", score: 1000000},
              {value: "Put", meta: "func", score: 1000000},
              {value: "Serialize", meta: "func", score: 1000000}
            ]);
          }
        });

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
            if (_self.debugLine !== undefined) {
              let session = editor.getSession();
              session.removeGutterDecoration(_self.debugLine, 'ace_breakpoint_active');
            }
            if (_self.debug !== undefined) {
              _self.debug.stepOverLine();
            }
          }
        })
        editor.commands.addCommand({
          name: "debugStepOverOpcode",
          bindKey: {win: "F7", mac: "F7"},
          exec: function (editor) {
            if (_self.debugLine !== undefined) {
              let session = editor.getSession();
              session.removeGutterDecoration(_self.debugLine, 'ace_breakpoint_active');
            }
            if (_self.debug !== undefined) {
              _self.debug.stepOverOpcode();
            }
          }
        })
        // Use F9 to continue running
        editor.commands.addCommand({
          name: "debugContinue",
          bindKey: {win: "F9", mac: "F9"},
          exec: function (editor) {
            if (_self.debugLine !== undefined) {
              let session = editor.getSession();
              session.removeGutterDecoration(_self.debugLine, 'ace_breakpoint_active');
            }
            if (_self.debug !== undefined) {
              _self.debug.continue();
            }
          }
        })
        editor.commands.addCommand({
          name: "debugStop",
          exec: function (editor) {
            if (_self.debugLine !== undefined) {
              let session = editor.getSession();
              session.removeGutterDecoration(_self.debugLine, 'ace_breakpoint_active');
            }
            if (_self.debug !== undefined) {
              _self.debug.stop();
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
