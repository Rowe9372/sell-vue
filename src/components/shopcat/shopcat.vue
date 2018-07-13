<template>
	<div class="shopcat">
		<div  class="cont-left">
			<div class="cat-wrap">
				<div class="outer-ring">
					<div class="inner-ring" :class="{'highlight' : totalCount > 0}">
						<span class="icon-shopping_cart"></span>
					</div>
					<div class="count" v-show="totalCount > 0">
						<span class="num">{{ totalCount }}</span>
					</div>
				</div>				
			</div>
			<div class="price">
				<span class="price-total" :class="{'highlight': totalPrice > 0}">
					¥ <i>{{ totalPrice }}</i>
				</span>
				<span class="price-delivery">
					另需配送费 ¥ <i>{{ deliveryPrice }}</i>
				</span>
			</div>
		</div>
		<div class="cont-right" :class="{'highlight': upToSendClass}">
			<p class="text">{{upToSend}}</p>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [
						{
							count: 3,
							price: 10
						}
					]
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		computed: {
			totalCount() {
				let count = 0
				this.selectFoods.forEach((food) => {
					count += food.count
				})
				return count
			},
			totalPrice() {
				let price = 0
				this.selectFoods.forEach((food) => {
					price += food.price * food.count
				})
				return price
			},
			upToSend() {
				if (this.totalPrice === 0) {
					return `¥ ${this.minPrice}起送`
				} else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
					let less = this.minPrice - this.totalPrice
					return `还差¥ ${less}起送`
				} else {
					return '去结算'
				}
			},
			upToSendClass() {
				if (this.totalPrice < this.minPrice) {
					return false
				} else {
					return true
				}
			}
		}
	}
</script>

<style lang='scss' style="text/scss">
@import '../../common/scss/base';
@import '../../common/scss/mixin';
	.shopcat {
		position: fixed;
		bottom: 0;
		left: 0;
		height: (96rem/30);
		width: 100%;
		background-color: #141d27;
		display: flex;
		.cont-left {
			flex: 1;
			display: flex;
			.cat-wrap {
				flex: 0 0 (160rem/30);
				width: (160rem/30);
				.outer-ring {
					position: relative;
					width: (112rem/30);
					height: (112rem/30);
					background-color: #141d27;
					margin-top: -(24rem/30);
					margin-left: (24rem/30);
					border-radius: 50%;
					.inner-ring {
						width: (88rem/30);
						height: (88rem/30);
						position: relative;
						top: (12rem/30);
						left: (12rem/30);
						background-color: #2b343c;
						border-radius: 50%;
						text-align: center;
						.icon-shopping_cart {
							display: inline-block;
							line-height: (88rem/30);
							font-size: (48rem/30);
							color: #80858a;
						}
						&.highlight {
							background-color: #00a0dc;
							.icon-shopping_cart {
								color: #fff;
							}
						}
					}
					.count {
						position: absolute;
						top: 0;
						right: 0;
						width: (48rem/30);
						height: (32rem/30);
						border-radius: (20px);
						background-color: #f01414;
						color: #fff;
						font-size: (18rem/30);	
						line-height: (32rem/30);
						text-align: center;
						box-shadow: 0 (4rem/30) (8rem/30) 0 rgba(0,0,0,.4);
						.num {
							font-weight: 700;						
						}
					}
				}
			}
			.price {
				flex: 1;
				padding: (24rem/30) 0;
				font-size: 0;
				.price-total {
					display: inline-block;
					font-size: (32rem/30);
					font-weight: 700;
					color: rgba(255,255,255,.4);
					line-height: (48rem/30);
					padding-right: (24rem/30);
					border-right: 1px solid rgba(255,255,255,.2);
					vertical-align: top;
					&.highlight {
						color: #fff;
					}
				}
				.price-delivery {
					display: inline-block;
					font-size: (20rem/30);
					font-weight: 200;
					margin-left: (24rem/30);
					color: rgba(255,255,255,.4);
					line-height: (48rem/30);
				}
			}
		}
		.cont-right {
			flex: 0 0 (210rem/30);
			width: (210rem/30);
			padding: (24rem/30) (16rem/30);
			box-sizing: border-box;
			background-color: #2b333b;
			&.highlight {
				background-color: #00b43c;
				.text {
					color: #fff;
				}
			}
			.text {
				font-size: (24rem/30);
				color: rgba(255,255,255,.4);
				font-weight: 700;
				line-height: (48rem/30);
				text-align: center;
			}
		}
		
	}
</style>
