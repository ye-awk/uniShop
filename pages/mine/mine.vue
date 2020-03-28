<template>
	<view class="content">
		<view class="userSection">
			<image class="bg" src="../../static/img/user-bg.jpg"></image>
		</view>
		<view class="user-info-box" @click="toLogin()">
			<image class="portrait" src="../../static/img/missing-face.png" ></image>
			<text class="username">游客</text>
		</view>
		<view class="vip-card-box">
			<view class="cardcont">
				<image class="card-bg" src="../../static/img/vip-card-bg.png" mode=""></image>
					<view class="tit">
					<view class="icon">&#xe600</view>
					VIP会员
				</view>
			</view>
			<view class="arc">
				<image src="../../static/img/arc.png"></image>
			</view>
		</view>
		<view class="cent">
			<view class="order-section">
				<view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover"  :hover-stay-time="50">
					<view class="icon">&#xe601</view>
					<text>全部订单</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=1')"  hover-class="common-hover" :hover-stay-time="50">
					<view class="icon">&#xe6bc</view>
					<text>待付款</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover"  :hover-stay-time="50">
					<view class="icon">&#xe602</view>
					<text>待收货</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=3')" hover-class="common-hover"  :hover-stay-time="50">
					<view class="icon">&#xe70c</view>
					<text>待评价</text>
				</view>
			</view>
			<view class="user-list">
				<view class="listItem" @click="gonav('address')">
					<view class="icon dz">&#xe603</view>
					<text class="tx">地址管理</text>
					<view class="right">
					<image class="img" src="../../static/img/rightjt.png"></image>
					</view>
				</view>
				<view class="listItem">
					<view class="icon sc">&#xe62d</view>
					<text class="tx ">我的收藏</text>
					<view class="right">
					<image class="img" src="../../static/img/rightjt.png"></image>
					</view>
				</view>
				<view class="listItem" @click="gonav('set')">
					<view class="icon bb">&#xe676</view>
					<text class="tx">设置</text>
					<view class="right">
					<image class="img" src="../../static/img/rightjt.png"></image>
					</view>
				</view>
				<view class="listItem">
					<view class="icon bb">&#xe611</view>
					<text class="tx">当前版本</text>
					<view class="right">
						<text class="fb">1.0.0</text>
						<image class="img" src="../../static/img/rightjt.png"></image>
					</view>
				</view>
				<view class="tc">
					退出登陆
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {uniList} from "@dcloudio/uni-ui"
	import {uniListItem} from "@dcloudio/uni-ui"
	export default {
		data() {
			return {
				
			}
		},
		components:{
			uniList,
			uniListItem
		},
		onLoad() {
		},
		methods: {
			gonav(type){
				if(type==='address'){
					uni.navigateTo({
						url:'../address/address',
					})
				}
				if(type==='set'){
					uni.navigateTo({
						url:'../set/set',
					})
				}
				
			},
			navTo(url){
				uni.navigateTo({
					url:''+url,
				})
			},
			toLogin(){
				uni.navigateTo({
					url:'../public/login'
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	@font-face {
	  font-family: 'iconfont';
	  src: url('../../static/iconfont.eot');
	  src: url('../../static/iconfont.eot?#iefix') format('embedded-opentype'),
	      url('../../static/iconfont.woff2') format('woff2'),
	      url('../../static/iconfont.woff') format('woff'),
	      url('../../static/iconfont.ttf') format('truetype'),
	      url('../../static/iconfont.svg#iconfont') format('svg');
	}
	.content{
		position: relative;
		background-color: #f5f5f5;
		.userSection{
			width: 100%;
			height: 520rpx;
			position: absolute;
			// display: none;
			.bg{
				width: 100%;
				height: 520rpx;
				overflow: hidden;
			}
		}
		.user-info-box{
			width: 100%;
			height: 130rpx;
			display: flex;
			padding: 120rpx 30rpx 0rpx;
			position: relative;
			z-index: 2;
			overflow: hidden;
				.portrait{
					width: 130rpx;
					height: 130rpx;
				}
			.username{
				font-size: 30rpx;
				// height: 130rpx;
				// text-align: center;
				line-height: 130rpx;
				margin-left: 30rpx;
			}
		}
		.vip-card-box{
			width:100%;
			height: 90rpx;
			position: relative;
			z-index: 2;
			box-sizing: border-box;
			margin-top: 40rpx;
			.cardcont{
				width: 690rpx;
				height: 90rpx;
				background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
				border-radius: 20rpx;
				position: relative;
				margin:0rpx 30rpx;
				.card-bg{
					position:absolute;
					top: 10rpx;
					right: 0;
					width: 380upx;
					height: 260upx;
				}
				.tit{
					font-size: 28rpx;
					color: #f7d680;
					display: flex;
					padding:20rpx 30rpx 0rpx;
					height: 85rpx;
					box-sizing: border-box;
					.icon{
						  font-family: "iconfont" !important;
						  font-size: 20px;
						  font-style: normal;
						  -webkit-font-smoothing: antialiased;
						  -moz-osx-font-smoothing: grayscale;
						  color: #f6e5a3;
						  margin-right: 10rpx;
					}
					.yticon{
						color: #f6e5a3;
					}
				}
				
			}
			.arc{
				position: absolute;
				z-index: 1;
				width: 100%;
				height: 20rpx;
				top: 60rpx;
				image{
					width: 100%;
					height: 35rpx;
				}
			}
			
		}
		.cent{
			width: 100%;
			background-color: #f5f5f5;
			position: relative;
			z-index: 2;
			height:	860rpx;
			margin-top: 7rpx;
			box-sizing: border-box;
			padding: 0rpx 30rpx;
			.order-section{
				width: 690rpx;
				height: 150rpx;
				background-color: #fff;
				display: flex;
				border-radius: 10upx;
				justify-content: space-around;
				.order-item{
					width: 120upx;
					height: 120upx;
					font-size: 20rpx;
					padding: 0rpx 15rpx;
					box-sizing: border-box;
					text-align: center;
					.icon{
						font-family: "iconfont" !important;
						  font-size: 32px;
						  font-style: normal;
						  -webkit-font-smoothing: antialiased;
						  -moz-osx-font-smoothing: grayscale;
						  color: #fa436a;
						  width: 90rpx;
						  height: 90rpx;
						  text-align: center;
						  line-height: 100rpx;
					}
				}
				
			}
			.user-list{
				width: 690rpx;
				background-color: #fff;
				border-radius: 10upx;
				margin-top: 50rpx;
				padding: 40rpx 30rpx 0rpx;
				box-sizing: border-box;
				.listItem{
					display: flex;
					width: 630rpx;
					height: 100rpx;
					border-bottom: 1px solid #CCCCCC;
					line-height: 100rpx;
					.icon{
						 font-family: "iconfont" !important;
						  font-size: 28px;
						  font-style: normal;
						  -webkit-font-smoothing: antialiased;
						  -moz-osx-font-smoothing: grayscale;
						  width: 100rpx ;
						  height: 100rpx;
						  text-align: center;
						  line-height: 100rpx;
					}
					
					.dz{
						color: rgb(95, 205, 162);
					}
					.sc{
						color: rgb(84, 180, 239);
					}
					.bb{
						color: rgb(224, 116, 114);
					}
					.tx{
						font-size: 30rpx;
					}
					.right{
						margin-left: auto;
						height: 100%;
						display: flex;
						.fb{
							font-size: 26rpx;
							line-height: 120rpx;
							color: #969896;
							
						}
						.img{
							width: 60rpx;
							height: 60rpx;
							margin: 20rpx 0rpx;
						}
					}
					
					
					
				}
				.tc{
					height: 80rpx;
					width: 630rpx;
					margin-top: 20rpx;
					color: rgb(224, 116, 114);
					font-size: 30rpx;
					text-align: center;
					line-height: 80rpx;
				}
			}
		}
	}
</style>
