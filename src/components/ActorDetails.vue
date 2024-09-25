<template>
  <div>
    <h1>{{ actor.name }}</h1>
    <h2>Films</h2>
    <div class="movies-list">
      <MovieCard
        v-for="movie in actor.movies"
        :key="movie.id"
        :movie="movie"
        @click.native="goToMovieDetails(movie.id)"
      />
    </div>
  </div>
</template>

<script>
import MovieCard from './MovieCard.vue';

export default {
  components: {
    MovieCard
  },
  data() {
    return {
      actor: {} // Remplir avec les détails de l'acteur
    };
  },
  methods: {
    goToMovieDetails(movieId) {
      this.$router.push({ name: 'MovieDetails', params: { id: movieId } });
    }
  },
  created() {
    const actorId = this.$route.params.id;
    // Remplacer par votre logique pour récupérer les détails de l'acteur
    this.actor = {
      id: actorId,
      name: 'Acteur ' + actorId,
      movies: [
        { id: 1, title: 'Film 1' },
        { id: 2, title: 'Film 2' }
      ]
    };
  }
};
</script>

<style scoped>
.movies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
