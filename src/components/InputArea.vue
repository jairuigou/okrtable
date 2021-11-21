<template>
    <div ref="border" class="border" @dblclick="editing">
        <div class="editorborder" ref="editorborder">
            <textarea class="editor" ref="editor" :value="input"
                @blur="exiteditor" @input="handle"></textarea>
        </div>
        <div class="preview" ref="preview" v-html="compiled"></div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            input: ""
        }
    },
    emits:['update-content'],
    computed:{
        compiled: function(){
            return require('markdown-it')().render(this.input);
        }
    },
    methods:{
        exiteditor(){
            this.$refs.editor.style.display = "none";
            this.$refs.editorborder.style.display = "none";
            this.$refs.preview.style.width = "100%";
            this.$emit('update-content',this.input);
        },
        editing(){
            this.$refs.editorborder.style.display = "block";
            this.$refs.editor.style.display = "block";
            this.$refs.editor.focus();
            this.$refs.preview.style.width = "50%";
        },
        handle(e){
            this.input = e.target.value;
        },
    }
}
</script>

<style scoped>
.editorborder{
    display: none;
    width: 50%;
    height:100%;
    outline: none;
}
.editor{
    display: none;
    outline: none;
    resize: none;
    border: none;
    border-right: 1px solid black;
    width: 90%;
    height: 100%;
}
.preview{
    display: block;
    width:100%;
    height:100%;
    outline: none;
}
.border{
    display: flex;
    border: 1px solid black;
    overflow: auto;
}
</style>
