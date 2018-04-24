<template>
  <div class="register">
    <h3>Register: </h3>
    <form>
      <div class="form-group">
        <label for="email" class="labelRegis">Email:</label>
        <input type="email" class="form-control" id="email" v-model="email">
      </div>
      <div class="form-group">
        <label for="pwd" class="labelRegis">Password:</label>
        <input type="password" class="form-control" id="pwd" v-model="password">
      </div>
      <button type="button" class="btn btn-default" @click="register">Register</button>
      <div class="tologin">
        <a href="#/login">Already have account? Login here</a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    toLogin() {
      this.$router.push('/login');
    },
    register() {
      if (this.email && this.password) {
        const objLogin = {
          email: this.email,
          password: this.password,
        };
        axios.post('http://localhost:3000/signup', objLogin)
          .then((response) => {
            console.log(response);
            alert('signup success');
          })
          .catch((err) => {
            alert('signup failed');
            console.log(err);
          });
      } else {
        alert('enter email and password');
      }
    },
  },
  mounted: () => {
    document.body.className = 'login';
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  text-align: left;
  font-family: Vivaldi, cursive;
  margin-bottom: 20px;
}

a {
  color: black;
}

.register {
  height: auto;
  max-width: 350px;
  margin-top: 150px;
  margin-left: 200px;
  border: 2px solid #000000;
  background-color: rgba(255,255,255,0.5);
  border-radius: 20px;
  padding: 20px;
}

.labelRegis {
  font-family: Vivaldi, cursive;
  float: left;
  font-weight: bold;
}

.tologin {
  margin-top: 10px;
}

@media screen and (max-width: 780px) {
  .register {
    height: auto;
    max-width: 350px;
    margin-left: auto;
    margin-right: auto;
    border: 2px solid #000000;
    background-color: rgba(255,255,255,0.5);
    border-radius: 20px;
    padding: 20px;
  }
}
</style>
