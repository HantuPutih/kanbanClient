<template>
  <div>
     <!-- navbar -->
      <nav class="navbar navbar-light bg-light justify-content-between sticky-top">
        <a class="navbar-brand">看板 Kanban</a>
        <div v-if="page ==='home'"> 
          <li class="nav-item" >
            <a class="nav-link" href="#" @click.prevent="logout()" >Logout</a>
          </li>
        </div>
      </nav>
      <!-- end navbar -->
      <br>
    <!-- outer container here -->
    <utama 
    v-bind:newItem="newItem"
    v-bind:page="page"
    v-bind:kanbanData="kanbanData"
    v-bind:findOneResult="findOneResult"
    v-bind:isEdit="isEdit"
    

    v-on:addTaskE="addTaskF"
    v-on:destroy="destroyTask"
    v-on:findOne="findOne"
    v-on:saveEdit="postEditTask"
    v-on:changeEdit="changeEdit"

    ></utama>

    <logreg
      v-bind:page="page"
      v-bind:userLoginData="userLoginData"
      v-bind:registerUser="registerUser"
      v-bind:googleSignInParams="googleSignInParams"
      v-bind:renderParams="renderParams"

      v-on:changePageE="changePageF"
      v-on:loginE="loginF"
      v-on:registerE="registerF"
      v-on:onSignInSuccess="onSignInSuccess"
      v-on:onSignInError="onSignInError"

    ></logreg>
    
  </div>
</template>

<script>

import utama from './views/utama.vue'
import logreg from './views/logreg.vue'
import axios from 'axios';
const base_url = 'https://mading-jepang.herokuapp.com/'

export default {
  data() {
    return {
      page: "login",
      isEdit: false,

      userLoginData: {
        email: '' ,
        password: '' ,
      },
      registerUser: {
        email: '',
        password: '',
      },
      newItem: {
        title: '',
        category: '' 
      },
      kanbanData: undefined,
      findOneResult:{
        id: null,
        title: '',
        category: '',
      },
      googleSignInParams: {
        client_id: '33703577367-89sem9975t62vv9mii240ktbcr5asv3f.apps.googleusercontent.com'
      },
       renderParams: {
          width: 250,
          height: 50,
          longtitle: true
      }
      
    };
    
  },
  components: {
    utama,
    logreg
  },
  methods: {

    changePageF(page) {
      this.page = page
    },
    changeEdit(value){
      this.isEdit = value
      this.findOneResult.title ='',
      this.findOneResult.category = ''
    },

    authenticate(){
      if (localStorage.getItem("access_token")) {
        this.page = 'home'
        this.getAllTask()
      } else {
        this.page = 'login'
      }
    },
    registerF(){
      axios({
        url: base_url + 'user/register',
        method: "POST",
        data: {
          email: this.registerUser.email ,
          password: this.registerUser.password,
        }
      })
      .then(()=>{
        this.authenticate()
      })
      .catch(err=>{
        let timerInterval
          Swal.fire({
            title: err.response.data.error,
            html: 'check your credentials',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
      })
      .then(()=>{
        this.registerUser.email = ''
        this.registerUser.password = ''
      })
    },
    loginF(){
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
        this.getAllTask()
      })
      .catch(err=>{
        let timerInterval
          Swal.fire({
            title: 'Invalid Email/Password!',
            html: 'check your credentials',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
      })
      .then(()=>{
        this.userLoginData.email = ""
        this.userLoginData.password = ""
      })
    },
    onSignInSuccess (googleUser) {
      var id_token = googleUser.getAuthResponse().id_token;
      axios({
        url: base_url + 'user/googleLogin',
        method: "POST",
        data: {
          googleToken: id_token
        }
      })
      .then(response=>{
        localStorage.setItem('access_token', response.data.access_token)
        this.authenticate()
        this.getAllTask()
      })
      .catch(err => {
        console.log(err);
      })
    },
    onSignInError (error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    },
    logout(){
      localStorage.clear()
      this.page = 'login'
      this.authenticate()
      var auth2 = gapi.auth2.getAuthInstance()
      if (auth2) {
          auth2.signOut().then(()=>{
            console.log('User singed out');
        })
      }


    },
    addTaskF(){
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
      })
      .catch(err=>{
        let timerInterval
          Swal.fire({
            title: err.response.data.error,
            html: 'complete the form',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
      })
      .then(()=>{
        this.newItem.title = '',
        this.newItem.category = ''
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
      .then(({data}) => {
        this.kanbanData = data
      })
      .catch(err=>{
        console.log(err);
      })
    },

    findOne(id){
      //findone
      axios({
        url: base_url + 'task/' + id,
        method: "GET",
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
      .then(({data}) => {
        this.findOneResult.id = data.id
        this.findOneResult.title = data.title
        this.findOneResult.category = data.category
        this.isEdit = true
      })
      .catch(err=>{
        let timerInterval
          Swal.fire({
            title: err.response.data.error,
            html: 'Edit your own item!',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
      })
    },

    postEditTask(id){
      axios({
        url: base_url + 'task/' + id,
        method: "PUT",
        data: {
          title: this.findOneResult.title,
          category: this.findOneResult.category,
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        },
      })
      .then(response => {
        this.isEdit = false
        this.findOneResult.title ='',
        this.findOneResult.category = ''
        this.getAllTask()
      })
      .catch(err=>{
        let timerInterval
          Swal.fire({
            title: err.response.data.error,
            html: 'check again!',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
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
        this.authenticate()
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
      .then(({data}) => {
        this.getAllTask()
        let timerInterval
          Swal.fire({
            title: data.msg,
            html: 'add new item from the add bar above',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
      })
      .catch(err=>{
        let timerInterval
          Swal.fire({
            title: err.response.data.error,
            html: 'Delete your own item!',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
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
  }
}
</script>

<style>

</style>