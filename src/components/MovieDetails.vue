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
import { fetchActorDetails, fetchMovieDetails } from '../services/api';
import { updateMovie as movieServiceUpdate } from "../services/movieService";

export default {
  data() {
    return {
      movie: {}, // Remplir avec les détails du film
      isEditing: false // État pour gérer l'édition
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
    },
    async updateMovie() {
      try {
        this.movie.rating = parseFloat(this.movie.rating);
        console.log(this.movie); // Vérifiez les données ici
        await movieServiceUpdate(this.movie.id, this.movie);
        this.isEditing = false; // Fermer le mode édition après la sauvegarde
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
    this.loadMovieDetails(movieId); // Charger les détails du film lors de la création du composant
  }
};
</script>

<style scoped>
.movie-details {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #141414; /* Fond sombre */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.8);
  font-family: 'Arial', sans-serif;
  color: #ffffff; /* Texte blanc */
}

.movie-image {
  width: 300px;
  height: 400px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: block;
  border: 2px solid #e50914; /* Bordure rouge Netflix */
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

h3 {
  font-size: 2rem;
  color: #e50914; /* Rouge Netflix */
  margin-bottom: 10px;
  text-align: center;
}

.info-section {
  background-color: #222; /* Fond sombre pour la section info */
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.edit-form {
  background-color: #222; /* Fond sombre pour le formulaire */
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
  background-color: #007bff; /* Bleu */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px; /* Espace au-dessus du bouton */
}

.save-button:hover {
  background-color: #0056b3; /* Couleur plus foncée au survol */
}

.cancel-button {
  background-color: #dc3545; /* Rouge */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-left: 10px; /* Espace à gauche */
}

.cancel-button:hover {
  background-color: #c82333; /* Couleur plus foncée au survol */
}

h2 {
  font-size: 1.5rem;
  color: #e50914; /* Rouge Netflix */
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
  flex: 1 1 calc(30% - 15px); /* 3 cards par ligne */
  background-color: #333; /* Fond sombre pour les cartes d'acteurs */
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s, box-shadow 0.2s; /* Ajout d'une transition */
}

.actor-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8); /* Ombre plus prononcée au survol */
}

.actor-card img {
  width: 100px; /* Ajustement de la taille de l'image */
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e50914; /* Bordure rouge Netflix */
}

.notification {
  background-color: #4caf50; /* Vert */
  color: white;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  text-align: center;
}
</style>
