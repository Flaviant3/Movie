<template>
  <div class="homepage">
    <h1>WR505D Projet Movie.vue</h1>

    <section class="movies-section">
      <h2>Derniers Films</h2>
      <div class="movies-list">
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

export default {
  components: {
    MovieCard,
    ActorCard
  },
  data() {
    return {
      latestMovies: [], // Remplir avec les 4 derniers films
      latestActors: []   // Remplir avec les 4 derniers acteurs
    };
  },
  methods: {
    goToMovieDetails(movieId) {
      this.$router.push({name: 'MovieDetails', params: {id: movieId}});
    },
    goToActorDetails(actorId) {
      this.$router.push({name: 'ActorDetails', params: {id: actorId}});
    }
  },
  created() {
    // Remplacer par votre logique pour récupérer les films et acteurs
    this.latestMovies = [
      {id: 1, title: 'Film 1', description: 'Description 1'},
      {id: 2, title: 'Film 2', description: 'Description 2'},
      {id: 3, title: 'Film 3', description: 'Description 3'},
      {id: 4, title: 'Film 4', description: 'Description 4'}
    ];
    this.latestActors = [
      {id: 1, name: 'Acteur 1'},
      {id: 2, name: 'Acteur 2'},
      {id: 3, name: 'Acteur 3'},
      {id: 4, name: 'Acteur 4'}
    ];
  }
};
</script>

<style scoped>
.homepage {
  padding: 20px;
  font-family: 'Georgia', serif; /* Police élégante */
  background-color: #f9f9f9; /* Fond clair */
  color: #333;
}

h1 {
  text-align: center;
  color: #2c3e50; /* Couleur sombre */
  margin-bottom: 30px;
  font-size: 2.5em; /* Taille de police augmentée */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.movies-section, .actors-section {
  margin-bottom: 40px;
  background-color: #ffffff; /* Fond blanc pour les sections */
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 30px; /* Padding augmenté */
  border: 1px solid #dcdcdc; /* Bordure pour un effet de cadre */
  transition: background-color 0.3s; /* Transition douce pour le survol */
}

.movies-section:hover, .actors-section:hover {
  background-color: #f0f8ff; /* Changement de couleur au survol */
}

h2 {
  text-align: center;
  color: #2980b9; /* Couleur bleue */
  margin-bottom: 20px;
  font-size: 28px; /* Taille de police augmentée */
  border-bottom: 3px solid #2980b9; /* Bordure */
  padding-bottom: 10px;
  font-weight: bold; /* Texte en gras */
}

.movies-list, .actors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 30px; /* Espacement entre les cartes */
  justify-content: center;
}

.movie-card, .actor-card {
  background-color: #fefefe; /* Fond légèrement gris */
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s; /* Effets de transition */
  overflow: hidden;
  cursor: pointer;
  width: 250px; /* Largeur fixe */
  text-align: center; /* Centrer le texte */
  position: relative; /* Position relative pour l'animation */
}

.movie-card:hover, .actor-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2); /* Ombre plus prononcée */
}

.movie-card img, .actor-card img {
  width: 100%;
  height: 150px; /* Hauteur fixe */
  object-fit: cover; /* Garde le ratio d'aspect */
  border-bottom: 3px solid #2980b9; /* Bordure en bas de l'image */
  transition: transform 0.3s; /* Transition pour l'image */
}

.movie-card:hover img, .actor-card:hover img {
  transform: scale(1.1); /* Légère augmentation de l'image au survol */
}

.movie-card h3, .actor-card h3 {
  color: #333;
  margin: 10px 0;
  font-size: 1.5em; /* Taille de police augmentée */
  font-weight: normal; /* Normaliser le poids de la police */
}

.movie-card p, .actor-card p {
  padding: 0 10px;
  color: #666;
  text-align: center;
  font-size: 0.9em; /* Taille de police réduite */
}

@media (max-width: 768px) {
  .movies-list, .actors-list {
    flex-direction: column;
    align-items: center;
  }
}
</style>
