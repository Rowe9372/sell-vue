<template>
	<div class="sellerHeader">
		<div class="header-wrap">
			<div class="avator">
				<img :src="seller.avatar">
			</div>
			<div class="cont">
				<div class="seller-title">
					<span class="brand"></span>
					<span>{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}} / {{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" @click = "showBulletinMsg" class="support-count">
				<span>{{seller.supports.length}}个</span><i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div @click = 'showBulletinMsg' class="bulletin-wrap">
			<span class="bulletin-brand"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar">
		</div>
		<!-- pop up bulletin and discounts message -->
		<transition name="fade">
			<div v-if = "bulletinMsgShow" class="bulletin-discounts-msg">
				<div class="msg-wrap">
					<div class="msg-content">
						<h1 class="seller-name">{{seller.name}}</h1>
						<div class="star-wrap">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="msg-title">
							<div class="line"></div>
							<div class="msg-title-text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="support-all">
							<li v-for="support in seller.supports" :key="support.id" class="support-item">
								<span class="icon" :class="classMap[support.type]"></span>
								<span class="text">{{support.description}}</span>
							</li>
						</ul>
						<div class="msg-title">
							<div class="line"></div>
							<div class="msg-title-text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin-msg"> 
							<p class="bulletin-text">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div @click="hideBulletinMsg" class="msg-close">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
import star from '../star/stars'

export default {
	props: {
		seller: {
			type: Object
		}
	},
	data() {
		return {
			bulletinMsgShow: false
		}
	},
	methods: {
		showBulletinMsg() {
			this.bulletinMsgShow = true
		},
		hideBulletinMsg() {
			this.bulletinMsgShow = false
		}
	},
	created() {
		this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
	},
	components: {
		star
	}
}
</script>

<style lang="scss" style="text/scss">
@import '../../common/scss/base';
@import '../../common/scss/mixin';

.sellerHeader {
	position: relative;
	width: 100%;
	overflow: hidden;
	background-color: rgba(7,17,27,.5);
	.header-wrap {
		position: relative;
		width: 100%;
		overflow: hidden;
		box-sizing: border-box;
		padding: (48rem/30) (24rem/30) (36rem/30) (48rem/30);
		color: #fff;	
		.avator {
			float: left;
			width: (128rem/30);
			font-size: 0;			
			img {
				width: 100%;
				border-radius: (5rem/30);
			}
		}
		.cont {
			float: left;
			padding:(4rem/30) 0 (4rem/30) (32rem/30); 
			overflow: hidden;
			.seller-title {
				font-size: (32rem/30);
				line-height: (32rem/30);
				font-weight: bold;
				.brand {
					display: inline-block;
					width: (60rem/30);
					height: (36rem/30);
					vertical-align: top;
					@include bg-img('brand');
					background-size: contain;
					background-repeat: no-repeat;
				}
			}
			.description {
				margin-top: (16rem/30);
				font-size: (24rem/30);
				line-height: (24rem/30);
				font-weight: 200;
			}
			.support {
				margin-top: (20rem/30);
				font-size: (20rem/30);
				line-height: (24rem/30);
				.icon {
					display: inline-block;
					width: (24rem/30);
					height: (24rem/30);
					margin-right: (8rem/30);
					vertical-align: top;
					background-size: contain;
					background-repeat: no-repeat;
					&.decrease {
						@include bg-img('decrease_1');
					}
					&.discount {
						@include bg-img('discount_1');
					}
					&.guarantee {
						@include bg-img('guarantee_1');
					}
					&.invoice {
						@include bg-img('invoice_1');
					}
					&.special {
						@include bg-img('special_1');
					}
				}
			}			
		}
		.support-count {
			padding: (14rem/30) (16rem/30);
			position: absolute;
			right: (24rem/30);
			bottom: (30rem/30);
			font-size: (20rem/30);
			line-height: (24rem/30);
			color: #fff;			
			background-color: rgba(0,0,0,.2);
			border-radius: (30rem/30);
			>span {
				display: inline-block;
				font-weight: 200;
				line-height: (24rem/30);
			}
			>i {	
				display: inline-block;
				line-height: (24rem/30);
				font-weight: 200;			
				vertical-align: top;
			}
		}
	}
	.bulletin-wrap {
		position: relative;
		height: (56rem/30);
		line-height: (56rem/30);
		font-size: (20rem/30);
		color: #fff;
		font-weight: 200;
		padding: 0 (24rem/30);
		background-color: rgba(7,17,27,.2);
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		.bulletin-brand {
			display: inline-block;
			width: (44rem/30);
			height: (24rem/30);
			@include bg-img('bulletin');
			background-size: contain;
			background-repeat: no-repeat;
			vertical-align: middle;
		}
		.icon-keyboard_arrow_right {
			position: absolute;
			top: 50%;
			right: (24rem/30);
			transform: translatey(-50%);
		}
	}
	.background {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		filter: blur(10px);
		img {
			width: 100%;
			height: 100%;
		}
	}
	.bulletin-discounts-msg {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		overflow: auto;
		background-color: rgba(7,17,27,.8);
		backdrop-filter: blur(10px);
		z-index: 100;	
		&.fade-enter-active, &.fade-leave-active {
			transition: opacity .5s;
		}
		&.fade-enter, &.fade-leave-to {
			opacity: 0;
		}
		.msg-wrap {
			width: 100%;
			min-height: 100%;
			.msg-content {
				padding: (128rem/30) (72rem/30) (128rem/30) (72rem/30);
				.seller-name {
					color: #fff;
					text-align: center;
					font-size: (32rem/30);
					font-weight: 700;
					line-height: (32rem/30);
				}
				.star-wrap {
					width: 100%;
					line-height: (48rem/30);
					margin: (32rem/30) 0 (56rem/30) 0;
					text-align: center;
				}
				.msg-title {
					display: flex;
					width: 100%;
					overflow: hidden;
					.line {
						flex: 1;
						position: relative;
						top: -(14rem/30);
						border-bottom: 1px solid rgba(255,255,255,.2);
					}
					.msg-title-text {
						font-size: (28rem/30);
						padding: 0 (24rem/30);
						color: #fff;
						font-weight: 700;
						line-height: (28rem/30);
					}
				}
				.support-all {
					width: 100%;
					padding: (48rem/30) (24rem/30) (56rem/30) (24rem/30);
					box-sizing: border-box;
					.support-item {
						width: 100%;
						height: (32rem/30);
						line-height: (32rem/30);
						margin-bottom: (24rem/30);
						.icon {
							display: inline-block;
							width: (32rem/30);
							height: (32rem/30);
							margin-right: (12rem/30);
							background-size: contain;
							background-repeat: no-rapeat;
							&.decrease {
								@include bg-img('decrease_2');
							}
							&.discount {
								@include bg-img('discount_2');
							}
							&.guarantee {
								@include bg-img('guarantee_2');
							}
							&.invoice {
								@include bg-img('invoice_2');
							}
							&.special {
								@include bg-img('special_2');
							}
						}
						.text {
							display: inline-block;
							color: #fff;
							font-size: (24rem/30);
							font-weight: 200;
							line-height: (32rem/30);
							vertical-align: top;
						}
					}
				}
				.bulletin-msg {
					width: 100%;
					padding: (48rem/30) (24rem/30) 0 (24rem/30);
					box-sizing: border-box;
					.bulletin-text {
						color: #fff;
						font-size: (24rem/30);
						font-weight: 200;
						line-height: (48rem/30);
					}
				}
			}
		}
		.msg-close {
			positions: relative;
			width: (64rem/30);
			height: (64rem/30);
			margin: -(64rem/30) auto 0 auto; 
			font-size: (64rem/30);
			color: rgba(255,255,255,.5);
		}
	}
}	
</style>
