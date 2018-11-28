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
  }
  .param-item-remove {
      font-size:18px;
      cursor: pointer;
      margin-left:10px;
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
            </select>
            <p class="card-text">{{parameter.name}}:</p>
            <span v-if="parameter.type === 'Boolean'" class="run-input-radio">
                <input type="radio" value="true" v-model="parameter.value" id="trueValue" :checked="parameter.value">
                <label for="trueValue">True</label>
                <input type="radio" value="false" v-model="parameter.value" id="falseValue" :checked="parameter.value">
                <label for="falseValue">False</label>
            </span>
            <!-- For parameter type is Array -->
            <div v-if="parameter.type === 'Array'">
                <textarea name="" id="" cols="30" rows="10" v-model="parameter.value" :placeholder="arrayParamExample"></textarea>
             </div>
            <input v-if="parameter.type !== 'Boolean' && parameter.type !== 'Array' " class="run-input" v-model="parameter.value" :placeholder="parameter.typeTip" >
    </div>
</template>

<script>
const Ont = require('ontology-ts-sdk');
export default {
    name: 'ScParameter',
    data(){
        return {
            arrayParamExample: `Enter JSON array.Each item should contain type and value.For example:
[
    {
        "type": "Integer",
        "value": 1
    }
]`
        }
    },
    props:['parameter'],
    methods: {
        changeParameterTypeTip(parameter) {
            parameter.typeTip = this.getParameterTypeTip(parameter.type)
            if(parameter.type === 'Array') {
                parameter.value = []
            } else if(parameter.type === 'Boolean') {
                parameter.value = false
            } else {
                parameter.value = ''
            }
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
        }
    }
}
</script>

