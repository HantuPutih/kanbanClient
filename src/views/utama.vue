<template>
  <div>
  <!-- outer container -->
    <div class="outer-container">
      <!-- addNew -->
      <div id="add-bar-top" v-if="page === 'home' ">

        <form class="d-flex">
          <input class="form-control me-2 add-bar-coloumn" type="text" placeholder="Add New" aria-label="Add New kanban" v-model="newItem.title" >
          <!-- select -->
          <select class="form-select add-bar-coloumn" aria-label="Default select example" v-model="newItem.category">
            <option value="" disabled>- select category -</option>
            <option value="backlog">Backlog</option>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <!-- end select -->
          <button class="btn btn-success" type="button" @click.prevent="addTask">Add New</button>
        </form>
      </div>
      <!-- end addNew -->

      <!-- logreg here -->
      
      <br>
      <!-- container main -->
        <categoryDiv
          v-bind:page="page"
          v-bind:kanbanData="kanbanData"
          v-bind:findOneResult="findOneResult"
          v-bind:isEdit="isEdit"


          v-on:destroy="destroy"
          v-on:findOne="findOne"
          v-on:saveEdit="saveEdit"         
          v-on:changeEdit="changeEdit"

        ></categoryDiv>
      <!-- end container main -->
  
    </div>
    <!-- end outer container -->
  </div>
</template>

<script>
import categoryDiv from '../components/categoryDiv'
export default {
  components: {
    categoryDiv
    },
  props: ["newItem", 'page','kanbanData', 'findOneResult', 'isEdit'],
  methods: {
    addTask(){
      this.$emit('addTaskE')
    },
    destroy(id){
      this.$emit("destroy", id)
    },
    findOne(id){
      this.$emit("findOne",id)
    },
    saveEdit(id){
      this.$emit('saveEdit', id)
    },
    changeEdit(value){
      this.$emit('changeEdit', value)
    }
  }
}
</script>

<style>

</style>