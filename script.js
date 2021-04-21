const base_url = 'http://localhost:3000/'
const app = new Vue({
  el: "#vue",
  data: {
    page: "login",
    userLoginData: {
      email: "" ,
      password: "" ,
    },
    newItem: {
      title: '',
      category: '' 
    },
  },
  methods: {
    changePage(page) {
      this.page = page
    },
    authenticate(){
      if (localStorage.getItem("access_token")) {
        this.page = 'home'
      } else {
        this.page = 'login'
      }
    },
    register(){

    },
    login(){
      //console.log(this.userLoginData.email);
      axios({
        url: base_url + 'user/login',
        method: "POST",
        data:{
          email: this.userLoginData.email,
          password: this.userLoginData.password
        }
      })
      .then(response =>{
        localStorage.setItem("access_token",response.data.access_token )
        this.authenticate()
        //getAllTask()
        //console.log(response.data);
      })
      .catch(err=>{
        console.log(err);
      })
      .then(()=>{
        this.userLoginData.email = ""
        this.userLoginData.password = ""
      })
    },
    onSignIn(googleUser){
      console.log('===============');
      var id_token = googleUser.getAuthResponse().id_token;
      axios({
        url: base_url + 'user/googleLogin',
        method: "POST",
        data: {
          googleToken: id_token
        }
      })
      .done(response=>{
        localStorage.setItem('access_token', response.data.access_token)
        this.authenticate()
      })
      .fail(err => {
        console.log(err);
      })
    },
    logout(){
      localStorage.clear()
      var auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(()=>{
        console.log('User singed out');
      })
      this.authenticate()

    },
    addTask(){
      //console.log(this.newItem);
      axios({
        url: base_url + 'task',
        method: "POST",
        data: {
          title: this.newItem.title,
          category: this.newItem.category,
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
      .then(response => {
        this.authenticate()
        console.log(response);
      })
      .catch(err=>{
        console.log(err);
      })
    },
    getAllTask() {
      axios({
        url: base_url + 'task',
        method: "GET",
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(err=>{
        console.log(err);
      })
    },

    editTask(id){
      //findone
      axios({
        url: base_url + 'task/' + id,
        method: "GET",
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(err=>{
        console.log(err);
      })
    },

    postEditTask(id){
      axios({
        url: base_url + 'task/', id,
        method: "PUT",
        data: {
          title: this.newItem.title,
          category: this.newItem.category,
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(err=>{
        console.log(err);
      })
    },

    patchTask(id){
      axios({
        url: base_url + 'task/' + id,
        method: "PATCH",
        data: {
          category: this.newItem.category,
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(err=>{
        console.log(err);
      })
    },
    destroyTask(id){
      axios({
        url: base_url + 'task/' + id,
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(err=>{
        console.log(err);
      })
    }
  },
  beforeCreate: function () {
    
  },
  created: function () {
    this.authenticate()
    
  },
  beforeMount: function () {
    
  },
  mounted: function () {
    gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn
    })
  }
})
