<template>
	<div class="catcontrol">
		<transition name="silde-fade">
			<span class="cat-decrease span icon-remove_circle_outline" @click.stop="decrease" v-show="food.count > 0"></span>
		</transition>
		<transition name="silde-fade">
			<span class="cat-count span" v-show="food.count > 0">{{food.count}}</span>
		</transition>
		<span class="cat-add span icon-add_circle" @click.stop="add"></span>
	</div>
</template>

<script style="text/ecmascript-6">
import Vue from 'vue'
	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			add(event) {
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1)
				} else {
					this.food.count++
					console.log(this.food.count)
				}
			// 设置滚动对象时，点击加号，设置一个派发事件，将DOM对象传出去,将target（DOM）作为cart.add事件的对象传入
			// $emit, $on, $off 分别来分发、监听、取消监听事件：
				this.$emit('cat-add', event.target)
			},
			decrease() {
				this.food.count--
			}
		}
	}
</script>

<style lang="scss">
	.catcontrol {
		font-size: 0;
		overflow: hidden;
		.span {
			display: inline-block;
			vertical-align: top;
			font-size: (48rem/30);
			line-height: (48rem/30);
			color: rgb(0,160,220);
		}
		.cat-count {
			font-size: (24rem/30);
			width: (48rem/30);
			text-align: center;
			color: rgb(147,153,159);
			&.slide-fade-enter-active, &.silde-fade-leave-active {
				transition: all .4s linear;
			}
			&.slide-fade-enter, &.silde-fade-leave-to {
				opacity: 0;
				transform: translateX(48px);	
			}
		}
		.cat-decrease {
			&.slide-fade-enter-active, &.silde-fade-leave-active {
				transition: all .4s linear;
			}
			&.slide-fade-enter, &.silde-fade-leave-to {
				transform: translateX(96px) rotate(360deg);
				opacity: 0;		
			}
		}
	}
</style>
