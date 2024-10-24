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
      <button v-if="filteredMovies.length === 0" class="no-actors-found">Aucun film trouvé. Pensez a vous connectez!</button>
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

    <div v-if="message" class="notification">{{ message }}</div>
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
      sortCriteria: 'title', // Critère de tri par défaut
      message: ''
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
        this.showMessage('Film ajouté avec succès !');
      } catch (error) {
        console.error('Erreur lors de l\'ajout du film:', error.response ? error.response.data : error);
        this.showMessage('Erreur lors de l\'ajout du film. Veuillez vérifier les données et réessayer.');
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
        this.showMessage('Film supprimé avec succès !');
      } catch (error) {
        this.showMessage('Erreur lors de la suppression du film. Veuillez réessayer.');
        console.error('Erreur:', error);
      }
    },
    updatePage(newPage) {
      this.currentPage = newPage;
    },
    showMessage(message) {
      this.message = message;
      setTimeout(() => {
        this.message = '';
      }, 3000);
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  background-color: #1a1a1a;
  color: #ffffff;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5em;
  color: #ff6f61;
  animation: fadeIn 1s ease-in-out;
}

.search-input,
.sort-select,
.add-movie-button {
  display: block;
  margin: 0 auto 20px auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.3s;
}

.search-input:focus,
.sort-select:focus {
  border-color: #ff6f61;
  outline: none;
}

.add-movie-button {
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
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
  background-color: #2a2a2a;
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

.no-actors-found {
  text-align: center;
  margin-top: 20px;
  font-size: 1.2em;
  color: #ff6f61;
}

.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #ff6f61;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  animation: slideInFromTop 0.5s ease-in-out;
}

@media (max-width: 1024px) {
  .movies-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .movies-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .search-input,
  .sort-select,
  .add-movie-button {
    width: 90%;
  }
}

@media (max-width: 480px) {
  .movies-list {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 2em;
  }

  .search-input,
  .sort-select,
  .add-movie-button {
    width: 100%;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
