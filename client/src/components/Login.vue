<template>
  <div class="login">
    <h3>Login: </h3>
    <form method="post">
      <div class="form-group">
        <label for="email" class="labelRegis">Email:</label>
        <input type="email" class="form-control" id="email" v-model="email">
      </div>
      <div class="form-group">
        <label for="pwd" class="labelRegis">Password:</label>
        <input type="password" class="form-control" id="pwd" v-model="password">
      </div>
      <button type="button" class="btn btn-default" @click="login">Login</button>
      <div class="toregister">
        <a href="#/register">Don't have account? Register here</a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      if (this.email && this.password) {
        const objLogin = {
          email: this.email,
          password: this.password,
        };
        axios.post('http://localhost:3000/signin', objLogin)
          .then((response) => {
            console.log(response);
            localStorage.setItem('token', response.data.token);
            this.$router.push('/todo');
          })
          .catch((err) => {
            alert('login failed');
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

.login {
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

.toregister {
  margin-top: 10px;
}
</style>
