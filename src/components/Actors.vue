<template>
  <div>
    <h1>Liste des Acteurs</h1>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Rechercher un acteur..."
      class="search-input"
    />
    <div class="actors-list">
      <ActorCard
        v-for="actor in filteredActors"
        :key="actor.id"
        :actor="actor"
        @click="handleActorClick(actor)"
      />
    </div>
  </div>
</template>

<script>
import { getActors } from '../services/actorService'; // Service pour récupérer les acteurs
import ActorCard from './ActorCard.vue'; // Importer le composant ActorCard

export default {
  components: {
    ActorCard
  },
  data() {
    return {
      actors: [],
      searchQuery: '' // Ajout d'une propriété pour la recherche
    };
  },
  async created() {
    this.actors = await getActors(); // Récupérer la liste des acteurs
  },
  computed: {
    filteredActors() {
      // Filtrer les acteurs en fonction de la recherche
      return this.actors.filter(actor => {
        return actor.lastname.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  methods: {
    handleActorClick(actor) {
      // Logique à exécuter lors du clic sur une carte d'acteur
      console.log('Acteur cliqué:', actor);
    }
  }
};
</script>

<style scoped>
.actors-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 colonnes */
  gap: 15px; /* Espace entre les cartes */
  padding: 20px; /* Padding autour de la grille */
}

.actor-card {
  background-color: #fefefe; /* Fond légèrement gris */
  border: none; /* Suppression de la bordure pour un look plus moderne */
  border-radius: 8px; /* Coins arrondis */
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s; /* Transition pour l'effet */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Ombre légère */
  overflow: hidden; /* Pour éviter que le contenu déborde */
}

.actor-card:hover {
  transform: scale(1.05); /* Légère augmentation de taille au survol */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Ombre plus prononcée au survol */
}

.actor-image {
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
