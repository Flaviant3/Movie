<template>
  <div>
    <div id="container">
      <div v-if="message" class="notification">{{ message }}</div>

      <div class="form-container login-container">
        <form @submit.prevent="login">
          <h1>Login</h1>
          <span>or use your email and password to login</span>
          <input type="email" v-model="loginEmail" placeholder="Email" required />
          <input type="password" v-model="loginPassword" placeholder="Password" required />
          <button type="submit">Login</button>
          <a href="#" @click.prevent="showPasswordModal">Forgot Password?</a>
        </form>
      </div>

      <div class="separator"></div>

      <div class="form-container sign-up-container">
        <form @submit.prevent="signUp">
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input type="text" v-model="user.name" placeholder="Name" required />
          <input type="email" v-model="user.email" placeholder="Email" required />
          <input type="password" v-model="user.password" placeholder="Password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closePasswordModal">&times;</span>
        <button class="back" @click="closePasswordModal">Back</button>
        <h2>Change Password</h2>
        <input type="email" v-model="emailForPasswordChange" placeholder="Email" required />
        <button @click="verifyEmail">Next</button>
        <div v-if="userId">
          <input type="password" v-model="newPassword" placeholder="New Password" required />
          <button @click="changePassword">Change Password</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
      },
      message: '',
      loginEmail: '',
      loginPassword: '',
      showModal: false,
      newPassword: '',
      emailForPasswordChange: '',
      userId: null, // Pour stocker l'ID utilisateur
    };
  },
  methods: {
    async signUp() {
      try {
        const response = await fetch('http://symfony.mmi-troyes.fr:8319/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.user),
        });

        const data = await response.json();
        if (response.ok) {
          this.message = 'Compte créé avec succès!';
          localStorage.setItem('userId', data.id);
          setTimeout(() => {
            this.message = '';
          }, 3000);
        } else {
          alert(data.message || 'Erreur lors de la création du compte');
        }
      } catch (error) {
        alert('Erreur lors de la création du compte');
      }
    },
    async login() {
      try {
        const response = await fetch('http://symfony.mmi-troyes.fr:8319/auth', {
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
          localStorage.setItem('jwtToken', data.token);
          localStorage.setItem('userId', data.id);
          localStorage.setItem('name', data.username);
          this.message = 'Connexion réussie!';
          setTimeout(() => {
            this.message = '';
            window.location.href = '/homepage';
          }, 3000);
        } else {
          alert(data.message || 'Erreur lors de la connexion');
        }
      } catch (error) {
        alert('Erreur lors de la connexion');
      }
    },
    showPasswordModal() {
      this.showModal = true;
      this.emailForPasswordChange = '';
      this.newPassword = '';
      this.userId = null; // Réinitialiser l'ID utilisateur
    },
    closePasswordModal() {
      this.showModal = false;
      this.newPassword = '';
      this.emailForPasswordChange = '';
      this.userId = null; // Réinitialiser l'ID utilisateur
    },
    async verifyEmail() {
      try {
        if (!this.emailForPasswordChange) {
          alert('Veuillez entrer un email.');
          return;
        }

        // Envoie la requête pour vérifier l'email
        const response = await fetch(`http://symfony.mmi-troyes.fr:8319/api/users?email=${encodeURIComponent(this.emailForPasswordChange)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok && data['hydra:member'].length > 0) {
          this.userId = data['hydra:member'][0].id; // Récupère l'ID utilisateur
          alert(`Email trouvé : ${data['hydra:member'][0].email}`); // Affiche l'email trouvé
        } else {
          alert('Email non trouvé. Veuillez vérifier l\'adresse entrée.');
          this.userId = null; // Réinitialiser si l'email n'est pas trouvé
        }
      } catch (error) {
        console.error('Erreur lors de la requête:', error);
        alert('Erreur lors de la vérification de l\'email');
      }
    },
    async changePassword() {
      try {
        const token = localStorage.getItem('jwtToken');

        if (!this.userId) {
          alert('ID utilisateur manquant.');
          return;
        }

        const response = await fetch(`http://symfony.mmi-troyes.fr:8319/api/users/${this.userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/merge-patch+json',
          },
          body: JSON.stringify({ password: this.newPassword }),
        });

        const data = await response.json();
        if (response.ok) {
          alert('Mot de passe changé avec succès!');
          this.closePasswordModal();
        } else {
          alert(data.message || 'Erreur lors du changement de mot de passe');
        }
      } catch (error) {
        alert('Erreur lors du changement de mot de passe');
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

#container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #1a1a1a;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  color: #ffffff;
  animation: fadeIn 1s ease-in-out;
}

.notification {
  background-color: #ff6f61;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
  animation: slideInFromTop 0.5s ease-in-out;
}

.form-container {
  width: 45%;
  padding: 20px;
  background-color: #2a2a2a;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;
}

h1 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #ff6f61;
  text-align: center;
  animation: slideInFromLeft 0.5s ease-in-out;
}

span {
  display: block;
  margin-bottom: 20px;
  color: #dddddd;
  text-align: center;
  animation: slideInFromRight 0.5s ease-in-out;
}

input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #ffffff;
  transition: background-color 0.3s, transform 0.3s;
}

input[type="email"]:focus,
input[type="password"]:focus,
input[type="text"]:focus {
  background-color: #444;
  transform: scale(1.05);
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ff6f61;
  color: #ffffff;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  background-color: #e65c50;
  transform: scale(1.05);
}

a {
  color: #ff6f61;
  text-decoration: none;
  display: block;
  text-align: center;
  margin-top: 10px;
  transition: color 0.3s;
}

a:hover {
  color: #e65c50;
}

.separator {
  width: 1px;
  height: 100%;
  background-color: #444;
  margin: 0 20px;
  animation: fadeIn 1s ease-in-out;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.5s ease-in-out;
}

.modal-content {
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
  animation: slideInFromBottom 0.5s ease-in-out;
}

.modal-content h2 {
  margin-bottom: 20px;
  color: #ff6f61;
  animation: slideInFromTop 0.5s ease-in-out;
}

.modal-content input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #ffffff;
  transition: background-color 0.3s, transform 0.3s;
}

.modal-content input:focus {
  background-color: #444;
  transform: scale(1.05);
}

.modal-content button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ff6f61;
  color: #ffffff;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.modal-content button:hover {
  background-color: #e65c50;
  transform: scale(1.05);
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  cursor: pointer;
  color: #ffffff;
  transition: transform 0.3s;
}

.close:hover {
  transform: rotate(90deg);
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

.back {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1em;
  cursor: pointer;
  color: #ffffff;
  background: none;
  border: none;
  transition: color 0.3s;
}

.back:hover {
  color: #e65c50;
}

@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
