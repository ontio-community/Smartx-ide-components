<template>
  <div class="pro-output-container">
    <div class="pro-output-container">
      <div class="row">
        <div class="col-auto pro-output-btn-left">
          <button class="btn btn-sm btn-outline-secondary pro-output-btn-event" @click="showLogPage" :class="[showLog ? 'pro-output-button-click' : '']">{{ $t('project.logs')}}</button>
        </div>
        <div class="col-auto pro-output-btn-center">
          <button class="btn btn-sm btn-outline-secondary pro-output-btn-event" @click="showEvaluationStackPage" :class="[showEvaluationStack ? 'pro-output-button-click' : '']">{{ $t('project.evaluationStack')}}</button>
        </div>
        <div class="col-auto pro-output-btn-center">
          <button class="btn btn-sm btn-outline-secondary pro-output-btn-event" @click="showAltStackPage" :class="[showAltStack ? 'pro-output-button-click' : '']">{{ $t('project.altStack')}}</button>
        </div>
        <div class="col-auto pro-output-btn-center">
          <button class="btn btn-sm btn-outline-secondary pro-output-btn-event" @click="showHistoryPage" :class="[showHistory ? 'pro-output-button-click' : '']">{{ $t('project.history')}}</button>
        </div>
        <div class="col-auto mr-auto pro-output-btn-center">
          <button class="btn btn-sm btn-outline-secondary pro-output-btn-event" @click="showLocalsPage" :class="[showLocals ? 'pro-output-button-click' : '']">{{ $t('project.locals')}}</button>
        </div>
        <div class="col-auto pro-output-btn">
          <div @click="resume"><i class="fa fa-play pro-output-fa-trash"></i></div>
        </div>
        <div class="col-auto pro-output-btn">
          <div @click="stepOver"><i class="fa fa-level-down pro-output-fa-trash"></i></div>
        </div>
        <div class="col-auto pro-output-btn">
          <div @click="stepOverOpcode"><i class="fa fa-long-arrow-down pro-output-fa-trash"></i></div>
        </div>
        <div class="col-auto pro-output-btn">
          <div @click="cleanLog"><i class="fa fa-trash-o pro-output-fa-trash"></i></div>
        </div>
      </div>
      <div class="pro-output-border">
        <div v-show="showLog" id="pro-output-box" class="pro-output-content">
          <p v-for="(value, key) in output.logs" :key="key">
            {{value}}
          </p>
        </div>
        <div v-show="showEvaluationStack" id="pro-evaluationstack-box" class="pro-output-content">
          <p v-for="(value, key) in evaluationStack" :key="key">
            {{value.toString()}}
          </p>
        </div>
        <div v-show="showAltStack" id="pro-altstack-box" class="pro-output-content">
          <p v-for="(value, key) in altStack" :key="key">
            {{value.toString()}}
          </p>
        </div>
        <div v-show="showHistory" id="pro-history-box" class="pro-output-content">
          <p v-for="(value, key) in history" :key="key">
            {{value.instructionPointer}}: {{value.opName}} [{{value.evaluationStack.join(", ")}}]
          </p>
        </div>
        <div v-show="showLocals" id="pro-locals-box" class="pro-output-content">
          <p v-for="(value, key) in locals" :key="key">
            {{value.name}} = {{value.value.toString()}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {CLEAR_OUTPUT_EVENTS} from '../../store/mutation-type'
  import {CLEAR_OUTPUT_LOGS} from '../../store/mutation-type'
  import Clipboard from 'clipboard';

  export default {
    name: 'project-output',
    data() {
      return {
        showLog: true,
        showEvaluationStack: false,
        showAltStack: false,
        showHistory: false,
        showLocals: false
      }
    },

    created(){
      this.cleanLog()
    },
    computed: {
      ...mapState({
        output: state => state.ProjectOutput.OutputInfo,
        evaluationStack: state => state.RunPage.EvaluationStack,
        altStack: state => state.RunPage.AltStack,
        history: state => state.RunPage.History,
        locals: state => state.RunPage.Locals,
        wasmOutput: state => state.ProjectWASMOutput.WASMOutputInfo,
        projectEditor: state => state.EditorPage.OntEditor,
      })
    },

    methods:{
      showLogPage() {
        this.showLog = true;
        this.showEvaluationStack = false;
        this.showAltStack = false;
        this.showHistory = false;
        this.showLocals = false;
      },
      showEvaluationStackPage() {
        this.showLog = false;
        this.showEvaluationStack = true;
        this.showAltStack = false;
        this.showHistory = false;
        this.showLocals = false;
      },
      showAltStackPage() {
        this.showLog = false;
        this.showEvaluationStack = false;
        this.showAltStack = true;
        this.showHistory = false;
        this.showLocals = false;
      },
      showHistoryPage() {
        this.showLog = false;
        this.showEvaluationStack = false;
        this.showAltStack = false;
        this.showHistory = true;
        this.showLocals = false;
      },
      showLocalsPage() {
        this.showLog = false;
        this.showEvaluationStack = false;
        this.showAltStack = false;
        this.showHistory = false;
        this.showLocals = true;
      },
      stepOver() {
        this.projectEditor.execCommand("debugStepOverLine")
      },
      stepOverOpcode() {
        this.projectEditor.execCommand("debugStepOverOpcode")
      },
      resume() {
        this.projectEditor.execCommand("debugContinue")
      },
      cleanLog(){
        this.$store.commit({
          type : CLEAR_OUTPUT_EVENTS,
        });
        this.$store.commit({
          type : CLEAR_OUTPUT_LOGS,
        })
      },
      copy(){
        let clipboard = new Clipboard('.nav-link');
      },
      downloadWast(){
        if(!this.wasmOutput.wast){
          return;
        }
        let content = new Blob([this.wasmOutput.wast], { type: 'text/wat' })
        let urlObject = window.URL || window.webkitURL || window
        let url = urlObject.createObjectURL(content)
        let el = document.createElement('a')
        el.href = url
        el.download ="program.wast"
        document.body.appendChild(el)
        el.click()
        urlObject.revokeObjectURL(url)
      }
    }
  }

</script>

<style scoped>
  .pro-output-container {
    max-width: 100% ;
    min-width: 50%;
    height: 100%;
  }

  .pro-output-button-click {
    background-color: #D2D2D2;
  }

  .pro-output-btn-left {
    padding-right: 0px;
  }

  .pro-output-btn-center{
    padding-left: 0px;
    padding-right: 0px;
  }

  .pro-output-btn-event {
    width: 100px;
    height: 26px;
    margin-top: 1px;
    border-radius:0;
    color: black;
    font-size: 10px;

  }
  .pro-output-btn-selected {
    background: #cccccc;
    color: black;
    border-color: #C4C3C3;
  }
  .pro-output-border{
    height: 100%;
    margin-top: -26px;
    padding-top: 26px;
  }
  .pro-output-content {
    max-width: 100% !important;
    min-width: 100%;
    height: 100%;
    background: #cccccc;
    padding: 5px;
    overflow: auto;
  }
  .pro-output-content p {
    word-wrap: break-word;
    word-break: break-all;
  }
  .pro-output-fa-trash{
    font-size: 18px;
    margin-top: 7px;
    cursor: pointer;
  }

  .pro-output-btn{
    margin-right: 12px;
  }

</style>
