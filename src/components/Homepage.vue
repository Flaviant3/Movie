<template>
  <div class="homepage">
    <h1>WR505D Projet Movie.vue</h1>

    <section class="carousel">
      <div class="carousel-images" :style="{ transform: `translateX(-${currentIndex * 50}%)` }"> <!-- Ajustement ici -->
        <MovieCard
          v-for="movie in latestMovies"
          :key="movie.id"
          :movie="movie"
          @click.native="goToMovieDetails(movie.id)"
        />
      </div>
    </section>

    <section class="actors-section">
      <h2>Derniers Acteurs</h2>
      <div class="actors-list">
        <ActorCard
          v-for="actor in latestActors"
          :key="actor.id"
          :actor="actor"
          @click.native="goToActorDetails(actor.id)"
        />
      </div>
    </section>
  </div>
</template>



<script>
import MovieCard from './MovieCard.vue';
import ActorCard from './ActorCard.vue';
import { fetchLatestMovies, fetchLatestActors } from '../services/api';

export default {
  components: {
    MovieCard,
    ActorCard
  },
  data() {
    return {
      latestMovies: [], // Remplir avec les 4 derniers films
      latestActors: [], // Remplir avec les 4 derniers acteurs
      currentIndex: 0 // Index de l'image actuelle
    };
  },
  methods: {
    goToActorDetails(actorId) {
      this.$router.push({ name: 'ActorDetails', params: { id: actorId } });
    },
    goToMovieDetails(movieId) {
      this.$router.push({ name: 'MovieDetails', params: { id: movieId } });
    },
    async loadLatestMovies() {
      try {
        const movies = await fetchLatestMovies();
        this.latestMovies = movies.slice(0, 4); // Prendre les 4 derniers films
      } catch (error) {
        console.error('Erreur lors du chargement des films:', error);
      }
    },
    async loadLatestActors() {
      try {
        const actors = await fetchLatestActors();
        this.latestActors = actors.slice(0, 4); // Prendre les 4 derniers acteurs
      } catch (error) {
        console.error('Erreur lors du chargement des acteurs:', error);
      }
    },
    updateCarousel() {
      this.currentIndex = (this.currentIndex + 1) % Math.ceil(this.latestMovies.length / 2);
    }
  },
  created() {
    this.loadLatestMovies(); // Charger les films lors de la création du composant
    this.loadLatestActors(); // Charger les acteurs lors de la création du composant
    setInterval(this.updateCarousel, 5000); // Mettre à jour le carrousel toutes les 5 secondes
  }
};
</script>

<style scoped>
.homepage {
  color: #ffffff; /* Texte blanc pour le contraste */
  margin: 0; /* Enlever les marges par défaut */
  padding: 0; /* Enlever le padding par défaut */
  overflow: hidden; /* Masquer les débordements */
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5em;
  color: #e50914; /* Rouge Netflix */
}

h2 {
  font-size: 1.8em;
  margin-bottom: 10px;
  color: #e50914; /* Rouge Netflix */
}

.carousel {
  position: relative;
  overflow: hidden; /* Masquer les débordements */
  height: 100vh; /* Hauteur fixe pour le carrousel (100% de la hauteur de la fenêtre) */
  border-radius: 0; /* Pas de coins arrondis */
  margin-bottom: 20px; /* Espace en bas du carrousel */
}

.carousel-images {
  display: flex; /* Alignement horizontal des images */
  transition: transform 0.5s ease; /* Transition pour le défilement */
  width: 200%; /* S'assurer que le conteneur prend deux fois la largeur pour deux cartes */
  height: 100%; /* S'assurer que le conteneur prend toute la hauteur */
}

.movie-card {
  width: 50%; /* Chaque carte prend 50% de la largeur du carrousel */
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrer le contenu */
  padding: 0; /* Pas d'espacement interne pour maximiser l'espace */
  height: 100%; /* Hauteur de la carte pour remplir le carrousel */
}

.movie-image {
  width: 100%; /* Largeur 100% pour remplir la carte */
  height: 100%; /* Hauteur 100% pour remplir la carte */
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
  color: #333;
  text-align: center;
}

p {
  margin: 5px 0;
  color: #555;
  line-height: 1.5;
  text-align: center;
}

.actors-section {
  padding: 20px; /* Espacement autour de la section des acteurs */
  background-color: #222; /* Fond sombre pour la section des acteurs */
}

.actors-list {
  display: flex; /* Afficher les acteurs sur une seule ligne */
  overflow-x: auto; /* Permettre le défilement horizontal */
  padding: 10px 0; /* Espacement vertical */
}

.actor-card {
  margin-right: 10px; /* Espace entre les cartes d'acteurs */
}
</style>

