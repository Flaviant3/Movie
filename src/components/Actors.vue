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
        @delete="confirmDelete(actor.id)"
      />
    </div>

    <PopinConfirmation
      v-if="isConfirmationVisible"
      @confirm="deleteActor(selectedActorId)"
      @cancel="isConfirmationVisible = false"
    />
  </div>
</template>

<script>
import { getActors, addActor, deleteActor } from '../services/actorService';
import ActorCard from './ActorCard.vue';
import AddActorForm from './AddActorForm.vue';
import PopinConfirmation from './PopinConfirmation.vue';

export default {
  components: {
    ActorCard,
    AddActorForm,
    PopinConfirmation
  },
  data() {
    return {
      actors: [],
      searchQuery: '',
      isAddActorVisible: false,
      isConfirmationVisible: false,
      selectedActorId: null
    };
  },
  async created() {
    this.actors = await getActors();
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
      this.isAddActorVisible = true;
    },
    async addActor(newActor) {
      try {
        const addedActor = await addActor(newActor);
        this.actors.push(addedActor);
        alert('Acteur ajouté avec succès !');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'acteur:', error.response ? error.response.data : error);
        alert('Erreur lors de l\'ajout de l\'acteur. Veuillez vérifier les données et réessayer.');
      }
    },
    confirmDelete(actorId) {
      this.selectedActorId = actorId;
      this.isConfirmationVisible = true;
    },
    async deleteActor(actorId) {
      try {
        await deleteActor(actorId);
        this.actors = this.actors.filter(actor => actor.id !== actorId);
        this.isConfirmationVisible = false;
        alert('Acteur supprimé avec succès !');
      } catch (error) {
        alert('Erreur lors de la suppression de l\'acteur. Veuillez réessayer.');
        console.error('Erreur:', error);
      }
    }
  }
};
</script>

<style scoped>
body {
  background-color: #141414;
  color: #ffffff;
}

h1 {
  text-align: center;
  color: #e50914;
  margin-bottom: 20px;
}

.actors-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #555;
  border-radius: 5px;
  font-size: 1em;
  background-color: #333;
  color: #fff;
}

.search-input::placeholder {
  color: #aaa;
}

.actor-card {
  background-color: #222;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.actor-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.7);
}

.actor-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

h3 {
  margin: 10px 0 5px;
  font-size: 1.2em;
  text-align: center;
}

p {
  margin: 0 0 10px;
  font-size: 0.9em;
  color: #ddd;
  text-align: center;
}
</style>
