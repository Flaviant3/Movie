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
        <span class="email" v-if="email">{{ email }}</span>
        <router-link to="/edit-profile" class="edit-profile">Modifier Profil</router-link>
        <button v-if="email" class="logout" @click="logout">Logout</button>
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
      email: '', // Initialiser l'email
    };
  },
  created() {
    this.email = localStorage.getItem('name') || '';
  },
  methods: {
    logout() {
      localStorage.removeItem('userId');
      localStorage.removeItem('name');
      this.email = '';
      this.$router.push('/');
      alert('Vous êtes déconnecté.');
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  background-color: #f4f4f9;
  color: #333;
  transition: background-color 0.3s, color 0.3s;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #1f1f1f;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
}

nav:hover {
  background-color: #2a2a2a;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  color: #ff6f61;
  cursor: pointer;
  transition: color 0.3s;
}

.logo:hover {
  color: #ff3b2f;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.1rem;
  position: relative;
  transition: color 0.3s, transform 0.3s;
}

.nav-link::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: #ff6f61;
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link:hover {
  color: #ff6f61;
  transform: scale(1.1);
}

.profile-actions {
  display: flex;
  align-items: center;
}

.edit-profile {
  padding: 10px 20px;
  background-color: #ff6f61;
  color: #ffffff;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s, transform 0.3s;
  margin-right: 15px;
}

.edit-profile:hover {
  background-color: #ff3b2f;
  transform: translateY(-2px);
}

.logout {
  padding: 10px 20px;
  background-color: #ff6f61;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.logout:hover {
  background-color: #ff3b2f;
  transform: translateY(-2px);
}

.email {
  color: #ffffff;
  margin-right: 20px;
  font-size: 1.1rem;
  transition: color 0.3s;
}

.email:hover {
  color: #ff6f61;
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 20px;
  }

  .nav-links {
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .profile-actions {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .edit-profile, .logout {
    width: 100%;
    text-align: center;
    margin: 5px 0;
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

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}

.router-view {
  animation: fadeIn 0.5s ease-in-out;
}
</style>
