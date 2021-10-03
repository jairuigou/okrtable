<template>
    <div> 
        <canvas id="timeline"></canvas>
    </div>
</template>
<script>

export default{
    data(){
        return{
            canvasHeight: 30,
            canvasWidth: window.innerWidth,
            lineColor: "#303133",
            processColor: "#67C23A",
            margin: 50,
            process: 20
        }
    },
    created(){
        window.addEventListener('resize',this.reSize);
    },
    mounted(){
        this.draw();
    },
    methods:{
        reSize(){
            this.canvasWidth = window.innerWidth;
            this.draw();
        },
        draw(){
            var canvas = document.getElementById('timeline');
            canvas.setAttribute('height',this.canvasHeight.toString());
            canvas.setAttribute('width',this.canvasWidth.toString());
            var ctx = canvas.getContext('2d');
            if( !ctx){
                console.log("not support canvas 2d");
                return;
            }

            ctx.strokeStyle = this.lineColor;    
            ctx.beginPath();
            ctx.moveTo(this.margin,0);
            ctx.lineTo(this.canvasWidth - this.margin,0);
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(this.margin,this.canvasHeight);
            ctx.lineTo(this.canvasWidth - this.margin,this.canvasHeight);
            ctx.lineWidth = 1;
            ctx.stroke();
            
            ctx.fillStyle = this.processColor;
            // todo rect width use vue counted 
            ctx.fillRect(this.margin,1,(this.canvasWidth- this.margin * 2) * this.process / 100 | 0, this.canvasHeight-2);
        }
    }
}

</script>