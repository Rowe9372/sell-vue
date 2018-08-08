<template>
	<transition name="detail-slide">
		<div class="food-detail" v-show="detailShow" ref="detailScroll">
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
					<div class="join">
						<transition name="joinFade">
							<span class="join-cat" v-show="!food.count | food.count === 0" @click="addCat">加入购物车</span>
						</transition>
						<catcontrol :food="food" v-show="food.count > 0"></catcontrol>
					</div>
				</div>
				<div class="split-line">
					
				</div>
				<div class="food-info">
					<h3 class="title">商品介绍</h3>
					<p class="text">{{food.info}}</p>
				</div>
				<div class="split-line">
					
				</div>
				<div class="rating">
					<div class="filtrate">
						<h3 class="title">商品评价</h3>
						<ratingselect @choseType="chose" :ratings="food.ratings" :ratingType="ratingType" :onlyContent="onlyContent" :typeName="typeName"></ratingselect>
					</div>
					<div class="rating-wrap">
						<ul class="rating-list" v-show="food.ratings && food.ratings.length">
							<li class="rating-item" v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" :key="rating.id">
								<div class="user">
									<div class="rating-time">{{rating.rateTime | formatDate}}</div>
									<div class="user-msg">
										<span class="user-name">{{rating.username}}</span>
										<img class="user-avatar" :src="rating.avatar" alt="">
									</div>
								</div>
								<p class="reting-text">
									<i :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></i>
									{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !food.ratings.length">
							<p>暂无评价</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
	
</template>

<script type="ecmascript-6">
import Vue from 'vue'
import BScroll from 'better-scroll'
import {formatDate} from '../../common/js/date'
import catcontrol from '../catcontrol/catcontrol'
import ratingselect from '../ratingselect/ratingselect'

// const POSITIVE = 0
// const NAGATIVE = 1
const ALL = 2

	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				detailShow: false,
				// 评价参数
				ratingType: ALL,
				onlyContent: true,
				typeName: {
					all: '全部',
					positive: '推荐',
					nagative: '吐槽'
				}
			}
		},
		methods: {
			show() {
				this.detailShow = true
				this.ratingType = ALL
				this.onlyContent = true
				this.$nextTick(() => {
					if (!this.detailScroll) {
						this.detailScroll = new BScroll(this.$refs.detailScroll, {
							click: true
						})
					} else {
						this.detailScroll.refresh()
					}
				})
			},
			goback() {
				this.detailShow = false
			},
			addCat() {
				Vue.set(this.food, 'count', 1)
				this.$emit('cat-add', event.target)
			},
			// 父组件接受查看rating类型
			chose(parameters) {
				// console.log(typeof parameters)
				// ES6 语法typeof 的使用方法 类型比较应该是字符串字面量 一元字操作符的类型必须是空格 typeof parameters
				if (typeof parameters === 'number') {
					this.ratingType = parameters
				} else if (typeof parameters === 'boolean') {
					this.onlyContent = parameters
				}
			},
			needShow(typ, cont) {
				// onlyContent 为true 并且cont有内容 否则不显示
				if (this.onlyContent && !cont) {
					return false
				}
				if (this.ratingType === ALL) {
					return true
				} else {
					return typ === this.ratingType
				}
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM-dd hh:mm')
			}
		},
		components: {
			catcontrol,
			ratingselect
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
			position: relative;
			width: 100%;
			height: 0;  // 定位height=0 相当于 height=width
			padding-top: 100%;
			font-size: 0;
			img {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
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
			position: relative;
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
			.join {
				position: absolute;
				right: (36rem/30);
				bottom: (36rem/30);
				width: (148rem/30);
				height: (48rem/30);
				.join-cat {
					display: inline-block;
					width: 100%;
					height: 100%;
					font-size: (20rem/30);
					color: rgb(255,255,255);
					line-height: (48rem/30);
					text-align: center;
					background-color: rgb(0,160,220);
					border-radius: 24px;
					// &.joinFade-enter-active, &.joinFade-leave-active {
					// 	transition: all .4s;
					// }
					// &.joinFade-enter, &.joinFade-leave-to {
					// 	opacity: 0;
					// }
				}
			}
		}
		.split-line {
			width: 100%;
			height: (32rem/30);
			background-color: #f3f5f7;
			border-top: 1px solid  rgba(7,17,27,.1);
			border-bottom: 1px solid  rgba(7,17,27,.1);
			box-sizing: border-box;
		}
		.food-info {
			width: 100%;
			padding: (36rem/30);
			box-sizing: border-box;
			.title {
				font-size: (28rem/30);
				font-weight: 200;
				color: rgb(7,17,27);
				line-height: (28rem/30);
			}
			.text {
				margin-top: (12rem/30);
				font-size: (24rem/30);
				font-weight: 200;
				color: rgb(77,85,93);
				line-height: (48rem/30);
				padding: 0 (16rem/30);
				box-sizing: border-box;
			}
		}
		.rating {
			width: 100%;
			.filtrate {
				padding: 0 (36rem/30);
				font-sizing: border-box;
				box-sizing: border-box;
				@include border-bottom-1px(rgba(7,17,27,.1));
			}
			.title {
				padding-top: (36rem/30);
				font-size: (28rem/30);
				font-weight: 200;
				color: rgb(7,17,27);
				line-height: (28rem/30);
			}
			.rating-wrap {
				width: 100%;
				.rating-list {
					width: 100%;
					padding: 0 (36rem/30);
					box-sizing: border-box;
					.rating-item {
						width: 100%;
						padding: (32rem/30) 0;
						@include border-bottom-1px(rgba(7,17,27,.1));
						.user {
							display: flex;
							justify-content: space-between;
							.rating-time {
								flex: 1;
								font-size: (20rem/30);
								color: rgb(147,153,159);
								line-height: (24rem/30);
							}
							.user-msg {
								flex: 1;
								text-align: right;
								font-size: 0;
								.user-name {
									display: inline-block;
									font-size: (20rem/30);
									color: rgb(147,153,159);
									line-height: (24rem/30);
								}
								.user-avatar {
									display: inline-block;
									width: (24rem/30);
									height: (24rem/30);
									border-radius: 50%;
									vertical-align: top;
									margin-left: (12rem/30);
								}
							}
						}
						.reting-text {
							font-size: (24rem/30);
							color: rgb(7,17,27);
							line-height: (32rem/30);
							.icon-thumb_up {
								display: inline-block;
								color: rgb(0,160,220);
								line-height: (48rem/30);
								vertical-align: middle;
							}
							.icon-thumb_down {
								display: inline-block;
								color: rgb(147,153,159);
								line-height: (48rem/30);
								vertical-align: middle;
							}
						}
					}
				}
				.no-rating {
					width: 100%;
					padding: (36rem/30);
					box-sizing: border-box;
					font-size: (20rem/30);
					color: rgb(147,153,159);
					line-height: (24rem/30); 
				}
			}
		}
	}
}
</style>
