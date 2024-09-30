<template>
  <div>
    <h1>Liste des Films</h1>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Rechercher un film..."
      class="search-input"
    />
    <div class="movies-list">
      <MovieCard
        v-for="movie in filteredMovies"
        :key="movie.id"
        :movie="movie"
        @click="handleMovieClick(movie)"
      />
    </div>
  </div>
</template>

<script>
import { getMovies } from '../services/movieService';
import MovieCard from './MovieCard.vue'; // Importer le composant MovieCard

export default {
  components: {
    MovieCard
  },
  data() {
    return {
      movies: [],
      searchQuery: '' // Ajout d'une propriété pour la recherche
    };
  },
  async created() {
    this.movies = await getMovies();
  },
  computed: {
    filteredMovies() {
      // Filtrer les films en fonction de la recherche
      return this.movies.filter(movie => {
        return movie.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  methods: {
    handleMovieClick(movie) {
      // Logique à exécuter lors du clic sur une carte de film
      console.log('Film cliqué:', movie);
    }
  }
};
</script>

<style>
.movies-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 colonnes */
  gap: 20px; /* Espace entre les cartes */
  padding: 20px; /* Padding autour de la grille */
}

.movie-card {
  background-color: #fefefe; /* Fond légèrement gris */
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s; /* Transition pour l'effet */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Pour éviter que le contenu déborde */
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Ombre plus prononcée au survol */
}

.movie-image {
  width: 100%; /* Largeur 100% pour remplir la carte */
  height: 300px; /* Hauteur fixe pour l'image en format portrait */
  object-fit: cover; /* Garde le ratio d'aspect */
  border-radius: 5px 5px 0 0; /* Coins arrondis en haut */
}

.search-input {
  width: 100%; /* Largeur 100% pour le champ de recherche */
  padding: 10px; /* Espacement intérieur */
  margin-bottom: 20px; /* Marge en bas */
  border: 1px solid #ccc; /* Bordure */
  border-radius: 5px; /* Coins arrondis */
  font-size: 1em; /* Taille de la police */
}

h3 {
  margin: 10px 0 5px; /* Marges pour le titre */
  font-size: 1.2em; /* Taille de police du titre */
}

p {
  margin: 0 0 10px; /* Marges pour la description */
  font-size: 0.9em; /* Taille de police pour la description */
  color: #555; /* Couleur de texte pour la description */
}
</style>

