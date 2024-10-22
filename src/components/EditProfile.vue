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
        </form>
      </div>
      <div class="separator"></div>
      <div class="form-container profile-update-container">
        <form @submit.prevent="updateProfile">
          <h1>Update Profile</h1>
          <span>Update your information</span>
          <input type="email" v-model="profile.email" placeholder="Email" required />
          <input type="text" v-model="profile.name" placeholder="New Name" required />
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
        name: '',
        email: '',
        password: '',
      },
      profile: {
        email: '',
        name: '',
        password: '',
      },
      message: '',
      loginEmail: '',
      loginPassword: '',
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
          this.message = 'Account created successfully!';
          localStorage.setItem('userId', data.id);
          localStorage.setItem('name', this.user.name);
          setTimeout(() => {
            this.message = '';
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
          localStorage.setItem('name', data.email);
          this.message = 'Login successful!';
          setTimeout(() => {
            this.message = '';
            window.location.href = '/homepage';
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
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`http://symfony.mmi-troyes.fr:8319/api/users/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/merge-patch+json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: this.profile.email,
            name: this.profile.name,
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
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
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

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25),
              0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 1200px;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-container {
  width: 100%;
  max-width: 400px;
  margin: 20px 0;
}

.separator {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 20px 0;
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
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

footer {
  background-color: #222;
  color: #fff;
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 999;
}

footer p {
  margin: 10px 0;
}

footer i {
  color: red;
}

footer a {
  color: #3c97bf;
  text-decoration: none;
}
</style>
