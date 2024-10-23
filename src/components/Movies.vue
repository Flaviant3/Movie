<template>
  <div>
    <h1>Liste des Films</h1>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Rechercher un film..."
      class="search-input"
    />

    <select v-model="sortCriteria" class="sort-select">
      <option value="title">Trier par Titre</option>
      <option value="releaseDate">Trier par Date de Sortie</option>
      <option value="rating">Trier par Note</option>
    </select>

    <button @click="showAddMovieForm" class="add-movie-button">Ajouter un Film</button>

    <AddMovieForm
      v-if="isAddMovieVisible"
      @close="isAddMovieVisible = false"
      @add-movie="addMovie"
    />

    <div class="movies-list">
      <MovieCard
        v-for="movie in paginatedMovies"
        :key="movie.id"
        :movie="movie"
        @click="handleMovieClick(movie)"
        @delete="confirmDelete(movie.id)"
      />
      <button v-if="filteredMovies.length === 0">Aucun film trouvé. Pensez a vous connectez!</button>
    </div>

    <Pagination
      v-if="totalPages > 1"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @onPageChange="updatePage"
    />

    <PopinConfirmation
      v-if="isConfirmationVisible"
      @confirm="deleteMovie(selectedMovieId)"
      @cancel="isConfirmationVisible = false"
    />
  </div>
</template>

<script>
import { getMovies, addMovie, deleteMovie } from '@/services/movieService.js';
import MovieCard from './MovieCard.vue';
import AddMovieForm from './AddMovieForm.vue';
import PopinConfirmation from './PopinConfirmation.vue';
import Pagination from './Pagination.vue';

export default {
  components: {
    MovieCard,
    AddMovieForm,
    PopinConfirmation,
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
      moviesPerPage: 30, // Nombre de films à afficher par page
      sortCriteria: 'title' // Critère de tri par défaut
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
        const addedMovie = await addMovie(newMovie);
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
        alert('Film supprimé avec succès !'); // Alerte de succès
      } catch (error) {
        alert('Erreur lors de la suppression du film. Veuillez réessayer.');
        console.error('Erreur:', error); // Affichage de l'erreur dans la console
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
    sortedMovies() {
      return this.filteredMovies.sort((a, b) => {
        if (this.sortCriteria === 'title') {
          return a.title.localeCompare(b.title);
        } else if (this.sortCriteria === 'releaseDate') {
          return new Date(b.releaseDate) - new Date(a.releaseDate); // Tri décroissant
        } else if (this.sortCriteria === 'rating') {
          return b.rating - a.rating; // Tri décroissant par note
        }
      });
    },
    paginatedMovies() {
      const start = (this.currentPage - 1) * this.moviesPerPage;
      const end = start + this.moviesPerPage;
      return this.sortedMovies.slice(start, end); // Retourne les films triés et paginés
    },
    totalPages() {
      return Math.ceil(this.filteredMovies.length / this.moviesPerPage); // Calcule le nombre total de pages
    }
  }
};
</script>

<style scoped>
.sort-select {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
}

.add-movie-button {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s, transform 0.3s;
}

.add-movie-button:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.add-movie-button:focus {
  outline: none;
}

.movies-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  padding: 20px;
}

.movie-card {
  background-color: #fefefe;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.movie-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.search-input {
  width: 50%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
