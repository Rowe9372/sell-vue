<template>
	<div class="star" :class="starSize">
		<span v-for="starShape in starShapeItem" class="star-item" :class="starShape" :key="starShape.id"></span>
	</div>
</template>

<script type="text/ecmascript-6">
	const LENGHT = 5
	const STAR_ON = 'on'
	const STAR_HALF = 'half'
	const STAR_OFF = 'off'
	export default {
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			starSize() {
				return 'star-' + this.size
			},
			starShapeItem() {
				let result = []
				/* (四舍五入，小于.5取整，大于保留小数) */
				let score = Math.floor(this.score * 2) / 2  
				let hasDecimal = Math.floor(score) % 1 !== 0
				let integer = Math.floor(score)
				for (let i = 0; i < integer; i++) {
					result.push(STAR_ON)
				}
				if (hasDecimal) {
					result.push(STAR_HALF)
				}
				while (result.length < LENGHT) {
					result.push(STAR_OFF)
				}
				return result
			}
		}
	}
</script>

<style lang="scss">
@import '../../common/scss/base';
@import '../../common/scss/mixin';
	.star {
		font-size: 0;
		.star-item {
			display: inline-block;
			background-repeat: no-repeat;
			&:last-child {
				margin-right: 0; 
			} 
		}

		&.star-48 {
			.star-item {
				width: (40rem/30);
				height: (40rem/30);
				margin-right: (44rem/30);
				background-size: (40rem/30) (40rem/30);
				&.on {
					@include bg-img('star48_on');
				}
				&.half {
					@include bg-img('star48_half');
				}
				&.off {
					@include bg-img('star48_off');
				}
			}
		}
		&.star-36 {
			.star-item {
				width: (30rem/30);
				height: (30rem/30);
				margin-right: (12rem/30);
				background-size: (30rem/30) (30rem/30);
				&.on {
					@include bg-img('star36_on');
				}
				&.half {
					@include bg-img('star36_half');
				}
				&.off {
					@include bg-img('star36_off');
				}
			}
		}
		&.star-24 {
			.star-item {
				width: (20rem/30);
				height: (20rem/30);
				margin-right: (6rem/30);
				background-size: (20rem/30) (20rem/30);
				&.on {
					@include bg-img('star24_on');
				}
				&.half {
					@include bg-img('star24_half');
				}
				&.off {
					@include bg-img('star24_off');
				}
			}
		}
	}
</style>
