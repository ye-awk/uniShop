<template>
	<view class="content">
		<uni-nav-bar left-icon="back" title="商品列表" @clickLeft="back()"></uni-nav-bar>
		<view class="navBar">
			<view class="navItem" :class="{active: actIndex === 0}" @click="actIndexCh(0)">
				综合排序
			</view>
			<view class="navItem" :class="{active: actIndex === 1}" @click="actIndexCh(1)">
				销量优先
			</view>
			<view class="navItem" :class="{active: actIndex === 2}" @click="actIndexCh(2)">
				价格
				<image class="img" :class="{hidden:actIndex !=2 || ord == false}" src="../../static/sheng.png"></image>
				<image class="img" :class="{hidden:actIndex !=2 || ord == true}" src="../../static/jiang.png"></image>
			</view>
		</view>
		<scroll-view class="goodsList" scroll-y @scrolltolower="newPage()">
				<view class="goodItem" v-for="(item,index) in goodsList" :key="item.id" @click="toProduct(item)">
					<image class="img" src="../../static/logo.png"></image>
					<!-- <rich-text :nodes="item.content"></rich-text> -->
					<text class="title">{{item.title}}</text>
					<view class="attr">
						<text class="price">¥{{item.price}}</text>
						<text class="count">已售 ：{{item.sold_count}}</text>
					</view>
				</view>
			
			<view class="nomore">
				<uni-load-more status="noMore"></uni-load-more>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	import {uniNavBar,uniLoadMore} from "@dcloudio/uni-ui"
	export default {
		data(){
			return {
				goodsList:[],
				actIndex:0,
				sort:0,
				priceOrder:null,
				url:'addons/xshop/product/getList?sort=0',
				ord:true,
			}
		},
		components:{
			uniNavBar,
			uniLoadMore,
		},
		created(){
			this.getGoods();
		},
		methods:{
			actIndexCh(index){
				if(index == 2){
					this.sort = index;
					this.actIndex = index;
					if(this.priceOrder == 0){
						this.priceOrder = 1;
						this.ord = false;
						this.url = 'addons/xshop/product/getList?sort=2&priceOrder=1'
						this.getGoods();
					}else{
						this.priceOrder = 0;
						this.ord = true;
						this.url = 'addons/xshop/product/getList?sort=2&priceOrder=0'
						this.getGoods();
					}
				}else{
					this.actIndex = index;
					this.sort = index;
					this.url = 'addons/xshop/product/getList?sort='+this.sort;
					this.getGoods();
				}
			},
			async getGoods(){
				const res = await this.myRuquest({
					url:this.url,
				})
				// console.log(res);
				this.goodsList = res.data.data.data;
				console.log(this.goodsList);
			},
			back(){
				uni.navigateBack({
					
				})
			},
			toProduct(item){
				uni.navigateTo({
					url:'./productsDetail?id='+item.id
				})
			},
			newPage(){
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	page,.content{
		background-color: #F1F1F1;
		height: 100%;
	}
	.hidden{
		display: none;
	}
	.navBar{
		width: 100%;
		height: 80rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-around;
		.navItem{
			width: 165rpx;
			height: 65rpx;
			margin-top: 15rpx;
			text-align: center;
			line-height: 65rpx;
			font-size: 30rpx;
			box-sizing: border-box;
			.img{
				width: 30rpx;
				height: 30rpx;
			}
		}
		.active{
			color: #DD4A68 !important;
			border-bottom: 4rpx solid #DD4A68 !important;
		}
	}
	.goodsList{
		width: 100%;
		background-color: #FFFFFF;
		height: calc(100% - 160rpx);
		
			.goodItem{
				width: 305rpx;
				height: 420rpx;
				float: left;
				margin: 20rpx 35rpx 0rpx;
				display: block;
				position: relative;
				.img{
					width: 305rpx;
					height: 330rpx;
				}
				.title{
					font-size: 30rpx;
					color: #000000;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					display: block;
				}
				.attr{
					width: 100%;
					display: flex;
					margin-top: 10rpx;
					.price{
						font-size: 24rpx;
						color: #fb426c;
						display: block;
					}
					.count{
						font-size: 22rpx;
						color: #C0C0C0;
						display: block;
						margin-left: auto;
					}
				}
			}
		.nomore{
			width: 100%;
			float: left;
		}
	}
</style>
