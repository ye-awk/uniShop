<template>
	<view class="content">
		<uni-nav-bar left-icon="back"  title="订单"  @clickLeft="go"></uni-nav-bar>
		<view class="navbar">
			<view 
				v-for="(item, index) in navList" :key="index" 
				class="nav-item" 
				:class="{current: tabCurrentIndex == index}"
				@click="tabClick(index)"
			>
				{{item.text}}
			</view>
		</view>
		<swiper class="swi" :current="tabCurrentIndex" circular="true">
			<swiper-item>
				<scroll-view scroll-y class="list-scroll-content" >
					<orderItem state="0"></orderItem>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y class="list-scroll-content" >
					<orderItem state="1"></orderItem>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y class="list-scroll-content" >
					<orderItem state="2"></orderItem>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y class="list-scroll-content" >
					<orderItem state="3"></orderItem>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {uniNavBar} from "@dcloudio/uni-ui"
	import orderItem from "../../components/orderItem.vue"
	export default {
		data(){
			return{
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '全部',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 1,
						text: '待付款',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 2,
						text: '待收货',
						loadingType: 'more',
						orderList: []
					},
					{
						state: 3,
						text: '待评价',
						loadingType: 'more',
						orderList: []
					},
				],
			}
		},
		onLoad(options) {
			console.log(options.state)
			this.tabCurrentIndex = options.state
		},
		components:{
			uniNavBar,
			orderItem
		},
		methods:{
			tabClick(index){
				this.tabCurrentIndex = index;
			},
			go(){
				uni.switchTab({
					url:'../mine/mine'
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	page, .content{
		background: #F1F1F1;
		height: 100%;
		overflow: hidden;
	}
	.list-scroll-content{
		height: 100%;
	}
	.navbar{
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0,0,0,.06);
		position: relative;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: #000000;
			position: relative;
		}
		.current{
			color: #DD4A68 !important;
			border-bottom: 4rpx solid #DD4A68;
		}
	}
	.swi{
		width: 100%;
		height: calc(100% - 150rpx);
		swiper-item{
			width: 100%;
		}
	}
	uni-swiper{
		height: auto;
	}
	.uni-swiper-item{
		height: auto;
		overflow: visible;
	}
</style>
