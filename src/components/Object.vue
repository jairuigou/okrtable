<template>
  <table>
    <tr>
      <td class="object">
         <div v-html="object"> </div>
      </td>
      <td class="priority">
        <prior-label :priority="priority" @update-priority="updatePriority"></prior-label> 
      </td>
      <td class="state">
          <state-label :state="state" @update-state="updateState"></state-label>
      </td>
      <td class="progress">
        <span ref="progressinput" role="textbox" contenteditable> progress </span>
      </td>
    </tr>
  </table>

</template>

<script>
import PriorLabel from "./PriorLabel.vue"
import StateLabel from './StateLabel.vue'

export default{
    components:{
        PriorLabel,
        StateLabel
    },
    data(){
        return{
            priority: 2,
            state: "WAITING",
            backgroundColor: "#fff",
            object:"<h1>Object</h1><br>verbose",
            progText:"",
        }
    },
    mounted(){
        var span = this.$refs.progressinput;
        span.addEventListener('focus',this.contentEdit);
        span.addEventListener('blur',this.contentSaved);
    },
    methods:{
        contentEdit(){
            console.log("editing");
        },
        contentSaved(){
            console.log("saved");
        },
        updatePriority(newValue){
            this.priority = newValue;
        },
        updateState(newValue){
            this.state = newValue;
        }
    }
}
</script>

<style scoped>
table,td{
    border: 1px solid black;
    border-collapse: collapse;
}
td{
    background-color: white;
}
table{
    width: 100%;
}
.object{
    width:20%
}
.priority,.state{
    width:10%;
    text-align: center;    
}
.progress{
    width:50%;
    vertical-align: top;
}
span{
    width:100%;
}

</style>