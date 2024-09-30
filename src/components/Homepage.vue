<template>
  <div class="homepage">
    <h1>WR505D Projet Movie.vue</h1>

    <section class="movies-section">
      <h2>Derniers Films</h2>
      <div class="movies-list">
        <MovieCard
          v-for="movie in latestMovies"
          :key="movie.id"
          :movie="movie"
          @click.native="goToMovieDetails(movie.id)"
        />
      </div>
    </section>

    <section class="actors-section">
      <h2>Derniers Acteurs</h2>
      <div class="actors-list">
        <ActorCard
          v-for="actor in latestActors"
          :key="actor.id"
          :actor="actor"
          @click.native="goToActorDetails(actor.id)"
        />
      </div>
    </section>
  </div>
</template>

<script>
import MovieCard from './MovieCard.vue';
import ActorCard from './ActorCard.vue';
import { fetchLatestMovies } from '../services/api'; // Importez votre méthode API

export default {
  components: {
    MovieCard,
    ActorCard
  },
  data() {
    return {
      latestMovies: [], // Remplir avec les 4 derniers films
      latestActors: []   // Remplir avec les 4 derniers acteurs
    };
  },
  methods: {
    goToMovieDetails(movieId) {
      this.$router.push({name: 'MovieDetails', params: {id: movieId}});
    },
    goToActorDetails(actorId) {
      this.$router.push({name: 'ActorDetails', params: {id: actorId}});
    },
    async loadLatestMovies() {
      try {
        const movies = await fetchLatestMovies();
        this.latestMovies = movies.slice(0, 4); // Prendre les 4 derniers films
      } catch (error) {
        console.error('Erreur lors du chargement des films:', error);
      }
    }
  },
  created() {
    this.loadLatestMovies(); // Charger les films lors de la création du composant
    // Vous pouvez également charger les acteurs ici si vous avez une méthode similaire
  }
};
</script>

<style scoped>
/* Votre style ici */
</style>
