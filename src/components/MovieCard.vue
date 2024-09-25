<template>
  <div class="movie-card" @click="handleClick">
    <h3>{{ movie.title }}</h3>
    <p>{{ movie.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
.movie-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;
}
.movie-card:hover {
  transform: scale(1.05);
}
</style>
