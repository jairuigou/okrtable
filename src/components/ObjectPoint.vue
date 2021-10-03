<template>
    <div>
        <canvas id="point"></canvas>
    </div>
</template>

<script>

export default {
    data() {
        return{
            canvasHeight: 200,
            canvasWidth: 200,
            status: "success",
            successColor: "#67C23A",
            warningColor: "#E6A23C",
            failedColor: "#F56C6C"
        }
    },
    mounted(){
        this.draw();
    },
    methods:{
        draw(){
            var canvas = document.getElementById('point');
            canvas.setAttribute('height',this.canvasHeight.toString());
            canvas.setAttribute('width',this.canvasWidth.toString());
            var ctx = canvas.getContext('2d');
            if( !ctx){
                console.log("not support canvas 2d");
            }

            if( this.status === "success"){
                ctx.strokeStyle = this.warningColor;
                ctx.beginPath();
                ctx.moveTo(10,35);
                ctx.lineTo(25,50);
                ctx.lineTo(55,20);
                ctx.lineWidth = 10;
                ctx.stroke();
            }
            
            
        }
    }
}

</script>
