import Vue from 'vue'
import { SET_INIT, GET_CHANGED } from './actions'
import { update } from './utils'

const state = () => ({
  init: {}
})

const getters = {
  [GET_CHANGED]: (state) => Object.keys(state.init).reduce((acc, key) => 
    Object.assign(acc, state[key] != state.init[key] ? {[key]: state[key]} : {}), {})
}

const mutations = {
  update,
  [SET_INIT]: (state, payload) => Object.keys(payload).forEach((key) => {
    Vue.set(state, key, payload[key])
    Vue.set(state.init, key, payload[key])
  })
}

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}