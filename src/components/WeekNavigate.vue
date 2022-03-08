<template>
<div class="center">
  <div style="display:inline-block" @mouseover="caretToggle" @mouseout="caretToggle">
    <svg @click="pre" ref="caret-left" width="16" height="16" fill="currentColor" class="caret-left hidden" viewBox="0 0 16 16">
        <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
    </svg>
    <p ref="title" class="compact">{{titleText}}</p>
    <svg @click="next" ref="caret-right" width="16" height="16" fill="currentColor" class="caret-right hidden" viewBox="0 0 16 16">
        <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
    </svg>

    <div class="indicator">
        <svg width="18" height="16" class="hidden" viewBox="0 0 16 16">
            <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
        </svg>
        <div class="daybox"></div>
        <div class="daybox"></div>
        <div class="daybox"></div>
        <div class="daybox"></div>
        <div class="daybox"></div>
        <div class="daybox"></div>
        <div class="daybox"></div>
    </div>
  </div>
</div>    
</template>

<script>
import {getWeekDay,getWeekNumber,moveToWeekStart,getMonthDay} from '../utils';

export default {
  data(){
    return{
    }
  },
  props:{
    date:{
      type: Object,
      default: new Date(Date.now())
    }
  },
  emits:['navigate-change'],
  computed:{
    titleText: function(){
      return "week " + getWeekNumber(this.date);
    }
  },
  watch:{
    date: function(){
      this.renderIndicatorBackground();
      this.renderIndicatorTodayColor();
    }
  },
  mounted(){
    var title = this.$refs.title;
    title.style.fontSize = "25px";
    title.style.fontWeight = "bold";
    title.style.display = "inline-block";
    this.$refs['caret-left'].setAttribute('width',18);
    this.$refs['caret-left'].setAttribute('height',18);
    this.$refs['caret-right'].setAttribute('width',18);
    this.$refs['caret-right'].setAttribute('height',18);
    this.renderIndicatorBackground();
    this.renderIndicatorTodayColor();
  },
  methods:{
    caretToggle(){
      this.$refs['caret-left'].classList.toggle("hidden");
      this.$refs['caret-right'].classList.toggle("hidden");
    },
    next(){
      var newDate = new Date(this.date);
      newDate.setDate(newDate.getDate() + getWeekDay(newDate));
      this.$emit('navigate-change',newDate);
    },
    pre(){
      var newDate = new Date(this.date);
      moveToWeekStart(newDate);
      newDate.setDate(newDate.getDate()-1);
      moveToWeekStart(newDate);
      this.$emit('navigate-change',newDate);
    },
    renderIndicatorBackground(){
      var tmpDate = new Date(this.date);
      moveToWeekStart(tmpDate);
      var start = tmpDate.getDay() == 0 ? 6:tmpDate.getDay()-1;
      var totalMonthday = getMonthDay(tmpDate);
      var end = Math.min(7,totalMonthday-tmpDate.getDate()+1);
      var dayboxs = document.getElementsByClassName("daybox");
      console.log(start,end);
      for(var i=0;i<7;++i){
        if( i >= start && i < end){
          dayboxs[i].style.backgroundColor = "var(--enable-color)"
          dayboxs[i].style.borderColor = "var(--enable-color)"
        }
        else{
          dayboxs[i].style.backgroundColor = "var(--disable-color)"
          dayboxs[i].style.borderColor = "var(--disable-color)"
        }
      }
    },
    renderIndicatorTodayColor(){
      var curDate = new Date(Date.now());
      if( curDate.getFullYear() == this.date.getFullYear() &&
            curDate.getMonth() == this.date.getMonth() &&
              getWeekNumber(curDate) == getWeekNumber(this.date) ){
        var curDay = curDate.getDay() == 0 ? 6 : curDate.getDay()-1;
        console.log(curDay);
        document.getElementsByClassName("daybox")[curDay].style.borderColor = "var(--today-color)";
        document.getElementsByClassName("daybox")[curDay].style.backgroundColor = "var(--today-color)";
      }
    }
  }
}
</script>

<style scoped>
.center{
  margin: auto;
}
.hidden{
  visibility: hidden;
}
.compact{
  margin-bottom: 0px;
}
.indicator{
    --disable-color: #C0C4CC;
    --enable-color: #909399;
    --today-color: #67C23A;
    padding: 0px;
}
.daybox{
    display: inline-block;
    width: 6px;
    height: 6px;
    margin: 2px;
    margin-bottom: 20px;
    border-radius: 30%;
    border-style: solid;
    border-width: 1px;
    border-color: var(--disable-color);
    background-color: var(--disable-color);
}
</style>