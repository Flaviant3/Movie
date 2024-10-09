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
