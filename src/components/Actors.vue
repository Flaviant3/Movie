<template>
  <div class="actors-page">
    <h1>Acteurs</h1>

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

    <div class="actors-list">
      <ActorCard
        v-for="actor in paginatedActors"
        :key="actor.id"
        :actor="actor"
        @click.native="goToActorDetails(actor.id)"
        @edit="editActor(actor)"
        @delete="confirmDelete(actor.id)"
      />
    </div>

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
import ActorCard from './ActorCard.vue';
import Pagination from './Pagination.vue';
import PopinConfirmation from './PopinConfirmation.vue';
import { getActors } from '../services/actorService'; // Importez le service

export default {
  components: {
    ActorCard,
    Pagination,
    PopinConfirmation
  },
  data() {
    return {
      searchQuery: '',
      actors: [], // Remplir avec la liste des acteurs
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
    goToActorDetails(actorId) {
      this.$router.push({ name: 'ActorDetails', params: { id: actorId } });
    },
    addActor() {
      const newId = this.actors.length + 1; // Remplacer par une logique d'ID unique
      this.actors.push({ id: newId, ...this.newActor });
      this.resetNewActor();
      this.showAddActorForm = false;
    },
    resetNewActor() {
      this.newActor = { name: '' };
    },
    editActor(actor) {
      this.newActor = { ...actor };
      this.showAddActorForm = true;
    },
    confirmDelete(actorId) {
      this.actorToDelete = actorId;
      this.showConfirmation = true;
    },
    deleteActor() {
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
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
