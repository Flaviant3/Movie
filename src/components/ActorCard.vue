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
  </div>
</template>

<script>
export default {
  props: {
    actor: Object
  },
  computed: {
    formattedBirthDate() {
      const options = {year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(this.actor.dob).toLocaleDateString('fr-FR', options);
    },
    maxStars() {
      return 5; // Nombre maximum d'étoiles
    }
  },
  methods: {
    handleClick() {
      this.$emit('click');
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
  background-color: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  text-align: center;
}

.actor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.actor-image {
  width: 100%;
  height: 200px; /* Ajustement de la hauteur pour un meilleur affichage */
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
  color: #333;
  text-align: center;
}

p {
  margin: 5px 0;
  color: #555;
  line-height: 1.5;
  text-align: center;
}

.rating {
  margin-top: 10px; /* Espace au-dessus de la note */
  text-align: center;
}

.star {
  color: #ccc; /* Couleur par défaut des étoiles */
  font-size: 1.2em;
}

.star.filled {
  color: #ffcc00; /* Couleur des étoiles remplies */
}

.star:hover {
  cursor: pointer;
  color: #ffcc00; /* Couleur survolée */
}

/* Ajout d'une animation pour les étoiles */
.star {
  transition: color 0.2s;
}
</style>
