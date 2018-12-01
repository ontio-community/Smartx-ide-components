// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App'
import router from './router'
import store from './store/index'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import VueI18n from 'vue-i18n'
import LangStorage from './helpers/lang'

import zh from './common/validate/zh'
import en from './common/validate/en'
import VeeValidate, { Validator } from 'vee-validate'

import { Button, Modal, message, Table, Icon, Popconfirm, Select, Input, Spin } from 'ant-design-vue';
import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer)

Vue.component(Button.name, Button)
Vue.component(Modal.name, Modal)
Vue.component(Table.name, Table)
Vue.component(Icon.name, Icon)
Vue.component(Popconfirm.name, Popconfirm)
Vue.component(Select.name, Select)
Vue.component(Select.Option.name, Select.Option)
Vue.component(Input.name, Input)
Vue.component(Spin.name, Spin);

import VueCookies from 'vue-cookies'

import $ from 'jquery'
import 'font-awesome/css/font-awesome.css'

import URL_API from "../config/prod.env";
import index from 'axios';
import {client} from 'ontology-dapi';

client.registerClient({});

/**
 * Vee Validate
 * zh_CN
 * Front-end Input need the field：data-vv-as
 */
Validator.localize('zh', zh);
Validator.localize('en', en)
Vue.use(VeeValidate, {
  locale: LangStorage.getLang('en')
})

Vue.use(VueAxios, Axios)

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: LangStorage.getLang('en'),  // 语言标识
  messages: {
    'zh': require('./common/lang/zh'),
    'en': require('./common/lang/en')
  }
})

Vue.use(VueCookies)

Vue.config.productionTip = false

/**
 * Set required for JWT user authentication http Authorization head info.
 */
Axios.interceptors.request.use(function (config) {
  let url = config.url

  let isGithubApi = url.indexOf(process.env.GITHUB_GET_USER_INFO)//if = 0,is github url //如果为零0，是github链接，不加头部

  if(VueCookies.get("token") && isGithubApi !=0) {
    // Bearer!!!After the need for a Space!!!
    config.headers['Authorization'] = 'Bearer' + ' ' + VueCookies.get("token")
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
