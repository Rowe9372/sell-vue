<template>
	<transition name="detail-slide">
		<div class="food-detail" v-show="detailShow">
			<div class="detail-cont">
				<div class="img-wrap">
					<img :src="food.image" alt="">
					<div class="goback">
						<i class="icon-arrow_lift" @click="goback"></i>
					</div>
				</div>
				<div class="base-msg">
					<h2 class="food-name">{{food.name}}</h2>
					<div class="seller-status">
						<span class="sellCount">月销售{{food.sellCount}}份</span>
						<span>好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="now-price"><b class="rmb">¥</b>{{food.price}}</span>
						<del v-show="food.oldPrice" class="oldPrice"><b class="rmb">¥</b>{{food.oldPrice}}</del>
					</div>
				</div>
			</div>
		</div>
	</transition>
	
</template>

<script type="ecmascript-6">
	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				detailShow: false
			}
		},
		methods: {
			show() {
				this.detailShow = true
			},
			goback() {
				this.detailShow = false
			}
		}
	}
</script>

<style lang="scss">
@import '../../common/scss/base';
@import '../../common/scss/mixin';

.food-detail {
	position: fixed;
	top: 0;
	left: 0;
	bottom: (96rem/30);
	overflow: auto;
	background-color: #fff;
	width: 100%;
	&.detail-slide-enter-active, &.detail-slide-leave-active {
		transition: all .4s;
	}
	&.detail-slide-enter, &.detail-slide-leave-to {
		transform: translateX(100%);
	}
	.detail-cont {
		width: 100%;
		.img-wrap {
			positon: relative;
			width: 100%;
			height: 0;
			padding-top: 100%;
			img {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				// height: 100%;
			}
			.goback {
				position: absolute;
				top: (20rem/30);
				.icon-arrow_lift {
					color: #fff;
					font-size: (24rem/30);
					display: block;
					padding: 0 (20rem/30);
				}
			}
		}
		.base-msg {
			width: 100%;
			padding: (36rem/30);
			box-sizing: border-box;
			.food-name {
				font-size: (28rem/30);
				font-weight: 700;
				color: rgb(7,17,27);
				line-height: (28rem/30);
			}
			.seller-status {
				margin-top: (16rem/30);
				font-size: (20rem/30);
				color: rgb(147,153,159);
				.sellCount {
					margin-right: (24rem/30);
				}
			}
			.price {									
				line-height: (48rem/30);
				.now-price {
					display: inline-block;
					font-size: (28rem/30);
					font-weight: 700;
					color: #f01414;
					.rmb {
						font-size: (20rem/30);
						font-weight: normal;
					}
				}
				.oldPrice {
					display: inline-block;
					font-size: (20rem/30);
					color: rgb(147,153,159);
					font-weight: 700;
					.rmb {
						font-size: (20rem/30);
						font-weight: normal;
					}
				}
			}
		}
	}
}
</style>
