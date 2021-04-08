import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

const ListView = {
  template: `
    <div>
    <slot
      name="form"
      :add="addNewItem"
      :newItemValue="newItemValue"
      :updateNewItemValue="(value) => { newItemValue = value }"
    >
      <form @submit.prevent="handleSubmit">
        <input v-model="newItemValue" />
        <button>Add</button>
      </form>
    </slot>
    <ul>
      <li v-for="(item, idx) in items_">
        <slot name="item" :item="item" :removeItem="() => remove(idx)" :idx="idx">
          <span>{{ item }}</span>
          <button @click="remove(idx)">x</button>
        </slot>
      </li>
    </ul>
    </div>`,

  props: {
    items: Array,
  },

  data() {
    return {
      items_: [],
      newItemValue: '',
    };
  },

  watch: {
    items: {
      deep: true,
      immediate: true,
      handler(newItemValue) {
        this.items_ = [...newItemValue];
      },
    },
  },

  methods: {
    handleSubmit() {
      this.addNewItem();
    },

    addNewItem() {
      this.items_.push(this.newItemValue);
      this.newItemValue = '';
      this.$emit('update:items', [...this.items_]);
    },

    remove(idx) {
      this.items_.splice(idx, 1);
      this.$emit('update:items', [...this.items_]);
    },
  },
};

const App = {
  template: `
    <div>
      <h3>ListView</h3>
      <list-view :items.sync="list">

        <template #form="{ add, newItemValue, updateNewItemValue }">
          <form @submit.prevent="add()">
            <input :value="newItemValue" @input="updateNewItemValue($event.target.value)" />
          </form>
        </template>

        <template #item="{ item, idx, removeItem }">
          <a href="#" @click="removeItem">{{ item }}</a>
        </template>

      </list-view>
    </div>`,

  components: {
    ListView,
  },

  data() {
    return {
      list: [1, 2, 3, 4, 5],
    };
  },
};

new Vue(App).$mount('#app');
