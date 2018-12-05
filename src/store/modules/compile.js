import * as types from "../mutation-type"
import axios from 'axios'
import {PROJECT_LANGAUGE, OP_TYPE, VM_TYPE} from '../../helpers/consts'
let Ont = require('ontology-ts-sdk');
  /**
   * Clear junk characters and convert to JSON. lyx
   *
   * @param abi
   * @return {any}
   */
  function cleanData(data) {
    if (data && data.substr(0, 2) === "b'" && data.substr(-1, 1) === "'") {
      data = data.substring(2, data.length - 1)
    }
    return data
  }

 function cleanAndFormatAbi(abi) {
    while (abi && abi.indexOf('\\n') >= 0)
      abi = abi.replace('\\n', '');
      let result
      try {
        result = JSON.parse(abi)
      }catch(err) {
        result = {}
      }
    return result
  }
  function cleanAndFormatWasm($wasm){
    while ($wasm && $wasm.indexOf('(') >= 0)
      $wasm = $wasm.replace('(', ' ');
    while ($wasm && $wasm.indexOf(')') >= 0)
      $wasm = $wasm.replace(')', ' ');
    return $wasm
  }

  //errDetail starts with 'b'
  function cleanErrorDetail(errDetail) {
      if(errDetail && errDetail.indexOf('[C:')>0) {
        errDetail = errDetail.substring(1, errDetail.indexOf('[C:'))
      }
      errDetail = errDetail.replace('expected', '')
      errDetail = errDetail.replace('\\n', '')
      return 'Error: ' + errDetail
  }

  function getOutput(response) {
    if (/^\{.*\}$/.test(response)) { // Is JSON?
      try {
        const obj = JSON.parse(response);
        if (obj.success) {
          return '';
        } else {
          return (!obj.tasks ? '' :
            obj.tasks.map((t) => '===== ' + t.name + '\n' + t.console)
              .join('\n') + '\n') + 'ERROR: ' + obj.message;
        }
      } catch (e) {
        // Ignore invalid JSON
      }
      // Fall through
    }
    if (response.indexOf("(module") !== 0 &&
      response.indexOf("AGFzbQE") !== 0) {
      return response;
    } else {
      return '';
    }
  }

  function getAnnotations(response) {
    var output = getOutput(response);
    // Parse and annotate errors if compilation fails.
    var annotations = [];
    if (!output) {
      return annotations;
    }
    var re = /^.*?:(\d+?):(\d+?):(.*)$/gm;
    var m;
    while ((m = re.exec(output)) !== null) {
      if (m.index === re.lastIndex) {
        re.lastIndex++;
      }
      var line = parseInt(m[1]) - 1;
      var column = parseInt(m[2]) - 1;
      var message = m[3];
      annotations.push({
        row: line,
        column: column,
        text: message,
        type: message.indexOf("error") >= 0 ? "error" : "warning" // also warning and information
      });
    }
    return annotations;
  }

  function commitCompileWasmInfo(commit, info) {
    const {wast, avm, contrachHash, errdetail} = info
    commit({
      type: types.APPEND_WASM_OUTPUT,
      wast: wast,
      wasm: avm,
      showCompileInfo: true
    })
    commit({
      type: types.SET_COMPILE_INFO,
      result: info
    })
    commit({
      type: types.APPEND_OUTPUT_LOG,
      log: errdetail,
      op: OP_TYPE.Compile
    })
  }

  function commitCompileInfo(commit, info) {
    commit({
      type: types.SET_COMPILE_INFO,
      result: info
    })

    if (info.errdetail) {
      commit({
        type: types.APPEND_OUTPUT_LOG,
        log: cleanErrorDetail(info.errdetail),
        op: OP_TYPE.Compile
      })
    } else {
      commit({
        type: types.APPEND_OUTPUT_LOG,
        log: 'success',
        op: OP_TYPE.Compile
      })
    }
  }

function updateWatMemory(wast, watMemory) {
  const MEMORY_CODE_LEFT = '(memory $0'
  const MEMORY_CODE_RIGHT = ')'

  let index_left = wast.indexOf(MEMORY_CODE_LEFT)
  let index_right = wast.indexOf(MEMORY_CODE_RIGHT, index_left)
  const memory = `(memory $0 ${watMemory})`
  return wast.substring(0,index_left) + memory + wast.substring(index_right+1)
}

export default {
  state: {
    CompileInfo: {
      avm: '',
      abi: '',
      contractHash : '',
      errdetail: '',
      showCompileInfo: false,
      haveReCompile: false,
      functionParameters: {}
    },
  },
  mutations: {
    [types.SET_COMPILE_INFO](state, payload) {
      state.CompileInfo = payload.result
    },
    [types.CLEAR_COMPILE_INFO](state) {
      state.CompileInfo.avm = ''
      state.CompileInfo.abi = ''
      state.CompileInfo.errdetail = ''
      state.CompileInfo.contractHash = ''
      state.CompileInfo.showCompileInfo = false
    },
    [types.SET_AVM](state, payload){
      state.CompileInfo.avm = payload.avm
    },
    [types.HAVE_RE_COMPILE](state, payload){
      state.CompileInfo.haveReCompile = payload.info
    }
  },
  actions: {
    setHaveReCompile({dispatch, commit}, payload){
      commit({
        type: types.HAVE_RE_COMPILE,
        info : payload
      })
    },
    axiosCompile({dispatch, commit}, payload) {
      let url = ''
      if (payload.type === 'Python') {
        url = process.env.PYTHON_URL
      } else if(payload.type === 'CSharp') {
        url = process.env.CSHARP_URL
      }

      if (payload.type === 'C' || payload.type === 'Cpp' || payload.type === 'Rust') {
        url = 'http://wasmexplorer-service.herokuapp.com/service.php'
        let code = encodeURIComponent(payload.code).replace('%20', '+');
        let action = payload.type === 'C'? 'c2wast' : 'cpp2wast'
        let compilerVersion = '1'
        let options = '-O3 -std=C99'
        options = encodeURIComponent(options)
        let data = "input=" + code + "&action=" + action + "&version=" + compilerVersion + "&options=" + options
        let watMemory = payload.watMemory
        return $.ajax(
          {
            url: url,
            method: 'POST',
            data: data,
            contentType : 'application/x-www-form-urlencoded'
          }
        ).then(response => {
          //console.log(wast)
          let annotations = getAnnotations(response);
          if(annotations.length) {
            return Promise.reject(response);
          }
          let wast = response
          wast = updateWatMemory(wast, watMemory)
          return $.ajax(
            {
              url : url,
              method : 'POST',
              data : {
                input : wast,
                action : 'wast2wasm',
                options : '-O3 -std=C99'
              }
            }
          ).then( res => {
            return {
              wast : wast,
              wasm : res
            }
          })
        }).then(res => {
          var buffer = atob(res.wasm.split('\n', 2)[1]);
          var data = new Uint8Array(buffer.length);
          for (var i = 0; i < buffer.length; i++) {
            data[i] = buffer.charCodeAt(i);
          }
          //console.log(data)
          const avm = Ont.utils.ab2hexstring(data)
          const contractHash = Ont.Crypto.Address.fromVmCode(avm).serialize()
          let info = {
            avm : avm,
            wast : res.wast,
            contrachHash : contractHash,
            showCompileInfo : true,
            errdetail : 'Success'
          }
          commitCompileWasmInfo(commit, info)
          return res
        })
        .catch(err => {
          // console.log(err)
          let info = {
            avm: '',
            wast: '',
            contrachHash: '',
            showCompileInfo: true,
            errdetail: err
          }
          commitCompileWasmInfo(commit, info)
        })
      } else {
        const handleResponse = (res) => {
          if (typeof (res) === 'string') {
            res = JSON.parse(res)
          }
          let { avm, errcode, abi, errdetail, debug, opcode, funcmap } = res
          //console.log(res)
          let contractHash = ''
          if (avm && abi) {
            avm = cleanData(avm)
            abi = cleanAndFormatAbi(cleanData(abi))
            contractHash = Ont.Crypto.Address.fromVmCode(avm).toHexString()
          }
          if (debug) {
            debug = JSON.parse(debug);
          }
          if (funcmap) {
            funcmap = JSON.parse(funcmap);
          }
          let info = {
            avm,
            abi,
            contractHash,
            debug,
            opcode,
            funcmap,
            showCompileInfo: true,
            errdetail : errdetail
          }
          commitCompileInfo(commit, info)
        }
        // to handle server cors
        return $.ajax(
          {
            url: url,
            method: 'POST',
            data: JSON.stringify(payload)
          }
        ).then(res => {
          handleResponse(res)
          return res.data
        }).catch(err => {
          let info = {
            avm : '',
            abi : '',
            contractHash : '',
            opcode : '',
            showCompileInfo : true,
            errdetail : 'Network error'
          }
          commitCompileInfo(commit, info)
        })
      }
    },


    clearCompileInfo({dispatch, commit}){
      commit({
        type: types.CLEAR_COMPILE_INFO,
      })
    },
    setAvm({dispatch, commit}, avm) {
      commit({
        type: types.SET_AVM,
        avm : avm
      })
    }

  }
}
