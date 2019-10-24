<template>
  <div class="autocomplete" v-away>
    <div class="input" :class="{ opened }">
      <input class="input-text" type="text" v-model="input" :placeholder="placeholder" @input="opened = true">
      <div class="clear-image" v-if="canClear && !opened && input" @click="clear">
        <img src="../assets/clear.png" alt="">
      </div>
    </div>
    <div class="autocomplete-list" v-if="opened">
      <div class="autocomplete-item" v-for="item in filteredItems" :key="item[itemValue] || item" @click="select(item)"> 
        <slot name="item" :item="item"></slot>
      </div>
      <slot v-if="!filteredItems.length" name="not-found" :input="input"></slot>
    </div>
  </div>
</template>

<script>
import { lowerCaseMatch } from '../utils/common'
import Clickaway from '../utils/mixins/Clickaway'

export default {
  mixins: [Clickaway],
  data: () => ({
    input: ''
  }),
  props: {
    value: {},
    items: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ''
    },
    canClear: {
      type: Boolean,
      default: false
    },
    itemText: {
      type: String
    },
    itemValue: {
      type: String
    }
  },
  computed: {
    model: {
      get() {
        return this.value[this.itemText] || this.value
      },
      set(value) {
        this.$emit('input', value[this.itemValue] || value)
        this.input = value[this.itemText] || value
      }
    },
    filteredItems() {
      return this.items.filter((item) => !this.input || lowerCaseMatch((item[this.itemText] || item), this.input))
    }
  },
  methods: {
    select(item) {
      this.model = item
      this.opened = false
    },
    clear() {
      this.model = ''
      this.opened = true
    }
  }
}
</script>

<style>
.autocomplete {
  position: relative;
}

.input-text {
  border: none;
  outline: 0;
  height: 40px;
  width: 100%;
}

.input {
  position: relative;
  padding: 0 15px;
  border-radius: 2px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12);
}

.input.opened {
  border-radius: 0px;
  box-shadow: 0 0px 1px 0 rgba(0,0,0,.2), 0 0px 1px 0 rgba(0,0,0,.14), 0 0px 1px -1px rgba(0,0,0,.12);
}

.clear-image {
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
}

.clear-image img {
  width: 10px;
  height: 10px;
}

.autocomplete-item {
  cursor: pointer;
  border-top: 1px solid rgba(1,1,1,0.05);
}

.autocomplete-item:first-child {
  border-top: none;
}

.autocomplete-list {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 3px 5px rgba(0,0,0,.25);
  border-top: 1px solid rgba(1,1,1,0.05);
  background-color: #fff;
  max-height: 300px;
  overflow-y: auto;
}
</style>
