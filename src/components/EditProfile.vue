<template>
  <div>
    <div id="container">
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
          alert('Account created successfully!');
          // Stocker l'ID de l'utilisateur dans le localStorage
          localStorage.setItem('userId', data.id); // Assurez-vous que l'ID est renvoyé par l'API
          // Réinitialiser le formulaire ou rediriger l'utilisateur
        } else {
          alert(data.message || 'Error creating account');
        }
      } catch (error) {
        alert('Error creating account');
      }
    },
    async updateProfile() {
      try {
        const userId = localStorage.getItem('userId'); // Récupérer l'ID de l'utilisateur
        const response = await fetch(`http://symfony.mmi-troyes.fr:8319/api/users/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': `Bearer ${this.token}`, // Assurez-vous que `this.token` est défini
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
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: 0; /* Suppression de la marge */
}

h1, h2 {
  text-align: center;
  margin: 0;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
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

button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25),
  0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 400px; /* Ajustement de la largeur */
  max-width: 100%;
  min-height: 480px;
  display: flex; /* Ajout de flex pour centrer */
  flex-direction: column; /* Alignement vertical */
  justify-content: center; /* Centrage vertical */
  align-items: center; /* Centrage horizontal */
}

.form-container {
  width: 100%; /* Prendre toute la largeur */
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.overlay-container {
  display: none; /* Suppression de l'overlay */
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin: 0 10px;
}
</style>
