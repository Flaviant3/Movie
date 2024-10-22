<template>
  <div>
    <div id="container">
      <div v-if="message" class="notification">{{ message }}</div>

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

      <div class="separator"></div>

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
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closePasswordModal">&times;</span>
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
        console.log('Réponse d\'inscription:', data);

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
        console.log('Login Response:', data);

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
        // Vérifie d'abord que l'email est bien renseigné
        if (!this.emailForPasswordChange) {
          alert('Veuillez entrer un email.');
          return;
        }

        // Envoie la requête à l'API pour vérifier l'email
        const response = await fetch(`http://symfony.mmi-troyes.fr:8319/api/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok && data.length > 0) {
          this.userId = data[0].id; // Récupère l'ID utilisateur
          alert('Email vérifié. Vous pouvez maintenant changer votre mot de passe.');
        } else if (data.length === 0) {
          alert('Email non trouvé. Veuillez vérifier l\'adresse entrée.');
          this.userId = null; // Réinitialiser si l'email n'est pas trouvé
        } else {
          alert(data.message || 'Erreur lors de la vérification de l\'email');
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
            'Authorization': `Bearer ${token}`,
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
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
  box-sizing: border-box;
}

body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

span {
  font-size: 12px;
}

a {
  color: #FF4B2B;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
  cursor: pointer;
}

button {
  border-radius: 20px;
  border: 1px solid #FF4B2B;
  background-color: #FF4B2B;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.separator {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
}

/* Styles pour la modale */
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}
</style>
