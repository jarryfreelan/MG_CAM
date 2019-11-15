import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { globalConstData } from './global'

Vue.use(Vuex)

export default {
  install: (Vue, options) => {
    Vue.prototype.$api = {
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
          params.append('id', store.getters.id)
          params.append('token', store.getters.token)
          params.append('sess', store.getters.sess)
          axios({ url: globalConstData.api_url, data: params, method: 'POST' })
            .then(resp => {
              if(resp.data.status === 'TOKEN_FAIL') {
                store.commit('session_timeout')
                router.push('/login')
              } else if (resp.data.status === 'SUCCESS') {
                resolve(resp.data)
              } else {
                reject(resp.data)
              }
            })
            .catch(err => {
              store.commit('auth_error')
              router.push('/login')
              reject(err)
            })
        })
      },
    }
  },
}
