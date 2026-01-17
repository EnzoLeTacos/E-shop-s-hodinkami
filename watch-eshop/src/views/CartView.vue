<template>
  <div class="cart-view">
    <h1>Nákupný košík</h1>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Váš košík je prázdny</p>
      <router-link to="/products" class="shop-btn">
        Začať nakupovať
      </router-link>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <CartItem 
          v-for="item in cartItems" 
          :key="item.id"
          :item="item"
        />
      </div>

      <div class="cart-summary">
        <h2>Súhrn objednávky</h2>
        
        <div class="summary-row">
          <span>Počet položiek:</span>
          <span>{{ itemsCount }}</span>
        </div>

        <div class="summary-row">
          <span>Medziúčet:</span>
          <span>{{ formatPrice(total) }}</span>
        </div>

        <div class="summary-row">
          <span>Doprava:</span>
          <span>{{ formatPrice(shippingCost) }}</span>
        </div>

        <div class="summary-row total">
          <span>Celkom:</span>
          <span>{{ formatPrice(total + shippingCost) }}</span>
        </div>

        <button @click="checkout" class="checkout-btn">
          Pokračovať k platbe
        </button>

        <button @click="clearCart" class="clear-btn">
          Vyprázdniť košík
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../stores/productStore'
import CartItem from '../components/CartItem.vue'

export default {
  name: 'CartView',

  components: {
    CartItem
  },

  data() {
    return {
      store: null,
      shippingCost: 5
    }
  },

  computed: {
    cartItems() {
      return this.store?.cart || []
    },

    total() {
      return this.store?.cartTotal || 0
    },

    itemsCount() {
      return this.store?.cartItemsCount || 0
    }
  },

  methods: {
    formatPrice(price) {
      return `${price.toLocaleString('sk-SK')} €`
    },

    clearCart() {
      if (confirm('Naozaj chcete vyprázdniť košík?')) {
        this.store.clearCart()
      }
    },

    checkout() {
      alert('Ďakujeme za objednávku! Táto funkcia je len demo verzia.')
      this.store.clearCart()
      this.$router.push('/')
    }
  },

  mounted() {
    this.store = useProductStore()
  }
}
</script>

<style scoped>
.cart-view {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #2c3e50;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
}

.empty-cart p {
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

.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
}

.cart-items {
  display: flex;
  flex-direction: column;
}

.cart-summary {
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  height: fit-content;
  position: sticky;
  top: 20px;
}

.cart-summary h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #2c3e50;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  font-size: 1rem;
}

.summary-row.total {
  font-size: 1.3rem;
  font-weight: bold;
  color: #3498db;
  border-bottom: none;
  margin-top: 10px;
  padding-top: 15px;
  border-top: 2px solid #3498db;
}

.checkout-btn,
.clear-btn {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 15px;
}

.checkout-btn {
  background-color: #27ae60;
  color: white;
}

.checkout-btn:hover {
  background-color: #229954;
}

.clear-btn {
  background-color: #e74c3c;
  color: white;
}

.clear-btn:hover {
  background-color: #c0392b;
}

@media (max-width: 968px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }
}
</style>