<template>
  <div id="app">
    <div class="example-wrap">
      <h1>String items</h1>
      <Autocomplete placeholder="Placeholder..." v-model="stringModel" :items="stringItems" canClear>
        <div slot="item" slot-scope="props" class="custom-item">
          {{ props.item }}
        </div>
        <div slot="not-found" slot-scope="props" class="custom-not-found">
          No matches for "{{ props.input }}"
        </div>
      </Autocomplete>
      <div class="model-value">
        Model - {{stringModel}}
      </div>
    </div>
    <div class="example-wrap">
      <h1>Object items</h1>
      <Autocomplete v-model="objectModel" :items="objectItems" item-text="text" item-value="value">
        <div slot="item" slot-scope="props" class="custom-item">
          {{ props.item.text }} - {{ props.item.value }}
        </div>
      </Autocomplete>
      <div class="model-value">
        Model - {{objectModel}}
      </div>
    </div>
  </div>
</template>

<script>
import Autocomplete from '../components/Autocomplete';

const objectItems = [{
  text: 'Example 1',
  value: 'example1'
}, {
  text: 'Example 2',
  value: 'example2'
}, {
  text: 'Example 3',
  value: 'example3'
}, {
  text: 'Example 4',
  value: 'example4'
}, {
  text: 'Example 5',
  value: 'example5'
}, {
  text: 'Example 6',
  value: 'example6'
},{
  text: 'Example 7',
  value: 'example7'
}, {
  text: 'Another example',
  value: 'anotherExample'
},]

const stringItems = [
  'Example 1',
  'Example 2',
  'Another example'
]

export default {
  components: {
    Autocomplete
  },
  data: () => ({
    stringModel: '',
    objectModel: '',
    objectItems,
    stringItems
  })
}
</script>

<style>
body, input {
  font-size: 16px;
  font-weight: normal;
  font-family: "Roboto,Helvetica Neue,sans-serif"
}

.example-wrap {
  width: 400px;
}

.example-wrap:last-child {
  margin-top: 200px;
}

.model-value {
  margin-top: 20px;
}

.custom-item:hover {
  background-color: rgba(1,1,1,0.05);
}

.custom-item, .custom-not-found {
  padding: 15px;
}
</style>
