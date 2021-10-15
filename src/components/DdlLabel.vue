<template>
    <span id="ddllabel">{{labelText}}</span>
</template>

<script>
export default{
    data(){
        return {
            labelText: "NULL"
        }
    },
    props:{
        hours: Number
    },
    mounted(){
        this.initLabel();   
    },
    methods:{
        initLabel(){
            var label = document.getElementById("ddllabel");
            if(this.hours < 24){
                label.style.backgroundColor = "#e53935";
                this.labelText = this.hours.toString() + " hours left";
            }
            else{
                label.style.backgroundColor = "#64b5f6";
                this.labelText = Math.floor(this.hours/24).toString() + " days and " + 
                                    (this.hours%24).toString() + " hours left";
            }
        }
    }
}
</script>
<style scoped>
#ddllabel{
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    color: white;
}
</style>
