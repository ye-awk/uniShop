<template>
	<view>
		<uni-nav-bar left-icon="back"  title="设置" @clickLeft="go"></uni-nav-bar>
		<view class="item" @click="open">
			<view class="title">
				昵称
			</view>
			<view class="it">
				{{username}}
			</view>
		</view>
		<view class="item" @click="up()">
			<view class="title">
				修改密码
			</view>
			<image class="img" src="../../static/img/rightjt.png" mode=""></image>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="from">
				<view class="header">
					修改昵称
				</view>
				<view class="inp">
					<input type="text" v-model="newUsername" placeholder="请输入2-8位昵称" />
				</view>
				<view class="btn">
					<view class="ent" @click="en()">
						确认
					</view>
					<view class="clo" @click="clo()">
						取消
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
	
</template>

<script>
	import {uniNavBar,uniPopup} from "@dcloudio/uni-ui"
	export default {
		data(){
			return{
				username:'mister',
				newUsername:'',
			}
		},
		components:{
			uniNavBar,
			uniPopup
		},
		methods:{
			open(){
			         this.$refs.popup.open()
					 
			      },
				up(){
					uni.navigateTo({
						url:"./updatepwd"
					})
				},
				go(){
					uni.switchTab({
						url:'../mine/mine'
					})
				},
				clo(){
					this.$refs.popup.close()
				},
				en(){
					this.username = this.newUsername;
					this.$refs.popup.close()
					// console.log(this.username);
				}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f1f1f1;
	}
	.item{
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		padding: 0rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		line-height: 100rpx;
		.title{
			font-size: 30rpx;
			
		}
		.it{
			font-size: 24rpx;
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
	.from{
		width: 600rpx;
		height: 300rpx;
		background-color: #fff;
		box-sizing: border-box;
		border-radius: 10rpx;
		.header{
			width: 600rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			
		}
		.inp{
			width: 600rpx;
			height: 120rpx;
			box-sizing: border-box;
			padding: 0rpx 30rpx;
			overflow: hidden;
			input{
				border: 1rpx solid #CCCCCC;
				height: 50rpx;
				margin-top: 35rpx;
			}
		}
		.btn{
			width: 600rpx;
			height: 100rpx;
			display: flex;
			box-sizing: border-box;
			border-top: 1rpx solid #CCCCCC;
			.ent{
				width: 300rpx;
				height: 100rpx;
				box-sizing: border-box;
				border-right: 1rpx solid #CCCCCC;
				text-align: center;
				line-height: 100rpx;
			}
			.clo{
				width: 300rpx;
				height: 100rpx;
				box-sizing: border-box;
				text-align: center;
				line-height: 100rpx;
			}
		}
	}
</style>
