<template>
  <div class="category-card" @click="handleClick">
    <h3>{{ category.title }}</h3>
    <button class="delete-button" @click.stop="deleteCategory">Supprimer</button>
    <button class="edit-button" @click.stop="editCategory">Modifier</button>
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
    },
    deleteCategory() {
      this.$emit('delete', this.category.id);
    },
    editCategory() {
      this.$emit('edit', this.category);
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.category-card {
  background-color: #2a2a2a; /* Dark background for modern look */
  border: none;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Light shadow */
  position: relative;
  overflow: hidden;
  text-align: center;
  color: #ffffff; /* White text for contrast */
  margin-bottom: 20px; /* Space between cards */
}

.category-card:hover {
  transform: translateY(-5px); /* Slight lift on hover */
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2); /* More pronounced shadow on hover */
}

h3 {
  font-size: 1.5em; /* Font size for title */
  margin: 10px 0;
  color: #ff6f61; /* Vibrant color for title */
  text-align: center;
}

.delete-button, .edit-button {
  background-color: #e50914; /* Red for delete */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s, transform 0.3s;
  margin: 5px; /* Space between buttons */
}

.delete-button:hover, .edit-button:hover {
  background-color: #c00712; /* Darker red on hover */
  transform: scale(1.05); /* Slight zoom on hover */
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
