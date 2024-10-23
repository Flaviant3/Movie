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
    };
  },
  created() {
    this.fetchActors(); // Récupérer les acteurs lors de la création du composant
  },
  methods: {
    async fetchActors() {
      try {
        const response = await axios.get('http://symfony.mmi-troyes.fr:8319/api/actors');
        this.actors = response.data['hydra:member']; // Accédez aux acteurs ici
      } catch (error) {
        console.error('Erreur lors de la récupération des acteurs:', error);
      }
    },
    async submit() {
      const token = localStorage.getItem('jwtToken'); // Récupérer le token

      if (!token) {
        alert('Vous devez être connecté pour ajouter un acteur.');
        return;
      }

      // Vérifiez que tous les champs obligatoires sont remplis
      if (this.firstname && this.lastname && this.dob && this.gender && this.nationality && this.media && this.bio) {
        const newActor = {
          firstname: this.firstname,
          lastname: this.lastname,
          dob: this.dob,
          awards: this.awards !== null ? parseInt(this.awards) : undefined, // Convertir en entier ou undefined
          bio: this.bio,
          nationality: this.nationality,
          media: this.media,
          gender: this.gender
        };

        console.log(newActor); // Afficher les données envoyées

        try {
          const response = await axios.post('http://symfony.mmi-troyes.fr:8319/api/actors', newActor, {
            headers: {
              'Authorization': `Bearer ${token}`, // Inclure le token dans les en-têtes
              'Content-Type': 'application/json'
            }
          });

          console.log('Acteur ajouté avec succès:', response.data); // Afficher la réponse de l'API
          this.resetForm(); // Réinitialiser le formulaire
          this.fetchActors(); // Rafraîchir la liste des acteurs
          this.$emit('actor-added'); // Émettre un événement après ajout
        } catch (error) {
          if (error.response) {
            console.error('Erreur lors de l\'ajout de l\'acteur:', error.response.data); // Afficher les détails de l'erreur
            alert(`Une erreur est survenue lors de l'ajout de l'acteur. Code d'erreur: ${error.response.status}. Détails: ${error.response.data.message}`);
          } else {
            console.error('Erreur lors de l\'ajout de l\'acteur:', error.message);
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

<style>
.add-actor-form {
  background-color: #f9f9f9; /* Fond légèrement gris */
  padding: 20px; /* Espacement int��rieur */
  border-radius: 8px; /* Coins arrondis */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Ombre légère */
  max-width: 400px; /* Largeur maximale du formulaire */
  margin: 20px auto; /* Centrer le formulaire */
}

input, textarea, select {
  width: 100%; /* Largeur 100% pour les champs */
  padding: 10px; /* Espacement intérieur */
  border: 1px solid #ccc; /* Bordure */
  border-radius: 5px; /* Coins arrondis */
  margin-bottom: 10px; /* Marge en bas pour chaque champ */
}

button {
  background-color: #007bff; /* Couleur bleue */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px; /* Espacement autour du texte */
  cursor: pointer;
  font-size: 1em; /* Taille de la police */
  transition: background-color 0.3s, transform 0.3s; /* Transition pour l'effet */
}

button:hover {
  background-color: #0056b3; /* Couleur plus foncée au survol */
  transform: scale(1.05); /* Légère augmentation de taille au survol */
}

button:focus {
  outline: none; /* Supprimer le contour par défaut */
}

ul {
  list-style-type: none; /* Supprimer les puces de la liste */
  padding: 0; /* Supprimer le padding */
}

li {
  margin: 5px 0; /* Marge pour chaque élément de la liste */
}
</style>
