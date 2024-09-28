<template>
  <div class="actor-card" @click="handleClick">
    <img :src="require(`@/assets/actor.jpg`)" alt="Actor Cover" class="actor-image" />
    <h3>{{ actor.name }}</h3>
    <button @click.stop="edit()">Éditer</button>
    <button @click.stop="remove()">Supprimer</button>
  </div>
</template>

<script>
export default {
  props: {
    actor: Object
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
    edit() {
      this.$emit('edit', this.actor);
    },
    remove() {
      this.$emit('delete', this.actor.id);
    }
  }
};
</script>

<style scoped>
.actor-card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;
  background-color: #fefefe; /* Fond légèrement gris */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Ombre légère */
}

.actor-card:hover {
  transform: scale(1.05);
}

.actor-image {
  width: 100%; /* Largeur 100% pour remplir la carte */
  height: 200px; /* Hauteur fixe pour l'image */
  object-fit: cover; /* Garde le ratio d'aspect */
  border-radius: 5px 5px 0 0; /* Coins arrondis en haut */
}
</style>
