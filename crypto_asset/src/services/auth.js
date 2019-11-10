import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { globalConstData } from './global'

Vue.use(Vuex)

export default {
  install: (Vue, options) => {
    Vue.prototype.$auth = {
      register: async (user) => {
        return new Promise((resolve, reject) => {
          const params = new URLSearchParams()
          for (const [key, value] of Object.entries(user)) {
            params.append(key, value)
          }
          params.append('e', 'register')
          axios({ url: globalConstData.auth_url, data: params, method: 'POST' })
            .then((resp) => {
              if (resp.data.status === 'SUCCESS') {
                resolve({
                  code: resp.data.status,
                  message: ''
                })
              } else {
                const result = {
                  code: resp.data.status,
                  message: resp.data.msg
                }
                reject(result)
              }
            })
            .catch((err) => {
              reject(err)
            })
        })
      },
      checkExistingEmail: async (email) => {
        return new Promise((resolve, reject) => {
          const params = new URLSearchParams()
          params.append('email', email)
          params.append('e', 'checkExistingEmail')
          axios({ url: globalConstData.auth_url, data: params, method: 'POST' })
            .then((resp) => {
              if (resp.data.status === 'SUCCESS') {
                resolve({
                  code: resp.data.status,
                  message: ''
                })
              } else {
                const result = {
                  code: resp.data.status,
                  message: resp.data.msg
                }
                reject(result)
              }
            })
            .catch((err) => {
              reject(err)
            })
        })
      },
      checkExistingUsername: async (username) => {
        return new Promise((resolve, reject) => {
          const params = new URLSearchParams()
          params.append('username', username)
          params.append('e', 'checkExistingUsername')
          axios({ url: globalConstData.auth_url, data: params, method: 'POST' })
            .then((resp) => {
              if (resp.data.status === 'SUCCESS') {
                resolve({
                  code: resp.data.status,
                  message: ''
                })
              } else {
                const result = {
                  code: resp.data.status,
                  message: resp.data.msg
                }
                reject(result)
              }
            })
            .catch((err) => {
              reject(err)
            })
        })
      },
      login: async (user) => {
        return new Promise((resolve, reject) => {
          const params = new URLSearchParams()
          for (const [key, value] of Object.entries(user)) {
            params.append(key, value)
          }
          params.append('e', 'login')
          axios({ url: globalConstData.auth_url, data: params, method: 'POST' })
            .then((resp) => {
              if (resp.data.status === 'SUCCESS') {
                store.commit('auth_success', resp.data.token)
                store.commit('auth_session', resp.data.sess)
                store.commit('auth_user', JSON.stringify(resp.data.user))
                // axios.defaults.headers.common['Authorization'] = resp.data.token
                resolve({
                  code: resp.data.status,
                  message: resp.data.msg
                })
              } else {
                const result = {
                  code: resp.data.status,
                  message: resp.data.msg
                }
                reject(result)
              }
            })
            .catch((err) => {
              store.commit('auth_error')
              reject(err)
            })
        })
      },
      sessionCheck: async () => {
        return new Promise((resolve, reject) => {
          const params = new URLSearchParams()
          params.append('e', 'sssToken')
          params.append('id', store.getters.id)
          params.append('token', store.getters.token)
          params.append('sess', store.getters.sess)
          
          axios({ url: globalConstData.auth_url, data: params, method: 'POST' })
            .then((resp) => {
              if (resp.data.status !== 'SUCCESS') {
                store.commit('session_timeout')
                router.push('/login')
              }
            })
            .catch((err) => {
              store.commit('auth_error')
              router.push('/login')
            })
        })
      },
      logout: async () => {
        return new Promise((resolve, reject) => {
          store.commit('logout')
          // delete axios.defaults.headers.common['Authorization']
          resolve(true)
        })
      },
    }
  },
}
