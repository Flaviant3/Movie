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
    <button type="submit">Ajouter le film</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      releaseDate: '',
      duration: null, // Assurez-vous que c'est un entier
      entries: null, // Assurez-vous que c'est un entier
      director: '',
      rating: null, // Assurez-vous que c'est un nombre
      media: '',
      studio: '',
      genre: '',
      saga: ''
    };
  },
  methods: {
    submitForm() {
      const newMovie = {
        title: this.title,
        description: this.description,
        release_date: this.releaseDate,
        duration: parseInt(this.duration, 10), // Convertir en entier
        entries: parseInt(this.entries, 10), // Convertir en entier
        director: this.director,
        rating: parseFloat(this.rating), // Convertir en nombre
        media: this.media,
        studio: this.studio,
        genre: this.genre,
        saga: this.saga,
        created_at: new Date().toISOString() // Ajouter la date actuelle
      };
      this.$emit('add-movie', newMovie);
      this.resetForm();
      this.$emit('close');
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
    }
  }
};
</script>

<style>
form {
  background-color: #f9f9f9; /* Fond légèrement gris */
  padding: 20px; /* Espacement intérieur */
  border-radius: 8px; /* Coins arrondis */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Ombre légère */
  max-width: 600px; /* Largeur maximale du formulaire */
  margin: 20px auto; /* Centrer le formulaire */
}

form div {
  margin-bottom: 15px; /* Marge en bas pour chaque champ */
}

label {
  display: block; /* Afficher les labels en bloc */
  margin-bottom: 5px; /* Marge en bas pour les labels */
  font-weight: bold; /* Mettre les labels en gras */
}

input[type="text"],
input[type="date"],
input[type="number"],
textarea {
  width: 100%; /* Largeur 100% pour les champs */
  padding: 10px; /* Espacement intérieur */
  border: 1px solid #ccc; /* Bordure */
  border-radius: 5px; /* Coins arrondis */
  font-size: 1em; /* Taille de la police */
}

textarea {
  resize: vertical; /* Permettre le redimensionnement vertical */
}

button[type="submit"] {
  background-color: #007bff; /* Couleur bleue */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px; /* Espacement autour du texte */
  cursor: pointer;
  font-size: 1em; /* Taille de la police */
  transition: background-color 0.3s, transform 0.3s; /* Transition pour l'effet */
}

button[type="submit"]:hover {
  background-color: #0056b3; /* Couleur plus foncée au survol */
  transform: scale(1.05); /* Légère augmentation de taille au survol */
}

button[type="submit"]:focus {
  outline: none; /* Supprimer le contour par défaut */
}

</style>
