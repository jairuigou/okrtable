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
          status
      </td>
      <td class="progress">
        <span ref="progressinput" role="textbox" contenteditable> progress </span>
      </td>
    </tr>
  </table>

</template>

<script>
import PriorLabel from "./PriorLabel.vue"

export default{
    components:{
        PriorLabel
    },
    data(){
        return{
            priority: 10,
            progStatus: "waiting",
            backgroundColor: "#fff",
            object:"<h1>hello</h1><br>world",
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
    background-color: aquamarine;
}
table{
    width: 100%;
}
.object{
    width:20%
}
.priority,.state{
    width:20%;
    text-align: center;    
}
.progress{
    width:40%;
    vertical-align: top;
}
span{
    width:100%;
}

</style>