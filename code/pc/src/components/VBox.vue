<template>
<!-- 模块样式 -->
<div  v-if="value" :class="[hook, {'v-box--simple' : simple}, `v-box`]">
    <div class="v-box__mask" :style="{opacity}"></div>
    <div class="v-box__container" :style="{width: `${width}px`}">
        <!-- 主题样式 -->
        <header class="v-box__title" :class="movable ? `v-box--move` : `v-box--normal`">
            <em class="v-box__name">{{ title }}</em>
            <i :class="[`v-box__icon`, {'v-box--close-hide' : hideclose}]" @click.stop="handleClose($event)"></i>
        </header>
        <div class="v-box__content">
            <slot></slot>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        width: {
            type: Number,
            default: 400
        },

        value: {
            type: Boolean,
            default: false
        },

        opacity: {
            type: Number,
            default: 0.7
        },

        title: {
            type: String,
            default: `System Tips`
        },

        // 盒子是否可移动
        movable: {
            type: Boolean,
            default: true,
        },

        // 关闭按钮
        hideclose: {
            type: Boolean,
            default: false,
        },

        load: {
            type: Function,
            default: null,
        },

        close: {
            type: Function,
            default: null,
        },

        hook: {
            type: String,
            default: ``,
        },

        // 简洁模式 - 去除标题
        simple: {
            type: Boolean,
            default: false,
        }
    },

    watch: {
        // 控制滚动条的加载 - overflow属性
        value(theNew, theOld) {
            // debugger;
            let overstep = theNew ? 'hidden' : 'auto';
            document.body.style.overflow = overstep;
        }
    },

    methods: {

        handleClose($event) {
            // 触发父组件的回调动作
            if (!this.hideclose) {
                // 发布到父组件关闭弹框
                this.$emit('input', false);
                if (this.close) this.close(this); // close方法
                else this.$emit('onclose', this); // close事件
            }
        }

    },
    created(){
          if (this.before) this.before(); // before方法
        else this.$emit('onbefore', this); // before事件
    },
    // 组件加载完毕的回调动作
    mounted() {
        if (this.load) this.load(this); // load方法
        else this.$emit('onload', this); // load事件
    },

    updated() {
        // 当盒子从无到有 并且可点击时 绑定事件
        if (this.value && this.movable) {

            const v_box = document.querySelector('.v-box__container'),
                v_title = v_box.querySelector('.v-box__title');

            // 绑定拖拽事件，box代理title的事件
            const me = this;

            v_box.onmousedown = function (event) {

                // 只在title上触发，拒绝其他冒泡
                if (v_title && event.target != v_title) return;

                //初始化 鼠标相对盒子的坐标
                const evt = window.event || event;
                const relPos = {
                    x: evt.offsetX,
                    y: evt.offsetY
                };

                //计算盒子在页面中移动的区域
                const area = {
                    maxL: document.documentElement.clientWidth - me.width,
                    maxT: document.documentElement.clientHeight - me.height
                };

                document.onmousemove = function (event) {

                    // "use strict";
                    // 盒子始终和鼠标保持同样的相对坐标
                    // 现获取鼠标在页面中的绝对坐标值
                    const evt = window.event || event;
                    let mx = evt.clientX - relPos.x,
                        my = evt.clientY - relPos.y;

                    //判断临界条件
                    if (mx < 0) mx = 0;
                    else if (mx > area.maxL) mx = area.maxL;

                    if (my < 0) my = 0;
                    else if (my > area.maxT) my = area.maxT;

                    //让盒子移动到该位置，加上之前居中减少的尺寸
                    v_box.style.left = `${mx + v_box.offsetWidth / 2}px`;
                    v_box.style.top = `${my + v_box.offsetHeight / 2}px`;
                };
            };

            v_box.onmouseup = function () {
                document.onmousemove = null;
            };
        }
    },

    // 盒子关闭后 销毁DOM时 回调动作
    destroyed() {

    }
};
</script>

<style lang="scss" scoped>
/* @height : `document.documentElement.clientHeight`; */

.v-box {

    width: 100%;
    height: 100%;

    // 固定在页面上方
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2001; // element蒙层权重为2000 需要比它大

    // 去除页面滚动条
    overflow: hidden;

    .v-box__mask {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 100;
        // 遮罩层背景色
        background: #000;
    }

    .v-box__container {

        background: #141e2c;
        border-radius: 4px;
        overflow: hidden; // 解决圆角益处的问题

        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

        // 盒子居中显示
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%); // 减去自身尺寸的50%
        z-index: 1000;

        .v-box__title {
            height: 52px;
            padding: 15px;
            border-bottom: 1px solid #4e4e5d;
            // border-radius: 10px 10px 0px 0px;

            @include flexible(row);

            // 主轴方向两端对齐
            justify-content: space-between;

            .v-box__name {
                // width: 196px;
                height: 22px;
                @include font(Metropolis-Bold, 18, 22);
            }

            .v-box__icon {
                width: 18px;
                height: 18px;
                background: url("../assets/img/icon-close.svg") no-repeat center center;
                cursor: pointer;
            }
        }

        .v-box__content {
            @include font($face, 14, 16);
            padding: 14px;
        }

    }
}

// 模块样式
.v-box--simple {
    .v-box__title {
        display: none !important;
    }
}

// 状态样式
.v-box--move {
    cursor: move;
}

.v-box--normal {
    cursor: default;
}

.v-box--close-hide {
    display: none;
}
</style>
