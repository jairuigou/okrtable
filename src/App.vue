<template>
<div id="div1">
  <Object></Object> 
</div>
<Object></Object>
</template>

<script>
import Object from "./components/Object.vue"
import PriorLabel from "./components/PriorLabel.vue"
import Label from "./components/LabelBase.vue"

export default {
  name: 'App',
  components: {
    Object,
    PriorLabel,
    Label
  },
  data(){
    return{}
  }
}
</script>

<style>
#div1{
  position: absolute;
  top: 50%;
  width: 100%;
}
</style>
