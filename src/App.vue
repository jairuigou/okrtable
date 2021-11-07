<template>
  <div ref="level1">level1</div>
  <div ref="level2">level2</div>
</template>

<script>
import Object from "./components/Object.vue"
import PriorLabel from "./components/PriorLabel.vue"
import Label from "./components/LabelBase.vue"
import {createApp} from "vue"

export default {
  name: 'App',
  components: {
    Object,
    PriorLabel,
    Label
  },
  data(){
    return{
      objects: [{topic:"# Object1 blabla",level:0,priority:0,state:"WAITING",progress:"### hoho"} ]
    }
  },
  mounted(){
    console.log(this.data);
    const div1 = document.createElement('div'); 
    this.$refs.level1.appendChild(div1); 
    createApp(Object,{isFirst:true}).mount(div1);
    const div2 = document.createElement('div'); 
    this.$refs.level1.appendChild(div2);
    createApp(Object,{isFirst:false}).mount(div2);
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
