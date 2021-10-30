<template>
  <Label @click="toggle" :labelText="state" :backgroundColor="backgroundColor"></Label>
  <span ref="toggle" class="hidden"></span>
</template>

<script>
import Label from "./LabelBase.vue"

export default{
    data(){
        return{
            backgroundColors: {
                "WAITING": "#909399",
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
        state: String
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
        }
    },
    mounted(){
        this.toInprogBtn.textContent = "INPROG";
        this.toInprogBtn.addEventListener("click",this.toInprog);

        this.toDoneBtn.textContent = "DONE";
        this.toDoneBtn.addEventListener("click",this.toDone);

        this.toBlockedBtn.textContent = "BLOCKED";
        this.toBlockedBtn.addEventListener("click",this.toBlocked);

        this.toKilledBtn.textContent = "KILLED";
        this.toKilledBtn.addEventListener("click",this.toKilled);

        this.mountBtn(this.state);
    },
    methods:{
        toggle(){
            var toggle = this.$refs.toggle;
            toggle.classList.toggle("hidden");   
        },
        toInprog(){
            this.$emit('update-state',"INPROG");
            this.$refs.toggle.classList.toggle("hidden");
        },
        toDone(){
            this.$emit('update-state',"DONE");
            this.$refs.toggle.classList.toggle("hidden");
        },
        toBlocked(){
            this.$emit('update-state',"BLOCKED");
            this.$refs.toggle.classList.toggle("hidden");
        },
        toKilled(){
            this.$emit('update-state',"KILLED");
            this.$refs.toggle.classList.toggle("hidden");
        },
        mountBtn(state){
            var toggle = this.$refs.toggle;
            if( state == "WAITING" ){
                if( !Array.from(toggle.childNodes).find(element => element == this.toInprogBtn) ) {
                    toggle.appendChild(this.toInprogBtn);
                }
                if( !Array.from(toggle.childNodes).find(element => element == this.toDoneBtn ) ) {
                    toggle.appendChild(this.toDoneBtn);
                }
                if( !Array.from(toggle.childNodes).find(element => element == this.toBlockedBtn ) ) {
                    toggle.appendChild(this.toBlockedBtn);
                }
                if( !Array.from(toggle.childNodes).find(element => element == this.toKilledBtn ) ) {
                    toggle.appendChild(this.toKilledBtn);
                }
            }
            else if( state == "INPROG" ){
                if( Array.from(toggle.childNodes).find(element => element == this.toInprogBtn ) ) {
                    toggle.removeChild(this.toInprogBtn);
                }
                if( !Array.from(toggle.childNodes).find(element => element == this.toDoneBtn ) ) {
                    toggle.appendChild(this.toDoneBtn);
                }
                if( !Array.from(toggle.childNodes).find(element => element == this.toBlockedBtn ) ) {
                    toggle.appendChild(this.toBlockedBtn);
                }
                if( !Array.from(toggle.childNodes).find(element => element == this.toKilledBtn ) ) {
                    toggle.appendChild(this.toKilledBtn);
                }   
            }
            else if( state == "DONE" ){ 
                while(toggle.firstChild){
                    toggle.removeChild(toggle.firstChild);
                }
            }
            else if( state == "BLOCKED" ){
                while(toggle.firstChild){
                    toggle.removeChild(toggle.firstChild);
                }
                toggle.appendChild(this.toKilledBtn);
            }
            else if( state == "KILLED" ){
                while(toggle.firstChild){
                    toggle.removeChild(toggle.firstChild);
                }
            }
        }
    }
}

</script>

<style scoped>
.hidden{
    display: none;
}
</style>