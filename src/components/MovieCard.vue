<template>
  <div class="movie-card" @click="handleClick">
    <img :src="movie.media" alt="Movie Cover" class="movie-image" />
    <h3>{{ movie.title }}</h3>
    <p>Date de sortie : {{ formattedReleaseDate }}</p>
    <p>Durée : {{ movie.duration }} minutes</p>
    <p>Réalisateur : {{ movie.director }}</p>
    <p>Nombre d'entrées : {{ movie.entries }}</p>
    <p>{{ movie.description }}</p>
    <div class="rating">
      <span v-for="star in maxStars" :key="star" class="star" :class="{ filled: star <= movie.rating }">★</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object
  },
  computed: {
    formattedReleaseDate() {
      const options = {year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(this.movie.releaseDate).toLocaleDateString('fr-FR', options);
    },
    maxStars() {
      return 5; // Nombre maximum d'étoiles
    }
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
  background-color: #fefefe;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.movie-card:hover {
  transform: scale(1.05);
}

.movie-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 5px 5px 0 0;
}

.rating {
  margin-top: 5px; /* Espace au-dessus de la note */
}

.star {
  color: #ccc; /* Couleur par défaut des étoiles */
}

.star.filled {
  color: #ffcc00; /* Couleur des étoiles remplies */
}

.star:hover {
  cursor: pointer;
}
</style>
