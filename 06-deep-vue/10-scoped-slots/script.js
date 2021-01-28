import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';

const ListView = {
  template: `
    <div>
    <form @submit.prevent="handleSubmit">
      <input v-model="newItemValue" />
      <button>Add</button>
    </form>
    <ul>
      <li v-for="(item, idx) in items_">
        <span>{{ item }}</span>
        <button @click="remove(idx)">x</button>
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
      <list-view :items.sync="list" />
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
