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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  background-color: #1a1a1a;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  color: #ff6f61;
  margin-bottom: 20px;
  font-size: 2.5em;
  animation: fadeIn 1s ease-in-out;
}

.search-input,
.add-actor-button {
  display: block;
  margin: 0 auto 20px auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #ff6f61;
  outline: none;
}

.add-actor-button {
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.add-actor-button:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.add-actor-button:focus {
  outline: none;
}

.actors-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 20px;
}

.actor-card {
  background-color: #2a2a2a;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.actor-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
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
</style>
