<template>
  <div class="movie-card" @click="handleClick">
    <img :src="require(`@/assets/movie.jpg`)" alt="Movie Cover" class="movie-image" />
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
  background-color: #fefefe; /* Fond légèrement gris */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Ombre légère */
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-image {
  width: 100%; /* Largeur 100% pour remplir la carte */
  height: 200px; /* Hauteur fixe pour l'image */
  object-fit: cover; /* Garde le ratio d'aspect */
  border-radius: 5px 5px 0 0; /* Coins arrondis en haut */
}
</style>
