<template>
  <div class="container">
    <month-navigate class="month"></month-navigate>
    <div class="monthtable">
      <Object :isFirst="true" :initData="templateOb1"></Object>
      <Object :initData="templateOb"></Object>
    </div>
    <week-navigate class="week" :date="weekDate" @navigate-change="weekChange"></week-navigate>
    <div class="weektable">
      <Object :isFirst="true" :initData="templateOb"></Object>
    </div>
  </div>
</template>

<script>
import WeekNavigate from "./components/WeekNavigate.vue"
import Object from "./components/Object.vue"
import MonthNavigate from "./components/MonthNavigate.vue"

export default {
  name: 'App',
  components: {
      WeekNavigate,
      Object,
      MonthNavigate
  },
  data(){
    return{
        weekDate: new Date(Date.now()),
        templateOb:{
          id: 1,
          priority: 0,
          state: "PENDING",
          ddl: "2022-04-01",
          detail: "empty"
        },
        templateOb1:{
          id: 1,
          priority: 0,
          state: "PENDING",
          ddl: "2022-04-01",
          detail: "<h1>empty</h1>sdfsdfsdfsdfdsfdsf<h1>empty</h1><h1>empty</h1><h1>empty</h1><h1>empty</h1>"
        }
    }
  },
  methods:{
    weekChange(newDate){
      console.log("sdfdsfds");
      this.weekDate = newDate;
    }
  }
}
</script>

<style scoped>
.container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: 
    ". month ."
    "table1 table1 table1"
    ". week ."
    "table2 table2 table2";
}
.month{
  grid-area: month;
}
.week{
  grid-area: week;
}
.monthtable{
  grid-area: table1;
}
.weektable{
  grid-area: table2;
}
</style>


