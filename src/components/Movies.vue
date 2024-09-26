<template>
  <div class="movies-page">
    <h1>Films</h1>

    <input type="text" v-model="searchQuery" placeholder="Rechercher par nom de film" />

    <button @click="showAddMovieForm = !showAddMovieForm">
      {{ showAddMovieForm ? 'Annuler' : 'Ajouter un film' }}
    </button>

    <div v-if="showAddMovieForm">
      <h2>Ajouter un film</h2>
      <form @submit.prevent="addMovie">
        <input type="text" v-model="newMovie.title" placeholder="Titre du film" required />
        <textarea v-model="newMovie.description" placeholder="Description" required></textarea>

        <label>Acteurs :</label>
        <select v-model="newMovie.actors" multiple>
          <option v-for="actor in actors" :key="actor.id" :value="actor.id">{{ actor.name }}</option>
        </select>
        <button type="submit">Ajouter</button>
      </form>
    </div>

    <div class="movies-list">
      <MovieCard
        v-for="movie in paginatedMovies"
        :key="movie.id"
        :movie="movie"
        @click.native="goToMovieDetails(movie.id)"
        @edit="editMovie(movie)"
        @delete="confirmDelete(movie.id)"
      />
    </div>

    <pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @change-page="changePage"
    />

    <popin-confirmation
      v-if="showConfirmation"
      @confirm="deleteMovie"
      @cancel="showConfirmation = false"
    />
  </div>
</template>

<script>
import MovieCard from './MovieCard.vue';
import Pagination from './Pagination.vue';
import PopinConfirmation from './PopinConfirmation.vue';

export default {
  components: {
    MovieCard,
    Pagination,
    PopinConfirmation
  },
  data() {
    return {
      searchQuery: '',
      movies: [], // Remplir avec la liste des films
      actors: [], // Remplir avec la liste des acteurs
      newMovie: {
        title: '',
        description: '',
        actors: []
      },
      showAddMovieForm: false,
      currentPage: 1,
      itemsPerPage: 5,
      showConfirmation: false,
      movieToDelete: null
    };
  },
  computed: {
    filteredMovies() {
      return this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedMovies() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredMovies.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredMovies.length / this.itemsPerPage);
    }
  },
  methods: {
    goToMovieDetails(movieId) {
      this.$router.push({ name: 'MovieDetails', params: { id: movieId } });
    },
    addMovie() {
      const newId = this.movies.length + 1; // Remplacer par une logique d'ID unique
      this.movies.push({ id: newId, ...this.newMovie });
      this.resetNewMovie();
      this.showAddMovieForm = false;
    },
    resetNewMovie() {
      this.newMovie = { title: '', description: '', actors: [] };
    },
    editMovie(movie) {
      // Logique pour éditer le film
      this.newMovie = { ...movie };
      this.showAddMovieForm = true;
    },
    confirmDelete(movieId) {
      this.movieToDelete = movieId;
      this.showConfirmation = true;
    },
    deleteMovie() {
      this.movies = this.movies.filter(movie => movie.id !== this.movieToDelete);
      this.showConfirmation = false;
      this.movieToDelete = null;
    },
    changePage(page) {
      this.currentPage = page;
    }
  },
  created() {
    // Remplacer par votre logique pour récupérer les films et acteurs
    this.movies = [
      { id: 1, title: 'Film 1', description: 'Description 1', actors: [] },
      { id: 2, title: 'Film 2', description: 'Description 2', actors: [] },
      { id: 3, title: 'Film 3', description: 'Description 3', actors: [] },
      { id: 4, title: 'Film 4', description: 'Description 4', actors: [] },
      { id: 5, title: 'Film 5', description: 'Description 5', actors: [] },
      { id: 6, title: 'Film 6', description: 'Description 6', actors: [] },
      { id: 7, title: 'Film 7', description: 'Description 7', actors: [] },
      { id: 8, title: 'Film 8', description: 'Description 8', actors: [] }
    ];
    this.actors = [
      { id: 1, name: 'Acteur 1' },
      { id: 2, name: 'Acteur 2' },
      { id: 3, name: 'Acteur 3' },
      { id: 4, name: 'Acteur 4' }
    ];
  }
};
</script>

<style scoped>
.movies-page {
  padding: 20px;
}
.movies-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
