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
      return 5;
    }
  },
  methods: {
    handleClick() {
      this.$router.push({ name: 'ActorDetails', params: { id: this.actor.id } });
    },
    confirmDelete() {
      this.$emit('delete', this.actor.id);
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

.actor-card {
  border: none;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: #2a2a2a;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  text-align: center;
  color: #ffffff;
}

.actor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.actor-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  transition: transform 0.3s;
}

.actor-image:hover {
  transform: scale(1.05);
}

h3 {
  font-size: 1.5em;
  margin: 10px 0;
  color: #ff6f61;
}

p {
  margin: 5px 0;
  color: #ddd;
  line-height: 1.5;
}

.rating {
  margin-top: 10px;
  text-align: center;
}

.star {
  color: #555;
  font-size: 1.5em;
}

.star.filled {
  color: #ffcc00;
}

.star:hover {
  cursor: pointer;
  color: #ffcc00;
  transition: color 0.2s;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c82333;
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
