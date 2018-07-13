<template>
	<div class="goods">
	<!-- let meau -->
		<div class="meau-wrap" ref="meauWrap">
			<ul class="meau-all">
				<li v-for="(good, index) in goods" :key="good.id" @click="selectMenu(index)" class="meau-item border-1px" :class="{'current': currentIndex===index}">
					<span class="meau-name">
						<i v-show="good.type > 0" class="icon" :class="classMap[good.type]"></i> 
						{{good.name}}
					</span>
				</li>
			</ul>
		</div>
		<!-- right foods -->
		<div class="foods-wrap" ref="foodsWrap">
			<ul class="foods-all">
				<li v-for="good in goods" class="foods-class foodsHook" :key="good.id">
					<h2 class="foods-class-name">{{good.name}}</h2>
					<ul class="foods-list">
						<li v-for="food in good.foods" class="foods-item" :key="food.id">
							<div class="food-icon">
								<img :src="food.icon" alt="" class="img">
							</div>
							<div class="food-msg">
								<h3 class="food-name">{{food.name}}</h3>
								<p v-show="food.description" class="food-description">{{food.description}}</p>
								<div class="seller-status">
									<span class="sellCount">月销售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now-price"><b class="rmb">¥</b>{{food.price}}</span>
									<del v-show="food.oldPrice" class="oldPrice"><b class="rmb">¥</b>{{food.oldPrice}}</del>
								</div>
								<!-- cat control -->
								<div class="catcontrol-wrap">
									<catcontrol :food="food"></catcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		    <!-- shopping cat -->
   		 <shopcat :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcat>

	</div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import shopcat from '../shopcat/shopcat'
import catcontrol from '../catcontrol/catcontrol'

const ERR_OK = 0
export default {
	props: {
		seller: {
			type: Object
		}
	},
	data() {
		return {
			goods: [],
			listHeight: [],
			scrollY: 0
		}
	},
	computed: {
		currentIndex() {
			for (let i = 0; i < this.listHeight.length; i++) {
				let height1 = this.listHeight[i]
				let height2 = this.listHeight[i + 1]
				if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
					return i
				}
			}
			return 0
		},
		selectFoods() {
			let foods = []
			this.goods.forEach((good) => {
				good.foods.forEach((food) => {
					if (food.count) {
						foods.push(food)
					}
				})
			})
			return foods
		}
	},
	created() {
		this.$http.get('./api/goods').then(response => {
			response = response.body
			if (response.errno === ERR_OK) {
				this.goods = response.data
				console.log(this.goods)
				/* this.$nextTick 异步函数，为了确保 DOM 已经渲染 */ 
				this.$nextTick(() => {
					this.initScroll()
					this.calculateHeight()
				})
			}
		}, response => {

		})

		this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
	},
	methods: {
		initScroll() {
			this.meauWrap = new BScroll(this.$refs.meauWrap, {
				click: true /* scroll 中设置点击事件true 否则点击事件无效 */
			})

			this.foodsWrap = new BScroll(this.$refs.foodsWrap, {
				click: true,
				probeType: 3
			})
			/* 监听scroll */
			this.foodsWrap.on('scroll', (pos) => {
				/* 获取滚动的实时坐标 */
				this.scrollY = Math.abs(Math.round(pos.y))
			}) 
		},
		calculateHeight() {
			/* 获取DOM元素 */ 
			let foodsClass = this.$refs.foodsWrap.getElementsByClassName('foodsHook')
			let height = 0
			this.listHeight.push(height)
			for (let i = 0; i < foodsClass.length; i++) {
				let item = foodsClass[i]
				height += item.clientHeight
				this.listHeight.push(height)
			}
		},
		selectMenu(index) {
			/* 排除浏览器点击, 浏览器没有constructed属性 */ 
			/* if (!event.constructed) {
				return 
			} */
			console.log(index)

			let foodsClass = this.$refs.foodsWrap.getElementsByClassName('foodsHook')
			let el = foodsClass[index]
			/* scroll 方法滑动到指定元素 */
			this.foodsWrap.scrollToElement(el, 300)
		}
	},
	components: {
		shopcat,
		catcontrol
	}
}
</script>

<style lang="scss" type="text/scss">
@import "../../common/scss/base";
@import "../../common/scss/mixin";

.goods {
	display: flex;
	position: absolute;
	top: (348rem/30);
	bottom: (96rem/30);
	width: 100%;
	overflow: hidden;
	.meau-wrap {
		flex: 0 0 (160rem/30);
		width: (160rem/30);
		background-color: #f3f5f7;
		.meau-all {
			width: (160rem/30);
			.meau-item {
				display: table;
				height: (108rem/30);
				width: 100%;
				font-size: (24rem/30);
				color: #07111b;
				font-weight: 200;
				vertical-align: middle;
				line-height: (28rem/30);
				padding: 0 (24rem/30);
				box-sizing: border-box;
				@include border-bottom-1px(rgba(7,17,27,.1));
				&:last-child {
					@include border-none;
				}
				&.current {
					position: relative;
					margin-top: -1px;
					background-color: #fff;
					.meau-name {
						font-weight: bold;
					}
				}		
				.meau-name {
					display: table-cell;
					width: 100%;
					vertical-align: middle;
					.icon {
						display: inline-block;
						width: (24rem/30);
						height: (24rem/30);
						vertical-align: top;
						background-size: contain;
						background-repeat: no-rapeat;
						&.decrease {
							@include bg-img('decrease_3');
						}
						&.discount {
							@include bg-img('discount_3');
						}
						&.guarantee {
							@include bg-img('guarantee_3');
						}
						&.invoice {
							@include bg-img('invoice_3');
						}
						&.special {
							@include bg-img('special_3');
						}
					}
				}
			}
		}
	}
	.foods-wrap {
		flex: 1;
		.foods-all {
			width: 100%;
			box-sizing: border-box;
			.foods-class {
				width: 100%;
				.foods-class-name {
					font-size: (24rem/30);
					color: rgb(147,153,159);
					line-height: (52rem/30);
					background-color: #f3f5f7;
					border-left: 2px solid #d9dde1;
					padding-left: (28rem/30);
					box-sizing: border-box;
				}
				.foods-list {
					width: 100%;
					padding-left: (36rem/30);
					padding-right: (36rem/30);			
					box-sizing: border-box;
				}
				.foods-item {
					display: flex;
					padding-top: (36rem/30);				
					padding-bottom: (36rem/30);
					@include border-bottom-1px(rgba(7,17,27,.1));
					&:last-child {
						@include border-none;
					}
					.food-icon {
						flex: 0 0 (114rem/30);
						margin-right: (20rem/30);
						.img {
							width: 100%;
						}
					}
					.food-msg {
						flex: 1;
						position: relative;
						.food-name {
							font-size: (28rem/30);
							color: rgb(7,17,27);
							line-height: (28rem/30);
							margin-top: (4rem/30);
						}
						.food-description,.seller-status {
							font-size: (20rem/30);
							line-height: (20rem/30);
							color: rgb(147,153,159);
							margin-top: (16rem/30);
						}
						.seller-status {
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
						.catcontrol-wrap {
							position: absolute;
							bottom: 0;
							right: 0;
						}
					} 
				}
			}
		}

	}
}
</style>
