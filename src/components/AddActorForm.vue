<template>
  <div class="add-actor-form">
    <h2>Ajouter un Acteur</h2>
    <form @submit.prevent="submit">
      <div>
        <label for="firstname">Prénom :</label>
        <input type="text" v-model="firstname" required />
      </div>
      <div>
        <label for="lastname">Nom :</label>
        <input type="text" v-model="lastname" required />
      </div>
      <div>
        <label for="dob">Date de naissance :</label>
        <input type="date" v-model="dob" required />
      </div>
      <div>
        <label for="awards">Nombre de récompenses :</label>
        <input type="number" v-model="awards" placeholder="Nombre de récompenses" />
      </div>
      <div>
        <label for="bio">Biographie :</label>
        <textarea v-model="bio" required></textarea>
      </div>
      <div>
        <label for="nationality">Nationalité :</label>
        <input type="text" v-model="nationality" required />
      </div>
      <div>
        <label for="media">URL du média :</label>
        <input type="text" v-model="media" required />
      </div>
      <div>
        <label for="gender">Genre :</label>
        <select v-model="gender" required>
          <option value="" disabled>Genre</option>
          <option value="male">Masculin</option>
          <option value="female">Féminin</option>
        </select>
      </div>
      <button type="submit">Ajouter</button>
      <button type="button" @click="$emit('close')">Annuler</button>
    </form>

    <h2>Liste des Acteurs</h2>
    <ul>
      <li v-for="actor in actors" :key="actor.id">
        {{ actor.firstname }} {{ actor.lastname }} - {{ actor.nationality }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      dob: '',
      awards: null,
      bio: '',
      nationality: '',
      media: '',
      gender: '',
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
    async submit() {
      const token = localStorage.getItem('jwtToken');

      if (!token) {
        alert('Vous devez être connecté pour ajouter un acteur.');
        return;
      }

      if (this.firstname && this.lastname && this.dob && this.gender && this.nationality && this.media && this.bio) {
        const newActor = {
          firstname: this.firstname,
          lastname: this.lastname,
          dob: this.dob,
          awards: this.awards !== null ? parseInt(this.awards) : undefined,
          bio: this.bio,
          nationality: this.nationality,
          media: this.media,
          gender: this.gender,
          created_at: new Date().toISOString().split('T')[0]
        };

        try {
          const response = await axios.post('http://symfony.mmi-troyes.fr:8319/api/actors', newActor, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          this.resetForm();
          this.fetchActors();
          this.$emit('actor-added');
        } catch (error) {
          if (error.response) {
            alert(`Une erreur est survenue lors de l'ajout de l'acteur. Code d'erreur: ${error.response.status}. Détails: ${error.response.data.message}`);
          } else {
            alert('Une erreur est survenue lors de l\'ajout de l\'acteur.');
          }
        }
      } else {
        alert('Veuillez remplir tous les champs obligatoires.');
      }
    },
    resetForm() {
      this.firstname = '';
      this.lastname = '';
      this.dob = '';
      this.awards = null;
      this.bio = '';
      this.nationality = '';
      this.media = '';
      this.gender = '';
    }
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

.add-actor-form {
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 20px auto;
  color: #000;
}

h2 {
  color: #ff6f61;
  text-align: center;
}

input, textarea, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #3a3a3a;
  color: #ffffff;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

button:focus {
  outline: none;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}
</style>
