import vuexModule from './store/module'
import { SET_INIT, GET_CHANGED } from './store/actions'
import { models, generate } from './store/utils'

export default (namespace, fields, customModules = [], destroy = true) => ({
  computed: {
    ...models(Object.keys(fields), namespace),
    _changed() {
      return this.$store.getters[this._namespaceAction(GET_CHANGED)]
    }
  },
  methods: {
    _namespaceAction(action) {
      return `${namespace}/${action}`
    }
  },
  created() {
    !this.$store.state[namespace] && this.$store.registerModule(namespace, generate([vuexModule, ...customModules]))
    this.$store.commit(this._namespaceAction(SET_INIT), fields)
  },
  beforeDestroy() {
    this.$store.state[namespace] && destroy && this.$store.unregisterModule(namespace)
  },
})
