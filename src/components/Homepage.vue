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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.homepage {
  color: #ffffff;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #1a1a1a;
  font-family: 'Roboto', sans-serif;
  animation: fadeIn 1s ease-in-out;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5em;
  color: #ff6f61;
  animation: slideInFromLeft 1s ease-in-out;
}

h2 {
  font-size: 1.8em;
  margin-bottom: 10px;
  color: #ff6f61;
  animation: slideInFromRight 1s ease-in-out;
}

.carousel {
  position: relative;
  overflow: hidden;
  height: 80vh;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: #2a2a2a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;
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
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.movie-image:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

h3 {
  font-size: 1.5em;
  margin: 10px 0;
  color: #ffffff;
  text-align: center;
}

p {
  margin: 5px 0;
  color: #dddddd;
  line-height: 1.5;
  text-align: center;
}

.actors-section {
  padding: 20px;
  background-color: #2a2a2a;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;
}

.actors-list {
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
}

.actor-card {
  margin-right: 10px;
  background-color: #333;
  border-radius: 5px;
  padding: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.actor-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .carousel {
    height: 60vh;
  }

  .movie-card {
    width: 100%;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.5em;
  }
}

@media (max-width: 480px) {
  .carousel {
    height: 50vh;
  }

  h1 {
    font-size: 1.8em;
  }

  h2 {
    font-size: 1.2em;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
