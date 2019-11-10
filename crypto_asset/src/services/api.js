import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { globalConstData } from './global'

Vue.use(Vuex)

export default {
  install: (Vue, options) => {
    Vue.prototype.$api = {
      requestMenu: async () => {
        return new Promise((resolve, reject) => {
          // Call list of menu from backend server (php)
          axios({ url: globalConstData.db_url + '/menuDemo.php', method: 'POST' })
            .then(resp => {
              resolve(resp.data)
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      uploadFile: async (formData) => {
        return new Promise((resolve, reject) => {
          // Call list of menu from backend server (php)
          axios({ url: globalConstData.db_url + '/uploadDemo.php', data: formData, method: 'POST', headers: { 'Content-Type': 'multipart/form-data' } })
            .then(resp => {
              resolve(resp.data)
            })
            .catch(err => {
              reject(err)
            })
        })
      },
      apiRequest: async (object) => {
        return new Promise((resolve, reject) => {
          var params = new URLSearchParams()
          for (var [key, value] of Object.entries(object)) {
            if (typeof value === 'object') {
              for (var [key2, value2] of Object.entries(value)) {
                params.append(key2, value2)
              }
            } else {
              params.append(key, value)
            }
          }
          axios({ url: globalConstData.api_url, data: params, method: 'POST' })
            .then(resp => {
              resolve(resp.data)
            })
            .catch(err => {
              reject(err)
            })
        })
      },
    }
  },
}
