<template>
  <div>
    <h1>{{ movie.title }}</h1>
    <p>{{ movie.description }}</p>
    <h2>Acteurs</h2>
    <div class="actors-list">
      <ActorCard
        v-for="actor in movie.actors"
        :key="actor.id"
        :actor="actor"
        @click.native="goToActorDetails(actor.id)"
      />
    </div>
  </div>
</template>

<script>
import ActorCard from './ActorCard.vue';

export default {
  components: {
    ActorCard
  },
  data() {
    return {
      movie: {} // Remplir avec les détails du film
    };
  },
  methods: {
    goToActorDetails(actorId) {
      this.$router.push({ name: 'ActorDetails', params: { id: actorId } });
    }
  },
  created() {
    const movieId = this.$route.params.id;
    // Remplacer par votre logique pour récupérer les détails du film
    this.movie = {
      id: movieId,
      title: 'Film ' + movieId,
      description: 'Description du film ' + movieId,
      actors: [
        { id: 1, name: 'Acteur 1' },
        { id: 2, name: 'Acteur 2' }
      ]
    };
  }
};
</script>

<style scoped>
.actors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
