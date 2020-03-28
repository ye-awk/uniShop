<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">用户名</text>
					<input 
						type="text"
						:value="username" 
						placeholder="请输入用户名"
						maxlength="11"
					/>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input 
						type="mobile" 
						:value="pwd" 
						placeholder="8-18位不含特殊字符的数字、字母组合"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password"
						@input="inputChange"
						@confirm="toLogin"
					/>
				</view>
			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
			<view class="forget-section">
				忘记密码?
			</view>
		</view>
		<view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text>
		</view>
	</view>
</template>

<script>
	
	export default{
		data(){
			return {
				username:'admin',
				logining: false,
				pwd:'12345678',
			}
		},
		onLoad(){
		
		},
		methods: {
			async toLogin(){
				const res = await this.myRuquest({
					url:'addons/xshop/index/login',
					method:"POST",
					data:{username:this.username,password:this.pwd,loginWay:0},
				})
				console.log(res);
				let token = res.data.data.token;
				uni.setStorage({
					key:"token",
					data:res.data.data.token,
					success: function () {
					        console.log('success');
					}
				})
				const Info = await this.myRuquest({
					url:'addons/xshop/User/index?',
					header:{
						'Xshop-Token':token,
					},
				})
				console.log(Info);
				uni.switchTab({
					url:'../mine/mine'
				})
			}
		},

	}
</script>

<style lang='scss' scoped>
	page{
		background: #fff;
		height: 100%;
	}
	.container{
		padding-top: 115px;
		position:relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #fff;
		box-sizing: border-box;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		/* color: $font-color-dark; */
	}
	.left-top-sign{
		font-size: 120upx;
		color: #E9E9E9;
		position:relative;
		left: -16upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -640upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
		z-index: 9999;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.input-content{
		padding: 0 60upx;
	}
	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background-color: #F1F1F1;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 56upx;
			font-size: 28rpx;
			color: #606266;
		}
		input{
			height: 60upx;
			font-size: 28rpx;
			color: #606266;
			width: 100%;
		}	
	}

	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background-color: #DD4A68;
		color: #fff;
		font-size: 30rpx;
		&:after{
			border-radius: 100px;
		}
	}
	.forget-section{
		font-size: 28rpx;
		color: #0086B3;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: -300upx;
		width: 100%;
		color: #606266;
		font-size: 28rpx;
		text-align: center;
		z-index: 9999;
		text{
			color: #0086B3;
			margin-left: 10upx;
		}
	}
</style>

