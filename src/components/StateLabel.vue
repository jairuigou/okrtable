<template>
  <Label @click="toggle" :labelText="state" :backgroundColor="backgroundColor" :clickable="modifiable"></Label>
  <div ref="dropdown" class="dropdown">
      <div ref="dropdown-content" class="dropdown-content hidden">
      </div>
  </div>
</template>

<script>
import Label from "./LabelBase.vue"

export default{
    data(){
        return{
            backgroundColors: {
                "PENDING": "#909399",
                "INPROG": "#409EFF",
                "DONE": "#66bb6a",
                "BLOCKED": "#f4511e",
                "KILLED": "#fd1b1b"
            },
            toInprogBtn: document.createElement('button'),
            toDoneBtn: document.createElement('button'),
            toBlockedBtn: document.createElement('button'),
            toKilledBtn: document.createElement('button')
        }
    },
    components:{
        Label
    },
    props:{
        state: String,
        modifiable: Boolean
    },
    emits:['update-state'],
    computed:{
        backgroundColor: function(){
            return this.backgroundColors[this.state];
        } 
    },
    watch:{
        state: function(newState){
            this.mountBtn(newState);
        },
        modifiable: function(){
            this.watchModifiableHandler();
        }
    },
    mounted(){
        this.toInprogBtn.textContent = "INPROG";
        this.toInprogBtn.addEventListener("click",this.changeState.bind(null,"INPROG"));

        this.toDoneBtn.textContent = "DONE";
        this.toDoneBtn.addEventListener("click",this.changeState.bind(null,"DONE"));

        this.toBlockedBtn.textContent = "BLOCKED";
        this.toBlockedBtn.addEventListener("click",this.changeState.bind(null,"BLOCKED"));

        this.toKilledBtn.textContent = "KILLED";
        this.toKilledBtn.addEventListener("click",this.changeState.bind(null,"KILLED"));

        this.mountBtn(this.state);
        this.watchModifiableHandler();
    },
    methods:{
        toggle(){
            this.$refs['dropdown-content'].classList.toggle("hidden"); 
        },
        changeState(newval){
            this.$emit('update-state',newval);
            this.toggle();
        },
        mountBtn(state){
            var dropdownContent = this.$refs['dropdown-content'];
            if( state == "PENDING" ){
                this.mountBtnHandler(dropdownContent,this.toInprogBtn,true);
                this.mountBtnHandler(dropdownContent,this.toDoneBtn,true);
                this.mountBtnHandler(dropdownContent,this.toBlockedBtn,true); 
                this.mountBtnHandler(dropdownContent,this.toKilledBtn,true); 
            }
            else if( state == "INPROG" ){
                this.mountBtnHandler(dropdownContent,this.toInprogBtn,false);
                this.mountBtnHandler(dropdownContent,this.toDoneBtn,true);
                this.mountBtnHandler(dropdownContent,this.toBlockedBtn,true); 
                this.mountBtnHandler(dropdownContent,this.toKilledBtn,true); 
            }
            else if( state == "DONE" ){ 
                while(dropdownContent.firstChild){
                    dropdownContent.removeChild(dropdownContent.firstChild);
                }
            }
            else if( state == "BLOCKED" ){
                while(dropdownContent.firstChild){
                    dropdownContent.removeChild(dropdownContent.firstChild);
                }
                dropdownContent.appendChild(this.toKilledBtn);
            }
            else if( state == "KILLED" ){
                while(dropdownContent.firstChild){
                    dropdownContent.removeChild(dropdownContent.firstChild);
                }
            }
        },
        mountBtnHandler: function(mountPoint,btn,flag){
            if( Array.from(mountPoint.childNodes).find(element => element == btn) ) {
                if( !flag ){
                    mountPoint.removeChild(btn);
                }
            }
            else if(flag){
                mountPoint.appendChild(btn);
            }
        },
        watchModifiableHandler: function(){
            if( this.modifiable ){
                this.$refs['dropdown-content'].style.removeProperty('display'); 
                this.$refs['dropdown-content'].classList.add('hidden');
            }
            else{
                this.$refs['dropdown-content'].style.display = 'none';
            }
        }
    }
}

</script>

<style scoped>
.dropdown{
    position: relative;
}
.hidden{
    display: none;
}
.dropdown-content{
    position: absolute;
    z-index: 1;
}
</style>