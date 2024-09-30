<template>
  <div class="category-card" @click="handleClick">
    <h3>{{ category.title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    category: Object
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
.category-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;
  background-color: #fefefe;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.category-card:hover {
  transform: scale(1.05);
}

.movie-count {
  margin-top: 5px; /* Espace au-dessus du nombre de films */
}
</style>
