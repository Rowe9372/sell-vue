<template>
<div class="shopcat-wrap">
	<div class="shopcat">
		<div class="shopcat-content" @click="toggleList">
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
			<div class="cont-right" :class="{'highlight': upToSendClass}" @click.stop="pay">
				<p class="text">{{upToSend}}</p>
			</div>
		</div>
		
		<!-- ball animation -->
 		<div class="ball-container">
            <div v-for="ball in balls" :key="ball.id">
                <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                    <div v-show="ball.show" class="ball">
                        <div class="inner innerHook"></div>
                    </div>
                </transition>
            </div> 
        </div>

        <!-- shopping cat list -->
        <transition name="slide">
        	<div class="shopcat-list" v-show="listShow">
	        	<div class="list-header">
	        		<h3 class="title">购物车{{listShow}}</h3>
	        		<span class="empty-all" @click="empty">清空</span>
	        	</div>
	        	<div class="list-cont" ref="listCont">
	        		<ul>
	        			<li class="list-item" v-for="food in selectFoods" :key="food.id">
	        				<div class="food-name">
	        					<p>{{ food.name }}</p>
	        				</div>
	        				<div class="cat-control">
	        					<catcontrol :food="food"></catcontrol>
	        				</div>
	        				<div class="price">
	        					<span class="rmb">¥</span> <span>{{ food.price*food.count }}</span>
	        				</div>
	        			</li>
	        		</ul>
	        	</div>
	        </div>
        </transition> 
	</div>
	<!-- background mask -->
	<transition name="bgslide">
		<div class="list-mask" v-show="listShow" @click="listHide"></div>
	</transition>
   
</div>

</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import catcontrol from '../catcontrol/catcontrol'
	export default {
		data() {
			return {
				balls: [
					{show: false},
					{show: false},
					{show: false},
					{show: false},
					{show: false}
				],
				dropBall: [],
				fold: true
			}
		},
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [
						{
							count: 0,
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
			},
			listShow() {
				if (!this.totalCount) {
					return false
				}
				let show = !this.fold
				return show				    
			} 
		},
		methods: {
			toggleList() {
				if (!this.totalCount) {
					return
				}
				this.fold = !this.fold
				this.$nextTick(() => {
					if (!this.shopcatList) {
						this.shopcatList = new BScroll(this.$refs.listCont, {
							click: true
						})
					} else {
						this.shopcatList.refresh()
					}
				})
			},
			empty() {
				this.selectFoods.forEach((food) => {
					food.count = 0
				})
				this.fold = true
			},
			listHide() {
				this.fold = true
			},
			pay() {
				// 当合计价格少于起送价格不执行支付
				if (this.totalPrice < this.minPrice) {
					return
				}
				window.alert(`共需支付 ${this.totalPrice}`)
			},
			drop(el) {
				/* 父组件传过来的目标元素 */ 
				// console.log(el)
				for (let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i]
					if (!ball.show) {
						ball.show = true
						ball.el = el
						this.dropBall.push(ball)
						return
					}
				}
			},
			beforeEnter(el) { 
                let count = this.balls.length
                while (count--) {
                    let ball = this.balls[count]
                    if (ball.show) { 
                    	// 这个是要运动的小球true
                        let rect = ball.el.getBoundingClientRect()
                        // 获得元素相当于视口的位置
                        let x = rect.left - 64
                        let y = -(window.innerHeight - rect.top - 48)
                        el.style.display = ''
                        // v-show默认display：none，设置为空，让它显示
                        // 外层元素是纵向的动画，内层元素是横向的动画
                        el.style.webkitTransform = `translate3d(0,${y}px,0)`
                        el.style.transform = `translate3d(0,${y}px,0)`
                        let inner = el.getElementsByClassName('innerHook')[0]
                        inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
                        inner.style.transform = `translate3d(${x}px, 0, 0)`
                    }
            	}
        	},
			enter(el, done) {
				/* 触发浏览器重绘，重绘之后才可以设置transform */
				/* eslint-disable no-unused-vars */
				let rf = el.offsetHeight
                this.$nextTick(() => { 
                	// 样式重置
                    el.style.webKitTransform = 'translate3d(0,0,0)'
                    el.style.transform = 'translate3d(0,0,0)'
                    let inner = el.getElementsByClassName('innerHook')[0]
                    inner.style.webkitTransform = 'translate3d(0,0,0)'
                    inner.style.transform = 'translate3d(0,0,0)'
                    el.addEventListener('transitionend', done)
                })
			},
			afterEnter(el) {
				let ball = this.dropBall.shift()
				if (ball) {
					ball.show = false
					el.style.display = 'none'
				}
			}
		},
		components: {
			catcontrol
		}
	}
</script>

<style lang='scss' style="text/scss">
@import '../../common/scss/base';
@import '../../common/scss/mixin';

.shopcat-wrap {
	.shopcat {
		position: fixed;
		bottom: 0;
		left: 0;
		height: (96rem/30);
		width: 100%;
		z-index: 12;	
		.shopcat-content {
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
		.ball-container {
			.ball {
				position: fixed;
				left: (64rem/30);
				bottom: (48rem/30);
				width: (32rem/30);
				height: (32rem/30);
				z-index: 200;
				transition: all .4s cubic-bezier(.49, -.29, .75, .41);
				.inner {
					width: (32rem/30);
					height: (32rem/30);
					border-radius: 50%;
					background-color: rgb(0,160,220);
					transition: all .4s linear;	
				}
			}
		}
		.shopcat-list {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			z-index: -1;
			transform: translateY(-100%);
			&.slide-enter-active,&.slide-leave-active {
				transition: all .4s;
			}
			&.slide-enter,&.slide-leave-to {
				transform: translateY(0);
			}
			.list-header {
				width: 100%;
				height: (80rem/30);
				background-color: #f3f5f7;
				border-bottom: 2px solid rgba(7,17,27,.1);
				padding: 0 (36rem/30);
				box-sizing: border-box;
				.title {
					font-size: (28rem/30);
					font-weight: 200;
					color: rgb(7,17,27);
					line-height: (78rem/30);
					float: left;
				}
				.empty-all {
					display: inline-block;
					float: right;
					font-size: (24rem/30);
					color: rgb(0,160,220);
					line-height: (78rem/30);
				}
			}
			.list-cont {
				width: 100%;
				max-height: (435rem/30);
				padding: 0 (36rem/30);
				overflow: hidden;
				background-color: #fff;
				box-sizing: border-box;
				.list-item {
					width: 100%;
					height: (96rem/30);
					padding: (24rem/30) 0;
					box-sizing: border-box;
					@include border-bottom-1px(rgba(1,17,27,.1));
					.food-name {
						font-size: (28rem/30);
						color: rgb(7,17,27);
						line-height: (48rem/30);
						float: left;
					}
					.price {
						float: right;
						font-size: (28rem/30);
						font-weight: 700;
						color: rgb(240,20,20);
						line-height: (48rem/30);
						margin-left: (36rem/30);
						margin-right: (24rem/30);
						.rmb {
							font-size: (20rem/30);
							font-weight: normal;
						}
					}
					.cat-control {
						float: right;
					}
				}
			}
		}
	}
	.list-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10;
		background-color: rgba(7,17,27,.6);
		&.bgslide-enter-active, &.bgslide-leave-active {
			transition: all .4s;
		}
		&.bgslide-enter, &.bgslide-leave-to {
			opacity: 0;
		}

	}
}
	
</style>
