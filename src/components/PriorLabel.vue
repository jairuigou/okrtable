<template>
    <span id="label">{{labelText}}</span>
</template>

<script>
export default{
    data(){
        return{
            labelText: "LOW"
        }
    },
    props:{
        label: String
    },
    mounted(){
        this.setColor();        
    },
    methods:{
        setColor(){
            var label = document.getElementById("label");
            if(this.labelText == "HIGH"){
                label.style.backgroundColor = "#f4511e";
            }
            else if(this.labelText == "MEDIUM"){
                label.style.backgroundColor = "#ffca28";
            }
            else if(this.labelText == "LOW"){
                label.style.backgroundColor = "#66bb6a";
            }
        }
    }
}
</script>

<style scoped>
#label{
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
    color: white;
}
</style>