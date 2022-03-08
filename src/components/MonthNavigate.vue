<template>
<div class="center">
  <div style="display:inline-block" @mouseover="caretToggle" @mouseout="caretToggle">
    <svg @click="pre" ref="caret-left" width="16" height="16" fill="currentColor" class="caret-left hidden" viewBox="0 0 16 16">
      <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
    </svg>
    <p ref="title">{{titleText}}</p>
    <svg @click="next" ref="caret-right" width="16" height="16" fill="currentColor" class="caret-right hidden" viewBox="0 0 16 16">
      <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
    </svg>
  </div>
</div>
</template>

<script>

export default{
    data(){
        return{
        }
    },
    props:{
      date:{
        type: Object,
        default: new Date(Date.now())
      },
    },
    emits:['navigate-change'],
    computed:{
        titleText: function(){
            return this.date.getFullYear() + "-" + (this.date.getMonth() + 1).toString().padStart(2,'0');
        }
    },
    mounted(){
        var title = this.$refs.title;
        title.style.fontSize = "40px";
        title.style.fontWeight = "bold";
        title.style.display = "inline-block";
        this.$refs['caret-left'].setAttribute('width',25);
        this.$refs['caret-left'].setAttribute('height',25);
        this.$refs['caret-right'].setAttribute('width',25);
        this.$refs['caret-right'].setAttribute('height',25);
    },
    methods:{
        caretToggle(){
            this.$refs['caret-left'].classList.toggle("hidden");
            this.$refs['caret-right'].classList.toggle("hidden");
        },
        next(){
            this.$emit('navigate-change',new Date(this.date.getFullYear(),this.date.getMonth()+1,1));
        },
        pre(){
            this.$emit('navigate-change',new Date(this.date.getFullYear(),this.date.getMonth()-1,1));
        }
    }
}
</script>

<style scoped>
.hidden{
  visibility: hidden;
}
.center{
  margin: auto;
}
</style>