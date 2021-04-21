<template>
  <div>
    <!-- login register page -->
      <div id="logreg-forms" v-if="page !== 'home' ">
        
        <form class="form-signin" v-if="page ==='login'">
          <h1 class="h3 mb-3 font-weight-normal" style="text-align: center"> Sign in </h1>
           <GoogleLogin class="social-login" :params="googleSignInParams" :renderParams="renderParams" :onSuccess="onSignInSuccess" :onFailure="onSignInError"></GoogleLogin>
          <!-- <g-signin-button 
          class="g-signin2 social-login" 
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
          ><button type="button">  Sign in with Google</button></g-signin-button> -->
          <br>
          <p style="text-align:center"> OR  </p>
          <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="" v-model="userLoginData.email">
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="" v-model="userLoginData.password">
          <br>
          
          <button class="btn btn-success btn-block" type="button" @click.prevent="login()"><i class="fas fa-sign-in-alt"></i> Sign in</button>
          <hr>
          
          <button class="btn btn-primary btn-block" type="button" @click.prevent="changePage('register')"><i class="fas fa-user-plus"></i> Sign up New Account</button>
          
        </form>
        
        <form action="#" class="form-signup" v-if="page ==='register'"> 
          <h1 class="h3 mb-3 font-weight-normal" style="text-align: center"> Sign up</h1>
           <GoogleLogin class="social-login" :params="googleSignInParams" :renderParams="renderParams" :onSuccess="onSignInSuccess" :onFailure="onFailure"></GoogleLogin>
          <!-- <g-signin-button 
          class="g-signin2 social-login" 
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError"
          > <button type="button">  Sign in with Google</button></g-signin-button> -->
          <br>
          <p style="text-align:center">OR</p>
          
          <input type="email"  v-model="registerUser.email" class="form-control" placeholder="Email address" required autofocus="">
          <input type="password"  v-model="registerUser.password" class="form-control" placeholder="Password" required autofocus="">
          
          <button class="btn btn-primary btn-block" type="button" @click.prevent="register()"><i class="fas fa-user-plus"></i>Sign Up</button>
          <a href="#" @click.prevent="changePage('login')"><i class="fas fa-angle-left"></i> Back</a>
        </form>
        <br>
      </div>
      
      <!-- end of login register page -->
  </div>
</template>

<script>
 import GoogleLogin from 'vue-google-login';

export default {
  props: ['page', 'userLoginData', 'registerUser', 'googleSignInParams', 'renderParams'],
  methods: {
    authenticate(){
      if (localStorage.getItem("access_token")) {
        this.page = 'home'
        this.getAllTask()
      } else {
        this.page = 'login'
      }
    },
    changePage(value){
      this.$emit("changePageE", value)
    },
    login(){
      this.$emit("loginE")
    },
    register(){
      this.$emit('registerE')
    },
    onSignInSuccess(v){
      this.$emit('onSignInSuccess',v)
    },
    onSignInError(v) {
      this.$emit('onSignInError',v)
    }
  },
  components: {
    GoogleLogin,
  }
  
}
</script>

<style>

</style>