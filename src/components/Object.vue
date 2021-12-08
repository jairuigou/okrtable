<template>
  <table ref="table">
    <tr ref="tr">
      <td class="object">
         <div v-html="object"></div>
      </td>
      <td class="priority">
        <prior-label :priority="priority" @update-priority="updatePriority"></prior-label> 
      </td>
      <td class="state">
          <state-label :state="state" @update-state="updateState"></state-label>
      </td>
      <td class="ddl">
          <ddl-label :ddl="ddl" @update-ddl="updateDdl"></ddl-label>
      </td>
      <td class="progress">
          <input-area class="progress-editor" @update-content="updateContent"></input-area>
      </td>
    </tr>
  </table>

</template>

<script>
import PriorLabel from "./PriorLabel.vue"
import StateLabel from './StateLabel.vue'
import DdlLabel from "./DdlLabel.vue"
import InputArea from "./InputArea.vue"

export default{
    components:{
        PriorLabel,
        StateLabel,
        DdlLabel,
        InputArea
    },
    data(){
        return{
            id:"",
            priority: 2,
            state: "WAITING",
            ddl:"",
            object:"<h1>Object</h1><br>verbose",
            progress:"",
        }
    },
    props:{
        isFirst: Boolean
    },
    mounted(){
        if( !this.isFirst ){
            this.$refs.table.style.borderTop="none";
            var nodes = this.$refs.tr.getElementsByTagName("td");
            for(var i = 0;i<nodes.length;++i){
                nodes[i].style.borderTop = "none";
            }
        }
    },
    methods:{
        updatePriority(newValue){
            this.priority = newValue;
        },
        updateState(newValue){
            this.state = newValue;
        },
        updateContent(newValue){
            this.progress = newValue;
        },
        updateDdl(newValue){
            this.ddl = newValue;
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
    height: 150px;
}
.object{
    width:20%
}
.priority,.state,.ddl{
    width:10%;
    text-align: center;    
}
.progress{
    width:50%;
    vertical-align: top;
}
.progress-editor{
    width: 100%;
    height: 100%;
    border: none;
}
</style>