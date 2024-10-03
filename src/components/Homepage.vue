<template>
  <div class="homepage">
    <h1>Derniers Films</h1>

    <section class="carousel">
      <div class="carousel-images" :style="{ transform: `translateX(-${currentIndex * 50}%)` }">
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
import { fetchLatestMovies, fetchLatestActors } from '../services/api';

export default {
  components: {
    MovieCard,
    ActorCard
  },
  data() {
    return {
      latestMovies: [],
      latestActors: [],
      currentIndex: 0
    };
  },
  methods: {
    goToActorDetails(actorId) {
      this.$router.push({ name: 'ActorDetails', params: { id: actorId } });
    },
    goToMovieDetails(movieId) {
      this.$router.push({ name: 'MovieDetails', params: { id: movieId } });
    },
    async loadLatestMovies() {
      try {
        const movies = await fetchLatestMovies();
        this.latestMovies = movies.slice(0, 4);
      } catch (error) {
        console.error('Erreur lors du chargement des films:', error);
      }
    },
    async loadLatestActors() {
      try {
        const actors = await fetchLatestActors();
        this.latestActors = actors.slice(0, 4);
      } catch (error) {
        console.error('Erreur lors du chargement des acteurs:', error);
      }
    },
    updateCarousel() {
      this.currentIndex = (this.currentIndex + 1) % Math.ceil(this.latestMovies.length / 2);
    }
  },
  created() {
    this.loadLatestMovies();
    this.loadLatestActors();
    setInterval(this.updateCarousel, 5000);
  }
};
</script>

<style scoped>
.homepage {
  color: #ffffff;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #141414; /* Fond sombre pour correspondre à la navbar */
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5em;
  color: #e50914; /* Rouge Netflix */
}

h2 {
  font-size: 1.8em;
  margin-bottom: 10px;
  color: #e50914; /* Rouge Netflix */
}

.carousel {
  position: relative;
  overflow: hidden;
  height: 80vh; /* Ajuster la hauteur du carrousel */
  border-radius: 0;
  margin-bottom: 20px;
}

.carousel-images {
  display: flex;
  transition: transform 0.5s ease;
  width: 200%;
  height: 100%;
}

.movie-card {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  height: 100%;
}

.movie-image {
  width: 100%;
  height: 100%;
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
  color: #ffffff; /* Texte blanc pour le titre du film */
  text-align: center;
}

p {
  margin: 5px 0;
  color: #dddddd; /* Texte gris clair pour les descriptions */
  line-height: 1.5;
  text-align: center;
}

.actors-section {
  padding: 20px;
  background-color: #222; /* Fond sombre pour la section des acteurs */
}

.actors-list {
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
}

.actor-card {
  margin-right: 10px;
  background-color: #333; /* Fond sombre pour les cartes d'acteurs */
  border-radius: 5px;
  padding: 10px;
  transition: transform 0.3s;
}

.actor-card:hover {
  transform: scale(1.05); /* Effet de zoom au survol */
}
</style>
