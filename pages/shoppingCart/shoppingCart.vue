<template>
	<view>
		<uni-nav-bar title="购物车"></uni-nav-bar>
		<view class="empty" :class="{hidden:ept===true}">
			<image class="img" src="../../static/img/emptyCart.jpg" mode="aspectFit"></image>
			<view class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin()">{{msg}}</view>
			</view>
		</view>
		<view class="productList" :class="{hidden:ept===false}">
				<image class="img" src="../../static/banner01.png"  @click="activeList(0)" mode="aspectFill"></image>
				<view v-for="(item,index) in goodsList" :key="index+'g'">
					<text class="title">{{item.title}}</text>
					<text class="attr">{{item.attr}}</text>
					<text class="price">¥{{item.price}}</text>
					<view class="count">
						<view class="sub" @click="sub()">
							-
						</view>
						<view>{{count}}</view>
						<view class="add" @click="add()">
							+
						</view>
					</view>
				</view>
				<view>
					<image   class="close" src="../../static/img/close.png" @click="close()"></image>
				</view>
				<view class="buy" @click="activeList(0)">
					<image :class='buyList[0].attr?"":"show"' style="width: 40rpx;height: 40rpx;position: absolute;" class="buyno" src="../../static/img/buyno.png"></image>
					<image :class='buyList[0].attr?"show":""' style="width: 40rpx;height: 40rpx;position: absolute;" class="buyy" src="../../static/img/buyy.png"></image>
				</view>
		</view>
		<!-- 底部菜单栏 -->
		<view class="bottomNav " :class="{hidden:ept===false}">
			<view class="qk">
				<view :class='qk?"seld":"hidden"'>
					<image src="../../static/img/selected.png"></image>
					<text>清空</text>
				</view>
				<view :class='qk?"hidden":"sel"'>
					<image src="../../static/img/select.png"></image>
				</view>
			</view>
			<view class="js">
				<text>￥ {{sum}}</text>
				<view :class='qk?"btn":"changeColor btn"'>结算</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		uniNavBar
	} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				buyList:[],
				buyicon:false,
				qk:false,
				ept:false,
				count:1,
				sum:8888,
				price:8888,
				goodsList:[
					{
						title:'意式高档极简客厅沙发',
						attr:'灰色',
						price:'8888',
					}
				],
				msg:'去登陆>'
			}
		},
		created() {
			for (let i =0;i<1;i++) {
				let obj = {
					index:i,
					attr:false,
				}
				this.buyList.push(obj);
			}
			uni.getStorage({
				key:'token',
				success: (res) => {
					console.log(res.data);
					if(res.data){
						this.ept = true;
					}
				}
			})
		},
		components: {
			uniNavBar
		},
		methods: {
			activeList(index){
				this.buyList[index].attr= ! this.buyList[index].attr;
				console.log(this.buyList)
				this.forList();
			},
			forList(){
				for(let i=0;i<this.buyList.length;i++){
					if(this.buyList[i].attr){
						this.qk = true;
					}else{
						this.qk = false;
					}
					console.log(this.qk);
				}
			},
			navToLogin(){
				if(this.goodsList == null){
					uni.navigateTo({
						url:'../productsDetail/list'
					})
					console.log(1)
				}else{
					uni.navigateTo({
						url:'../public/login'
					})
				}
				
			},
			sub(){
				if(this.count > 1){
					this.count = this.count -1;
				}else{
					this.count = 1;
				};
				console.log(this.count);
				this.sum = this.price * this.count;
			},
			add(){
				this.count = this.count +1;
				this.sum = this.price * this.count;
			},
			close(){
				this.goodsList = null;
				this.ept = false;
				this.msg = '去逛逛>'
				console.log(this.goodsList);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.changeColor{
		background-color: #C0C0C0 !important;  
	}
	.hidden{
		display: none !important;
	}
	.empty {
		width: 300rpx;
		height: 350rpx;
		position: absolute;
		left: 50%;
		margin-left: -150rpx;
		top: 50%;
		margin-top: -175rpx;
		// display: none;

		.img {
			width: 300rpx;
			height: 300rpx;
		}

		.empty-tips {
			display: flex;
			font-size: 26rpx;
			text-align: center;
			padding: 10rpx 20rpx;
			box-sizing: border-box;
			width: 100%;
			
			.navigator {
				color: #007AFF;
				text-decoration: underline;
				margin-left: 30rpx;
			}
		}
	}
	.productList{
		width: 100%;
		height: 240rpx;
		padding: 10rpx 50rpx;
		box-sizing: border-box;
		display: flex;
		margin: 10rpx 0rpx;
		position: relative;
		// display: none;
		.img{
			width: 220rpx;
			height: 220rpx;
			display: block;
			margin-right: 20rpx;
		}
		.title{
			font-size: 36rpx;
			overflow: hidden;
			display: block;
			margin: 5rpx 0rpx;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.attr{
			font-size: 32rpx;
			color: #999999;
			display: block;
			margin: 5rpx 0rpx;
		}
		.price{
			font-size: 34rpx;
			display: block;
			margin: 5rpx 0rpx;
		}
		.count{
			display: flex;
			text-align: center;
			line-height: 50rpx;
			.add,.sub{
				width: 50rpx;
				height: 50rpx;
				background-color: #C0C0C0;
				text-align: center;
				line-height: 50rpx;
				margin: 10rpx  10rpx;
			}
		}
		.close{
			width: 50rpx;
			height: 50rpx;
			margin-left: 10rpx;
		}
		.buy{
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			top: 10rpx;
			left: 40rpx;
			margin-left: -10rpx;
			margin-top: -10rpx;
			image{
				display: none;
			}
			.show{
				display: block !important;
			}
		}
		
	}
	.bottomNav{
		width: 690rpx;
		height: 130rpx;
		position: fixed;
		left: 30rpx;
		box-shadow: 5rpx 5rpx 30rpx #888;
		box-shadow: -5rpx -5rpx 30rpx #888;
		padding: 0rpx 30rpx;
		display: flex;
		box-sizing: border-box;
		border-radius: 30rpx;
		bottom: 130rpx;
		.qk{
			position: relative;
			height: 50rpx;
			margin: 40rpx 0rpx;
			width: 120rpx;
			.seld{
				height: 50rpx;
				display: flex;
				position: absolute;
				font-size: 28rpx;
				color: #fff;
				width: 120rpx;
				background-color: #CCCCCC;
				border-radius: 20rpx;
				line-height: 50rpx;
				image{
					width: 50rpx;
					height: 50rpx;
				}
				text{
					margin-left: 5rpx;
				}
			}
			.sel{
				position: absolute;
				margin-left: 45rpx;
				image{
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
		.js{
			width: 400rpx ;
			margin-left: auto;
			display: flex;
			height: 130rpx;
			line-height: 130rpx;
			text{
				font-size: 30rpx;
				margin-left: 30rpx;
			}
			.btn{
				width: 200rpx;
				height: 80rpx;
				background-color: #DD4A68;
				line-height: 80rpx;
				text-align: center;
				color: #fff;
				font-size: 34rpx;
				margin-left: auto;
				border-radius: 40rpx;
				margin-top: 25rpx;
			}
		}
	}
</style>
