<template>
  <div class="center">
    <Navigate size="medium" @navigate-change="monthNavChanged" 
        :value="monthObjectStartDate" :textGen="monthNavGen" :toNext="monthNavToNext" :toPre="monthNavToPre"></Navigate>
  </div>
  <div ref="month"></div>
  <div class="divide"></div>

  <div class="center">
    <Navigate @navigate-change="weekNavChanged" 
        :value="weekObjectStartDate" :textGen="weekNavGen" :toNext="weekNavToNext" :toPre="weekNavToPre"></Navigate>
  </div>
  <div ref="week"></div>

  <Menu id="menu" @popup-create="popupCreate" hidden=true></Menu>
  <div id="modal" class="modal">
    <Modal @close-modal="closeModal"></Modal>
  </div>
</template>

<script>
import Object from "./components/Object.vue"
import Menu from "./components/Menu.vue"
import Modal from "./components/Modal.vue"
import InputArea from "./components/InputArea.vue"
import Navigate from "./components/Navigate.vue"
import {createApp} from "vue"
import axios from "axios"

export default {
  name: 'App',
  components: {
    Object,
    Menu,
    Modal,
    InputArea,
    Navigate
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

    this.moveToMonthStart(this.monthObjectStartDate);
    this.moveToWeekStart(this.weekObjectStartDate);
    this.loadMonthObjectInfo(this.monthObjectStartDate);
    this.loadWeekObjectInfo(this.weekObjectStartDate);

  },
  methods:{
    date2Str(date){
      return date.getFullYear().toString().padStart(4,"0") + "-" +
              (date.getMonth()+1).toString().padStart(2,"0") + "-" +
                date.getDate().toString().padStart(2,"0");
    },
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
      console.log("popup create");
      document.getElementById("modal").style.display = 'block';
    },
    closeModal(){
      document.getElementById("modal").style.display = 'None';
    },
    monthNavGen(date){
      return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2,'0');
    },
    monthNavToNext(date){
      return new Date(date.getFullYear(),date.getMonth()+1,1);
    },
    monthNavToPre(date){
      return new Date(date.getFullYear(),date.getMonth()-1,1);
    },
    weekNavGen(date){
      return "week " + this.getWeekNumber(date);
    },
    weekNavToNext(date){
      var newDate = new Date(date);
      newDate.setDate(newDate.getDate() + this.getWeekDay(newDate));
      return newDate;
    },
    weekNavToPre(date){
      var newDate = new Date(date);
      this.moveToWeekStart(newDate);
      newDate.setDate(newDate.getDate()-1);
      this.moveToWeekStart(newDate);
      return newDate;
    },
    monthNavChanged(newMonthDate){
      if( newMonthDate.valueOf() == this.monthObjectStartDate.valueOf() ){
        return;
      }
      this.moveToMonthStart(newMonthDate);
      var newWeekDate = new Date(newMonthDate);

      this.loadMonthObjectInfo(newMonthDate);
      this.loadWeekObjectInfo(newWeekDate);
    },
    weekNavChanged(newWeekDate){
      if( newWeekDate.valueOf() == this.weekObjectStartDate.valueOf() ){
        return;
      }
      this.moveToWeekStart(newWeekDate);

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
        start: this.date2Str(startDate),
        duration: this.getMonthDay(startDate)
      })
      .then(res=>{
        this.mountObject(res.data,this.$refs.month); 
        this.monthObjectStartDate = startDate;
      })
      .catch(err=>{
        console.log("loadMonth error",err);
      })
    },
    loadWeekObjectInfo(startDate){
      axios.post(process.env.VUE_APP_ROOTAPI,{
        level: 1,
        start: this.date2Str(startDate),
        duration: this.getWeekDay(startDate)
      })
      .then(res=>{
        this.mountObject(res.data,this.$refs.week); 
        this.weekObjectStartDate = startDate;
      })
      .catch(err=>{
        console.log("loadWeek error",err);
      })
    },
    moveToMonthStart(date){
      date.setDate(1);
    },
    moveToWeekStart(date){
      if( date.getDay() == 1 || date.getDate() == 1){
        return;
      }
      date.setDate(date.getDate() - Math.min(date.getDate(),date.getDay() == 0 ? 7: date.getDay()) + 1);
    },
    getMonthDay(date){
      return new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
    },
    getWeekDay(date){
      return Math.min((7-date.getDay()) % 7 + 1,this.getMonthDay(date) - date.getDate() + 1);
    },
    getWeekNumber(date){
      return (Math.ceil((date.getDate() - date.getDay())/7) + (date.getDay() > 0 ? 1: 0));
    },
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
.divide{
  height: 50px
}
.center{
  text-align: center;
}
</style>
