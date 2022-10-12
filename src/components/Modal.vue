<template>
    <div class="modal-content">

      <div class="item">
        <label>Detail: </label>
        <Editor class="inputbox" :content="detail" @update-content="updateContent"></Editor>
      </div>

      <div class="item">
        <label>Level: </label>
        <select v-model="level">
          <option value="0">0</option>
          <option value="1" selected>1</option>
        </select>
      </div>

      <div class="item">
        <label>Priority: </label>
        <prior-label :priority="priority" :modifiable="true" @update-priority="updatePriority"></prior-label> 
      </div>

      <div class="item">
        <label>State: </label>
        <state-label :state="state" :modifiable="true" @update-state="updateState"></state-label>
      </div>
      
      <div class="item">  
        <label>Due: </label>
        <input type="datetime-local" v-model="ddl">
      </div>

      
      <button class="cancelbutton" @click="cancel">Cancel</button>
      <button class="createbutton" @click="submit">Create</button>
      

    </div>
</template>

<script>
import PriorLabel from "./PriorLabel.vue";
import StateLabel from "./StateLabel.vue";
import Editor from "./Editor.vue";
import axios from 'axios';
import {date2Str,getWeekDay} from '../utils'

export default{
  components:{
    PriorLabel,
    StateLabel,
    Editor
  },
  data(){
    return{
      level: 1,
      priority: 2,
      state: "PENDING",
      ddl: "",
      detail: "",
    }
  },
  emits:['refresh','close-modal'],
  mounted(){
    this.init();
  },
  methods:{
    updatePriority(newValue){
      this.priority = newValue;
    },
    updateState(newValue){
      this.state = newValue;
    },
    updateContent(newValue){
      this.detail = newValue;
    },
    init(){
      this.level = 1;
      this.priority = 2;
      this.state = "PENDING";
      this.ddl = "";
      this.detail = "";
      var currentDate = new Date(Date.now());
      currentDate.setDate(currentDate.getDate() + getWeekDay(currentDate));
      currentDate.setHours(8);
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);
      currentDate.setMinutes(currentDate.getMinutes() - 1);
      this.ddl = currentDate.toISOString();
      this.ddl = this.ddl.substring(0,this.ddl.length-8);
    },
    cancel(){
      this.$emit('close-modal');
      this.init();
    },
    submit(){
      axios.post("/api/create",{
        detail: this.detail,
        level: this.level,
        priority: this.priority,
        state: this.state,
        ddl: date2Str(new Date(this.ddl))
      })
      .then(res=>{
        if( 'success' in res.data ){
          this.$emit('refresh');
        }
        else{
          console.log(res.data);
        } 
      })
      .catch(err=>{
        console.log(err);
      });
    }
  }
}

</script>

<style scoped>
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  padding-left: 50px;
  border: 1px solid #888;
  width: 60%;
}
.inputbox{
  border: 1px solid black;
  height: 250px;
  width: 80%;
  overflow: auto;
}
.item{
  margin: 10px;
}
.cancelbutton{
  display: inline-block;
  margin: 10px;
  margin-top: 20px;
  margin-left: 30px;
}
.createbutton{
  display: inline-block;
  margin: 10px;
  margin-top: 20px;
  margin-left: 250px;
}
</style>
