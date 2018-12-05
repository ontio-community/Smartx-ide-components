<style scoped>
.transform-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}
.transform-input  {
    width:100%;
    margin-bottom:10px;
}
.transform-input textarea {
    width: 100%;
}
.transform-icon {
    font-size:18px;
    margin-bottom:10px;
}
.transform-title {
    margin-bottom:5px;
    font-weight: bold;

}

</style>
<template>
    <div class="transform-container">
        <div class="transform-input">
            <p class="transform-title">Serialized Map data (Hex string) --> JSON</p>
            <textarea name="" id="" cols="30" rows="8" v-model="hex"></textarea>
        </div>
        <div class="transform-icon">
            <a-icon type="arrow-down" />
        </div>
        <div class="transform-input">      
            <json-viewer
                :value="map"
                :expand-depth=3
                copyable
                boxed
                sort></json-viewer>        
        </div>
        <div class="btn-container">
            <button class="btn  btn-submit" @click="transform">
              {{$t('tool.transform')}}
            </button>
            <button class="btn  btn-submit" @click="clear">
              {{$t('tool.clear')}}
            </button>
        </div>
    </div>
</template>

<script>
const Ont  = require('ontology-ts-sdk')
function mapToObj(map) {
    let obj = Object.create(null);
    for (let [k, v] of map.entries()) {
        if(v.entries && !Array.isArray(v)) {
            obj[k] = mapToObj(v)
        } else {
            obj[k] = v
        }
        
    }
    return obj
}

function formatMapObj(obj) {
    for(let k of Object.keys(obj)) {
        obj[k] = formatItem(obj[k])
    }
    return obj;
}

function formatItem(v) {
    let val;
    if(typeof v === 'string') {
            val = {
                type: 'String',
                value: Ont.utils.hexstr2str(v)
            }
    } else if (typeof v === 'number') {
        val = {
            type: 'Integer', // Not support Long now
            value: v
        }
    } else if (typeof v === 'boolean') {
        val = {
            type: 'Boolean',
            value: v
        }
    } else if(Array.isArray(v)) {
        val = {
            type: 'Array',
            value: v.map(i => formatItem(i))
        }
    } else if(typeof v === 'object') {
        Object.keys(v).forEach(i => v[i] = formatItem(v[i]))
        val = {
            type: 'Map',
            value: v
        }
    }
    return val;
}

function formatByteArrayVal(obj) {
    for(let k of Object.keys(obj)) {
        obj[k] = formatByteArrayItem(obj[k])
    }
    return obj;
}

function formatByteArrayItem(v) {
    if(typeof v === 'string') {
        v = Ont.utils.hexstr2str(v);
    } else if(Array.isArray(v)) {
        v = v.map( i => formatByteArrayItem(i));
    } else if (typeof v === 'object') {
        Object.keys(v).forEach(i => v[i] = formatByteArrayItem(v[i]))
    }
    return v;
}

export default {
    name: 'DeserializeItem',
    data() {
        return {
            hex: `820500036b6579820300036b6579000668656c6c6f3200046b657931010100046b65793302016400046b657931000668656c6c6f3200046b65793302016400046b657934010100046b6579358002000568656c6c6f020164`,
            map: {}
        }
    },
    methods: {
        transform() {
            if(this.hex) {
                this.map = '';
                if(!Ont.utils.isHexString(this.hex)){
                    this.$message.error('Invalid hex string.')
                    return;
                }
                const mapObj = Ont.ScriptBuilder.deserializeItem(new Ont.utils.StringReader(this.hex))
                const map = mapToObj(mapObj)
                // const obj = formatMapObj(map)
                // this.map = JSON.parse(JSON.stringify(obj))
                const obj = formatByteArrayVal(map)
                this.map = obj;
            } else if (this.map) {

            } else {
                return;
            }
        },
        clear() {
            this.hex = '';
            this.map = ''
        }
    }
}
</script>
