<template>
  <Object :isFirst="true" :initData="info"></Object>
</template>

<script>
import Editor from "../src/components/Editor.vue"
import Object from "../src/components/Object.vue"
export default{
  name: 'App',
  components:{
    Editor,
    Object
  },
  data(){
    return{
      info:{
        id:"",
        priority: 0,
        state: "PENDING",
        ddl:"",
        detail:"",
        progress:""
      }
    }
  }
}
</script>

<style scoped>

</style>


