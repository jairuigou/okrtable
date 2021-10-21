<template>
  <Label :labelText="labelText" :backgroundColor="backgroundColor"></Label>
</template>

<script>
import Label from "./LabelBase.vue"

export default{
    components:{
        Label
    },
    props:{
        labelText: String
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
    }

}
</script>

<style scoped>
</style>