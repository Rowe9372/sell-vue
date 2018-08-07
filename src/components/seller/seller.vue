<template>
	<div class="seller-wrap" ref="sellerWrap">
		<div class="seller-content">
		<!-- overview -->
			<div class="overview">
				<div class="base-msg border-1px">
					<h2 class="seller-name">{{seller.name}}</h2>
					<div class="description">
						<star :size="36" :score="seller.score"></star>
						<span class="text">（{{seller.ratingCount}}）</span>
						<span class="text">月售{{seller.sellCount}}单</span>
					</div>
					<div class="favorite" @click="toggleFavorite">
						<i class="icon-favorite" :class="{'favorited': favorite}"></i>
						<p class="text">{{favoriteText}}</p>
					</div>
				</div>
				<ul class="requirement">
					<li class="item">
						<p class="title">起送价</p>
						<p class="text">{{seller.minPrice}}<small>元</small></p>
					</li>
					<li class="item">
						<p class="title">商家配送</p>
						<p class="text">{{seller.deliveryPrice}}<small>元</small></p>
					</li>
					<li class="item">
						<p class="title">平均配送时间</p>
						<p class="text">{{seller.deliveryTime}}<small>分钟</small></p>
					</li>
				</ul>
			</div>

			<div class="split-line">
					
			</div>
			<!-- public notice -->
			<div class="public-notice">
				<div class="bulletin">
					<h2 class="title">公告与活动</h2>
					<p class="bulletin-text">{{seller.bulletin}}</p>
				</div>
				<ul v-if="seller.supports" class="support-list">
					<li v-for="support in seller.supports" :key="support.id" class="support">
						<span class="icon" :class="classMap[support.type]"></span>
						<span class="text">{{support.description}}</span>
					</li>
				</ul>
			</div>

			<div class="split-line">
					
			</div>
			<!-- store live -->
			<div v-show="seller.pics" class="store-live">
				<h2 class="title">商家实景</h2>
				<div class="pic-wrap" ref="picWrap">
					<ul class="pic-list picList"  :style="{width: width}">
						<li class="pic-item" v-for="pic in seller.pics" :key="pic.id">
							<img class="img" :src="pic" alt="">
						</li>
					</ul>
				</div>
			</div>

			<div class="split-line">
					
			</div>
			<!-- seller info -->
			<div class="seller-info">
				<h2 class="title">商家信息</h2>
				<ul class="info-list">
					<li class="info-item" v-for="info in seller.infos" :key="info.id">
						<p class="text">{{info}}</p>
					</li>
				</ul>
			</div>
			
		</div>

		<!-- shopcat -->
		<shopcat :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :min-price="seller.minPrice"></shopcat>
	</div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import star from '../star/stars'
import shopcat from '../shopcat/shopcat'
export default {
	props: {
		seller: {
			type: Object
		}
	},
	data() {
		return {
			selectFoods: [],
			classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
			width: '',
			favorite: false
		}
	},
	created() {
		this.$nextTick(() => {
			this.sellerWrap = new BScroll(this.$refs.sellerWrap, {
				click: true
			})
		})	
	},
	mounted() {
		if (this.seller.pics) {
			let picWidth = 240
			let marg = 12
			let widths = (picWidth + marg) * this.seller.pics.length
			// console.log(widths)
			this.width = widths + 'px'
		}
		this.$nextTick(() => {
			this.picScroll = new BScroll(this.$refs.picWrap, {
				scrollX: true,
				eventPassthrough: 'vertical'
			})
		})	
	},
	computed: {
		favoriteText() {
			return this.favorite ? '已收藏' : '收藏'
		}
	},
	methods: {
		toggleFavorite() {
			this.favorite = !this.favorite
		}
	},
	components: {
		star,
		shopcat
	}
}
</script>

<style lang="scss" type="text/scss">
@import '../../common/scss/base';
@import '../../common/scss/mixin';

.seller-wrap {
	position: absolute;
	top: (348rem/30);
	left: 0;
	bottom: (96rem/30);
	width: 100%;
	overflow: hidden;
	.seller-content {
		width: 100%;
		.overview {
			padding: 0 (36rem/30);
			box-sizing: border-box;
			.base-msg {
				position: relative;
				padding: (36rem/30) 0;
				@include border-bottom-1px(rgba(7,17,27,.1));
				box-sizing: border-box;
				.seller-name {
					font-size: (28rem/30);
					color: rgb(7,17,27);
					line-height: (28rem/30);
					margin-bottom: (16rem/30);
				}
				.description {
					font-size: 0;
					.star {
						display: inline-block;
					}
					.text {
						display: inline-block;
						font-size: (20rem/30);
						color: rgb(77,85,93);
						margin-left: (16rem/30);
						line-height: (36rem/30);
						vertical-align: top;
					}
				}
				.favorite {
					position: absolute;
					bottom: (36rem/30);
					right: 0;
					font-size: 0;
					width: (60rem/30);
					text-align: center;
					overflow: hidden;
					.icon-favorite {
						display: inline-block;
						width: (48rem/30);
						height: (48rem/30);
						font-size: (48rem/30);
						color: rgb(147,153,159);
						line-height: (48rem/30);
						margin-bottom: (8rem/30);
						&.favorited {
							color: rgb(240,20,20);
						}
					}
					.text {
						display: inline-block;
						font-size: (20rem/30);
						color: rgb(147,153,159);
						line-height: (20rem/30);
					}
				}
			}
			.requirement {
				display: flex;
				padding: (36rem/30) 0;
				.item {
					flex: 1;
					text-align: center;
					border-right: 1px solid rgba(7,17,27,.1);
					box-sizing: border-box;
					&:last-child {
						border-right: 0;
					}
					.title {
						font-size: (20rem/30);
						color: rgb(147,153,159);
						line-height: (20rem/30);
						margin-bottom: (8rem/30);
					}
					.text {
						font-size: (48rem/30);
						color: rgb(7,17,27);
						line-height: (48rem/30);
						font-weight: 200;
						small {
							font-size: (20rem/30);
						}
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
		.public-notice {
			padding: 0 (36rem/30);
			box-sizing: border-box;
			.bulletin {
				padding-top: (36rem/30);
				padding-bottom: (32rem/30);
				.title {
					font-size: (28rem/30);
					color: rgb(7,17,27);
					line-height: (28rem/30);
					margin-bottom: (16rem/30); 
				}
				.bulletin-text {
					padding: 0 (24rem/30);
					box-sizing: border-box;
					font-size: (24rem/30);
					font-weight: 200;
					color: rgb(240,20,20);
					line-height: (48rem/30);
				}
			}
			.support-list {
				width: 100%;
				.support {
					padding: (32rem/30) (24rem/30);
					box-sizing: border-box;
					border-top: 1px solid rgba(7,17,27,.1);
					font-size: 0;
					.icon {
						display: inline-block;
						width: (36rem/30);
						height: (36rem/30);
						margin-right: (12rem/30);
						vertical-align: top;
						background-size: contain;
						background-repeat: no-repeat;
						&.decrease {
							@include bg-img('decrease_4');
						}
						&.discount {
							@include bg-img('discount_4');
						}
						&.special {
							@include bg-img('special_4');
						}
						&.invoice {
							@include bg-img('invoice_4');
						}
						&.guarantee {
							@include bg-img('guarantee_4');
						}
					}
					.text {
						display: inline-block;
						font-size: (24rem/30);
						font-weight: 200;
						color: rgb(7,17,27);
						line-height: (32rem/30);
					}
				}
			}
		}
		.store-live {
			padding: (36rem/30);
			width: 100%;
			box-sizing: border-box;
			.title {
				font-size: (28rem/30);
				color: rgb(7,17,27);
				line-height: (28rem/30);
				margin-bottom: (24rem/30);
			}
			.pic-wrap {
				width: 100%;
				white-space: nowrap;
				.pic-list {
					font-size: 0;
					.pic-item {
						display: inline-block;
						width: (240rem/30);
						height: (180rem/30);
						margin-right: (12rem/30);
						&:last-child {
							margin-right: 0;
						}
						.img {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
		.seller-info {
			padding: (36rem/30);
			box-sizing: border-box;
			.title {
				font-size: (28rem/30);
				color: rgb(7,17,27);
				line-height: (28rem/30);
				margin-bottom: (24rem/30);
			}
			.info-list {
				width: 100%;
				.info-item {
					padding: (32rem/30) (24rem/30);
					box-sizing: border-box;
					border-top: 1px solid rgba(7,17,27,.1);
					.text {
						font-size: (24rem/30);
						font-weight: 200;
						color: rgb(7,17,27);
						line-height: (32rem/30);
					}
				}
			}
		}
	}
}
</style>
