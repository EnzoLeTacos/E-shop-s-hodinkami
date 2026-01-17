<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="logo">
        <router-link to="/">⌚ Clock</router-link>
      </div>
      
      <div class="nav-links">
        <router-link to="/" class="nav-link">Domov</router-link>
        <router-link to="/products" class="nav-link">Produkty</router-link>
        <router-link to="/favorites" class="nav-link">
          Obľúbené
          <span v-if="favoriteCount > 0" class="badge">{{ favoriteCount }}</span>
        </router-link>
        <router-link to="/cart" class="nav-link cart-link">
          Košík
          <span v-if="cartCount > 0" class="badge">{{ cartCount }}</span>
        </router-link>
        <router-link to="/about" class="nav-link">O nás</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { useProductStore } from '../stores/productStore'

export default {
  name: 'Navigation',
  
  data() {
    return {
      store: null
    }
  },

  computed: {
    cartCount() {
      return this.store?.cartItemsCount || 0
    },

    favoriteCount() {
      return this.store?.favorites.length || 0
    }
  },

  mounted() {
    this.store = useProductStore()
  }
}
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  position: relative;
}

.nav-link:hover {
  background-color: #34495e;
}

.nav-link.router-link-active {
  background-color: #3498db;
}

.badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
}

.cart-link {
  background-color: #27ae60;
}

.cart-link:hover {
  background-color: #229954;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .nav-link {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>