<template>
  <div class="movie-card" @click="handleClick">
    <img :src="movie.media" alt="Movie Cover" class="movie-image" />
    <h3>{{ movie.title }}</h3>
    <p>Date de sortie : {{ formattedReleaseDate }}</p>
    <p>Durée : {{ movie.duration }} minutes</p>
    <div class="rating">
      <span v-for="star in maxStars" :key="star" class="star" :class="{ filled: star <= movie.rating }">★</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object
  },
  computed: {
    formattedReleaseDate() {
      const options = {year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(this.movie.releaseDate).toLocaleDateString('fr-FR', options);
    },
    maxStars() {
      return 5; // Nombre maximum d'étoiles
    }
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
.movie-card {
  border: none;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: #222; /* Fond sombre pour correspondre à l'esthétique Netflix */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7);
}

.movie-image {
  width: 100%;
  height: auto; /* Hauteur automatique pour garder les proportions */
  max-height: 400px; /* Hauteur maximale pour éviter que l'image ne soit trop grande */
  object-fit: cover; /* Remplit l'espace sans déformer l'image */
  border-radius: 10px 10px 0 0;
  transition: transform 0.3s;
}

.movie-image:hover {
  transform: scale(1.05); /* Zoom léger sur l'image au survol */
}

h3 {
  font-size: 1.5em;
  margin: 10px 0;
  color: #e50914; /* Rouge Netflix pour les titres */
  text-align: center;
}

p {
  margin: 5px 0;
  color: #ddd; /* Texte gris clair pour les descriptions */
  line-height: 1.5;
  text-align: center;
}

.rating {
  margin-top: 10px; /* Espace au-dessus de la note */
  text-align: center;
}

.star {
  color: #555; /* Couleur par défaut des étoiles */
  font-size: 1.5em; /* Taille des étoiles */
}

.star.filled {
  color: #ffcc00; /* Couleur des étoiles remplies */
}

.star:hover {
  cursor: pointer;
  color: #ffcc00; /* Couleur survolée */
}

/* Ajout d'une animation pour les étoiles */
.star {
  transition: color 0.2s;
}
</style>
