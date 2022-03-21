<template>
  <div class="container">
    <month-navigate class="monthnav" :date="monthObjectStartDate" @navigate-change="monthNavChanged"></month-navigate>
    <div ref="monthtable" class="monthtable"></div>
    <week-navigate class="weeknav" :date="weekObjectStartDate" @navigate-change="weekNavChanged"></week-navigate>
    <div ref="weektable" class="weektable"></div>
  </div>

  <Menu id="menu" @popup-create="popupCreate" hidden=true></Menu>
  <div id="modal" class="modal">
    <Modal @close-modal="closeModal" @refresh="refresh"></Modal>
  </div>
</template>

<script>
import Object from "./components/Object.vue"
import Menu from "./components/Menu.vue"
import Modal from "./components/Modal.vue"
import WeekNavigate from "./components/WeekNavigate.vue"
import MonthNavigate from "./components/MonthNavigate.vue"
import {createApp} from "vue"
import axios from "axios"
import {date2Str,moveToMonthStart,moveToWeekStart,getMonthDay,getWeekDay} from './utils'

export default {
  name: 'App',
  components: {
    Object,
    Menu,
    Modal,
    WeekNavigate,
    MonthNavigate
  },
  data(){
    return{
      monthObjectStartDate: new Date(Date.now()),
      weekObjectStartDate: new Date(Date.now())
    }
  },
  mounted(){
    document.onclick = this.hiddenMenu;
    document.oncontextmenu = this.popupMenu;

    moveToMonthStart(this.monthObjectStartDate);
    moveToWeekStart(this.weekObjectStartDate);
    this.loadMonthObjectInfo(this.monthObjectStartDate);
    this.loadWeekObjectInfo(this.weekObjectStartDate);
  },
  methods:{
    mountObject(data,mountPoint){
      while( mountPoint.firstChild ){
        mountPoint.removeChild(mountPoint.firstChild);
      }
      for(var i = 0;i<data.length;++i){
        var newdiv = document.createElement('div');
        mountPoint.appendChild(newdiv);
        if( i == 0){
          createApp(Object,{initData:data[i],isFirst:true}).mount(newdiv);
        }
        else{
          createApp(Object,{initData:data[i],isFirst:false}).mount(newdiv);
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
      document.getElementById("modal").style.display = 'block';
    },
    closeModal(){
      document.getElementById("modal").style.display = 'None';
    },
    monthNavChanged(newMonthDate){
      if( newMonthDate.valueOf() == this.monthObjectStartDate.valueOf() ){
        return;
      }
      moveToMonthStart(newMonthDate);
      var newWeekDate = new Date(newMonthDate);
      this.loadMonthObjectInfo(newMonthDate);
      this.loadWeekObjectInfo(newWeekDate);
    },
    weekNavChanged(newWeekDate){
      if( newWeekDate.valueOf() == this.weekObjectStartDate.valueOf() ){
        return;
      }
      moveToWeekStart(newWeekDate);
      if( this.monthObjectStartDate.getMonth() != newWeekDate.getMonth() 
            || this.monthObjectStartDate.getFullYear() != newWeekDate.getFullYear()){
        var newMonthDate = new Date(newWeekDate.getFullYear(),newWeekDate.getMonth(),1);
        this.loadMonthObjectInfo(newMonthDate);
      }
      this.loadWeekObjectInfo(newWeekDate);
    },
    loadMonthObjectInfo(startDate){
      axios.post(process.env.VUE_APP_ROOTAPI,{
        level: 0,
        start: date2Str(startDate).substring(0,10),
        duration: getMonthDay(startDate)
      })
      .then(res=>{
        this.mountObject(res.data,this.$refs.monthtable); 
        this.monthObjectStartDate = startDate;
      })
      .catch(err=>{
        console.log("loadMonth error",err);
      })
    },
    loadWeekObjectInfo(startDate){
      axios.post(process.env.VUE_APP_ROOTAPI,{
        level: 1,
        start: date2Str(startDate).substring(0,10),
        duration: getWeekDay(startDate)
      })
      .then(res=>{
        this.mountObject(res.data,this.$refs.weektable); 
        this.weekObjectStartDate = startDate;
      })
      .catch(err=>{
        console.log("loadWeek error",err);
      })
    },
    refresh(){
      window.location.reload();
    }
  }
}
</script>

<style>
.container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: 
    ". monthnav ."
    "monthtable monthtable monthtable"
    ". weeknav ."
    "weektable weektable weektable";
}
.monthnav{
  grid-area: monthnav;
}
.weeknav{
  grid-area: weeknav;
}
.monthtable{
  grid-area: monthtable;
}
.weektable{
  grid-area: weektable;
}
#menu{
  position: absolute;
  background-color: #fefefe;
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
