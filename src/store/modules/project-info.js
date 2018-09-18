import * as types from "../mutation-type"
import {PROJECT_LANGAUGE} from '../../helpers/consts'
import URL_API from "../../../config/prod.env";
import axios from "axios/index";

const getLanguageName = (language) => {
  let lang = ''
  switch (language) {
    case PROJECT_LANGAUGE.C_SHARP:
      lang = "CSharp"
      break;
    case PROJECT_LANGAUGE.PYTHON:
      lang = "Python"
      break;
    case PROJECT_LANGAUGE.JAVASCRIPT:
      lang = "JavaScript"
    case PROJECT_LANGAUGE.C:
      lang = "C"
      break;
    case PROJECT_LANGAUGE.CPP:
      lang = "Cpp"
      break;
    case PROJECT_LANGAUGE.RUST:
      lang = "Rust"
      break;
    default:
    throw new Error('No such language: '+lang)
      break;
  }
  return lang
}

export default {
  state: {
    ProjectName: {
      info: '',
    },
    ProjectInfo: {
      info: '',
    },
    ProjectTemplate:{
      info: '',
    },
    ProjectTemplateCode:{
      info:''
    },
    PublicLibraryProject:{
      info:''
    }
  },
  mutations: {
    [types.SET_PROJECT_NAME](state, payload) {
      state.ProjectName.info = payload.info
    },
    [types.SET_PROJECT_INFO](state, payload) {
      state.ProjectInfo.info = payload.info
    },
    [types.SET_PROJECT_TEMPLATE](state, payload) {
      state.ProjectTemplate.info = payload.info
    },
    [types.SET_PROJECT_TEMPLATE_CODE](state, payload) {
      state.ProjectTemplateCode.info = payload.info
    },
    [types.SET_PUBLIC_LIBRARY_PROJECT](state, payload) {
      state.PublicLibraryProject.info = payload.info
    },
  },
  actions: {
    setProjectName({dispatch, commit}, payload){
      commit({
        type: types.SET_PROJECT_NAME,
        info: payload
      })
    },
    setProjectInfo({dispatch, commit}, payload){
      commit({
        type: types.SET_PROJECT_INFO,
        info: payload
      })
    },
    makeProject({dispatch, commit}, payload) {

      const {projectName, language} = payload
      //TODO:
      let fileName = ''

      let lang = getLanguageName(language)

      let url = process.env.PROJECT_LIBRARY_URL + "/project/create"
      let param = {
        name: projectName,
        language: lang,
        type: payload.type
      }
      return axios.post(url,param).then(function(response){
        let projectInfo = response.data.data;
        //console.log(projectInfo)
        commit({
          type: types.SET_PROJECT_INFO,
          info: response.data.data
        })

        let project ={
          projectName : projectName,
          language : language,
          id: projectInfo.id
        }
        commit({
          type: types.SET_PROJECT_NAME,
          info: project
        })
      }).catch(err => {
        console.log(err)
      })
      /*sessionStorage.setItem('ProjectInfo', JSON.stringify(project))*/
    },
    getProject({dispatch, commit}, payload) {
      if(!payload.info.id){
        return
      }
      let url = process.env.PROJECT_LIBRARY_URL + "/project/" + payload.info.id
      return axios.get(url).then(function(response){
        //console.log(response.data.data)
        if(response.data.data && $.isEmptyObject(response.data.data.code)){
          if(response.data.data.language === "CSharp"){
            response.data.data.code = ` `
          }else if(response.data.data.language === "Python"){
            response.data.data.code = ` `
          }else if(response.data.data.language === "CSharp"){
            response.data.data.code = ` `
          }else if(response.data.data.language === "C"){
            response.data.data.code = ` `
          }else if(response.data.data.language === "CPlusPlus"){
            response.data.data.code = ` `
          }else if(response.data.data.language === "Rust"){
            response.data.data.code = ` `
          }
        }else{
          //compile info
          let abi = response.data.data.abi
          if(abi === '""') {
            abi = ''
          }
          if (response.data.data && response.data.data.type === "normal" && !$.isEmptyObject(response.data.data.abi)&&!$.isEmptyObject(response.data.data.nvm_byte_code)){
            let info = {
              abi: JSON.parse(response.data.data.abi),
              avm: response.data.data.nvm_byte_code,
              showCompileInfo: true,
              contractHash: response.data.data.contract_hash
            }

            commit({
              type: types.SET_COMPILE_INFO,
              result: info
            })
          }else if(response.data.data && response.data.data.type === "wasm"&& !$.isEmptyObject(response.data.data.wat)&&!$.isEmptyObject(response.data.data.nvm_byte_code)){
            commit({
              type: types.APPEND_WASM_OUTPUT,
              wast : response.data.data.wat,
              wasm : response.data.data.nvm_byte_code,
              showCompileInfo: true,
            })

            if(!$.isEmptyObject(response.data.data.abi)){
              commit({
                type: types.SET_WASM_ABI_FUNCTION_ABI,
                info: JSON.parse(response.data.data.abi),
              })
              console.log( JSON.parse(response.data.data.abi))
              commit({
                type: types.SET_WASM_ABI_FUNCTION,
                info: JSON.parse(response.data.data.abi).function
              })
            }
          } else{
            commit({
              type: types.CLEAR_COMPILE_INFO,
            })
          }

          //deploy info
          let info={
            name: response.data.data.info_name,
            version: response.data.data.info_version,
            author: response.data.data.info_author,
            email: response.data.data.info_email,
            desc: response.data.data.info_desc,
          }
          commit({
            type: types.SET_DEPLOY_CONTRACT_INFO,
            result: info
          })

          //run info
          let contractHash = response.data.data.contract_hash
          commit({
            type: types.SET_CONTRACT_HASH,
            info: contractHash
          })
        }
        commit({
          type: types.SET_PROJECT_INFO,
          info: response.data.data
        })

      }).catch(err => {
        console.log(err)
      })
    },
    getPublicLibraryProject({dispatch, commit}, payload) {
      let url = process.env.PROJECT_LIBRARY_URL + "/public-libs/list"
      let param= {
        language: "c"
      }
      return axios.post(url,param).then(function(response) {
        //console.log(response.data.data)
        commit({
          type: types.SET_PUBLIC_LIBRARY_PROJECT,
          info: response.data.data
        })
      })
    },
    saveProject({dispatch, commit},param) {
      if(param.id) {
        let url = process.env.PROJECT_LIBRARY_URL + "/project/update"
        return axios.post(url,param).then(function(response){
          let projectInfo = response.data.data;
          //console.log(projectInfo)
          commit({
            type: types.SET_PROJECT_INFO,
            info: response.data.data
          })
        }).catch(err => {
          console.log(err)
        })
      }
    },
    getProjectTemplate({dispatch, commit},$projectLanguage) {
      let url = process.env.PROJECT_LIBRARY_URL + "/template/list"
      let lang = getLanguageName($projectLanguage)

      let param = {
        language: lang
      }
      return axios.post(url,param).then(function(response){
        let projectTemplate = response.data.data;
        //console.log(projectTemplate)
        commit({
          type: types.SET_PROJECT_TEMPLATE,
          info: response.data.data
        })
      }).catch(err => {
        console.log(err)
      })
    },
    setProjectTemplate({dispatch, commit},$templateId) {

      if($templateId === "0"){
        commit({
          type: types.SET_PROJECT_TEMPLATE_CODE,
          info: ''
        })
        return null
      }else {
        let url = process.env.PROJECT_LIBRARY_URL + "/template/code"

        let param = {
          id: $templateId
        }
        return axios.post(url, param).then(function (response) {
          //console.log(response)
          commit({
            type: types.SET_PROJECT_TEMPLATE_CODE,
            info: response.data.data ? response.data.data.code : ''
          })
        }).catch(err => {
          console.log(err)
        })
      }
    },
  }
}
