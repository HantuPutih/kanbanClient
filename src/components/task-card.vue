<template>
    <!-- card -->
      <div class="card card-content" style="width: 18rem;">
        <div class="card-body">
          <h4 class="card-title">{{data.title}}</h4>
          <p class="card-subtitle mb-2 text-muted"> {{data.owner}}</p>
          <h6 class="card-subtitle mb-2 text-muted"> {{data.createdAt.split('T')[0]}}</h6>
          <a href="#" class="card-link" @click.prevent="findOne(data.id)">Edit</a>
          <a href="#" class="card-link" @click.prevent="destroy(data.id)">Delete</a>
        </div>
        <!-- modal -->
        <modal  
        v-bind:isEdit="isEdit"
        v-bind:findOneResult="findOneResult"
        v-bind:data="data"

        v-on:saveEdit="saveEdit"
        v-on:changeEdit="changeEdit"

        v-if="isEdit == true"
        >
        </modal>
        <!-- end modal -->
      </div>
      
    <!-- end card -->
</template>

<script>
import modal from './modal'
export default {
  props: ['data', 'findOneResult','isEdit'],
  methods:{
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
  },
  components: {
    modal
  }

}
</script>

<style>

</style>