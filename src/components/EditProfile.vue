<template>
  <div>
    <div id="container">
      <div v-if="message" class="notification">{{ message }}</div>
      <div class="form-container sign-up-container">
        <form @submit.prevent="signUp">
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input type="text" v-model="user.username" placeholder="Name" required />
          <input type="email" v-model="user.email" placeholder="Email" required />
          <input type="password" v-model="user.password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div class="form-container login-container">
        <form @submit.prevent="login">
          <h1>Login</h1>
          <span>or use your email and password to login</span>
          <input type="email" v-model="loginEmail" placeholder="Email" required />
          <input type="password" v-model="loginPassword" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
      </div>
      <div class="form-container profile-update-container">
        <form @submit.prevent="updateProfile">
          <h1>Update Profile</h1>
          <span>Update your information</span>
          <input type="email" v-model="profile.email" placeholder="Email" required />
          <input type="text" v-model="profile.username" placeholder="New Name" required />
          <input type="password" v-model="profile.password" placeholder="New Password" required />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
      },
      profile: {
        email: '',
        username: '',
        password: '',
      },
      message: '', // Pour gérer la notification
      loginEmail: '', // Email pour la connexion
      loginPassword: '', // Mot de passe pour la connexion
    };
  },
  methods: {
    async signUp() {
      try {
        const response = await fetch('http://symfony.mmi-troyes.fr:8319/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.user),
        });

        const data = await response.json();
        if (response.ok) {
          this.message = 'Account created successfully!'; // Notification
          localStorage.setItem('userId', data.id);
          localStorage.setItem('username', this.user.username); // Stocker le nom d'utilisateur
          setTimeout(() => {
            this.message = ''; // Effacer la notification après 3 secondes
          }, 3000);
        } else {
          alert(data.message || 'Error creating account');
        }
      } catch (error) {
        alert('Error creating account');
      }
    },
    async login() {
      try {
        const response = await fetch('http://symfony.mmi-troyes.fr:8319/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.loginEmail,
            password: this.loginPassword,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('userId', data.id);
          localStorage.setItem('username', data.username);
          this.message = 'Login successful!';
          setTimeout(() => {
            this.message = '';
          }, 3000);
        } else {
          alert(data.message || 'Error logging in');
        }
      } catch (error) {
        alert('Error logging in');
      }
    },
    async updateProfile() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://symfony.mmi-troyes.fr:8319/api/users/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': `Bearer ${this.token}`,
          },
          body: JSON.stringify({
            email: this.profile.email,
            username: this.profile.username,
            password: this.profile.password,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          alert('Profile updated successfully!');
        } else {
          alert(data.message || 'Error updating profile');
        }
      } catch (error) {
        alert('Error updating profile');
      }
    }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
  box-sizing: border-box;
}

body {
  background: #141414; /* Fond sombre */
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: 0;
}

#container {
  background-color: #222; /* Fond sombre pour le conteneur */
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 400px;
  max-width: 100%;
  padding: 20px; /* Ajout d'espace intérieur */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  color: #ffffff; /* Texte blanc */
  margin-bottom: 10px;
  font-size: 24px; /* Taille de police augmentée */
}

span {
  font-size: 12px;
  color: #aaa; /* Couleur des sous-titres */
  margin-bottom: 20px; /* Espace sous le sous-titre */
}

.form-container {
  width: 100%;
}

input {
  background-color: #333; /* Fond sombre pour les champs */
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  color: #fff; /* Texte blanc dans les champs */
  border-radius: 5px; /* Coins arrondis */
  transition: background-color 0.3s; /* Transition pour l'effet de survol */
}

input::placeholder {
  color: #aaa; /* Couleur des placeholders */
}

input:focus {
  outline: none; /* Suppression du contour par défaut */
  background-color: #444; /* Changement de couleur au focus */
}

button {
  border-radius: 5px;
  border: none;
  background-color: #e50914; /* Rouge Netflix */
  color: #FFFFFF;
  font-size: 14px; /* Taille de police augmentée */
  font-weight: bold;
  padding: 12px 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer; /* Curseur pointer */
  transition: background-color 0.3s, transform 80ms ease-in; /* Ajout de transitions */
  width: 100%; /* Prendre toute la largeur */
  margin-top: 10px; /* Espace au-dessus du bouton */
}

button:hover {
  background-color: #ff4b2b; /* Couleur au survol */
}

button:active {
  transform: scale(0.95); /* Effet de clic */
}

@media (max-width: 500px) {
  #container {
    width: 90%; /* Largeur responsive */
  }

  h1 {
    font-size: 20px; /* Ajustement de la taille de police */
  }
}

.notification {
  background-color: #4caf50; /* Vert */
  color: white;
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  text-align: center;
}
</style>
