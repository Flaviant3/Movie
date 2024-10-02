<template>
  <div class="movie-details">
    <img :src="movie.media" alt="Movie Cover" class="movie-image" />
    <h3>{{ movie.title }}</h3>
    <div class="info-section">
      <p><strong>Titre :</strong> {{ movie.title }}</p>
      <p><strong>Date de sortie :</strong> {{ movie.releaseDate }}</p>
      <p><strong>Durée :</strong> {{ movie.duration }} minutes</p>
      <p><strong>Studio :</strong> {{ movie.studio }}</p>
      <p><strong>Genre :</strong> {{ movie.genre }}</p>
      <p><strong>Synopsis :</strong> {{ movie.description }}</p>
      <p><strong>Saga :</strong> {{ movie.saga }}</p>
      <p><strong>Note :</strong> {{ movie.rating }}</p>
      <p><strong>Réalisateur :</strong> {{ movie.director }}</p>
    </div>
    <h2>Acteurs</h2>
    <div class="actors-list">
      <template v-if="movie.actors && movie.actors.length > 0">
        <div
          v-for="actor in movie.actors"
          :key="actor.id"
          class="actor-card"
          @click="goToActorDetails(actor.id)">
          <img :src="actor.media" alt="Photo de l'acteur" class="actor-image" />
          <p><strong>Nom :</strong> {{ actor.lastname }}</p>
          <p><strong>Date de naissance :</strong> {{ actor.dob }}</p>
          <p><strong>Nationalité :</strong> {{ actor.nationality }}</p>
          <p><strong>Biographie :</strong> {{ actor.bio }}</p>
        </div>
      </template>
      <p v-else>Aucun acteur disponible pour ce film.</p>
    </div>
  </div>
</template>

<script>
import {fetchActorDetails, fetchMovieDetails} from '../services/api';

export default {
  data() {
    return {
      movie: {} // Remplir avec les détails du film
    };
  },
  methods: {
    goToActorDetails(actorId) {
      this.$router.push({ name: 'ActorDetails', params: { id: actorId } });
    },
    async loadMovieDetails(movieId) {
      try {
        const movieDetails = await fetchMovieDetails(movieId);
        this.movie = movieDetails;

        // Récupérer les détails des acteurs
        if (this.movie.actors && this.movie.actors.length > 0) {
          const actorPromises = this.movie.actors.map(actorUrl => fetchActorDetails(actorUrl));
          const actorsDetails = await Promise.all(actorPromises);
          this.movie.actors = actorsDetails; // Remplacez les URLs par les détails des acteurs
        }
      } catch (error) {
        console.error('Erreur lors du chargement des détails du film:', error);
      }
    }
  },
  created() {
    const movieId = this.$route.params.id;
    this.loadMovieDetails(movieId); // Charger les détails du film lors de la création du composant
  }
};
</script>

<style scoped>
.movie-details {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.movie-image {
  width: 50%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
  display: block;
  margin: auto;
}

h3 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

.info-section {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-section p {
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
}

.info-section strong {
  color: #007bff;
}

h2 {
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 10px;
  text-align: center;
}

.actors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
}

.actor-card {
  flex: 1 1 calc(30% - 15px); /* 3 cards per row */
  background-color: #e9ecef;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.actor-card:hover {
  transform: scale(1.05);
}

.actor-card img {
  width: 100%;
  height: auto;
  border-radius: 6px;
}

.actor-image {
  width: 100%;
  height: auto;
  border-radius: 50%; /* Rendre l'image complètement ronde */
  object-fit: cover; /* Remplit l'espace sans déformer l'image */
  transition: transform 0.3s;
}
</style>
