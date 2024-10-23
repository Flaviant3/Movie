<template>
  <div>
    <h1>Liste des Catégories</h1>
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
import CategoryCard from './CategoryCard.vue';

export default {
  components: {
    Category: CategoryCard
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  background-color: #1a1a1a;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  color: #ff6f61;
  margin-bottom: 20px;
  font-size: 2.5em;
  animation: fadeIn 1s ease-in-out;
}

.search-input {
  display: block;
  width: 50%;
  padding: 10px;
  margin: 0 auto 20px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  background-color: #333;
  color: #fff;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #ff6f61;
  outline: none;
}

.categories-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 20px;
}

.category-card {
  background-color: #2a2a2a;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.category-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

h3 {
  margin: 10px 0 5px;
  font-size: 1.2em;
  text-align: center;
  color: #ff6f61;
}

p {
  margin: 0 0 10px;
  font-size: 0.9em;
  color: #ddd;
  text-align: center;
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
