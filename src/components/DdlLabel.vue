<template>
    <div>
        <Label :title="ddl" @click="toggle" :labelText="labelText" :backgroundColor="backgroundColor" :clickable="modifiable"></Label>
        <div ref="dropdown" class="dropdown"> 
            <div ref="dropdown-content" class="dropdown-content hidden">
                <input type="datetime-local" v-model="date" @change="updateDdl">
            </div>
        </div>
    </div>
</template>

<script>
import Label from "./LabelBase.vue"

export default{
    data(){
        return {
            backgroundColor: "#409EFF",
            backgroundColors: ['#f4511e','#ffca28',"#409EFF","#909399"],
            date: "",
            labelText: "NULL"
        }
    },
    components:{
        Label
    },
    props:{
        ddl: String,
        modifiable: Boolean
    },
    emits:['update-ddl'],
    watch:{
        ddl: function(){
            if( !this.ddl ){
                this.labelText = "NULL";
                return;
            }
            if( !this.modifiable ){
                this.labelText = this.ddl.substring(0,this.ddl.length-3);
                this.backgroundColor = this.backgroundColors[3];
                return;
            }
            var ddlDate = new Date(this.ddl);
            var currentDate = new Date(Date.now());
            var diffTime = ddlDate - currentDate;
            if( diffTime <= 0){
                this.backgroundColor = this.backgroundColors[0];
                this.labelText = "Over " + this.ms2Str(diffTime);
            }
            else if( diffTime < 86400000){ // < 1 day 24*3600*1000
                this.backgroundColor = this.backgroundColors[1];
                this.labelText = this.ms2Str(diffTime) + " left";
            }
            else{
                this.backgroundColor = this.backgroundColors[2];
                this.labelText = this.ms2Str(diffTime) + " left";
            }
        },
        modifiable: function(){
            this.watchModifiableHandler();
        }
    },
    mounted(){
        this.watchModifiableHandler();
    },
    methods:{
        toggle(){
            this.$refs['dropdown-content'].classList.toggle("hidden");
        },
        updateDdl(){
            this.toggle();
            this.$emit('update-ddl',this.date);
        },
        ms2Str(ms){
            var ms = Math.abs(ms)
            var days = Math.floor(ms / 86400000);
            var hours = Math.floor(ms % 86400000 / 3600000);
            var minutes = Math.floor(ms % 3600000 / 60000);
            if( days > 1 ){
                return days.toString() + " days";
            }
            if( days > 0 ){
                if( hours > 0 ){
                    return days.toString() + " days " + hours.toString() + " hours";
                }
                return days.toString() + " days";
            }
            if( hours > 1 ){
                return hours.toString() + " hours";
            }
            if( hours > 0 ){
                if( minutes > 0 ){
                    return hours.toString() + " hours " + minutes.toString() + " minutes";
                }
                return hours.toString() + " hours";
            }
            if( minutes > 0 ){
                return minutes.toString() + " minutes";
            }
            return "less than 1 minute";
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
    box-shadow: 1px 1px 10px #DCDFE6;
    border: 1px solid #E4E7ED;
    border-collapse: collapse;
}
</style>
