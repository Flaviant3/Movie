<template>
  <div>
    <h1>Liste des Films</h1>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Rechercher un film..."
      class="search-input"
    />
    <button @click="showAddMovieForm" class="add-movie-button">Ajouter un Film</button>

    <div class="movies-list">
      <MovieCard
        v-for="movie in paginatedMovies"
        :key="movie.id"
        :movie="movie"
        @click="handleMovieClick(movie)"
      />
      <button v-if="filteredMovies.length === 0">Aucun film trouvé.</button>
    </div>

    <Pagination
      v-if="totalPages > 1"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @onPageChange="updatePage"
    />

    <AddMovieForm
      v-if="isAddMovieVisible"
      @close="isAddMovieVisible = false"
      @add-movie="addMovie"
    />

    <ConfirmationDialog
      v-if="isConfirmationVisible"
      @confirm="deleteMovie(selectedMovieId)"
      @cancel="isConfirmationVisible = false"
    />
  </div>
</template>

<script>
import { getMovies, addMovie as addMovieService, deleteMovie } from '../services/movieService';
import MovieCard from './MovieCard.vue';
import AddMovieForm from './AddMovieForm.vue';
import ConfirmationDialog from './ConfirmationDialog.vue';
import Pagination from './Pagination.vue';

export default {
  components: {
    MovieCard,
    AddMovieForm,
    ConfirmationDialog,
    Pagination
  },
  data() {
    return {
      movies: [],
      searchQuery: '',
      isAddMovieVisible: false,
      isConfirmationVisible: false,
      selectedMovieId: null,
      currentPage: 1,
      moviesPerPage: 20 // Nombre de films à afficher par page
    };
  },
  async created() {
    this.movies = await getMovies(); // Récupère tous les films
  },
  methods: {
    handleMovieClick(movie) {
      this.$router.push({ name: 'MovieDetails', params: { id: movie.id } });
    },
    showAddMovieForm() {
      this.isAddMovieVisible = true;
    },
    async addMovie(newMovie) {
      try {
        const addedMovie = await addMovieService(newMovie);
        this.movies.push(addedMovie);
        alert('Film ajouté avec succès !');
      } catch (error) {
        console.error('Erreur lors de l\'ajout du film:', error.response ? error.response.data : error);
        alert('Erreur lors de l\'ajout du film. Veuillez vérifier les données et réessayer.');
      }
    },
    confirmDelete(movieId) {
      this.selectedMovieId = movieId;
      this.isConfirmationVisible = true;
    },
    async deleteMovie(movieId) {
      try {
        await deleteMovie(movieId);
        this.movies = this.movies.filter(movie => movie.id !== movieId);
        this.isConfirmationVisible = false;
      } catch (error) {
        alert('Erreur lors de la suppression du film. Veuillez réessayer.');
      }
    },
    updatePage(newPage) {
      this.currentPage = newPage;
    }
  },
  computed: {
    filteredMovies() {
      return this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedMovies() {
      const start = (this.currentPage - 1) * this.moviesPerPage;
      const end = start + this.moviesPerPage;
      return this.filteredMovies.slice(start, end); // Retourne les films de la page actuelle
    },
    totalPages() {
      return Math.ceil(this.filteredMovies.length / this.moviesPerPage); // Calcule le nombre total de pages
    }
  }
};
</script>

<style scoped>
.movies-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 colonnes */
  gap: 15px; /* Espace entre les cartes */
  padding: 20px; /* Padding autour de la grille */
}

.movie-card {
  background-color: #fefefe; /* Fond légèrement gris */
  border: none; /* Suppression de la bordure pour un look plus moderne */
  border-radius: 8px; /* Coins arrondis */
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s; /* Transition pour l'effet */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Ombre légère */
  overflow: hidden; /* Pour éviter que le contenu déborde */
}

.movie-card:hover {
  transform: scale(1.05); /* Légère augmentation de taille au survol */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Ombre plus prononcée au survol */
}

.movie-image {
  width: 100%; /* Largeur 100% pour remplir la carte */
  height: 180px; /* Hauteur réduite pour un affichage compact */
  object-fit: cover; /* Garde le ratio d'aspect */
  border-radius: 8px 8px 0 0; /* Coins arrondis en haut */
}

.search-input {
  width: 100%; /* Largeur 100% pour le champ de recherche */
  padding: 10px; /* Espacement intérieur */
  margin-bottom: 20px; /* Marge en bas */
  border: 1px solid #ccc; /* Bordure */
  border-radius: 5px; /* Coins arrondis */
  font-size: 1em; /* Taille de la police */
}

.pagination {
  display: flex;
  justify-content: space-between;
  margin: 20px 0; /* Marge autour de la pagination */
}

h3 {
  margin: 10px 0 5px; /* Marges pour le titre */
  font-size: 1em; /* Taille de police du titre réduite */
  text-align: center; /* Alignement centré */
}

p {
  margin: 0 0 10px; /* Marges pour la description */
  font-size: 0.8em; /* Taille de police pour la description réduite */
  color: #555; /* Couleur de texte pour la description */
  text-align: center; /* Alignement centré */
}
</style>
