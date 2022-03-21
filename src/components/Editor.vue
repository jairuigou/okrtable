<template>
  <div ref="editor" class="container"
    @keyup="keyupEventHandler" @dblclick="enableEditing" @blur="disableEditing">
  </div>
</template>

<script>
export default{
  data(){
    return{
      editor: {},
      mdParser:{},
      html2mdParser:{}
    }
  },
  props:{
    content:{
      type: String,
      default: ""
    },
    modifiable: {
      type: Boolean,
      default: true
    }
  },
  emits:['update-content'],
  watch:{
    content: function(){
      this.renderContent();
    }
  },
  mounted(){
    this.editor = this.$refs.editor;
    this.mdParser = new require('markdown-it')();
    this.html2mdParser = new require('turndown').default({headingStyle :'atx'});
    this.html2mdParser.addRule('strikethrough', {
      filter: ['del', 's', 'strike'],
      replacement: function (content) {
        return '~~' + content + '~~'
      }
    });
    this.renderContent();
  },
  methods:{
    enableEditing(){
      if( !this.modifiable)
        return; 
      this.editor.setAttribute('contenteditable',true);
    },
    disableEditing(){
      this.editor.setAttribute('contenteditable',false);
      var markdown = this.html2mdParser.turndown(this.editor.innerHTML);
      this.$emit('update-content',markdown);
    },
    input(){
      var select = getSelection();
      var range = select.getRangeAt(0); 
      var startNode = range.startContainer;
      if( startNode.nodeType != Node.TEXT_NODE){
        return;
      }

      // if now is in head tag, do nothing
      if( startNode.parentNode.nodeName[0] == 'H'){
        return;
      }

      var html = this.mdParser.render(startNode.textContent);
      if( !html ){
        return;
      }
      var div = document.createElement('div');
      div.innerHTML = html;

      // if there is no style, do nothing
      if( div.firstChild.tagName == 'P' 
          && div.firstChild.childNodes.length == 1 
            && div.firstChild.firstChild.nodeType == Node.TEXT_NODE){
        return;
      }
      if( !div.firstChild.innerText ){
        return;
      }
      // remove top level P tag
      if( div.firstChild.tagName == 'P' ){
        html = html.substring(3,html.length-5);
      }

      var parentNode = startNode.parentNode;
      startNode.remove();
      parentNode.innerHTML = html;

      // insert ZWSP for setting cursor
      if( parentNode.lastChild.nodeName == 'STRONG' ||
            parentNode.lastChild.nodeName == 'CODE' ||
              parentNode.lastChild.nodeName == 'S' ){
        parentNode.appendChild(document.createTextNode("\u200b"));
      }
      parentNode.appendChild(document.createElement('wbr'));
     
      for(var node of parentNode.childNodes){
        if( node.nodeName == 'WBR'){
          var lastTextNode = node;
        }
      }

      var range = document.createRange();
      range.setStartBefore(lastTextNode);
      if( lastTextNode.nodeName == 'WBR')
          lastTextNode.remove();
      range.collapse(true);
      select.removeAllRanges();
      select.addRange(range);
    },
    keyupEventHandler(event){
      if( event.isComposing ){
        return;
      }
      if( event.key == 'Backspace'){
        // todo remove head tag
      }
      else if(event.key != "Enter"){
        this.input();
      }
    },
    renderContent(){
      if( !this.content ){
        this.editor.innerHTML = "";
        return;
      }
      var html = this.mdParser.render(this.content);
      // replace all P tag with DIV tag
      html = html.replaceAll('<p>','<div>');
      html = html.replaceAll('</p>','</div>');
      this.editor.innerHTML = html;
    }
  }
}

</script>

<style scoped>
.container{
  display: block;
  border: none;
  outline: none;
  overflow: auto;
}
</style>