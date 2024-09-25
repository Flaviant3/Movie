<!-- src/App.vue -->
<template>
  <div id="app">
    <nav>
      <router-link to="/">Homepage</router-link>
      <router-link to="/movies">Movies</router-link>
      <router-link to="/actors">Actors</router-link>
      <router-link to="/categories">Categories</router-link>
      <router-link to="/edit-profile" style="float: right;">Edit Profile / Logout</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
nav {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f1f1f1;
}
</style>
