<template>
  <div class="homepage">
    <h1>Bienvenue sur notre site de films</h1>

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
    }
  },
  created() {
    // Remplacer par votre logique pour récupérer les films et acteurs
    this.latestMovies = [
      {id: 1, title: 'Film 1', description: 'Description 1'},
      {id: 2, title: 'Film 2', description: 'Description 2'},
      {id: 3, title: 'Film 3', description: 'Description 3'},
      {id: 4, title: 'Film 4', description: 'Description 4'}
    ];
    this.latestActors = [
      {id: 1, name: 'Acteur 1'},
      {id: 2, name: 'Acteur 2'},
      {id: 3, name: 'Acteur 3'},
      {id: 4, name: 'Acteur 4'}
    ];
  }
};
</script>

<style scoped>
.homepage {
  padding: 20px;
}

.movies-section, .actors-section {
  margin-bottom: 40px;
}

.movies-list, .actors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
