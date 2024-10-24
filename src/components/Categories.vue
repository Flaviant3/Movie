<template>
  <div>
    <h1>Liste des Catégories</h1>
    <input
      type="text"
      v-model="searchTerm"
      placeholder="Rechercher une catégorie"
      class="search-input"
    />
    <button @click="showAddCategoryForm" class="add-category-button">Ajouter une Catégorie</button>

    <div v-if="isAddCategoryVisible" class="add-category-form">
      <h2>{{ isEditing ? 'Modifier' : 'Ajouter' }} une Catégorie</h2>
      <form @submit.prevent="submitCategory">
        <input type="text" v-model="categoryTitle" placeholder="Titre de la catégorie" required />
        <button type="submit">{{ isEditing ? 'Modifier' : 'Ajouter' }}</button>
        <button type="button" @click="cancelEdit">Annuler</button>
      </form>
    </div>

    <div class="categories-list">
      <div v-for="category in filteredCategories" :key="category.id">
        <Category :category="category" @click="handleCategoryClick(category)" @delete="confirmDelete(category.id)" @edit="editCategory(category)" />
      </div>
    </div>

    <PopinConfirmation
      v-if="isConfirmationVisible"
      @confirm="deleteCategory(selectedCategoryId)"
      @cancel="isConfirmationVisible = false"
    />
  </div>
</template>

<script>
import { getCategories, addCategory, deleteCategory, updateCategory } from '../services/categoryService';
import CategoryCard from './CategoryCard.vue';
import PopinConfirmation from './PopinConfirmation.vue';

export default {
  components: {
    Category: CategoryCard,
    PopinConfirmation
  },
  data() {
    return {
      categories: [],
      searchTerm: '',
      isAddCategoryVisible: false,
      isConfirmationVisible: false,
      selectedCategoryId: null,
      categoryTitle: '',
      isEditing: false,
      editingCategoryId: null
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
    },
    showAddCategoryForm() {
      this.isAddCategoryVisible = true;
      this.isEditing = false;
      this.categoryTitle = '';
    },
    async submitCategory() {
      if (this.isEditing) {
        await this.updateCategory();
      } else {
        await this.addCategory();
      }
    },
    async addCategory() {
      try {
        const newCategory = { title: this.categoryTitle };
        const addedCategory = await addCategory(newCategory);
        this.categories.push(addedCategory);
        this.isAddCategoryVisible = false;
        alert('Catégorie ajoutée avec succès !');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la catégorie:', error.response ? error.response.data : error);
        alert('Erreur lors de l\'ajout de la catégorie. Veuillez vérifier les données et réessayer.');
      }
    },
    async updateCategory() {
      try {
        const updatedCategory = { title: this.categoryTitle };
        await updateCategory(this.editingCategoryId, updatedCategory);
        const index = this.categories.findIndex(category => category.id === this.editingCategoryId);
        this.categories[index].title = this.categoryTitle;
        this.isAddCategoryVisible = false;
        alert('Catégorie modifiée avec succès !');
      } catch (error) {
        console.error('Erreur lors de la modification de la catégorie:', error.response ? error.response.data : error);
        alert('Erreur lors de la modification de la catégorie. Veuillez vérifier les données et réessayer.');
      }
    },
    confirmDelete(categoryId) {
      this.selectedCategoryId = categoryId;
      this.isConfirmationVisible = true;
    },
    async deleteCategory(categoryId) {
      try {
        await deleteCategory(categoryId);
        this.categories = this.categories.filter(category => category.id !== categoryId);
        this.isConfirmationVisible = false;
        alert('Catégorie supprimée avec succès !');
      } catch (error) {
        alert('Erreur lors de la suppression de la catégorie. Veuillez réessayer.');
        console.error('Erreur:', error);
      }
    },
    editCategory(category) {
      this.isAddCategoryVisible = true;
      this.isEditing = true;
      this.categoryTitle = category.title;
      this.editingCategoryId = category.id;
    },
    cancelEdit() {
      this.isAddCategoryVisible = false;
      this.isEditing = false;
      this.categoryTitle = '';
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
  font-family: 'Roboto', sans-serif;
  background-color: #1a1a1a;
  color: #ffffff;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5em;
  color: #ff6f61;
  animation: fadeIn 1s ease-in-out;
}

.search-input,
.add-category-button,
.add-category-form button {
  display: block;
  margin: 0 auto 20px auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.3s;
}

.search-input:focus,
.add-category-form button:focus {
  border-color: #ff6f61;
  outline: none;
}

.add-category-button {
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.add-category-button:hover {
  background-color: #218838;
  transform: scale(1.05);
}

.add-category-button:focus {
  outline: none;
}

.add-category-form {
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 20px auto;
  color: #ffffff;
}

.add-category-form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #3a3a3a;
  color: #ffffff;
}

.categories-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  padding: 20px;
}

@media (max-width: 1024px) {
  .categories-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .categories-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .search-input,
  .add-category-button {
    width: 90%;
  }
}

@media (max-width: 480px) {
  .categories-list {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 2em;
  }

  .search-input,
  .add-category-button {
    width: 100%;
  }
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
