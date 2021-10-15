<template>
<div id="div1">
  <PriorLabel></PriorLabel>
</div>
</template>

<script>
import Object from "./components/Object.vue"
import PriorLabel from "./components/PriorLabel.vue"

export default {
  name: 'App',
  components: {
    Object,
    PriorLabel
  },
  data(){
    return{}
  }
}
</script>

<style>
#div1{
  position: fixed;
  top: 50%;
  left: 50%;
}
</style>
