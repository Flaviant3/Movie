<template>
  <div id="app">
    <nav>
      <div class="logo">WR505D</div>
      <div class="nav-links">
        <router-link to="/" class="nav-link">Homepage</router-link>
        <router-link to="/movies" class="nav-link">Movies</router-link>
        <router-link to="/actors" class="nav-link">Actors</router-link>
        <router-link to="/categories" class="nav-link">Categories</router-link>
      </div>
      <div class="profile-actions">
        <span class="username" v-if="username">{{ username }}</span> <!-- Afficher le nom d'utilisateur uniquement s'il est présent -->
        <router-link to="/edit-profile" class="edit-profile">Modifier Profil</router-link>
        <button v-if="username" class="logout" @click="logout">Logout</button>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      username: '', // Initialiser le nom d'utilisateur
    };
  },
  created() {
    // Récupérer le nom d'utilisateur lors de la création du composant
    this.username = localStorage.getItem('username') || '';
  },
  methods: {
    logout() {
      localStorage.removeItem('userId'); // Suppression de l'ID utilisateur
      localStorage.removeItem('username'); // Suppression du nom d'utilisateur
      this.username = ''; // Réinitialiser le nom d'utilisateur dans le composant
      this.$router.push('/'); // Redirection vers la page d'accueil
      alert('Vous êtes déconnecté.'); // Message de confirmation
    }
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: #141414; /* Couleur sombre comme Netflix */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: #e50914; /* Rouge Netflix */
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 20px; /* Espacement entre les liens */
}

.nav-link {
  color: #ffffff; /* Texte blanc */
  text-decoration: none;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #e50914; /* Changement de couleur au survol */
}

.profile-actions {
  display: flex;
  align-items: center; /* Alignement vertical */
}

.edit-profile {
  padding: 10px 15px;
  background-color: #e50914; /* Rouge Netflix */
  color: #ffffff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  margin-right: 10px; /* Espace entre Modifier Profil et Logout */
}

.edit-profile:hover {
  background-color: #f40612; /* Couleur plus foncée au survol */
}

.logout {
  padding: 10px 15px;
  background-color: #e50914; /* Rouge Netflix */
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer; /* Curseur pointer */
  transition: background-color 0.3s ease;
}

.logout:hover {
  background-color: #f40612; /* Couleur plus foncée au survol */
}

.username {
  color: #ffffff; /* Couleur du texte du nom d'utilisateur */
  margin-right: 15px; /* Espacement entre le nom et les actions */
}
</style>
