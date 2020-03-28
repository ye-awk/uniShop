<template>
	<view class="content">
		<view class="productSwiper">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true">
				<swiper-item v-for="(item,index) in productList.image" :key="index">
					<image class="img" :src="item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="description">
			<text class="title">{{productList.description}}</text>
			<view class="price">
				<text class="new">¥ {{productList.price}}</text>
				<text class="old">¥ {{productList.price}}</text>
			</view>
		</view>
		<view class="count">
			<text class="sold">销量：{{productList.sold_count}}个</text>
			<text class="sale">库存：{{productList.on_sale}}</text>
		</view>
		<view class="leixing">
			<text class="buytext">购买类型</text>
			<!-- <text class="attrItems" v-if="attrItems.length > 0">{{attrItems[0]}}</text>
			<text class="attrItems" v-if="attrItemsColor.length > 0">{{attrItemsColor[0]}}</text> -->
			<!-- <text class="attrItems">{{attrItems[0]}}</text> -->
			<text class="attrItems">{{attrItemsColor}}</text>
			<image @click="open()" class="img" src="../../static/jiant.png" mode="aspectFill"></image>
		</view>
		<view class="num">
			<text>数量</text>
			<view class="countNum">
				<text class="sub">-</text>
				<text>1</text>
				<text class="add">+</text>
			</view>
		</view>
		<view class="fg">

		</view>
		<view class="comment">
			<view class="header">
				<text>评论</text>
				<text class="right">好评率 无</text>
			</view>
			<view class="user">
				<image class="img" src="../../static/logo.png"></image>
				<text class="name">名字</text>
				<text class="data">日期</text>
			</view>
			<view class="msg">
				11111111111111
			</view>
		</view>
		<view class="fg">
		</view>
		<view class="PtDetails">
			<text>——</text>
			<text class="text">图文详情</text>
			<text>——</text>
		</view>
		<!-- 商品导航 -->
		<view class="GoodsNav">
			<view class="list">
				<image class="img" src="../../static/img/index.png"></image>
				<text class="tx">首页</text>
			</view>
			<view class="list">
				<image class="img" src="../../static/img/car.png"></image>
				<text class="tx">购物车</text>
			</view>
			<view class="list">
				<image class="img" src="../../static/img/favorite.png" @click="sc()"></image>
				<text class="tx">收藏</text>
			</view>
			<view class="btn">
				<view class="buy" @click="buy">
					<text>立即购买</text>
				</view>
				<view class="join">
					<text>加入购物车</text>
				</view>
			</view>
		</view>
		<!-- <uni-goods-nav :fill="true"  :options="options" :button-group="buttonGroup"  @click="onClick" @buttonClick="buttonClick" ></uni-goods-nav> -->
		<uni-popup ref="popup" type="bottom">
			<view class="sel">
				<view class="head">
					<image class="img" src="../../static/logo.png"></image>
					<text class="title">90.0</text>
					<text class="kc">库存：100 个</text>
					<text class="chose">已选：25cm</text>
				</view>
				<view class="lx" v-for="(item,index) in productList.attrGroup" :key="index">
					<text class="ti">{{item}}</text>
					<view class="ch">
						<view class="lxbtn" 
						@click="getAttr(index2,index)"
						:class="{active:arr[index][index2].flag === true}"
						v-for="(item2,index2) in arr[index]" 
						:key="index2+'ch'">
							{{item2.attr}}
						</view>
					</view>
				</view>
				<view class="nump">
					<text>数量</text>
					<view class="countNump">
						<text class="subp">-</text>
						<text>1</text>
						<text class="addp">+</text>
					</view>
				</view>
				<view class="wangcheng" @click="wach">
					完成
				</view>
			</view>
		</uni-popup>
		<!-- <rich-text :nodes="strings"></rich-text> -->
	</view>
</template>

<script>
	import {
		uniGoodsNav,
		uniPopup
	} from '@dcloudio/uni-ui'
	export default {
		data() {
			return {
				productId: null,
				productList: {},
				attrItems: [],
				activeIndex:[],
				strings:'',
				arr:[],
				attrItemsColor:''
			}
		},
		components: {
			uniGoodsNav,
			uniPopup,
		},
		onLoad(option) {
			// console.log(option);
			this.productId = option.id;
		},
		created() {
			this.getDetail();
		},
		methods: {
			async getDetail() {
				const res = await this.myRuquest({
					url: 'addons/xshop/product',
					data: {
						id: this.productId
					},
				})
				// console.log(res);
				this.productList = res.data.data;
				console.log(this.productList);
				this.strings = this.productList.content;
				this.attrItems = res.data.data.attrItems;
				// console.log(this.attrItems)
				for(let i=0;i<res.data.data.attrItems.length;i++){
					this.arr.push(
						[]
					)
				};
				for(let j=0;j<res.data.data.attrItems.length;j++){
					for(let k =0;k<res.data.data.attrItems[j].length;k++){
						this.arr[j].push({
							attr:res.data.data.attrItems[j][k],
							flag:false,
						})
					}
				}
				console.log(this.arr)
			},
			open() {
				this.$refs.popup.open();
			},
			getAttr(index2,index){
				// console.log(index2,index)
				for(let i=0;i<this.arr[index].length;i++){
					this.arr[index][i].flag = false;
				}
				this.arr[index][index2].flag = true;
				console.log(this.arr);
			},
			buy(){
				uni.navigateTo({
					url:'../order/createOrder'
				})
			},
			wach(){
				this.$refs.popup.close();
				for(let j=0;j<this.arr.length;j++){
					for(let k =0;k<this.arr[j].length;k++){
						if(this.arr[j][k].flag){
							this.attrItemsColor = this.attrItemsColor+this.arr[j][k].attr
						}
					}
				}
			},
			async sc(){
				const res = await this.myRuquest({
					url:"addons/xshop/product/favorite",
					method:"POST",
					data:{id:this.productId,state:false},
				})
				// console.log(res);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;
		.active{
			background-color: #DD524D !important;
		}
		.productSwiper {
			width: 750rpx;
			height: 728rpx;

			.swiper {
				width: 100%;
				height: 728rpx;

				.img {
					width: 100%;
					height: 728rpx;
				}
			}
		}

		.fg {
			width: 100%;
			height: 20rpx;
			background-color: #f7f7f5;
		}

		.description {
			width: 100%;
			height: 155rpx;
			box-sizing: border-box;
			padding: 0rpx 30rpx;

			.title {
				font-size: 35rpx;
				letter-spacing: 3rpx;
			}

			.price {
				.new {
					font-family: PingFang-SC-Medium;
					font-size: 24rpx;
					font-weight: bold;
					font-stretch: normal;
					letter-spacing: -1rpx;
					color: #fb426c;
				}

				.old {
					font-family: PingFang-SC-Medium;
					font-size: 20rpx;
					font-weight: bold;
					font-stretch: normal;
					letter-spacing: -1rpx;
					color: #7b7b7b;
					margin-left: 10rpx;
					text-decoration: line-through;
				}
			}
		}

		.count {
			width: 100%;
			height: 40rpx;
			line-height: 40rpx;
			padding: 0rpx 30rpx;
			box-sizing: border-box;
			.sold {
				font-size: 20rpx;
				color: #7b7b7b;
				width: 245rpx;
				height: 40rpx;
				display: inline-block;
			}

			.sale {
				width: 245rpx;
				font-size: 20rpx;
				color: #7b7b7b;
				height: 40rpx;
				display: inline-block;
			}
		}

		.leixing {
			font-size: 30rpx;
			color: #7b7b7b;
			width: 100%;
			height: 60rpx;
			line-height: 60rpx;
			padding: 0rpx 30rpx;
			margin-top: 20rpx;
			border-bottom: 1rpx solid #e3e3e3;
			box-sizing: border-box;
			display: flex;

			.buytext {
				margin-right: 30rpx;
			}

			.attrItems {
				padding: 0rpx 5rpx;
				color: #000;
			}

			.img {
				width: 21rpx;
				height: 38rpx;
				margin-top: 11rpx;
				margin-left: auto;
			}
		}

		.num {
			width: 100%;
			height: 80rpx;
			padding: 0rpx 30rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #e3e3e3;
			display: flex;
			font-size: 30rpx;
			line-height: 80rpx;
			color: #7b7b7b;

			.countNum {
				display: flex;
				margin-left: auto;

				.add {
					width: 42rpx;
					height: 42rpx;
					background-color: #fb426c;
					display: block;
					border-radius: 50%;
					color: #fff;
					text-align: center;
					line-height: 42rpx;
					margin: 19rpx 5rpx;
					box-sizing: border-box;
				}

				.sub {
					width: 42rpx;
					height: 42rpx;
					background-color: #fb426c;
					display: block;
					border-radius: 50%;
					color: #fff;
					text-align: center;
					line-height: 42rpx;
					margin: 19rpx 5rpx;
					box-sizing: border-box;
				}
			}
		}

		.comment {
			width: 100%;
			height: 328rpx;
			padding: 0rpx 23rpx;
			box-sizing: border-box;

			.header {
				height: 60rpx;
				width: 100%;
				font-size: 30rpx;
				line-height: 60rpx;
				display: flex;

				.right {
					color: #7b7b7b;
					font-size: 24rpx;
					display: block;
					margin-left: auto;
				}
			}

			.user {
				height: 160rpx;
				width: 100%;
				display: flex;
				line-height: 160rpx;

				.img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin-top: 30rpx;
				}

				.name {
					font-family: PingFang-SC-Regular;
					font-size: 24rpx;
					font-weight: bold;
					font-stretch: normal;
					letter-spacing: 1rpx;
					color: #333333;
				}

				.data {
					display: block;
					margin-left: auto;
					font-family: PingFang-SC-Regular;
					font-size: 20rpx;
					font-weight: bold;
					font-stretch: normal;
					letter-spacing: 1rpx;
					color: #555555;
				}
			}

			.msg {
				font-family: PingFang-SC-Regular;
				font-size: 20rpx;
				font-weight: bold;
				font-stretch: normal;
				letter-spacing: 0rpx;
				color: #555555;
			}
		}

		.PtDetails {
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			display: flex;
			justify-content: center;

			.text {
				margin: 0rpx 20rpx;
			}
		}

		.GoodsNav {
			width: 707rpx;
			height: 100rpx;
			background-color: #ffffff;
			box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.4);
			border-radius: 20rpx;
			position: fixed;
			padding: 10rpx 22rpx;
			left: 50%;
			margin-left: -353.5rpx;
			box-sizing: border-box;
			bottom: 52rpx;
			display: flex;

			.list {
				width: 100rpx;
				height: 90rpx;
				box-sizing: border-box;
				text-align: center;
				padding: 0rpx 17.5rpx;

				.img {
					width: 50rpx;
					height: 50rpx;
				}

				.tx {
					font-size: 20rpx;
					display: block;
				}
			}

			.btn {
				width: 300rpx;
				height: 80rpx;
				margin-left: auto;
				box-sizing: border-box;
				display: flex;
				overflow: hidden;
				border-radius: 50rpx;

				.buy {
					width: 150rpx;
					height: 60rpx;
					padding: 10rpx 0rpx;
					border-right: 1rpx solid #fff;
					text-align: center;
					line-height: 60rpx;
					color: #fff;
					background-color: #F0AD4E;
					font-size: 20rpx;
				}

				.join {
					width: 150rpx;
					height: 60rpx;
					padding: 10rpx 0rpx;
					text-align: center;
					line-height: 60rpx;
					color: #fff;
					background-color: #DD524D;
					font-size: 20rpx;
				}
			}
		}

		.sel {
			width: 100%;
			position: relative;
			bottom: 0rpx;
			background-color: #fff;
			padding: 0rpx 30rpx;
			box-sizing: border-box;

			.head {
				width: 100%;
				height: 180rpx;
				.img {
					width: 180rpx;
					height: 180rpx;
					position: absolute;
					left: 30rpx;
					top: -30rpx;
				}

				text {
					display: block;
					margin-left: 210rpx;
				}

				.title {
					font-size: 35rpx;
					color: #fb426c;
				}

				.kc {
					font-size: 24rpx;
					color: #808080;
					margin-top: 10rpx;
				}

				.chose {
					font-size: 24rpx;
					color: #808080;
					margin-top: 10rpx;
				}
			}

			.lx {
				.ti {
					font-size: 30rpx;
					color: #808080;
				}
				.ch{
					width: 100%;
					height: 60rpx;
					display: flex;
					padding: 10rpx 0rpx;
					box-sizing: border-box;
					.lxbtn{
						width: 80rpx;
						height: 40rpx;
						background-color: #C8C7CC;
						margin: 0rpx 10rpx;
						font-size: 25rpx;
						text-align: center;
						line-height: 40rpx;
						border-radius: 15rpx;
					}
				}
				
			}
			.nump {
				width: 100%;
				height: 80rpx;
				padding: 0rpx 30rpx;
				box-sizing: border-box;
				display: flex;
				font-size: 30rpx;
				line-height: 80rpx;
				color: #7b7b7b;
				.countNump {
					display: flex;
					margin-left: 50rpx;
					.addp {
						width: 42rpx;
						height: 42rpx;
						background-color: #fb426c;
						display: block;
						border-radius: 50%;
						color: #fff;
						text-align: center;
						line-height: 42rpx;
						margin: 19rpx 5rpx;
						box-sizing: border-box;
					}
			
					.subp {
						width: 42rpx;
						height: 42rpx;
						background-color: #fb426c;
						display: block;
						border-radius: 50%;
						color: #fff;
						text-align: center;
						line-height: 42rpx;
						margin: 19rpx 5rpx;
						box-sizing: border-box;
					}
				}
			}
			.wangcheng{
				width: 690rpx;
				height: 70rpx;
				background-color: #DD524D;
				text-align: center;
				line-height: 70rpx;
				color: #fff;
				border-radius: 30rpx;
				margin-top: 20rpx;
			}
		}
	}
</style>
