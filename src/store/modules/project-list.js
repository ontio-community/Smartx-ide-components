import * as types from "../mutation-type"
import {PROJECT_LANGAUGE} from '../../helpers/consts'
import URL_API from "../../../config/prod.env";
import axios from "axios/index";

export default {
  state: {
    ProjectList: {
      info: ''
    },
  },
  mutations: {
    [types.SET_PROJECT_LIST](state, payload) {
      state.ProjectList.info = payload.info
    }
  },
  actions: {
    getProjectList({dispatch, commit}) {
      let url = process.env.PROJECT_LIBRARY_URL + "/project/list"
      return axios.get(url).then(function(response){
        //console.log(response.data.data);
        let list = response.data.data
        let projectList = new Array(list.length)

        for(let i = 0 ; i< list.length ; i++){
          let projectInfo = {
            name: '',
            language: '',
            languageType: '',
            id: ''
          }
          projectInfo.name = list[i].name
          projectInfo.id = list[i].id
          if(list[i].language === "CSharp") {
            projectInfo.language = PROJECT_LANGAUGE.C_SHARP
            projectInfo.languageType = "C#"
          } else if (list[i].language === "Python") {
            projectInfo.language = PROJECT_LANGAUGE.PYTHON
            projectInfo.languageType = "Py"
          } else if (list[i].language === "JavaScript"){
            projectInfo.language = PROJECT_LANGAUGE.JAVASCRIPT
            projectInfo.languageType = "JS"
          } else if (list[i].language === "C") {
            projectInfo.language = PROJECT_LANGAUGE.C
            projectInfo.languageType = "C"
          } else if (list[i].language === "Cpp") {
            projectInfo.language = PROJECT_LANGAUGE.CPP
            projectInfo.languageType = "Cpp"
          } else if (list[i].language === "Rust") {
            projectInfo.language = PROJECT_LANGAUGE.RUST
            projectInfo.languageType = "Rust"
          }
          else {
            projectInfo.languageType = ""
          }
          projectList[i] = projectInfo
        }
        commit({
          type: types.SET_PROJECT_LIST,
          info: projectList
        })

      }).catch(err => {
        console.log(err)
      })

    },
    deleteProject({dispatch, commit},$param) {
      let url = process.env.PROJECT_LIBRARY_URL + "/project/del"
      return axios.post(url,$param).then(function(response){
        //console.log(response.data.data)


      }).catch(err => {
        console.log(err)
      })

    },
  }
}
