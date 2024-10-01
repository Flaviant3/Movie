<template>
  <div class="category-card" @click="handleClick">
    <img :src="category.media" alt="Image de la catégorie" class="category-image" />
    <h3>{{ category.name }}</h3>
    <p>Description : {{ category.description }}</p>
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

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.category-image {
  width: 100%;
  height: 200px; /* Ajustement de la hauteur pour un meilleur affichage */
  object-fit: cover; /* Remplit l'espace sans déformer l'image */
  border-radius: 10px; /* Coins arrondis */
  transition: transform 0.3s;
}

.category-image:hover {
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

.movies-count {
  margin-top: 10px; /* Espace au-dessus du nombre de films */
  text-align: center;
}
</style>
