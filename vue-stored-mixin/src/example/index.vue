<template>
  <div>
    <div class="margin">
      <input type="text" v-model="exampleField1">
    </div>
    <div class="margin">
      <input type="text" v-model="exampleField2">
    </div>
    <div class="margin">
      {{ exampleValue3 }}
    </div>
    <button @click="exampleActionHandler" class="margin">Example mutation</button>
    <div class="margin">
      {{ _changed }}
    </div>
  </div>
</template>

<script>
import Stored from '../mixin'
import ExampleModule from './store/module'
import { EXAMPLE_ACTION, EXAMPLE_GET } from './store/actions'

import fields from './fields'

const namespace = 'example-namespace'
const myMixin = Stored(namespace, fields, [ExampleModule])

// _namespaceAction - namespace helper
// _changed - fields which was updated

export default {
  mixins: [myMixin],
  computed: {
    exampleValue3() {
      return this.$store.getters[this._namespaceAction(EXAMPLE_GET)]
    }
  },
  methods: {
    exampleActionHandler() {
      this.$store.dispatch(this._namespaceAction(EXAMPLE_ACTION), 'Changed from mutation')
    }
  }
}
</script>

<style>
.margin {
  margin-top: 20px;
}
</style>
