<style scoped>
.run-input-and-txt{
    display: flex;
    flex-wrap: wrap;
  }
  .run-input{
    width: 50%;
    height: 24px;
    margin-left: 16px;
  }
  .run-input-radio {
    margin-left: 16px;
  }
  .array-param-item {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
  }
  .param-item-remove {
      font-size:18px;
      cursor: pointer;
      margin-left:10px;
  }
  .card-param-input {
      flex:1;
      display:flex;
      flex-direction: row;
  }
  .card-param-input textarea {
      flex:1;
  }
  .card-param-input input {
      flex:1;
  }

  .textarea-control-icon {
      font-size:18px;
      margin:5px;
      cursor: pointer;
  }
  .expand-textarea {
      height:200px;
  }
  .collapse-textarea {
      height:30px;
  }
</style>

<template>
    <div class="run-input-and-txt" >
        <select v-model="parameter.type" style="margin-right: 5px;height:30px;" @change="changeParameterTypeTip(parameter)">
            <option value="ByteArray">ByteArray</option>
            <option value="String">String</option>
            <option value="Integer">Integer</option>
            <option value="Boolean">Boolean</option>
            <option value="Address">Address</option>            
            <option value="Array">Array</option>     
            <option value="Map">Map</option>                
                       
        </select>
            <p class="card-text">{{parameter.name}}:</p>
            <span v-if="parameter.type === 'Boolean'" class="run-input-radio">
                <input type="radio" value="true" v-model="parameter.value" id="trueValue" :checked="parameter.value">
                <label for="trueValue">True</label>
                <input type="radio" value="false" v-model="parameter.value" id="falseValue" :checked="parameter.value">
                <label for="falseValue">False</label>
            </span>
            <!-- For parameter type is Array -->
            <div v-else-if="parameter.type === 'Array'" class="card-param-input">
                <a-icon type="caret-up"  class="textarea-control-icon" v-if="arrayParamControl" @click="handleArrayParamControl"/>
                 <a-icon type="caret-down"  class="textarea-control-icon" v-if="!arrayParamControl" @click="handleArrayParamControl" />
                <textarea name="" id=""  rows="10" :class="arrayParamControl?'expand-textarea': 'collapse-textarea' " v-model="parameter.value" ></textarea>
                <a-icon type="question-circle-o" class="textarea-control-icon" @click="showArrayTip" />
             </div>
             <div v-else-if="parameter.type === 'Map'" class="card-param-input">
                 <a-icon type="caret-up"  class="textarea-control-icon" v-if="mapParamControl" @click="handleMapParamControl"/>
                 <a-icon type="caret-down"  class="textarea-control-icon" v-if="!mapParamControl" @click="handleMapParamControl" />                 
                <textarea name="" id=""  rows="10" :class="mapParamControl?'expand-textarea': 'collapse-textarea' " v-model="parameter.value" ></textarea>
                <a-icon type="question-circle-o" class="textarea-control-icon" @click="showMapTip" />
             </div>
             <div v-else class="card-param-input">
                <input class="run-input" v-model="parameter.value"  :placeholder="parameter.typeTip" >
             </div>

             <common-modal :modalId="modalId" title="JSON Editor" :footer="null">
                 <json-editor :paramType="parameter.type" :modalId="modalId" :key="parameter.name" v-if="showJsonEditor"
                   @confirm="handleConfirmParam" @cancel="handleCancel"></json-editor>
             </common-modal>
    </div>
</template>

<script>
const Ont = require('ontology-ts-sdk');
import CommonModal from '../Modals/CommonModal'
import JsonEditor from '../Common/JsonEditor'
const uuidv4 = require('uuid/v4');
export default {
    name: 'ScParameter',
    components: {
        CommonModal,
        JsonEditor
    },
    data(){
        return {
            arrayParamControl: false,
            mapParamControl: false,
            paramTip: '',
            paramType: '',
            code: '',
            showJsonEditor: false,
            param: this.parameter,
            modalId: uuidv4()
        }
    },
    props:['parameter'],
    computed: {
        pType() {
            console.log('computed: ' + this.parameter.type)
            return this.parameter.type
        }
    },
    watch:{
        pType(newVal, oldVal) {
                console.log(oldVal)
                
                console.log(newVal)
            }

    },
    methods: {
        changeParameterTypeTip(parameter) {
            parameter.typeTip = this.getParameterTypeTip(parameter.type)
            // if(parameter.type === 'Array') {
            //     parameter.value = ''
            // } else if(parameter.type === 'Boolean') {
            //     parameter.value = false
            // } else {
            //     parameter.value = ''
            // }
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
            case 'Address' :
                typeTip = 'Enter base58 format address';
                break;
            default : {
            }
            }
            return typeTip;
        },
        handleDeleteParam(index) {
            this.parameter.value.splice(index, 1);
        },
        handleAddParam() {
            let o = new Ont.Parameter('arg'+this.parameter.value.length+1 , Ont.ParameterType.ByteArray, '')
            o.typeTip = this.getParameterTypeTip(o.type)
            this.parameter.value.push(o)
        },
        handleMapParamControl() {
            this.mapParamControl = !this.mapParamControl;
        },
        handleArrayParamControl() {
            this.arrayParamControl = !this.arrayParamControl;
        },
        showArrayTip() {  
            this.showJsonEditor = true  
            this.$store.commit('SHOW_COMMON_MODAL', {modalId: this.modalId})
        },
        showMapTip() {
            this.showJsonEditor = true
            this.$store.commit('SHOW_COMMON_MODAL', {modalId: this.modalId})
        },
        handleConfirmParam(param) {
            this.showJsonEditor = false
            this.parameter.value = param
        },
        handleCancel() {
            this.showJsonEditor = false
        }
    }
}
</script>

