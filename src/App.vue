<template>
  <div ref="loading">Loading...</div>
  <div ref="level0"></div>
  <div ref="level1"></div>
  <Menu id="menu" @popup-create="popupCreate"></Menu>
  <div id="modal" class="modal">
    <Modal @close-modal="closeModal"></Modal>
  </div>
</template>

<script>
import Object from "./components/Object.vue"
import Menu from "./components/Menu.vue"
import Modal from "./components/Modal.vue"
import {createApp} from "vue"
import axios from "axios"

export default {
  name: 'App',
  components: {
    Object,
    Menu,
    Modal
  },
  data(){
    return{
      level0Objects: [],
      level1Objects: [] 
    }
  },
  mounted(){
    document.getElementById('menu').hidden = true;
    document.onclick = this.hiddenMenu;
    document.oncontextmenu = this.popupMenu;

    var currentDate = new Date(Date.now());
    var level0StartDate = this.date2Str(currentDate.getFullYear(),currentDate.getMonth() + 1,1);
    var level0Duration = new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0).getDate();
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1);
    var level1StartDate = this.date2Str(currentDate.getFullYear(),currentDate.getMonth() + 1,currentDate.getDate());
    var level1Duration = 7;
   
    axios.post(process.env.VUE_APP_ROOTAPI,{
      level: 0,
      start: level0StartDate,
      duration: level0Duration
    })
    .then(res=>{
      this.mountObject(res.data,this.$refs.level0); 
      this.level0Objects = res.data;
      return axios.post(process.env.VUE_APP_ROOTAPI,{
              level: 1,
              start: level1StartDate,
              duration: level1Duration});
    })
    .then(res=>{
      this.mountObject(res.data,this.$refs.level1);
      this.level1Objects = res.data;
      if( res.data.length == 0 && this.$refs.level0.childNodes.length == 0){
        this.$refs.loading.innerText = "No Object";
      }  
      else{
        this.$refs.loading.hidden = true;
      }
    })
    .catch(err=>{
      console.log(err);
      this.$refs.loading.innerText = "Connect error: " + process.env.VUE_APP_ROOTAPI;
    });
  },
  methods:{
    date2Str(year,month,day){
      return year.toString().padStart(4,"0") + "-" +
              month.toString().padStart(2,"0") + "-" +
                day.toString().padStart(2,"0");
    },
    mountObject(data,mountPoint){
      for(var i = 0;i<data.length;++i){
        var newdiv = document.createElement('div');
        mountPoint.appendChild(newdiv);
        if( i == 0){
          createApp(Object,{isFirst:true}).mount(newdiv);
        }
        else{
          createApp(Object,{isFirst:false}).mount(newdiv);
        }
      }
    },
    popupMenu(e){
      e.preventDefault();
      var menu = document.getElementById('menu');
      menu.hidden = false;
      menu.style.left = e.pageX + "px";
      menu.style.top = e.pageY + "px";
    },
    hiddenMenu(){
      document.getElementById('menu').hidden = true;
    },
    popupCreate(){
      console.log("popup create");
      document.getElementById("modal").style.display = 'block';
    },
    closeModal(){
      document.getElementById("modal").style.display = 'None';
    }
  }
}
</script>

<style>
#menu{
  position: absolute;
}
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
</style>
