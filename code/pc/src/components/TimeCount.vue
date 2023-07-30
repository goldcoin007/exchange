<template>
    <span>
        {{state}}
    </span>
</template>

<script>

export default {
    props: {
        // 倒计时开始时间
        startTime: {
            type: Number,
            default: null,
        },
        isAuto : {
            type : Boolean,
            default : false,
        }
    },
    
    data() {
        return {
            state: '',
            timer:null
        };
    },
    watch:{
        startTime(n,o){
            if(n&&this.isAuto){
                this.handle()
            }
        }
    },
    methods: {
        fillZero (num) {
            if (parseInt(num) < 10) return `0${num}`;
            else return num;
        },

        formatTime(ret) {
            let sec = this.fillZero(ret % 60);
            let min = this.fillZero(Math.floor(ret/60));
            return `${min}:${sec}`
        },
        
        handle: function () {
            // 开始倒计时
            clearInterval(this.timer);
            this.timer = utils.curryTimeTD(ret => { // 倒计时过程中
                this.state = this.formatTime(ret);
            }, this.startTime)(() => { // 倒计时完成
                this.state = `00:00`;
                // 停止倒计时
                clearInterval(this.timer);
                this.$emit('end')
            });
        },
    },
    created(){
        if(this.startTime&&this.isAuto){
            this.handle()
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
