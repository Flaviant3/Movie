<template>
  <div>
    <h1>Liste des Films</h1>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        <img :src="movie.media" alt="Affiche du film" />
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.description }}</p>
        <p>Directeur: {{ movie.director }}</p>
        <p>Note: {{ movie.rating }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getMovies } from '../services/movieService';

export default {
  data() {
    return {
      movies: []
    };
  },
  async created() {
    this.movies = await getMovies();
  }
};
</script>

<style>
/* Ajoutez du style ici si nécessaire */
</style>
