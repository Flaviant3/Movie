<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="title">Titre :</label>
      <input type="text" v-model="title" required />
    </div>
    <div>
      <label for="description">Description :</label>
      <textarea v-model="description" required></textarea>
    </div>
    <div>
      <label for="release_date">Date de sortie :</label>
      <input type="date" v-model="releaseDate" required />
    </div>
    <div>
      <label for="duration">Durée :</label>
      <input type="number" v-model="duration" required />
    </div>
    <div>
      <label for="entries">Entrées :</label>
      <input type="number" v-model="entries" required />
    </div>
    <div>
      <label for="director">Réalisateur :</label>
      <input type="text" v-model="director" required />
    </div>
    <div>
      <label for="rating">Note :</label>
      <input type="number" v-model="rating" min="0" max="10" step="0.1" required />
    </div>
    <div>
      <label for="media">Média :</label>
      <input type="text" v-model="media" />
    </div>
    <div>
      <label for="studio">Studio :</label>
      <input type="text" v-model="studio" required />
    </div>
    <div>
      <label for="genre">Genre :</label>
      <input type="text" v-model="genre" required />
    </div>
    <div>
      <label for="saga">Saga :</label>
      <input type="text" v-model="saga" />
    </div>
    <div>
      <label for="actors">Acteurs :</label>
      <select v-model="selectedActors" multiple>
        <option v-for="actor in actors" :key="actor.id" :value="actor['@id']">
          {{ actor.lastname }}
        </option>
      </select>
    </div>
    <button type="submit">Ajouter le film</button>
  </form>
</template>

<script>
import axios from 'axios';
import { addMovie } from "@/services/movieService";

export default {
  data() {
    return {
      title: '',
      description: '',
      releaseDate: '',
      duration: null,
      entries: null,
      director: '',
      rating: null,
      media: '',
      studio: '',
      genre: '',
      saga: '',
      selectedActors: [],
      actors: []
    };
  },
  created() {
    this.fetchActors();
  },
  methods: {
    async fetchActors() {
      try {
        const response = await axios.get('http://symfony.mmi-troyes.fr:8319/api/actors');
        this.actors = response.data['hydra:member'];
      } catch (error) {
        console.error('Erreur lors de la récupération des acteurs:', error);
      }
    },
    async submitForm() {
      const token = localStorage.getItem('jwtToken');

      if (!token) {
        alert('Vous devez être connecté pour ajouter un film.');
        return;
      }

      const newMovie = {
        title: this.title,
        description: this.description,
        release_date: this.releaseDate,
        duration: parseInt(this.duration, 10),
        entries: parseInt(this.entries, 10),
        director: this.director,
        rating: parseFloat(this.rating),
        media: this.media,
        studio: this.studio,
        genre: this.genre,
        saga: this.saga,
        created_at: new Date().toISOString(),
        movie_actor: this.selectedActors
      };

      console.log(newMovie);

      try {
        await axios.post('http://symfony.mmi-troyes.fr:8319/api/movies', newMovie, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        this.resetForm();
        this.$emit('close');
      } catch (error) {
        console.error('Erreur lors de l\'ajout du film:', error.response.data);
        alert('Une erreur est survenue lors de l\'ajout du film.');
      }
    },
    resetForm() {
      this.title = '';
      this.description = '';
      this.releaseDate = '';
      this.duration = null;
      this.entries = null;
      this.director = '';
      this.rating = null;
      this.media = '';
      this.studio = '';
      this.genre = '';
      this.saga = '';
      this.selectedActors = [];
    }
  }
};
</script>

<style>
form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px auto;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="date"],
input[type="number"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
}

textarea {
  resize: vertical;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.3s;
}

button[type="submit"]:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

button[type="submit"]:focus {
  outline: none;
}
</style>
