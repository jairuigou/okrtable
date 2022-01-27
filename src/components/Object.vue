<template>
  <table ref="table">
    <tr ref="tr">
      <td class="object">
         <div v-html="detail"></div>
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
          <input-area class="progress-editor" :content="progress" @update-content="updateProgress"></input-area>
      </td>
    </tr>
  </table>

</template>

<script>
import PriorLabel from "./PriorLabel.vue"
import StateLabel from './StateLabel.vue'
import DdlLabel from "./DdlLabel.vue"
import InputArea from "./InputArea.vue"
import axios from 'axios'

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
            priority: 0,
            state: "",
            ddl:"",
            detail:"",
            progress:""
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
        axios.post(process.env.VUE_APP_ROOTAPI + "/getprogress",{
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
        }
    },
    methods:{
        updatePriority(newValue){
            axios.post(process.env.VUE_APP_ROOTAPI + "/updateprior",{
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
            axios.post(process.env.VUE_APP_ROOTAPI + "/updatestate",{
                id: this.id,
                state: newValue
            })
            .then(res=>{
                if( 'success' in res.data){
                    this.state = newValue;
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
            axios.post(process.env.VUE_APP_ROOTAPI + "/updateprogress",{
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
            axios.post(process.env.VUE_APP_ROOTAPI + "/updateddl",{
                id: this.id,
                ddl: newValue
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