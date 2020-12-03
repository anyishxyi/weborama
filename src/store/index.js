/*eslint no-unused-vars: ["error", { "args": "none" }]*/
import Vue from 'vue'
import Vuex from 'vuex'
// import getters from './getters'
import axios from "axios"

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  modules,
  // getters,
  state: {
    userData: null
  },
  mutations: {
    SET_USER_DATA(state, data) {
      state.userData = data
      console.log('state.userData :', state.userData)
      localStorage.setItem('userData', JSON.stringify(state.userData))
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.userData.token
    },
    CLEAR_USER_DATA() {
      localStorage.removeItem('userData')
      location.reload()
    }
  },
  actions: {
    getUserData({ commit }, username) {
      return axios.get(`https://api.github.com/users/${username}`)
    }
  },
  getters: {
    loggedIn(state) {
      return !!state.userData
    }
  }
})
