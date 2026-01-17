<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="localQuery"
      @input="handleSearch"
      placeholder="Hľadať hodinky..."
      class="search-input"
    />
    <button @click="clearSearch" class="clear-btn" v-if="localQuery">✕</button>
  </div>
</template>

<script>
import { useProductStore } from '../stores/productStore'

export default {
  name: 'SearchBar',

  data() {
    return {
      localQuery: '',
      store: null
    }
  },

  methods: {
    handleSearch() {
      this.store.setSearchQuery(this.localQuery)
    },

    clearSearch() {
      this.localQuery = ''
      this.store.setSearchQuery('')
    }
  },

  mounted() {
    this.store = useProductStore()
  }
}
</script>

<style scoped>
.search-bar {
  position: relative;
  max-width: 500px;
  margin: 0 auto 2rem;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #3498db;
}

.clear-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  padding: 5px 10px;
}

.clear-btn:hover {
  color: #333;
}
</style>