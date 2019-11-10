import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  state: {
    status: localStorage.getItem('caStatus') || '',
    token: localStorage.getItem('caToken') || '',
    sess: localStorage.getItem('caSess') || '',
    username: localStorage.getItem('caUsername') || '',
    email: localStorage.getItem('caEmail') || '',
    id: localStorage.getItem('caId') || '',
    phone: localStorage.getItem('caPhone') || '',
  },
  mutations: {
    auth_success(state, token) {
      state.status = 'success'
      state.token = token
      localStorage.setItem('caStatus', 'success')
      localStorage.setItem('caToken', token)
    },
    auth_session(state, sess) {
      state.sess = sess
      localStorage.setItem('caSess', sess)
    },
    auth_user(state, userJsonString) {
      const user = JSON.parse(userJsonString)
      state.username = user.username
      state.email = user.email
      state.phone = user.phone
      state.id = user.id
      localStorage.setItem('caUsername', user.username)
      localStorage.setItem('caEmail', user.email)
      localStorage.setItem('caPhone', user.phone)
      localStorage.setItem('caId', user.id)
    },
    auth_error (state) {
      state.status = 'error'
      state.token = ''
      state.username = ''
      state.email = ''
      state.phone = ''
      state.id = ''
      localStorage.setItem('caStatus', 'error')
      localStorage.removeItem('caToken')
      localStorage.removeItem('caUsername')
      localStorage.removeItem('caEmail')
      localStorage.removeItem('caPhone')
      localStorage.removeItem('caId')
    },
    session_timeout (state) {
      state.status = 'timeout'
      state.token = ''
      state.username = ''
      state.email = ''
      state.phone = ''
      state.id = ''
      localStorage.setItem('caStatus', 'error')
      localStorage.removeItem('caToken')
      localStorage.removeItem('caUsername')
      localStorage.removeItem('caEmail')
      localStorage.removeItem('caPhone')
      localStorage.removeItem('caId')
    },
    logout (state) {
      state.status = 'logout'
      state.token = ''
      state.username = ''
      state.email = ''
      state.phone = ''
      state.id = ''
      localStorage.setItem('caStatus', 'error')
      localStorage.removeItem('caToken')
      localStorage.removeItem('caUsername')
      localStorage.removeItem('caEmail')
      localStorage.removeItem('caPhone')
      localStorage.removeItem('caId')
    },
    UPDATE_USER(state, userJsonString) {
      const user = JSON.parse(userJsonString)
      state.username = user.username
      state.email = user.email
      state.phone = user.phone
      state.id = user.id
      localStorage.setItem('caUsername', user.username)
      localStorage.setItem('caEmail', user.email)
      localStorage.setItem('caPhone', user.phone)
      localStorage.setItem('caId', user.id)
    },
  },
  actions: {},
  getters: {
    username: state => state.username,
    email: state => state.email,
    phone: state => state.phone,
    id: state => state.id,
    token: state => state.token,
    sess: state => state.sess,
    isLoggedIn: state => (state.token.length) > 0,
    authStatus: state => state.status
  },
}
