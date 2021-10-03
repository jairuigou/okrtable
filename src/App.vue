<template>
  <div id="div1">
    <TimeLine/>
  </div>
  <div id="div2">
    <ObjectPoint/> 
  </div>
</template>

<script>
import TimeLine from './components/TimeLine.vue'
import ObjectPoint from "./components/ObjectPoint.vue"

export default {
  name: 'App',
  components: {
    TimeLine,
    ObjectPoint
  },
  data(){
    return{}
  },
  created(){
    window.addEventListener('resize',this.reSet);
  },
  mounted(){
    this.reSet();
  },
  methods:{
    reSet(){
      console.log(window.innerHeight);
      console.log(window.innerHeight/2 | 0);
      document.getElementById('div1').style.top = (window.innerHeight/2 | 0).toString() + "px";
    }
  }
}
</script>

<style>
#div1{
  position: fixed;
  top: 0px;
  z-index: 1;
}
#div2{
  position: fixed;
  top: 47%;
  left: 50%;
  z-index: 2;
}
</style>
