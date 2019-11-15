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
    country: localStorage.getItem('caCountry') || '',
    authOtp: localStorage.getItem('caAuthOtp') || '',
    authCode: localStorage.getItem('caAuthCode') || '',
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
      state.country = user.country
      state.authOtp = user.authOtp
      state.authCode = user.authCode
      localStorage.setItem('caUsername', user.username)
      localStorage.setItem('caEmail', user.email)
      localStorage.setItem('caPhone', user.phone)
      localStorage.setItem('caId', user.id)
      localStorage.setItem('caCountry', user.country)
      localStorage.setItem('caAuthOtp', user.authOtp)
      localStorage.setItem('caAuthCode', user.authCode)
    },
    auth_error (state) {
      state.status = 'error'
      state.token = ''
      state.username = ''
      state.email = ''
      state.phone = ''
      state.id = ''
      state.country = ''
      state.authOtp = ''
      state.authCode = ''
      localStorage.setItem('caStatus', 'error')
      localStorage.removeItem('caToken')
      localStorage.removeItem('caUsername')
      localStorage.removeItem('caEmail')
      localStorage.removeItem('caPhone')
      localStorage.removeItem('caId')
      localStorage.removeItem('caCountry')
      localStorage.removeItem('caAuthOtp')
      localStorage.removeItem('caAuthCode')
    },
    session_timeout (state) {
      state.status = 'timeout'
      state.token = ''
      state.username = ''
      state.email = ''
      state.phone = ''
      state.id = ''
      state.country = ''
      state.authOtp = ''
      state.authCode = ''
      localStorage.setItem('caStatus', 'error')
      localStorage.removeItem('caToken')
      localStorage.removeItem('caUsername')
      localStorage.removeItem('caEmail')
      localStorage.removeItem('caPhone')
      localStorage.removeItem('caId')
      localStorage.removeItem('caCountry')
      localStorage.removeItem('caAuthOtp')
      localStorage.removeItem('caAuthCode')
    },
    logout (state) {
      state.status = 'logout'
      state.token = ''
      state.username = ''
      state.email = ''
      state.phone = ''
      state.id = ''
      state.country = ''
      state.authOtp = ''
      state.authCode = ''
      localStorage.setItem('caStatus', 'error')
      localStorage.removeItem('caToken')
      localStorage.removeItem('caUsername')
      localStorage.removeItem('caEmail')
      localStorage.removeItem('caPhone')
      localStorage.removeItem('caId')
      localStorage.removeItem('caCountry')
      localStorage.removeItem('caAuthOtp')
      localStorage.removeItem('caAuthCode')
    },
    UPDATE_USER(state, userJsonString) {
      const user = JSON.parse(userJsonString)
      state.username = user.username
      state.email = user.email
      state.phone = user.phone
      state.id = user.id
      state.country = user.country
      state.authOtp = user.authOtp
      state.authCode = user.authCode
      localStorage.setItem('caUsername', user.username)
      localStorage.setItem('caEmail', user.email)
      localStorage.setItem('caPhone', user.phone)
      localStorage.setItem('caId', user.id)
      localStorage.setItem('caCountry', user.country)
      localStorage.setItem('caAuthOtp', user.authOtp)
      localStorage.setItem('caAuthCode', user.authCode)
    },
  },
  actions: {},
  getters: {
    username: state => state.username,
    email: state => state.email,
    phone: state => state.phone,
    id: state => state.id,
    country: state => state.country,
    token: state => state.token,
    sess: state => state.sess,
    isLoggedIn: state => (state.token.length) > 0,
    authStatus: state => state.status,
    authOtp: state => state.authOtp,
    authCode: state => state.authCode
  },
}
