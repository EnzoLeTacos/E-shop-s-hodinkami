<template>
  <div class="home">
    <section class="hero">
      <h1 class="hero-title">Vitajte v Clock</h1>
      <p class="hero-subtitle">Najlepšie hodinky pre každú príležitosť</p>
      <router-link to="/products" class="cta-button">
        Prezrieť produkty
      </router-link>
    </section>

    <section class="categories">
      <h2>Kategórie</h2>
      <div class="category-grid">
        <div 
          v-for="category in categories" 
          :key="category.id"
          class="category-card"
          @click="navigateToCategory(category.name)"
        >
          <div class="category-icon">{{ category.icon }}</div>
          <h3>{{ category.title }}</h3>
          <p>{{ category.count }} produktov</p>
        </div>
      </div>
    </section>

    <section class="featured-products">
      <h2>Odporúčané produkty</h2>
      <div class="products-grid">
        <ProductCard 
          v-for="product in featuredProducts" 
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
  </div>
</template>

<script>
import { useProductStore } from '../stores/productStore'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'HomeView',

  components: {
    ProductCard
  },

  data() {
    return {
      store: null,
      categories: [
        { id: 1, name: 'luxury', title: 'Luxusné', icon: '💎', count: 4 },
        { id: 2, name: 'casual', title: 'Casual', icon: '👔', count: 3 },
        { id: 3, name: 'sport', title: 'Športové', icon: '⚽', count: 1 }
      ]
    }
  },

  computed: {
    featuredProducts() {
      return this.store?.products.slice(0, 3) || []
    }
  },

  methods: {
    navigateToCategory(categoryName) {
      this.$router.push({ name: 'products', query: { category: categoryName } })
    }
  },

  mounted() {
    this.store = useProductStore()
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
  margin-bottom: 40px;
}

.hero-title {
  font-size: 3rem;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.cta-button {
  display: inline-block;
  padding: 15px 40px;
  background-color: white;
  color: #667eea;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  transition: transform 0.3s;
}

.cta-button:hover {
  transform: scale(1.05);
}

.categories,
.featured-products {
  margin-bottom: 50px;
}

.categories h2,
.featured-products h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #2c3e50;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.category-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.category-icon {
  font-size: 60px;
  margin-bottom: 15px;
}

.category-card h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #2c3e50;
}

.category-card p {
  color: #666;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>