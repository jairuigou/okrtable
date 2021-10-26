<template>
  <Label @click="toggle" :labelText="labelText" :backgroundColor="backgroundColor"></Label>
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
            labelTexts: ['HIGH','MEDIUM','LOW'],
            backgroundColors: ['#f4511e','#ffca28','#66bb6a']
        }
    },
    components:{
        Label
    },
    props:{
        priority: Number
    },
    emits:['update-priority'],
    computed:{
        labelText: function(){
            return this.priority < 3 ? this.labelTexts[this.priority] : "NULL";
        },
        backgroundColor: function(){
            return this.priority < 3 ? this.backgroundColors[this.priority] : "black";
        }
    },
    methods:{
        toggle: function(event){
          var toggle = this.$refs.toggle;
          toggle.classList.toggle("hidden");
          if(this.priority == 2){
              this.$refs.downgrade.disabled = true;
          }
          else if( this.priority == 0){
              this.$refs.upgrade.disabled = true;
          }
        },
        upgrade: function(event){
            var curPriority = this.priority-1;
            this.$emit('update-priority',curPriority);
            this.$refs.downgrade.disabled = false;
            if(curPriority == 0){
                this.$refs.upgrade.disabled = true;
            }
        },
        downgrade: function(event){
            var curPriority = this.priority+1;
            this.$emit('update-priority',curPriority);
            this.$refs.upgrade.disabled = false;
            if( curPriority == 2 ){
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