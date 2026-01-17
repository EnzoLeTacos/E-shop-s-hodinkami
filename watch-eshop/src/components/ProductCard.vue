<template>
  <div class="product-card">
    <button 
      @click="toggleFavorite" 
      class="favorite-btn"
      :class="{ 'is-favorite': isFavorite }"
    >
      ♥
    </button>

  <div class="product-image">
    <img :src="product.image" :alt="product.name" />
  </div>

    
    <div class="product-info">
      <h3 class="product-name">{{ product.name }}</h3>
      
      <RatingStars :rating="product.rating" />
      
      <p class="product-description">{{ product.description }}</p>
      
      <div class="product-features">
        <span 
          v-for="(feature, index) in product.features" 
          :key="index"
          class="feature-tag"
        >
          {{ feature }}
        </span>
      </div>

      <div class="product-footer">
        <div class="price-stock">
          <span class="price">{{ formatPrice(product.price) }}</span>
          <span class="stock" :class="stockClass">
            Sklad: {{ product.stock }}
          </span>
        </div>
        
        <button 
          @click="addToCart" 
          class="add-to-cart-btn"
          :disabled="product.stock === 0"
        >
          {{ product.stock === 0 ? 'Vypredané' : 'Do košíka' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../stores/productStore'
import RatingStars from './RatingStars.vue'

export default {
  name: 'ProductCard',

  components: {
    RatingStars
  },

  props: {
    product: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      store: null
    }
  },

  computed: {
    isFavorite() {
      return this.store?.isFavorite(this.product.id) || false
    },

    stockClass() {
      if (this.product.stock === 0) return 'out-of-stock'
      if (this.product.stock < 5) return 'low-stock'
      return 'in-stock'
    }
  },

  methods: {
    addToCart() {
      this.store.addToCart(this.product)
      this.$emit('added-to-cart', this.product)
    },

    toggleFavorite() {
      this.store.toggleFavorite(this.product.id)
    },

    formatPrice(price) {
      return `${price.toLocaleString('sk-SK')} €`
    }
  },

  mounted() {
    this.store = useProductStore()
  }
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 20px;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.favorite-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border: 2px solid #ddd;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s;
  color: #ddd;
}

.favorite-btn:hover {
  border-color: #e74c3c;
  color: #e74c3c;
}

.favorite-btn.is-favorite {
  background-color: #e74c3c;
  border-color: #e74c3c;
  color: white;
}

.product-image {
  font-size: 80px;
  text-align: center;
  margin: 20px 0;
}

.product-info {
  text-align: left;
}

.product-name {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: #2c3e50;
}

.product-description {
  color: #666;
  font-size: 0.9rem;
  margin: 10px 0;
  line-height: 1.5;
}

.product-features {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 15px 0;
}

.feature-tag {
  background-color: #ecf0f1;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #555;
}

.product-footer {
  margin-top: 15px;
}

.price-stock {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.price {
  font-size: 1.8rem;
  font-weight: bold;
  color: #3498db;
}

.stock {
  font-size: 0.85rem;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
}

.in-stock {
  background-color: #d5f4e6;
  color: #27ae60;
}

.low-stock {
  background-color: #ffeaa7;
  color: #d63031;
}

.out-of-stock {
  background-color: #ffcccc;
  color: #c0392b;
}

.add-to-cart-btn {
  width: 100%;
  padding: 12px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover:not(:disabled) {
  background-color: #229954;
}

.add-to-cart-btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.product-image img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
  display: block;
  margin: 0 auto;
}

</style>