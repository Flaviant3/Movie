<template>
  <div class="actor-card" @click="handleClick">
    <img :src="actor.media" alt="Photo de l'acteur" class="actor-image" />
    <h3>{{ actor.lastname }}</h3>
    <p>Date de naissance : {{ formattedBirthDate }}</p>
    <p>Nationalité : {{ actor.nationality }}</p>
    <p>{{ actor.bio }}</p>
    <div class="rating">
      <span v-for="star in maxStars" :key="star" class="star" :class="{ filled: star <= actor.rating }">★</span>
    </div>
    <button class="delete-button" @click.stop="confirmDelete">Supprimer</button>
  </div>
</template>

<script>
export default {
  props: {
    actor: Object
  },
  computed: {
    formattedBirthDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(this.actor.dob).toLocaleDateString('fr-FR', options);
    },
    maxStars() {
      return 5; // Nombre maximum d'étoiles
    }
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
    confirmDelete() {
      this.$emit('delete', this.actor.id); // Émettre l'événement de suppression avec l'ID de l'acteur
    }
  }
};
</script>

<style scoped>
.actor-card {
  border: none;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: #222; /* Fond sombre pour correspondre à l'esthétique Netflix */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
  text-align: center;
}

.actor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7);
}

.actor-image {
  width: 200px;
  height: 200px; /* Taille de l'image ajustée */
  object-fit: cover; /* Remplit l'espace sans déformer l'image */
  border-radius: 50%; /* Rendre l'image complètement ronde */
  transition: transform 0.3s;
}

.actor-image:hover {
  transform: scale(1.05); /* Zoom léger sur l'image au survol */
}

h3 {
  font-size: 1.5em;
  margin: 10px 0;
  color: #e50914; /* Rouge Netflix pour les titres */
}

p {
  margin: 5px 0;
  color: #ddd; /* Texte gris clair pour les descriptions */
  line-height: 1.5;
}

.rating {
  margin-top: 10px; /* Espace au-dessus de la note */
  text-align: center;
}

.star {
  color: #555; /* Couleur par défaut des étoiles */
  font-size: 1.5em; /* Taille des étoiles */
}

.star.filled {
  color: #ffcc00; /* Couleur des étoiles remplies */
}

.star:hover {
  cursor: pointer;
  color: #ffcc00; /* Couleur survolée */
  transition: color 0.2s;
}

.delete-button {
  background-color: #dc3545; /* Couleur rouge pour le bouton de suppression */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px; /* Espace au-dessus du bouton */
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c82333; /* Couleur au survol */
}
</style>
