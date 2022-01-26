<template>
<div style="display:inline-block" @mouseover="caretToggle" @mouseout="caretToggle">
    <svg @click="pre" ref="caret-left" width="16" height="16" fill="currentColor" class="caret-left hidden" viewBox="0 0 16 16">
        <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
    </svg>
    <p ref="title" >{{titleText}}</p>
    <svg @click="next" ref="caret-right" width="16" height="16" fill="currentColor" class="caret-right hidden" viewBox="0 0 16 16">
        <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
    </svg>
</div>
</template>

<script>

export default{
    data(){
        return{
            fontSize:{
                small:"25px",
                medium:"40px"
            },
            caretSize:{
                small: 18,
                medium: 25
            },
            
        }
    },
    props:{
        size:{
            type: String,
            default: "small"
        },
        value:{
            type: Object,
            default: new Date(Date.now())
        },
        textGen:{
            type: Function,
            default: function(value){
                return value.getFullYear();
            }
        },
        toNext: Function,
        toPre: Function,
    },
    emits:['navigate-change'],
    computed:{
        titleText: function(){
            return this.textGen(this.value);
        }
    },
    mounted(){
        var title = this.$refs.title;
        title.style.fontSize = this.fontSize[this.size];
        title.style.fontWeight = "bold";
        title.style.display = "inline-block";
        this.$refs['caret-left'].setAttribute('width',this.caretSize[this.size]);
        this.$refs['caret-left'].setAttribute('height',this.caretSize[this.size]);
        this.$refs['caret-right'].setAttribute('width',this.caretSize[this.size]);
        this.$refs['caret-right'].setAttribute('height',this.caretSize[this.size]);
    },
    methods:{
        caretToggle(){
            this.$refs['caret-left'].classList.toggle("hidden");
            this.$refs['caret-right'].classList.toggle("hidden");
        },
        next(){
            this.$emit('navigate-change',this.toNext(this.value));
        },
        pre(){
            this.$emit('navigate-change',this.toPre(this.value));
        }
    }
}
    
</script>

<style scoped>
.hidden{
    display: none;
}
</style>