<template>
  <div class="category-card" @click="handleClick">
    <h3>{{ category.title }}</h3>
    <p class="movies-count">{{ category.moviesCount }} films</p>
  </div>
</template>

<script>
export default {
  props: {
    category: Object
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
.category-card {
  background-color: #222; /* Fond sombre pour correspondre à l'esthétique Netflix */
  border: none;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5); /* Ombre légère */
  position: relative;
  overflow: hidden;
  text-align: center;
  color: #ffffff; /* Texte blanc pour un bon contraste */
}

.category-card:hover {
  transform: translateY(-5px); /* Légère élévation au survol */
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7); /* Ombre plus prononcée au survol */
}

h3 {
  font-size: 1.5em; /* Taille de police du titre */
  margin: 10px 0;
  color: #e50914; /* Rouge Netflix pour le titre */
  text-align: center;
}

p {
  margin: 5px 0;
  color: #ddd; /* Couleur de texte pour le nombre de films */
  line-height: 1.5;
  text-align: center;
}

.movies-count {
  margin-top: 10px; /* Espace au-dessus du nombre de films */
  text-align: center;
}
</style>
