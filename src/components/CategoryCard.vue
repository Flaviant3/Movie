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
