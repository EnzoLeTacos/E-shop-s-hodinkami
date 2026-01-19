<template>
  <div class="cart-item">
    <div class="item-image">
      <img :src="getImageUrl(item.image)" :alt="item.name" />
    </div>
    
    <div class="item-details">
      <h4 class="item-name">{{ item.name }}</h4>
      <p class="item-price">{{ formatPrice(item.price) }} / ks</p>
    </div>

    <div class="item-quantity">
      <button @click="decreaseQuantity" class="qty-btn">−</button>
      <span class="quantity">{{ item.quantity }}</span>
      <button @click="increaseQuantity" class="qty-btn">+</button>
    </div>

    <div class="item-total">
      <span class="total-price">{{ formatPrice(item.price * item.quantity) }}</span>
    </div>

    <button @click="removeItem" class="remove-btn">🗑️</button>
  </div>
</template>

<script>
import { useProductStore } from '../stores/productStore'

export default {
  name: 'CartItem',

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      store: null
    }
  },

  methods: {
    increaseQuantity() {
      this.store.updateQuantity(this.item.id, this.item.quantity + 1)
    },

    getImageUrl(path) {
      try {
        return new URL(path, import.meta.url).href
      } catch {
        return ''
      }
    },

    decreaseQuantity() {
      if (this.item.quantity > 1) {
        this.store.updateQuantity(this.item.id, this.item.quantity - 1)
      }
    },

    removeItem() {
      this.store.removeFromCart(this.item.id)
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
.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 15px;
}

.item-image {
  font-size: 50px;
  width: 80px;
  text-align: center;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 1.1rem;
  margin-bottom: 5px;
  color: #2c3e50;
}

.item-price {
  color: #666;
  font-size: 0.9rem;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s;
}

.qty-btn:hover {
  background-color: #3498db;
  color: white;
  border-color: #3498db;
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;
}

.item-total {
  min-width: 120px;
  text-align: right;
}

.total-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #3498db;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  opacity: 0.6;
  transition: opacity 0.3s;
}

.remove-btn:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .cart-item {
    flex-wrap: wrap;
    gap: 10px;
  }

  .item-image {
    font-size: 40px;
    width: 60px;
  }

  .item-total {
    width: 100%;
    text-align: left;
  }
}
</style>