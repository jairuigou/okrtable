<template>
  <table ref="table">
    <tr ref="tr">
      <td class="object">
         <div v-html="compiled"></div>
      </td>
      <td class="priority">
        <prior-label :priority="priority" :modifiable="modifiable" @update-priority="updatePriority"></prior-label> 
      </td>
      <td class="state">
        <state-label :state="state" :modifiable="modifiable" @update-state="updateState"></state-label>
      </td>
      <td class="ddl">
          <ddl-label :ddl="ddl" :modifiable="modifiable" @update-ddl="updateDdl"></ddl-label>
      </td>
      <td class="progress">
          <Editor class="progress-editor" :content="progress" :modifiable="modifiable" @update-content="updateProgress"></Editor>
      </td>
    </tr>
  </table>

</template>

<script>
import PriorLabel from "./PriorLabel.vue"
import StateLabel from './StateLabel.vue'
import DdlLabel from "./DdlLabel.vue"
import Editor from "./Editor.vue"
import axios from 'axios'
import {date2Str} from '../utils'

export default{
    components:{
        PriorLabel,
        StateLabel,
        DdlLabel,
        Editor
    },
    data(){
        return{
            id:"",
            priority: 0,
            state: "",
            ddl:"",
            detail:"",
            progress:"",
        }
    },
    props:{
        initData: Object, 
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
        this.id = this.initData.id;
        this.priority = this.initData.priority;
        this.state = this.initData.state;
        this.ddl = this.initData.ddl;
        this.detail = this.initData.detail;
        axios.post("/api/getprogress",{
                id: this.id,
            })
            .then(res=>{
                if( res.data.length != 0){
                    this.progress = res.data[0].progress;
                }
            })
            .catch(err=>{
                // todo error feedback
                console.log(err);
            });
    },
    computed:{
        modifiable: function(){
            return this.state == "PENDING" || this.state == "INPROG";
        },
        compiled: function(){
            return require('markdown-it')().render(this.detail);
        }
    },
    methods:{
        updatePriority(newValue){
            axios.post("/api/updateprior",{
                id: this.id,
                priority: newValue
            })
            .then(res=>{
                if( 'success' in res.data){
                    this.priority = newValue;
                }
                else{
                    // todo error feedback
                    console.log(res.data);
                }
            })
            .catch(err=>{
                // todo error feedback
                console.log(res.data);
            });
        },
        updateState(newValue){
            axios.post("/api/updatestate",{
                id: this.id,
                state: newValue
            })
            .then(res=>{
                if( 'success' in res.data){
                    this.state = newValue;
                    if( 'timestamp' in res.data ){
                        this.ddl = res.data.timestamp;
                    }
                }
                else{
                    // todo error feedback
                    console.log(res.data);
                }
            })
            .catch(err=>{
                // todo error feedback
                console.log("update state error");
            });           
        },
        updateProgress(newValue){
            console.log("update ",this.id," progress:",newValue);
            axios.post("/api/updateprogress",{
                id: this.id,
                progress: newValue
            })
            .then(res=>{
                if( 'success' in res.data){
                    this.progress = newValue;
                }
                else{
                    // todo error feedback
                    console.log(res.data);
                }
            })
            .catch(err=>{
                // todo error feedback
                console.log(res.data);
            });
        },
        updateDdl(newValue){
            axios.post("/api/updateddl",{
                id: this.id,
                ddl: date2Str(new Date(newValue))
            })
            .then(res=>{
                if( 'success' in res.data){
                    this.ddl = newValue;
                }
                else{
                    // todo error feedback
                    console.log(res.data);
                }
            })
            .catch(err=>{
                // todo error feedback
                console.log(res.data);
            });           
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