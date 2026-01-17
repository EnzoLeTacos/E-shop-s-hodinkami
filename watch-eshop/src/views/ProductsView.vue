<template>
  <div class="products-view">
    <h1>Naše produkty</h1>
    
    <SearchBar />

    <div class="filters">
      <button 
        @click="setCategory(null)"
        :class="{ active: selectedCategory === null }"
        class="filter-btn"
      >
        Všetky
      </button>
      <button 
        @click="setCategory('luxury')"
        :class="{ active: selectedCategory === 'luxury' }"
        class="filter-btn"
      >
        Luxusné
      </button>
      <button 
        @click="setCategory('casual')"
        :class="{ active: selectedCategory === 'casual' }"
        class="filter-btn"
      >
        Casual
      </button>
      <button 
        @click="setCategory('sport')"
        :class="{ active: selectedCategory === 'sport' }"
        class="filter-btn"
      >
        Športové
      </button>
    </div>

    <div v-if="displayedProducts.length === 0" class="no-results">
      <p>Nenašli sa žiadne produkty</p>
    </div>

    <div v-else class="products-grid">
      <ProductCard 
        v-for="product in displayedProducts" 
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../stores/productStore'
import ProductCard from '../components/ProductCard.vue'
import SearchBar from '../components/SearchBar.vue'

export default {
  name: 'ProductsView',

  components: {
    ProductCard,
    SearchBar
  },

  data() {
    return {
      store: null,
      selectedCategory: null
    }
  },

  computed: {
    displayedProducts() {
      let products = this.store?.filteredProducts || []
      
      if (this.selectedCategory) {
        products = products.filter(p => p.category === this.selectedCategory)
      }
      
      return products
    }
  },

  methods: {
    setCategory(category) {
      this.selectedCategory = category
    }
  },

  mounted() {
    this.store = useProductStore()
    
    if (this.$route.query.category) {
      this.selectedCategory = this.$route.query.category
    }
  }
}
</script>

<style scoped>
.products-view {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2c3e50;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 10px 25px;
  border: 2px solid #3498db;
  background: white;
  color: #3498db;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s;
}

.filter-btn:hover {
  background-color: #3498db;
  color: white;
}

.filter-btn.active {
  background-color: #3498db;
  color: white;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  font-size: 1.2rem;
  color: #666;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 2rem;
  }
}
</style>