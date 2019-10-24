import Vue from 'vue'
import { 
  EXAMPLE_ACTION, 
  EXAMPLE_MUTATION, 
  EXAMPLE_GET 
} from './actions'

import fields from '../fields'
const exampleStoreFields = { exampleField3: 'example value 3' }

const state = { ...exampleStoreFields }

const getters = {
  [EXAMPLE_GET]: ({ exampleField3 }) => exampleField3
}
const mutations = {
  [EXAMPLE_MUTATION]: (state, { key, value }) => Vue.set(state, key, value)
}

const actions = {
  [EXAMPLE_ACTION]: ({ commit }, value) => {
    Object.keys(fields).forEach((key) => commit('update', { key, value }))
    Object.keys(exampleStoreFields).forEach((key) => commit(EXAMPLE_MUTATION, { key, value }))
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}