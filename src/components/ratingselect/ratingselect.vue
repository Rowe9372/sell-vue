<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span class="type" @click="select(2)" :class="{'current': ratingType === 2}">{{typeName.all}} <small class="count">{{ratings.length}}</small></span>
			<span class="type" @click="select(0)" :class="{'current': ratingType === 0}">{{typeName.positive}} <small class="count">{{positives.length}}</small></span>
			<span class="type nagative" @click="select(1)" :class="{'active': ratingType === 1}">{{typeName.nagative}}
			<small class="count">{{nagatives.length}}</small></span>
		</div>
		<div class="switch" :class="{'on': onlyContent}" @click="select(!onlyContent)">
			<i class="icon-check_circle"></i>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script type="ecmascript-6">
const POSITIVE = 0
const NAGATIVE = 1
const ALL = 2
	export default {
		props: {
			ratings: {
				type: Array,
				default() {
					return []
				}
			},
			ratingType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			typeName: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						nagative: '不满意'
					}
				}
			}
		},
		computed: {
			positives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE
				})
			},
			nagatives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NAGATIVE
				})
			}
		},
		methods: {
			select(parameters) {
				this.$emit('choseType', parameters)
			}
		}
	}
</script>

<style lang="scss">
@import '../../common/scss/base';
@import '../../common/scss/mixin';

	.ratingselect {
		width: 100%;
		.rating-type {
			padding: (36rem/30) 0;
			border-bottom: 1px solid rgba(7,17,27,.1);
			box-sizing: border-box;
			.type {
				display: inline-block;
				padding: (16rem/30) (24rem/30);
				font-size: (24rem/30);
				color: rgb(77,85,93);
				line-height: (32rem/30);
				border-radius: 2px;
				background-color: rgba(0,160,220,.2);
				&.current {
					background-color: rgb(0,160,220);
					color: #fff;
				}
				&.nagative {
					background-color: rgba(77,85,93,.2);
					&.active {
						background-color: rgb(77,85,93);
						color: #fff;
					}
				}
				.count {
					font-size: (16rem/30);
				}
			} 
		}
		.switch {
			width: 100%;
			padding: (24rem/30);
			&.on {
				.icon-check_circle {
					color: #00c850;
				}
			}
			.icon-check_circle {
				display: inline-block;
				font-size: (48rem/30);
				line-height: (48rem/30);
				color: rgb(147,153,159);
				vertical-align: top;
			}
			.text {
				display: inline=block;
				font-size: (24rem/30);
				color: rgb(147,153,159);
				line-height: (48rem/30);
			}
		}
	}
</style>
