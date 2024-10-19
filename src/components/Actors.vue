<template>
  <div>
    <h1>Liste des Acteurs</h1>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Rechercher un acteur..."
      class="search-input"
    />
    <button @click="showAddActorForm" class="add-actor-button">Ajouter un Acteur</button>

    <AddActorForm
      v-if="isAddActorVisible"
      @close="isAddActorVisible = false"
      @add-actor="addActor"
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
import { getActors, addActor } from '../services/actorService'; // Importer le service
import ActorCard from './ActorCard.vue';
import AddActorForm from './AddActorForm.vue';

export default {
  components: {
    ActorCard,
    AddActorForm
  },
  data() {
    return {
      actors: [],
      searchQuery: '',
      isAddActorVisible: false // État pour afficher le formulaire d'ajout
    };
  },
  async created() {
    this.actors = await getActors(); // Récupérer la liste des acteurs
  },
  computed: {
    filteredActors() {
      return this.actors.filter(actor => {
        return actor.lastname.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  methods: {
    handleActorClick(actor) {
      this.$router.push({ name: 'ActorDetails', params: { id: actor.id } });
    },
    showAddActorForm() {
      this.isAddActorVisible = true; // Afficher le formulaire d'ajout
    },
    async addActor(newActor) {
      try {
        const addedActor = await addActor(newActor);
        this.actors.push(addedActor); // Ajouter l'acteur à la liste
        alert('Acteur ajouté avec succès !');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'acteur:', error.response ? error.response.data : error);
        alert('Erreur lors de l\'ajout de l\'acteur. Veuillez vérifier les données et réessayer.');
      }
    }
  }
};
</script>

<style scoped>
body {
  background-color: #141414; /* Fond sombre pour correspondre à l'esthétique Netflix */
  color: #ffffff; /* Texte blanc pour un bon contraste */
}

h1 {
  text-align: center;
  color: #e50914; /* Rouge Netflix pour le titre principal */
  margin-bottom: 20px;
}

.actors-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* Colonnes adaptatives */
  gap: 20px; /* Espace entre les cartes */
  padding: 20px; /* Padding autour de la grille */
}

.search-input {
  width: 100%; /* Largeur 100% pour le champ de recherche */
  padding: 10px; /* Espacement intérieur */
  margin-bottom: 20px; /* Marge en bas */
  border: 1px solid #555; /* Bordure sombre */
  border-radius: 5px; /* Coins arrondis */
  font-size: 1em; /* Taille de la police */
  background-color: #333; /* Fond sombre pour le champ de recherche */
  color: #fff; /* Texte blanc */
}

.search-input::placeholder {
  color: #aaa; /* Couleur des placeholders */
}

.actor-card {
  background-color: #222; /* Fond sombre pour les cartes d'acteurs */
  border: none; /* Suppression de la bordure pour un look plus moderne */
  border-radius: 8px; /* Coins arrondis */
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s; /* Transition pour l'effet */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); /* Ombre légère */
  overflow: hidden; /* Pour éviter que le contenu déborde */
}

.actor-card:hover {
  transform: scale(1.05); /* Légère augmentation de taille au survol */
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.7); /* Ombre plus prononcée au survol */
}

.actor-image {
  width: 100%; /* Largeur 100% pour remplir la carte */
  height: 180px; /* Hauteur réduite pour un affichage compact */
  object-fit: cover; /* Garde le ratio d'aspect */
  border-radius: 8px 8px 0 0; /* Coins arrondis en haut */
}

h3 {
  margin: 10px 0 5px; /* Marges pour le titre */
  font-size: 1.2em; /* Taille de police du titre */
  text-align: center; /* Alignement centré */
}

p {
  margin: 0 0 10px; /* Marges pour la description */
  font-size: 0.9em; /* Taille de police pour la description */
  color: #ddd; /* Couleur de texte pour la description */
  text-align: center; /* Alignement centré */
}
</style>
