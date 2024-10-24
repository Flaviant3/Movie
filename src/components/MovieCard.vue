<template>
  <div class="movie-card" @click="handleClick">
    <img :src="movie.media" alt="Movie Cover" class="movie-image" />
    <h3>{{ movie.title }}</h3>
    <p>Date de sortie : {{ formattedReleaseDate }}</p>
    <p>Durée : {{ movie.duration }} minutes</p>
    <div class="rating">
      <span v-for="star in maxStars" :key="star" class="star" :class="{ filled: star <= movie.rating }">★</span>
    </div>
    <button class="delete-button" @click.stop="deleteMovie">Supprimer</button>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object
  },
  computed: {
    formattedReleaseDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(this.movie.releaseDate).toLocaleDateString('fr-FR', options);
    },
    maxStars() {
      return 5;
    }
  },
  methods: {
    handleClick() {
      this.$emit('click', this.movie.id);
    },
    deleteMovie() {
      this.$emit('delete', this.movie.id);
    }
  }
};
</script>

<style scoped>
.movie-card {
  border: none;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: #222;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7);
}

.movie-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  transition: transform 0.3s;
}

.movie-image:hover {
  transform: scale(1.05);
}

h3 {
  font-size: 1.5em;
  margin: 10px 0;
  color: #e50914;
  text-align: center;
}

p {
  margin: 5px 0;
  color: #ddd;
  line-height: 1.5;
  text-align: center;
}

.rating {
  margin-top: 10px;
  text-align: center;
}

.star {
  color: #555;
  font-size: 1.5em;
}

.star.filled {
  color: #ffcc00;
}

.star:hover {
  cursor: pointer;
  color: #ffcc00;
}

.delete-button {
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c00712;
}
</style>
