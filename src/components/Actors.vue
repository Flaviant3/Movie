<template>
  <div>
    <h1>Liste des Acteurs</h1>
    <ul>
      <li v-for="actor in actors" :key="actor.id">
        <img :src="actor.media" alt="Photo de l'acteur" />
        <h2>Nom:{{ actor.lastname }}</h2>
        <p>Date de naissance: {{ actor.dob }}</p>
        <p>Nationalité: {{ actor.nationality }}</p>
        <p>Biographie: {{ actor.bio }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getActors } from '../services/actorService';

export default {
  data() {
    return {
      actors: []
    };
  },
  async created() {
    this.actors = await getActors();
  }
};
</script>

<style>
img {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
}
</style>
