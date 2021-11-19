<template>
    <div class="modal-content">

      <div class="item">
        <label>Detail: </label>
        <div class="inputbox">
          <span class="input" ref="detailinput" role="textbox" contenteditable></span>
        </div>
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
        <prior-label :priority="priority" @update-priority="updatePriority"></prior-label> 
      </div>

      <div class="item">
        <label>State: </label>
        <state-label :state="state" @update-state="updateState"></state-label>
      </div>
      
      <div class="item">  
        <label>Due: </label>
        <input type="datetime-local" v-model="ddl">
      </div>

      
      <button class="cancelbutton" @click="$emit('close-modal')">Cancel</button>
      <button class="createbutton" @click="submit">Create</button>
      

    </div>
</template>

<script>
import PriorLabel from "./PriorLabel.vue";
import StateLabel from "./StateLabel.vue"

export default{
  components:{
    PriorLabel,
    StateLabel
  },
  data(){
    return{
      level: 1,
      priority: 2,
      state: "WAITING",
      ddl: "",
      detail: "",
      red:"red"
    }
  },
  mounted(){
    var currentDate = new Date(Date.now());
    // todo timezone
    currentDate.setHours(currentDate.getHours() + 8);
    this.ddl = currentDate.toISOString();
    this.ddl = this.ddl.substring(0,this.ddl.length-8);

  },
  methods:{
    updatePriority(newValue){
      this.priority = newValue;
    },
    updateState(newValue){
      this.state = newValue;
    },
    submit(){
      this.detail = this.$refs.detailinput.innerText;

      console.log("level: " + this.level);
      console.log("prior: " + this.priority);
      console.log("state: " + this.state);
      console.log("ddl: " + this.ddl);
      console.log("detail: " + this.detail); 
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
.input{
  display: inline-block;
  outline: none;
  width: 100%; 
  height: 100%;
}
.inputbox{
  border: 1px solid black;
  height: 100px;
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
