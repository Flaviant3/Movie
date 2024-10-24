<template>
  <div class="movie-details">
    <img :src="movie.media" alt="Movie Cover" class="movie-image" />
    <h3>{{ movie.title }}</h3>

    <div v-if="isEditing" class="edit-form">
      <h4>Modifier le Film</h4>
      <form @submit.prevent="updateMovie">
        <label>
          Titre :
          <input type="text" v-model="movie.title" required />
        </label>
        <label>
          Date de sortie :
          <input type="date" v-model="movie.releaseDate" required />
        </label>
        <label>
          Durée :
          <input type="number" v-model.number="movie.duration" required />
        </label>
        <label>
          Studio :
          <input type="text" v-model="movie.studio" required />
        </label>
        <label>
          Genre :
          <input type="text" v-model="movie.genre" required />
        </label>
        <label>
          Synopsis :
          <textarea v-model="movie.description" required></textarea>
        </label>
        <label>
          Saga :
          <input type="text" v-model="movie.saga" />
        </label>
        <label>
          Note :
          <input type="number" v-model.number="movie.rating" min="0" max="5" step="0.1" required />
        </label>
        <label>
          Réalisateur :
          <input type="text" v-model="movie.director" required />
        </label>
        <button type="submit" class="save-button">Sauvegarder</button>
        <button type="button" @click="isEditing = false" class="cancel-button">Annuler</button>
      </form>
    </div>

    <div v-else class="info-section">
      <p><strong>Titre :</strong> {{ movie.title }}</p>
      <p><strong>Date de sortie :</strong> {{ movie.releaseDate }}</p>
      <p><strong>Durée :</strong> {{ movie.duration }} minutes</p>
      <p><strong>Studio :</strong> {{ movie.studio }}</p>
      <p><strong>Genre :</strong> {{ movie.genre }}</p>
      <p><strong>Synopsis :</strong> {{ movie.description }}</p>
      <p><strong>Saga :</strong> {{ movie.saga }}</p>
      <p><strong>Note :</strong> {{ movie.rating }}</p>
      <p><strong>Réalisateur :</strong> {{ movie.director }}</p>
      <button class="edit-button" @click="isEditing = true">Éditer</button>
    </div>

    <h2>Acteurs</h2>
    <div class="actors-list">
      <template v-if="movie.actors && movie.actors.length > 0">
        <div
          v-for="actor in movie.actors"
          :key="actor.id"
          class="actor-card"
          @click="goToActorDetails(actor.id)">
          <img v-if="actor.media" :src="actor.media" alt="Photo de l'acteur" class="actor-image" />
          <p><strong>Nom :</strong> {{ actor.lastname }} {{ actor.firstname }}</p>
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
import { fetchActorDetails, fetchMovieDetails } from '../services/api';
import { updateMovie as movieServiceUpdate } from "../services/movieService";

export default {
  data() {
    return {
      movie: {},
      isEditing: false
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

        if (this.movie.actors && this.movie.actors.length > 0) {
          const actorPromises = this.movie.actors.map(actorUrl => fetchActorDetails(actorUrl));
          const actorsDetails = await Promise.all(actorPromises);
          this.movie.actors = actorsDetails;
        }
      } catch (error) {
        console.error('Erreur lors du chargement des détails du film:', error);
      }
    },
    async updateMovie() {
      try {
        this.movie.rating = parseFloat(this.movie.rating);
        await movieServiceUpdate(this.movie.id, this.movie);
        this.isEditing = false;
      } catch (error) {
        if (error.response) {
          console.error('Erreur lors de la mise à jour du film:', error.response.data);
          alert(`Erreur: ${error.response.data.message || 'Erreur inconnue.'}`);
        } else {
          console.error('Erreur réseau ou autre:', error);
          alert('Erreur lors de la mise à jour du film.');
        }
      }
    }
  },
  created() {
    const movieId = this.$route.params.id;
    this.loadMovieDetails(movieId);
  }
};
</script>

<style scoped>
.movie-details {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #141414;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
  font-family: 'Arial', sans-serif;
  color: #ffffff;
}

.movie-image {
  width: 300px;
  height: 400px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: block;
  border: 2px solid #e50914;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

h3 {
  font-size: 2rem;
  color: #e50914;
  margin-bottom: 10px;
  text-align: center;
}

.info-section {
  background-color: #222;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.edit-form {
  background-color: #222;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.edit-form label {
  display: block;
  margin-bottom: 10px;
}

.edit-form input,
.edit-form textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.save-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px;
}

.save-button:hover {
  background-color: #0056b3;
}

.cancel-button {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-left: 10px;
}

.cancel-button:hover {
  background-color: #c82333;
}

h2 {
  font-size: 1.5rem;
  color: #e50914;
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
  flex: 1 1 calc(30% - 15px);
  background-color: #333;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s, box-shadow 0.2s;
}

.actor-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
}

.actor-card img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e50914;
}

.notification {
  background-color: #4caf50;
  color: white;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  text-align: center;
}
</style>
