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
import { fetchActorDetails } from '../services/api'; // Assurez-vous d'importer la fonction

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
    },
    async loadActorDetails(actorId) {
      try {
        this.actor = await fetchActorDetails(actorId); // Récupérer les détails de l'acteur
      } catch (error) {
        console.error('Erreur lors du chargement des détails de l\'acteur:', error);
      }
    }
  },
  created() {
    const actorId = this.$route.params.id;
    this.loadActorDetails(actorId); // Charger les détails de l'acteur lors de la création du composant
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
