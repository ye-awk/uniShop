<template>
	<view class="content">
		<uni-nav-bar left-icon="back" title="发表评论" @clickLeft="back"></uni-nav-bar>
		
		<view class="edi">
			<editor class="text" :placeholder="this.$store.state.testmsg"></editor>
			<image class="img" src="../../static/logo.png" @click="cI"></image>
		</view>
		<view class="pf">
			<text>相符描述：</text>
			<uni-rate class='xx' max="5" value="0"></uni-rate>
		</view>
		<view class="btn">
			发表评价
		</view>
	</view>
</template>

<script>
	import {uniNavBar,uniRate} from "@dcloudio/uni-ui"
	export default {
		data(){
			return {
				
			}
		},
		components:{
			uniNavBar,
			uniRate,
		},
		methods:{
			cI(){
				uni.chooseImage({
					success:(chooseImageRes)=>{
						const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log(tempFilePaths);
					}
				})
			},
			back(){
				uni.navigateBack({
					
				})
			}
		}
	
	}
</script>

<style lang="scss" scoped>
	page,.content{
		background-color: #F1F1F1;
		height: 100%;
	}
	.edi{
		width: 100%;
		height: 640rpx;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		padding: 20rpx 30rpx 0rpx;
		box-sizing: border-box;
		font-size: 30rpx;
		
		.text{
			width: 100%;
			height: 306rpx;
		}
		.img{
			display: block;
			width: 180rpx;
			height: 156rpx;
		}
	}
	.pf{
		width: 100%;
		height: 100rpx;
		display: flex;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		box-sizing: border-box;
		line-height: 50rpx;
		line-height: 100rpx;
		.xx{
			margin-top: 45rpx;
		}
	}
	.btn{
			width: 692rpx;
			height: 90rpx;
			background-color: #f73267;
			border-radius: 45rpx;
			color: #FFFFFF;
			text-align: center;
			line-height: 90rpx;
			margin: 200rpx auto 0rpx;
	}
</style>
