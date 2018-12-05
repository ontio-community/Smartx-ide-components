<style scoped>
.json-editor-container {
    height:600px;
    display: flex;
    flex-direction: column;
}
.project-editor {
    width:100%;
    flex: 1;
}
.btn-container {
    margin-bottom: -15px;
    text-align: right;
}
</style>

<template>
    <div class="json-editor-container">
        <p v-if="paramType === 'Array'">Please use JSON array for parameter type "Array". Each item of array should contain "type" and "value". You
            can edit the array below. </p>
        <p v-if="paramType === 'Map'">Please use JSON object for parameter type "Map". Each item of map should contain "type" and "value". You
        can edit the JSON below. </p>

        <div id="editorJson" class="project-editor">
        </div>
        <div class="btn-container">
            <a-button @click="handleCancel">Cancel</a-button>
            <a-button @click="handleOk" type="primary">Ok</a-button>
        </div>
    </div>
</template>

<script>
const arrayCode = `[
    {
        "type": "String",
        "value": "hello"
    },
    {
        "type": "Integer",
        "value": 100
    },
    {
        "type": "Address",
        "value": "AUcy7kxmb1mZCveMcJTkXkbxHgsZL4FhYS"
    },{
        "type": "ByteArray",
        "value": "aabb"
    }
]` 
const mapCode = `{
	"key1": {
		"type": "String",
		"value": "hello2"
	},
	"key3": {
		"type": "Integer",
		"value": 100
	},
	"key4": {
		"type": "Boolean",
		"value": true
	},
	"key5": {
		"type": "Array",
		"value": [{
				"type": "String",
				"value": "hello"
			},
			{
				"type": "Integer",
				"value": 100
			}
		]
	},
	"key": {
		"type": "Map",
		"value": {
			"key": {
				"type": "String",
				"value": "hello2"
			},
			"key1": {
				"type": "Boolean",
				"value": true
			},
			"key3": {
				"type": "Integer",
				"value": 100
			}
		}
	}
}`
export default {
    name: 'JsonEditor',
    data() {
        return {
            editor:'',
            code: ''
        }
    },
    props: ['paramType', 'modalId'],
    mounted() {
        this.getEditor()
        const code = this.paramType === 'Array' ? arrayCode : mapCode;
        this.editor.setValue(code)
    },
    watch: {
        paramType: function(newType, oldType) {
            let code = newType === 'Array' ? arrayCode : mapCode;
            this.editor.setValue(code)
        }
    },
    methods: {
        getEditor($codeLang) {
            let langTools = ace.require("ace/ext/language_tools");

            let editor = ace.edit('editorJson')
            editor.session.setMode('ace/mode/json')

            editor.setTheme("ace/theme/crimson_editor")
            editor.setAutoScrollEditorIntoView(true)
            editor.setFontSize(16)
            editor.setOptions({
                enableBasicAutocompletion: true, //Auto prompt completion, shortcut CTRL +shift+space//自动提示补全，快捷键ctrl+shift+space
                enableSnippets: true,
                enableLiveAutocompletion: true,
                minLines: 2,
            })
            this.editor = editor;
        },
        handleCancel() {
            this.$store.commit('HIDE_COMMON_MODAL', {modalId: this.modalId})
            this.$emit('cancel') 
        },
        handleOk() {
            this.$store.commit('HIDE_COMMON_MODAL', {modalId: this.modalId})
            this.$emit('confirm', this.editor.getValue())          
        }
    }
}
</script>
