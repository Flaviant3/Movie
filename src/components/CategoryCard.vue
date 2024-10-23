<template>
  <div class="category-card" @click="handleClick">
    <h3>{{ category.title }}</h3>
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  background-color: #1a1a1a;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
}

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
