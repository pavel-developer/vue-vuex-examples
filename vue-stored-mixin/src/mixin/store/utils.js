import Vue from 'vue'

export const update = (state, {key, value}) => Vue.set(state, key, value)

const storeFields = ['getters', 'mutations', 'actions']

export const generate = (stores) => {
  const actions = storeFields.reduce((acc, field) => 
    Object.assign(acc, { [field]: stores.reduce((storeAcc, store) => ({...storeAcc, ...store[field]}), {}) }), {})

  const state = () => stores.reduce((acc, store) =>
    Object.assign(acc, (typeof store.state == 'function') ? store.state() : store.state), {})

  return {...actions, state, namespaced: true}
}

export const models = (keys, namespace) =>
  keys.reduce((acc, key) => Object.assign(acc, {
    [key]: {
      get() {
        return namespace ? this.$store.state[namespace][key] : this.$store.state[key]
      },
      set(value) {
        this.$store.commit({ type: namespace ? `${namespace}/update` : 'update', key, value })
      }
    }
  }), {})
