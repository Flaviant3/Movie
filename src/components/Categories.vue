<template>
  <div>
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Rechercher une catégorie"
      class="search-input"
    />
    <div class="categories-list">
      <div v-for="category in filteredCategories" :key="category.id">
        <Category :category="category" @click="handleCategoryClick(category)" />
      </div>
    </div>
  </div>
</template>

<script>
import { getCategories } from '../services/categoryService';
import CategoryCard from './CategoryCard.vue'; // Assurez-vous que le chemin est correct

export default {
  components: {
    Category: CategoryCard // Enregistrement du composant
  },
  data() {
    return {
      categories: [],
      searchTerm: '',
    };
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(category => {
        return category.title && category.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    }
  },
  methods: {
    async fetchCategories() {
      this.categories = await getCategories();
    },
    handleCategoryClick(category) {
      console.log('Category clicked:', category);
    }
  },
  mounted() {
    this.fetchCategories();
  }
};
</script>

<style scoped>
.categories-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 colonnes */
  gap: 15px; /* Espace entre les cartes */
  padding: 20px; /* Padding autour de la grille */
}

.search-input {
  width: 100%; /* Largeur 100% pour le champ de recherche */
  padding: 10px; /* Espacement intérieur */
  margin-bottom: 20px; /* Marge en bas */
  border: 1px solid #ccc; /* Bordure */
  border-radius: 5px; /* Coins arrondis */
  font-size: 1em; /* Taille de la police */
}
</style>
