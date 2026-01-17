<template>
  <div class="rating-stars">
    <span 
      v-for="star in 5" 
      :key="star"
      class="star"
      :class="{ 'filled': star <= Math.floor(rating) }"
    >
      ★
    </span>
    <span class="rating-value">{{ rating.toFixed(1) }}</span>
  </div>
</template>

<script>
export default {
  name: 'RatingStars',

  props: {
    rating: {
      type: Number,
      required: true,
      validator: (value) => value >= 0 && value <= 5
    }
  }
}
</script>

<style scoped>
.rating-stars {
  display: flex;
  align-items: center;
  gap: 2px;
}

.star {
  color: #ddd;
  font-size: 18px;
}

.star.filled {
  color: #f39c12;
}

.rating-value {
  margin-left: 8px;
  font-size: 14px;
  color: #666;
  font-weight: 500;
}
</style>