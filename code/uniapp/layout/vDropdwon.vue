<template>
	<view>
		<view @click="showShadow" class="dropWrap p-x-ms d-flex justify-between align-center fn-bold">
            <view class="" v-if="contract==0">
                {{ text }}
            </view>
            <view class="" v-else>
                {{ text }}X
            </view>
            <view class="sanjiao"></view></view>
		<view class="dropdown">
			<view :class="showIf ? 'dropdown-mask' : 'undropdown-mask'" @click="hideShadow"></view>
			<!-- <view class="ul" :style="showIf?'height:'+list.length*30+'px':''"> --> 
			<view class="ul" :style="'--i:'+list.length" :class="showIf?'show':''">  <!-- 不支持就用上面那种 -->
				<view class="li p-x-md" :class="text==item.label?'active':''" v-for="(item, index) in list" :key="index" @click="handlerItem(item,index)">
                    
                    <view class="" v-if="contract==0">
                        {{item.label}}
                    </view>
                    <view class="" v-else>
                        {{item.label}}X
                    </view>
                </view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'dropdown',
	props: {
		list: {
			type: Array,
			default: () => []
		},
		current: {
			type: [String, Number],
			default: 0
		},
       contract: {
       	type:  String,
       	default: ''
       }
	},
	data() {
		return {
			showIf: false,
            text:'',
            active:2
		};
	},
	methods: {
		handlerItem(value,index) {
			this.showIf = false
            this.text=this.list[index].label
			this.$emit('onClick', value);
		},
		hideShadow() {
			this.showIf = false;
		},
		showShadow() {
			this.showIf = true;
		}
	},
    mounted() {
        if(this.contract==1&&this.list){
            this.text=this.list[2].label
        }else if(this.contract==0&&this.list){
            this.text=this.list[0].label 
        }
    }
};
</script>

<style scoped lang="scss">
.dropWrap {
	box-sizing: border-box;
	width: 100%;
	height: 26px;
	// border: 1px solid #e8ecef;
	font-size: 12px;
	color: $light;
	padding: 4px 8px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.sanjiao{
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right:5px solid transparent;
		border-top:5px solid $light;
		border-bottom:5px solid transparent;
		transform: translateY(3px);
	}
}
.dropdown {
	position: absolute;
    width: 100%;
	z-index: 100;
	.ul {
		width: 100%;
		position: relative;
		z-index: 101;
		list-style: none;
		border-radius: 4rpx;
        background-color:$panel-4;
		padding-left: 0;
		box-shadow: 6rpx 6rpx 10rpx rgba(122, 122, 122, 0.2);
		transition: all 0.2s;
		height: 0;
		overflow: hidden;
		.li {
			box-sizing: border-box;
			color: $light;
			height: 30px;
			border-bottom: 1px solid $panel-4;
			font-size: 24rpx;
			line-height: 30px;              //与下面的高度保持一致
            white-space:nowrap;
            text-overflow:ellipsis;
            overflow: hidden;
		}
		.li:last-child {
			border-bottom: none;
		}
	}
	.show {
		height: calc( var(--i) * 30px );   //与上面的高度保持一致
	}
	.dropdown-mask {
		top: 0;
		left: 0;
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: 100;
		pointer-events: auto;
	}
	.undropdown-mask {
		pointer-events: none;
	}
}
.active{
    background-color:  $panel-2;
    color: $theme-1!important;
}
</style>
