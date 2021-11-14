<template>
    <div class="border">
        <div class="inner">
            <label class="item" @click="$emit('popup-create')">Create</label>
            <label class="item">About</label>
        </div>

    </div>   
</template>

<script>
export default{

}
</script>
    
<style scoped>
.border{
    box-shadow: 1px 1px 10px #DCDFE6;
    border: 1px solid #E4E7ED;
    border-collapse: collapse;
}
.inner{
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 15px;
}
.item{
    padding:5px;
    padding-left: 10px;
    padding-right: 50px;
    display: block;
}
.item:hover{
    background-color: #DCDFE6;
}
</style>
