<template>
  <div class="login">
    <h3>Login: </h3>
    <form>
      <div class="form-group">
        <label for="email" class="labelRegis">Email:</label>
        <input type="email" class="form-control" id="email" v-model="email">
      </div>
      <div class="form-group">
        <label for="pwd" class="labelRegis">Password:</label>
        <input type="password" class="form-control" id="pwd" v-model="password">
      </div>
      <button type="button" class="btn btn-default" @click="login">Login</button>
      <!-- <fb:login-button id="fbLogin" scope="public_profile, email" onlogin="checkLoginState();">
            </fb:login-button> -->
      <button v-on:click="loginfb()" class="btn btn-info">Login with Facebook</button>
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
  created: function () {
    // FB SDK
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return
      js = d.createElement(s); js.id = id;
      // js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=119308148780939";
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '975855832585758',
        cookie: true,
        xfbml: true,
        version: 'v2.8',
      });
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
    loginfb() {
      window.FB.login((response) => {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
          console.log('masuk ke if di login fb');
          localStorage.setItem('fb_access_token', response.authResponse.accessToken);
          this.testAPI();
        } else {
          alert('please login');
        }
      });
    },
    testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      // axios.get('http://localhost:3000/signin', {
      axios.get('http://localhost:3000/loginFb', {
        headers: { fb_access_token: localStorage.getItem('fb_access_token') },
      })
        .then((response) => {
          console.log('data dari server', response.data);
          localStorage.setItem('token', response.data.token);
          this.$router.push('/todo');
        })
        .catch((err) => {
          console.log(err);
        });
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

@media screen and (max-width: 780px) {
  .login {
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
