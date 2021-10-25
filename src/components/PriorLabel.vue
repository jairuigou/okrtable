<template>
  <Label v-on:click="toggle" :labelText="labelText" :backgroundColor="backgroundColor"></Label>
  <span ref="toggle" class="hidden">
      <button ref="upgrade" v-on:click="upgrade">up</button>
      <button ref="downgrade" v-on:click="downgrade">down</button>
  </span>
</template>

<script>
import Label from "./LabelBase.vue"

export default{
    data(){
        return{
            labelText: "LOW"
        }
    },
    components:{
        Label
    },
    computed:{
        backgroundColor:function(){
            if(this.labelText == "LOW"){
                return "#66bb6a";    
            }
            if(this.labelText == "MEDIUM"){
                return "#ffca28";
            }
            if(this.labelText == "HIGH"){
                return "#f4511e";
            }
            return "black";
        }
    },
    methods:{
        toggle: function(event){
          var toggle = this.$refs.toggle;
          toggle.classList.toggle("hidden");
          if(this.labelText == "LOW"){
              this.$refs.downgrade.disabled = true;
          }
          else if( this.labelText == "HIGH"){
              this.$refs.upgrade.disabled = true;
          }
        },
        upgrade: function(event){
            if( this.labelText == "LOW" ){
                this.labelText = "MEDIUM";
                this.$refs.downgrade.disabled = false;
            }
            else if( this.labelText == "MEDIUM" ){
                this.labelText = "HIGH";
                this.$refs.upgrade.disabled = true;
            }
        },
        downgrade: function(event){
            if( this.labelText == "HIGH" ){
                this.labelText = "MEDIUM";
                this.$refs.upgrade.disabled = false;
            }
            else if( this.labelText == "MEDIUM" ){
                this.labelText = "LOW";
                this.$refs.downgrade.disabled = true;
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