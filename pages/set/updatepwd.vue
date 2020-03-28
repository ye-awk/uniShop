<template>
	<view>
		<uni-nav-bar left-icon="back"  title="修改密码" @clickLeft="go"></uni-nav-bar>
		<view class="from">
			<view :class='inp0?"jus item":"item"' @click="showinp(0)" >
				<view class="title">
					旧密码
				</view>
				<input :class='inp0?"text-left inp":"inp"' type="password" value="" placeholder="请输入旧密码" />
				<!-- <view  :class='inp0?"hidden it":"it"'>
					请输入旧密码
				</view> -->
			</view>
			<view :class='inp1?"jus item":"item"' @click="showinp(1)">
				<view class="title">
					新密码
				</view>
				<input :class='inp1?"text-left inp":"inp"' type="password" value="" placeholder="请设置新密码" />
				<!-- <view :class='inp1?"hidden it":"it"'>
					请设置新密码
				</view> -->
			</view>
			<view :class='inp2?"jus item":"item"' @click="showinp(2)">
				<view class="title">
					确认密码
				</view>
				<input  :class='inp2?"text-left inp":"inp"' type="password" value="" placeholder="请再次输入新密码" />
				<!-- <view :class='inp2?"hidden it":"it"'>
					请再次输入新密码
				</view> -->
			</view>
		</view>
		<view class="btn">
			完成
		</view>
	</view>
</template>

<script>
	import {uniNavBar} from "@dcloudio/uni-ui"
	export default {
		data(){
			return{
				inp0:false,
				inp1:false,
				inp2:false,
			}
		},
		components:{
			uniNavBar
		},
		methods:{
			showinp(index){
				if(index === 0){
					this.inp0 = true;
				}else if(index === 1){
					this.inp1 = true;
				}else{
					this.inp2 = true;
				}
				
			},
			go(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F1F1F1;
	}
	.show{
		display: block !important;
	}
	.hidden{
		display: none !important;
	}
	.text-left{
		text-align: left !important;
	}
	.jus{
		justify-content: flex-start !important;
	}
	.from{
		width: 100%;
		margin-top: 30rpx;
		box-sizing: border-box;
		.item{
			width: 100%;
			height: 100rpx;
			background-color: #fff;
			padding: 0rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			line-height: 100rpx;
			justify-content: space-between;
			.title{
				font-size: 30rpx;
				
			}
			.inp{
				height: 40rpx;
				margin-top: 30rpx;
				margin-left: 20rpx;
				display: block;
				text-align: right;
			}
			.it{
				font-size: 30rpx;
				color: #CCCCCC;
				margin-left: auto;
			}
			.img{
				width: 30rpx;
				height: 30rpx;
				margin-top: 35rpx;
				margin-left: auto;
			}
		}
	}
	.btn{
		width: 690rpx;
		height: 100rpx;
		background-color: #DD4A68;
		color: #fff;
		font-size: 40rpx;
		text-align: center;
		line-height: 100rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		margin: 200rpx auto;
	}
</style>
