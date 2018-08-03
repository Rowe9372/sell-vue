<template>
	<div class="rating-wrap" ref="ratingWrap">
		<div class="rating-content">
			<div class="exponent">
				<div class="left">
					<h2 class="score">{{seller.score}}</h2>
					<p class="text">综合评分</p>
					<p class="rank">高于周边商家{{seller.rankRate}}</p>
				</div>
				<div class="right">
					<div class="score-wrap">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrap">
						<span class="title">商品评价</span>
						<star :size="36" :score="seller.score"></star>
						<span class="score">{{seller.score}}</span>
					</div>
					<div class="score-wrap">
						<span class="title">送达时间</span>
						<span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<div class="split-line">
					
			</div>
			<!-- rating select -->
			<div class="ratingselect-wrap">
				<ratingselect @choseType="chose" :ratings="ratings" :ratingType="ratingType" :onlyContent="onlyContent" :typeName="typeName"></ratingselect>
			</div>
			
			<ul class="rating-list">
				<li class="rating-item" v-for="rating in ratings" :key="rating.id" v-show="needShow(rating.rateType, rating.text)">
					<div class="avatar">
						<img class="img" :src="rating.avatar" alt="">
					</div>
					<div class="msg">
						<div class="user">
							<span class='user-name'>{{rating.username}}</span>
							<span class="rating-time">{{rating.rateTime | formatDate}}</span>
						</div>
						<div class="score">
							<star :size="24" :score="rating.score"></star>
							<span class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>
						</div>
						<p class="text">{{rating.text}}</p>
						<div class="recommend-wrap">
							<i :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></i>
							<span class="recommend" v-for="recommend in rating.recommend" :key="recommend.id">{{recommend}}</span>
						</div>
					</div>
				</li>
			</ul>
		</div>

		<!-- shopcat -->
		<shopcat :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :min-price="seller.minPrice"></shopcat>
	</div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import {formatDate} from '../../common/js/date'
import star from '../star/stars'
import ratingselect from '../ratingselect/ratingselect'
import shopcat from '../shopcat/shopcat'

const ERR_OK = 0
const ALL = 2
export default {
	props: {
		seller: {
			type: Object
		}
	},
	data() {
		return {
			ratings: [],
			selectFoods: [],
			ratingType: ALL,
			onlyContent: true,
			typeName: {
				all: '全部',
				positive: '满意',
				nagative: '不满意'
			}
		}
	},
	created() {
		this.$http.get('./api/ratings').then(response => {
			/* success callback */
			response = response.body
			if (response.errno === ERR_OK) {
				this.ratings = response.data
				// console.log(this.rating)
				this.$nextTick(() => {
					this.ratingWrap = new BScroll(this.$refs.ratingWrap, {
						click: true
					})
				})
			}
		}, response => {
			/* Error CallBack */
		})	
	},
	methods: {
		chose(parameters) {
			if (typeof parameters === 'number') {
				this.ratingType = parameters
			} else if (typeof parameters === 'boolean') {
				this.onlyContent = parameters
			}
		},
		needShow(typ, tex) {
			if (this.onlyContent && !tex) {
				return false
			}
			if (this.ratingType === ALL) {
				return true
			} else {
				return this.ratingType === typ
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
		star,
		ratingselect,
		shopcat
	}
}
</script>

<style lang="scss" type="text/scss">
@import "../../common/scss/base";
@import "../../common/scss/mixin";

.rating-wrap {
	position: absolute;
	top: (348rem/30);
	left: 0;
	bottom: (96rem/30);
	width: 100%;
	overflow: hidden;
	.rating-content {
		width: 100%;
		.exponent {
			display: flex;
			padding: (36rem/30) 0;
			width: 100%;
			.left {
				flex: 0 0 (275rem/30);
				width: (275rem/30);
				text-align: center;
				@media only screen and (max-width:320px) {
					flex: 0 0 (235rem/30);
					width: (235rem/30);
				}
				.score {
					font-size: (48rem/30);
					color: rgb(255,153,0);
					line-height: (58rem/30);
				}
				.text {
					font-size: (24rem/30);
					color: rgb(7,17,27);
					line-height: (24rem/30);
					margin-top: (12rem/30);
				}
				.rank {
					font-size: (20rem/30);
					color: rgb(147,153,159);
					line-height: (20rem/30);
					margin-top: (16rem/30);
					margin-bottom: (12rem/30);
				}
			}
			.right {
				flex: 1;
				padding: 0 (48rem/30);
				@media only screen and (max-width:320px) {
					padding: 0 (38rem/30);
				}
				box-sizing: border-box;
				border-left: 1px solid rgba(7,17,27,.1);
				.score-wrap {
					width: 100%;
					margin-bottom: (16rem/30);
					font-size: 0;
					&:last-child {
						margin-bottom: 0;
					}
					.title {
						display: inline-block;
						font-size: (24rem/30);
						color: rgb(7,17,27);
						line-height: (36rem/30);
						margin-right: (24rem/30);
						vertical-align: top;
					}
					.star {
						display: inline-block;
					}
					.score {
						display: inline-block;
						font-size: (24rem/30);
						color: rgb(255,153,0);
						line-height: (36rem/30);
						margin-left: (24rem/30); 
					}
					.deliveryTime {
						font-size: (24rem/30);
						color: rgb(147,153,159);
						line-height: (36rem/30);
					}
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
		.ratingselect-wrap {
			width: 100%;
			padding: 0 (36rem/30);
			box-sizing: border-box;
			@include border-bottom-1px(rgba(7,17,27,.1));
		}
		.rating-list {
			width: 100%;
			padding: 0 (36rem/30);
			box-sizing: border-box;
			.rating-item {
				display: flex;
				width: 100%;
				padding: (36rem/30) 0;
				@include border-bottom-1px(rgba(7,17,27,.1));
				.avatar {
					flex: 0 0 (56rem/30);
					width: (56rem/30);
					font-size: 0;
					.img {
						width: (56rem/30);
						height: (56rem/30);
						border-radius: 50%;
					}
				}
				.msg {
					flex: 1;
					padding-left: (24rem/30);
					box-sizing: border-box;
					.user {
						width: 100%;
						display: flex;
						justify-content: space-between;
						.user-name {
							flex: 1;
							font-size: (20rem/30);
							color: rgb(7,17,27);
							line-height: (24rem/30);
						}
						.rating-time {
							flex: 1;
							font-size: (20rem/30);
							font-weight: 200;
							color: rgb(147,153,159);
							line-height: (24rem/30);
							text-align: right;
						}
					}
					.score {
						width: 100%;
						margin-bottom: (12rem/30);
						box-sizing: border-box;
						.star {
							display: inline-block;
						}
						.deliveryTime {
							display:inline-block;
							font-size: (20rem/30);
							font-weight: 200;
							color: rgb(147,153,159);
							line-height: (24rem/30);
							margin-left: (12rem/30);
						}
					}
					.text {
						font-size: (24rem/30);
						color: rgb(7,17,27);
						line-height: (36rem/30);
						margin-bottom: (16rem/30);
					}
					.recommend-wrap {
						width: 100%;
						.icon-thumb_up {
							font-size: (24rem/30);
							display: inline-block;
							color: rgb(0,160,220);
							line-height: (32rem/30);
							vertical-align: middle;
						}
						.icon-thumb_down {
							font-size: (24rem/30);
							display: inline-block;
							color: rgb(147,153,159);
							line-height: (32rem/30);
							vertical-align: middle;
						}
						.recommend {
							display: inline-block;
							padding: 0 (12rem/30);
							font-size: (18rem/30);
							color: rgb(147,153,159);
							line-height: (32rem/30);
							border: 1px solid rgba(7,17,27,.1);
							border-radius: 2px;
							margin-left: (16rem/30);
						}
					}
				}
			}
		}
	}
}
</style>
