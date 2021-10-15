<template>
  <table>
    <tr>
      <td id="object">
         <div v-html="object"> </div>
      </td>
      <td id="level">
         <DdlLabel :hours=20></DdlLabel>
      </td>
      <td id="state">
          status
      </td>
      <td id="progress">
        <span id="input" role="textbox" contenteditable> progress </span>
      </td>
    </tr>
  </table>
<DdlLabel :hours="20"></DdlLabel>
<DdlLabel :hours="200"></DdlLabel>

</template>

<script>
import Label from "./Label.vue"
import DdlLabel from "./DdlLabel.vue"

export default{
    components:{
        Label,
        DdlLabel
    },
    data(){
        return{
            progStatus: "waiting",
            backgroundColor: "#fff",
            object:"<h1>hello</h1><br>world"      
        }
    },
    mounted(){
        var span = document.getElementById("input");
        span.addEventListener('focus',this.contentEdit);
        span.addEventListener('blur',this.contentSaved);
    },
    methods:{
        contentEdit(){
            console.log("editing");
        },
        contentSaved(){
            console.log("saved");
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
#object{
    width:20%
}
#level,#state{
    width:20%;
    text-align: center;    
}
#progress{
    width:40%;
    vertical-align: top;
}
span{
    width:100%;
}

</style>