<template>
  <div class="favorites-view">
    <h1>Obľúbené produkty</h1>

    <div v-if="favoriteProducts.length === 0" class="empty-favorites">
      <p>Nemáte žiadne obľúbené produkty</p>
      <router-link to="/products" class="shop-btn">
        Prezrieť produkty
      </router-link>
    </div>

    <div v-else class="products-grid">
      <ProductCard 
        v-for="product in favoriteProducts" 
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../stores/productStore'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'FavoritesView',

  components: {
    ProductCard
  },

  data() {
    return {
      store: null
    }
  },

  computed: {
    favoriteProducts() {
      return this.store?.favoriteProducts || []
    }
  },

  mounted() {
    this.store = useProductStore()
  }
}
</script>

<style scoped>
.favorites-view {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2c3e50;
}

.empty-favorites {
  text-align: center;
  padding: 60px 20px;
}

.empty-favorites p {
  font-size: 1.3rem;
  color: #666;
  margin-bottom: 20px;
}

.shop-btn {
  display: inline-block;
  padding: 12px 30px;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.shop-btn:hover {
  background-color: #2980b9;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
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
