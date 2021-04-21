<template>
  <div>
    <div class="container-main" v-if="page === 'home' ">

      <div class="category" v-for="(title, index) in titles" :key="index">
        <div class="category-title">
            <h4>
              {{title}}
            </h4>
        </div>
        <div class="card-container">
          <draggable @start="drag=true" @end="drag=false">
          <taskcard
          v-for="data in kanbanData[title.toLowerCase()]" :key="data.id"
          v-bind:data="data"
          v-bind:findOneResult="findOneResult"
          v-bind:isEdit="isEdit"


          v-on:destroy="destroy"
          v-on:findOne="findOne"
          v-on:saveEdit="saveEdit"
          v-on:changeEdit="changeEdit"

          >
          </taskcard>
          </draggable>
          </div>
          
        </div>
    </div>

      
  </div>
</template>

<script>
import taskcard from './task-card'
import draggable from 'vuedraggable'
export default {
  components: {
    taskcard,
    draggable,
    },
  props: ['page', 'kanbanData', 'findOneResult', 'isEdit'],
  data(){
    return {
      titles: ["Backlog", 'Todo','Doing', 'Done'],
      items: this.props
    }
  },
  methods: {
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