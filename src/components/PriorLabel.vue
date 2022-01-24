<template>
  <Label @click="toggle" :labelText="labelText" :backgroundColor="backgroundColor" :clickable="modifiable"></Label>
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
            labelTexts: ['HIGH','MEDIUM','LOW'],
            backgroundColors: ['#f4511e','#ffca28','#66bb6a'],
            upgradeBtn: document.createElement('button'),
            downgradeBtn: document.createElement('button')
        }
    },
    components:{
        Label
    },
    props:{
        priority: Number,
        modifiable: Boolean
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
    watch:{
        priority: function(){
            this.mountBtn();
        },
        modifiable: function(){
            this.watchModifiableHandler();
        }
    },
    mounted(){
        this.upgradeBtn.textContent = "UP";
        this.upgradeBtn.addEventListener("click",this.upgrade);
        this.downgradeBtn.textContent = "DOWN";
        this.downgradeBtn.addEventListener("click",this.downgrade);
        this.mountBtn();
        this.watchModifiableHandler();
    },
    methods:{
        toggle: function(){
          this.$refs['dropdown-content'].classList.toggle("hidden");
        },
        upgrade: function(){
            var curPriority = this.priority-1;
            this.$emit('update-priority',curPriority);
            this.$refs['dropdown-content'].classList.toggle("hidden");
        },
        downgrade: function(){
            var curPriority = this.priority+1;
            this.$emit('update-priority',curPriority);
            this.$refs['dropdown-content'].classList.toggle("hidden");
        },
        mountBtn: function(){
            var dropdownContent = this.$refs['dropdown-content'];
            if( this.priority == 0 ){
                this.mountBtnHandler(dropdownContent,this.upgradeBtn,false);
                this.mountBtnHandler(dropdownContent,this.downgradeBtn,true);
            }
            else if( this.priority == 1 ){
                this.mountBtnHandler(dropdownContent,this.upgradeBtn,true);
                this.mountBtnHandler(dropdownContent,this.downgradeBtn,true);
            }
            else{
                this.mountBtnHandler(dropdownContent,this.upgradeBtn,true);
                this.mountBtnHandler(dropdownContent,this.downgradeBtn,false);
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
    display: block;
}
.hidden{
    display: none;
}
.dropdown-content{
    position: absolute;
    z-index: 1;
}
</style>