<template>
  <div class="actor-details">
    <h1>{{ actor.firstname }} {{ actor.lastname }}</h1>
    <img :src="actor.media" alt="Photo de l'acteur" class="actor-image" />
    <p class="bio">{{ actor.bio }}</p>
    <p>Date de naissance : {{ formattedBirthDate }}</p>
    <p v-if="actor.death_date">Date de décès : {{ formattedDeathDate }}</p>
    <p>Nationalité : {{ actor.nationality }}</p>
    <p>Genre : {{ actor.gender }}</p>
    <h2>Récompenses</h2>
    <ul class="awards-list">
      <li v-for="award in actor.awards" :key="award.id">{{ award.title }} - {{ award.year }}</li>
    </ul>
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
import { fetchActorDetails } from '../services/api';

export default {
  components: {
    MovieCard
  },
  data() {
    return {
      actor: {
        movies: [],
        awards: [],
        socialLinks: []
      }
    };
  },
  computed: {
    formattedBirthDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(this.actor.dob).toLocaleDateString('fr-FR', options);
    },
    formattedDeathDate() {
      if (this.actor.death_date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(this.actor.death_date).toLocaleDateString('fr-FR', options);
      }
      return null;
    }
  },
  methods: {
    goToMovieDetails(movieId) {
      this.$router.push({ name: 'MovieDetails', params: { id: movieId } });
    },
    async loadActorDetails(actorId) {
      try {
        this.actor = await fetchActorDetails(actorId);
      } catch (error) {
        console.error('Erreur lors du chargement des détails de l\'acteur:', error);
      }
    }
  },
  created() {
    const actorId = this.$route.params.id;
    this.loadActorDetails(actorId);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  background-color: #1a1a1a;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
}

.actor-details {
  padding: 20px;
  background-color: #2a2a2a;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.actor-details:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.actor-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin: 0 auto 20px;
  transition: transform 0.3s;
}

.actor-image:hover {
  transform: scale(1.05);
}

h1, h2 {
  color: #ff6f61;
  text-align: center;
}

.bio, p {
  color: #ddd;
  text-align: center;
  line-height: 1.5;
}

.awards-list, .movies-list, .social-links {
  margin: 20px 0;
  text-align: center;
}

.awards-list li {
  font-size: 1.1em;
  margin-bottom: 10px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.social-icon {
  width: 40px;
  height: 40px;
}
</style>
