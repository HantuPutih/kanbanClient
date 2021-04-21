<template>
  <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  <h3>Edit Item</h3> 
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  <form class="d-flex">
                    <input class="form-control me-2 add-bar-coloumn" type="text" placeholder="Edit Item" aria-label="Add New kanban" v-model="findOneResult.title">
                    <!-- select -->
                    <select class="form-select add-bar-coloumn" aria-label="Default select example" v-model="findOneResult.category">
                      <option value="" disabled>- select category -</option>
                      <option value="backlog">Backlog</option>
                      <option value="todo">Todo</option>
                      <option value="doing">Doing</option>
                      <option value="done">Done</option>
                    </select>
                    <!-- end select -->
                  </form>
                </slot>
              </div>
              <div class="modal-footer">
                <slot name="footer">
                    <button type="button" class="modal-default-button btn btn-primary" @click.prevent="saveEdit(findOneResult.id)">
                      Save
                    </button>
                    <button type="button" class="modal-default-button btn btn-danger"  @click.prevent="changeEdit(false)">
                      Cancel
                    </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>
</template>

<script>
export default {
  props: ['isEdit','modal', 'findOneResult', 'data'],
  methods:{
    change(value) {
      this.$emit('change', value)
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