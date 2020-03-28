<template>
	<view class="content">
		<view class="search">
			<icon type="search" size="20rpx" class="searchicon"></icon>
			<input class="inp" type="text" placeholder="请输入关键词进行搜索" />
		</view>
		<view class="rel">
			<swiper class="swi" @change="change" :autoplay="true" :circular="true">
				<swiper-item class="swi" v-for="(item,index) in bannerimg" :key="index">
					<image class="img" :src="item.image"></image>
				</swiper-item>
			</swiper>
			<view class="yuan yuan1">{{selectedIndex}}</view>
			<view class="yuan yuan2">{{bannerimg.length}}</view>
		</view>
		<view class="nav">
			<uni-grid :column="4" :show-border="false" :square="false">
				<uni-grid-item v-for="(item,index) in navimg" :key="index">
					<image class="img" :src="item.image"></image>
					<text class="text">{{item.description}}</text>
				</uni-grid-item>
			</uni-grid>
		</view>
		<view class="ad">
			<image class="img" :src="adimg.image" mode="aspectFill"></image>
		</view>
		<!-- 分割线 -->
		<view class="fg">
		</view>
		<view class="cpfy">
			<image class="zuan" src="../../static/zuan.png" mode="aspectFill"></image>
			<view class="text">
				<p class="chin">分类精选</p>
				<p class="eg">Competitive Products For You</p>
			</view>
			<image class="leftjt" src="../../static/jiant.png" mode="aspectFill"></image>
		</view>
		<view class="fg">
		</view>
		<view class="shopcont" v-for="(item,index) in products" :key="item.id">
			<view class="header">
				<view class="text">{{item.title}}</view>
				<span></span>
			</view>
			<view class="cont">
				<scroll-view class="scroll-view_H" scroll-x="true"  >
					<view class="shoping" @click="gotoDetial(item2.id)" v-for="(item2,index) in item.products" :key="item2.id">
						<image class="img" :src="item2.image[0]" mode="aspectFill"></image>
						<text class="title">系带白色连衣裙</text>
						<view>
							<text class="newprice">¥ 123</text>
							<text class="oldprice">¥ 123</text>
						</view>
					</view>
					<view class="More">
						<text>查看更多</text>
						<view>
							<text>More+</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="fg">
			</view>
		</view>

	</view>
</template>

<script>
	import {
		uniGrid
	} from '@dcloudio/uni-ui'
	import {
		uniGridItem
	} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				bannerimg: [],
				selectedIndex: 1,
				navimg: [],
				options: {},
				adimg: {},
				products: [],
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			}
		},
		components: {
			uniGrid,
			uniGridItem
		},
		onLoad() {

		},
		created() {
			this.getbanner();
			this.getproduct();
		},
		methods: {
			async getbanner() {
				const res = await this.myRuquest({
					url: 'addons/xshop/nav',
					method: 'POST',
					data: {
						nav_type: [0, 1, 2]
					}
				});
				// console.log(res);
				this.bannerimg = res.data.data[0];
				this.navimg = res.data.data[1];
				this.adimg = res.data.data[2][0];
			},
			async getproduct() {
				const res = await this.myRuquest({
					url: "addons/xshop/product/getHomeProducts",
				})
				this.products = res.data.data.home_recommend_products;
				console.log(this.products);
			},
			change(e) {
				// console.log(e);
				this.selectedIndex = e.target.current + 1;
			},
			gotoDetial(pid){
				uni.navigateTo({
					url:'../productsDetail/productsDetail?id='+pid
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 750rpx;
		overflow: hidden;
		position: relative;
		.search {
			width: 690rpx;
			height: 50rpx;
			background-color: #f0f0f0;
			border-radius: 25rpx;
			opacity: 0.65;
			margin: 19rpx auto;
			font-family: PingFang-SC-Regular;
			font-size: 20rpx;
			color: #555;
			font-weight: bold;
			display: flex;
			box-sizing: border-box;
			padding-left: 217rpx;
			margin-bottom: 29rpx;
			position: sticky;
			position: -webkit-sticky;
			top: 0rpx;
			.searchicon {
				margin: auto 0 auto 0;
			}

			.inp {
				margin: auto 0rpx auto 20rpx;
				font-family: PingFang-SC-Regular;
				font-size: 20rpx;
				color: #555;
				font-weight: bold;
			}
		}

		.rel {
			position: relative;
			width: 690rpx;
			height: 350rpx;
			margin: 0 auto;
		}

		.swi {
			width: 690rpx;
			height: 350rpx;
			border-radius: 30rpx;
			margin: 0 auto;
			position: relative;

			.img {
				width: 690rpx;
				height: 350rpx;
			}


		}

		.yuan {
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			position: absolute;
			background-color: rgba($color: #000000, $alpha: 0.4);
			bottom: 40rpx;
			text-align: center;
			color: #fff;
			font-size: 25rpx;
			line-height: 40rpx;
		}

		.yuan1 {
			left: 40rpx;
		}

		.yuan1::after {
			content: '/';
			position: absolute;
			left: 30rpx;
			z-index: 999;
		}

		.yuan2 {
			left: 70rpx;
		}

		.nav {
			// margin-top: 30rpx;
			width: 690rpx;
			margin: 30rpx auto 0rpx;
			text-align: center;
			font-size: 24rpx;

			.img {
				width: 85rpx;
				height: 85rpx;
				margin: 0 auto;

			}
		}

		.ad {
			width: 640rpx;
			height: 164rpx;
			background-color: pink;
			margin: 49rpx auto 69rpx;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.fg {
			width: 100%;
			height: 20rpx;
			background-color: #F0F0F0;
		}

		.cpfy {
			width: 100%;
			height: 140rpx;
			display: flex;

			.zuan {
				width: 70rpx;
				height: 70rpx;
				margin: 35rpx 0rpx 35rpx 57rpx;
			}

			.text {
				padding: 44rpx 0rpx 44rpx 20rpx;

				.chin {
					font-family: PingFang-SC-Medium;
					font-size: 24rpx;
					font-weight: bold;
					font-stretch: normal;
					letter-spacing: 1rpx;
					color: #333333;
				}

				.eg {
					font-family: PingFang-SC-Medium;
					font-size: 20rpx;
					font-weight: bold;
					font-stretch: normal;
					letter-spacing: 0rpx;
					color: #999999;
				}
			}

			.leftjt {
				width: 21rpx;
				height: 38rpx;
				margin-left: auto;
				margin-top: 51rpx;
			}
		}

		.shopcont {
			padding: 50rpx 0rpx 30rpx  0rpx;
			width: 100%;
			height: 518rpx;
			box-sizing: border-box;
			.header {
				height: 30rpx;
				width: 100%;
				display: flex;
				.text {
					font-family: PingFang-SC-Regular;
					font-size: 30rpx;
					font-weight: bold;
					font-stretch: normal;
					letter-spacing: 5rpx;
					color: #333333;
					margin-left: 29rpx;
					line-height: 28rpx;
				}
				span {
					width: 6rpx;
					height: 30rpx;
					background-color: #ff2c4a;
					margin-left: 19rpx;
				}
			}

			.cont {
				height: 390rpx;
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				margin-top: 30rpx;
				.More {
					width: 200rpx;
					position: absolute;
					background-color: #f0f0f0;
					height: 241rpx;
					text-align: center;
					padding: 80rpx 0rpx;
					box-sizing: border-box;
					color: #7b7b7b;
					font-size: 24rpx;
					display: inline-block;
					margin: 0rpx 20rpx;
				}

				.shoping {
					width: 200rpx;
					height: 370rpx;
					display: inline-block;
					margin: 0rpx 20rpx;

					.img {
						width: 200rpx;
						height: 241rpx;
					}

					.title {
						height: 20rpx;
						font-family: PingFang-SC-Regular;
						font-size: 20rpx;
						font-weight: bold;
						font-stretch: normal;
						letter-spacing: 1rpx;
						color: #555555;
						white-space: normal;
						
					}

					.newprice {
						height: 20rpx;
						font-family: AdobeHeitiStd-Regular;
						font-size: 24rpx;
						font-weight: bold;
						font-stretch: normal;
						letter-spacing: -1rpx;
						line-height: 48rpx;
						color: #fa265f;
						white-space: normal;
					}

					.oldprice {
						height: 13rpx;
						font-family: PingFang-SC-Regular;
						font-size: 16rpx;
						font-weight: bold;
						font-stretch: normal;
						line-height: 48rpx;
						letter-spacing: 1rpx;
						color: #7b7b7b;
						margin-left: 10rpx;
						white-space: normal;
					}
				}
			}
		}
	}
</style>
