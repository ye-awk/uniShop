<template>
	<view class="content">
		<view class="item" v-for="(item2,index2) in 3" :key="index2">
			<view class="header">
				<text>2019-10-24  09:56</text>
			</view>
			<view class="cont">
				<view class="sp" v-for="(item,index) in 2" :key="index">
					<image class="img" src="../../static/logo.png"></image>
					<view class="title">
						<text>洗护二合一洗发水</text>
						<text class="rmb">¥ 355</text>
					</view>
					<view class="count">
						×1
					</view>
				</view>
				<view class="sum">
					<text>合计：355元（含运费¥80.0）</text>
				</view>
			</view>
			<view class="btn">
				<view class="right">
					<view class="qx" v-if="state < 2">
						取消订单
					</view>
					<view class="qr" @click="toNav()">
						{{qr}}
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['state'],
		data(){
			return{
				qr:'立即支付',
			}
		},
		created() {
			this.getOrder();
			// console.log(this.state);
			if(this.state == 2){
				this.qr = '确认收货'
				console.log(2)
			}else if(this.state == 3){
				this.qr = '点击评价'
			}
		},
		methods:{
			async getOrder(){
				const res = await this.myRuquest({
					url:"addons/xshop/order?state=0",
				});
				console.log(res)
			},
			toNav(){
				if(this.state == 3){
					uni.navigateTo({
						url:'../comment/comment'
					})
				}else if(this.state == 2){
					
				}else{
					uni.navigateTo({
						url:'../money/pay'
					})
				}
				// console.log(this.state)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		width: 100%;
		background-color: #fff;
		height: 100%;
		.item{
			width: 100%;
			background-color: #FFFFFF;
			margin-top: 30rpx;
			.header{
				width: 100%;
				height: 80rpx;
				border-bottom: 1rpx solid #F1F1F1;
				color: #C0C0C0;
				line-height: 80rpx;
				box-sizing: border-box;
				padding: 0rpx 30rpx;
				font-size: 24rpx;
			}
			.cont{
				width: 100%;
				border-bottom: 1rpx solid #F1F1F1;
				.sp{
					width: 100%;
					display: flex;
					height: 180rpx;
					padding: 15rpx 30rpx;
					box-sizing: border-box;
					.img{
						width: 150rpx;
						height: 150rpx;
						border-radius: 10rpx;
					}
					.title{
						margin-left: 15rpx;
						height: 150rpx;
						font-size: 40rpx;
						
						text{
							display: block;
						}
						.rmb{
							margin-top: 40rpx;
							color: #DD4A68;
						}
					}
					.count{
						font-size: 30rpx;
						color: #DD4A68;
						margin-left: auto;
						line-height: 250rpx;
					}
				}
				.sum{
					width: 100%;
					padding: 0rpx 30rpx;
					height: 100rpx;
					box-sizing: border-box;
					line-height: 100rpx;
					font-size: 24rpx;
					color: #969896;
					display: flex;
					text{
						margin-left: auto;
						display: block;
					}
				}
			}
			.btn{
				display: flex;
				box-sizing: border-box;
				height: 150rpx;
				padding: 0rpx 30rpx;
				.right{
					margin-left: auto;
					display: flex;
					.qx{
						font-size: 30rpx;
						width:	200rpx;
						height: 70rpx;
						text-align: center;
						line-height: 70rpx;
						background-color: #C8C7CC;
						border-radius: 40rpx;
						border: 1rpx solid #808080;
						margin-top: 40rpx;
						margin-right: 30rpx;
					}
					.qr{
						font-size: 30rpx;
						width:	200rpx;
						height: 70rpx;
						text-align: center;
						line-height: 70rpx;
						background-color: #ffbaba;
						border-radius: 40rpx;
						border: 1rpx solid #DD4A68;
						color: #DD4A68;
						margin-top: 40rpx;
					}
				}
			}
		}
	}
</style>
