<template>
    <span ref="label">{{labelText}}</span>
</template>

<script>

export default ({
    props:{
        labelText: {
            type: String,
            default: "NULL"
        },
        backgroundColor: {
            type: String,
            default: "black"
        },
        fontColor: {
            type: String,
            default: "white"
        },
        fontSize: {
            type: Number,
            default: 15
        }
    },
    mounted(){
        var label = this.$refs.label;
        label.style.borderRadius = "5px";
        label.style.paddingLeft = "5px";
        label.style.paddingRight = "5px";
        label.style.backgroundColor = this.backgroundColor;
        label.style.color = this.fontColor;
        label.style.fontSize = this.fontSize.toString() + "px";
    },
    watch:{
        backgroundColor: function(val){
            this.$refs.label.style.backgroundColor = val;
        }
    }

})
</script>

<style scoped>
#label{
    border-radius: 5px;
    padding-left: 5px;
    padding-right: 5px;
} 
span{
    white-space: nowrap;
}
</style>
