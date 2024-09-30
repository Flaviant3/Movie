<template>
  <div class="actors-page">
    <h1>Liste des Acteurs</h1>

    <input type="text" v-model="searchQuery" placeholder="Rechercher par nom d'acteur" />

    <button @click="showAddActorForm = !showAddActorForm">
      {{ showAddActorForm ? 'Annuler' : 'Ajouter un acteur' }}
    </button>

    <div v-if="showAddActorForm">
      <h2>Ajouter un acteur</h2>
      <form @submit.prevent="addActor">
        <input type="text" v-model="newActor.name" placeholder="Nom de l'acteur" required />
        <button type="submit">Ajouter</button>
      </form>
    </div>

    <ul class="actors-list">
      <li v-for="actor in paginatedActors" :key="actor.id">
        <h2>{{ actor.name }}</h2>
        <p>Films: {{ actor.movies.join(', ') }}</p>
        <button @click="editActor(actor)">Modifier</button>
        <button @click="confirmDelete(actor.id)">Supprimer</button>
      </li>
    </ul>

    <pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @change-page="changePage"
    />

    <popin-confirmation
      v-if="showConfirmation"
      @confirm="deleteActor"
      @cancel="showConfirmation = false"
    />
  </div>
</template>

<script>
import { getActors } from '../services/actorService';
import Pagination from './Pagination.vue';
import PopinConfirmation from './PopinConfirmation.vue';

export default {
  components: {
    Pagination,
    PopinConfirmation
  },
  data() {
    return {
      searchQuery: '',
      actors: [],
      newActor: {
        name: ''
      },
      showAddActorForm: false,
      currentPage: 1,
      itemsPerPage: 5,
      showConfirmation: false,
      actorToDelete: null
    };
  },
  computed: {
    filteredActors() {
      return this.actors.filter(actor =>
        actor.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    paginatedActors() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredActors.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredActors.length / this.itemsPerPage);
    }
  },
  methods: {
    async addActor() {
      // Logique pour ajouter un acteur via l'API
      const newActorData = { name: this.newActor.name };
      // Remplacez ceci par votre logique d'appel API pour ajouter un acteur
      const addedActor = await this.$api.addActor(newActorData); // Exemple d'appel API
      this.actors.push(addedActor);
      this.resetNewActor();
      this.showAddActorForm = false;
    },
    resetNewActor() {
      this.newActor = {name: ''};
    },
    editActor(actor) {
      this.newActor = {...actor};
      this.showAddActorForm = true;
    },
    confirmDelete(actorId) {
      this.actorToDelete = actorId;
      this.showConfirmation = true;
    },
    async deleteActor() {
      // Logique pour supprimer un acteur via l'API
      await this.$api.deleteActor(this.actorToDelete); // Exemple d'appel API
      this.actors = this.actors.filter(actor => actor.id !== this.actorToDelete);
      this.showConfirmation = false;
      this.actorToDelete = null;
    },
    changePage(page) {
      this.currentPage = page;
    }
  },
  async created() {
    this.actors = await getActors(); // Récupération des acteurs depuis l'API
  }
};
</script>

<style scoped>
.actors-page {
  padding: 20px;
}

.actors-list {
  list-style-type: none;
  padding: 0;
}

.actors-list li {
  margin-bottom: 20px;
}
</style>
