import { defineStore } from 'pinia'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Rolex Submariner',
        price: 8950,
        image:  new URL('../assets/img/rolex_submariner.png', import.meta.url).href,
        category: 'luxury',
        description: 'Ikonické luxusné potápačské hodinky s automatickým mechanizmom',
        rating: 4.9,
        stock: 5,
        features: ['Vodotesné 300m', 'Automatický pohon', 'Safírové sklo']
      },
      {
        id: 2,
        name: 'Omega Speedmaster',
        price: 5200,
        image: new URL('../assets/img/omega_speedmaster.png', import.meta.url).href,
        category: 'luxury',
        description: 'Legendárne "Moonwatch" hodinky používané NASA',
        rating: 4.8,
        stock: 8,
        features: ['Chronograf', 'Manuálny náťah', 'Hesalitové sklo']
      },
      {
        id: 3,
        name: 'Seiko Presage',
        price: 450,
        image: new URL('../assets/img/seiko_presage.png', import.meta.url).href,
        category: 'casual',
        description: 'Elegantné japonské automatické hodinky',
        rating: 4.6,
        stock: 15,
        features: ['Automatický pohon', 'Safírové sklo', 'Vodotesné 50m']
      },
      {
        id: 4,
        name: 'Casio G-Shock',
        price: 120,
        image: new URL('../assets/img/casio_gshock.png', import.meta.url).href,
        category: 'sport',
        description: 'Odolné športové digitálne hodinky',
        rating: 4.7,
        stock: 25,
        features: ['Odolné proti nárazom', 'Vodotesné 200m', 'LED podsvietenie']
      },
      {
        id: 5,
        name: 'TAG Heuer Carrera',
        price: 3800,
        image: new URL('../assets/img/tag_hauer.png', import.meta.url).href,
        category: 'luxury',
        description: 'Švajčiarske pretekárske hodinky s chronografom',
        rating: 4.8,
        stock: 6,
        features: ['Chronograf', 'Automatický pohon', 'Tachymeter']
      },
      {
        id: 6,
        name: 'Citizen Eco-Drive',
        price: 280,
        image: new URL('../assets/img/citizen_ecodrive.png', import.meta.url).href,
        category: 'casual',
        description: 'Solárne hodinky s ekologickým pohonom',
        rating: 4.5,
        stock: 20,
        features: ['Solárny pohon', 'Vodotesné 100m', 'Safírové sklo']
      },
      {
        id: 7,
        name: 'Patek Philippe Nautilus',
        price: 45000,
        image: new URL('../assets/img/patek_nautilus.png', import.meta.url).href,
        category: 'luxury',
        description: 'Vrchol luxusného hodinárstva',
        rating: 5.0,
        stock: 2,
        features: ['Automatický pohon', 'Zlaté puzdro', 'Limitovaná edícia']
      },
      {
        id: 8,
        name: 'Tissot PRX',
        price: 350,
        image:  new URL('../assets/img/tissot_prx.png', import.meta.url).href,
        category: 'casual',
        description: 'Retro dizajn s modernou technológiou',
        rating: 4.6,
        stock: 18,
        features: ['Automatický pohon', 'Safírové sklo', 'Nerezová oceľ']
      }
    ],
    cart: [],
    favorites: [],
    searchQuery: ''
  }),

  getters: {
    filteredProducts: (state) => {
      if (!state.searchQuery) return state.products
      
      const query = state.searchQuery.toLowerCase()
      return state.products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      )
    },

    cartTotal: (state) => {
      return state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },

    cartItemsCount: (state) => {
      return state.cart.reduce((sum, item) => sum + item.quantity, 0)
    },

    favoriteProducts: (state) => {
      return state.products.filter(product => state.favorites.includes(product.id))
    },

    productsByCategory: (state) => {
      return (category) => {
        return state.products.filter(product => product.category === category)
      }
    }
  },

  actions: {
    addToCart(product) {
      const existingItem = this.cart.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cart.push({
          ...product,
          quantity: 1
        })
      }

      this.saveToLocalStorage()
    },

    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId)
      this.saveToLocalStorage()
    },

    updateQuantity(productId, quantity) {
      const item = this.cart.find(item => item.id === productId)
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          this.removeFromCart(productId)
        }
      }
      this.saveToLocalStorage()
    },

    clearCart() {
      this.cart = []
      this.saveToLocalStorage()
    },

    toggleFavorite(productId) {
      const index = this.favorites.indexOf(productId)
      
      if (index > -1) {
        this.favorites.splice(index, 1)
      } else {
        this.favorites.push(productId)
      }

      this.saveToLocalStorage()
    },

    isFavorite(productId) {
      return this.favorites.includes(productId)
    },

    setSearchQuery(query) {
      this.searchQuery = query
    },

    saveToLocalStorage() {
      localStorage.setItem('watchEshopCart', JSON.stringify(this.cart))
      localStorage.setItem('watchEshopFavorites', JSON.stringify(this.favorites))
    },

    loadFromLocalStorage() {
      const cart = localStorage.getItem('watchEshopCart')
      const favorites = localStorage.getItem('watchEshopFavorites')

      if (cart) {
        this.cart = JSON.parse(cart)
      }
      if (favorites) {
        this.favorites = JSON.parse(favorites)
      }
    }
  }
})
