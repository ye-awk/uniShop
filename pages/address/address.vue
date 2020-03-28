<template>
	<view>
		<uni-nav-bar left-icon="back"   title="收货地址" @clickLeft="goBack()" ></uni-nav-bar>
		<view class="content b-t">
			<view class="list b-b" v-for="(item, index) in this.$store.state.addressList" :key="index" >
				<view class="wrapper">
					<view class="address-box">
						<text v-if="item.default" class="tag">默认</text>
						<text class="address">{{item.addressName}} {{item.area}}</text>
					</view>
					<view class="u-box">
						<text class="name">{{item.name}}</text>
						<text class="mobile">{{item.mobile}}</text>
					</view>
				</view>
				<view>
					<uni-icons type="compose" size="30" @click="addAddress('edit',item,index)"></uni-icons>
					<uni-icons type="trash" size="30"></uni-icons>
				</view>
			</view>
			
			<button class="add-btn" @click="addAddress('add')">新增地址</button>
		</view>
	</view>
</template>

<script>
	import {uniNavBar,uniIcons} from "@dcloudio/uni-ui"
	export default {
		data() {
			return {
				// addressList: [
				// 	{
				// 		name: '刘晓晓',
				// 		mobile: '18666666666',
				// 		addressName: '贵族皇仕牛排(东城店)',
				// 		address: '北京市东城区',
				// 		area: 'B区',
				// 		default: true
				// 	},{
				// 		name: '刘大大',
				// 		mobile: '18667766666',
				// 		addressName: '龙回1区12号楼',
				// 		address: '山东省济南市历城区',
				// 		area: '西单元302',
				// 		default: false,
				// 	}
				// ]
			}
		},
		created() {
			this.getAddr();
		},
		components:{
			uniNavBar,
			uniIcons
		},
		methods: {
		    async getAddr(){
				let token;
				uni.getStorage({
					key:'token',
					success: (res)=>{
						token  = res.data
					}
				})
				const res = await this. myRuquest({
					url:'addons/xshop/user/getAddress',
					header:{
						'Xshop-Token':token,
					}
				})
				console.log(res);
			},
			addAddress(type,item,index){
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}&index=${index}`
				})
			},
			goBack(){
				uni.switchTab({
					url:"../mine/mine"
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	page{
		padding-bottom: 120upx;
	}
	.content{
		position: relative;
	}
	.list{
		display: flex;
		align-items: center;
		padding: 20upx 30upx;;
		background: #fff;
		position: relative;
		border-bottom: 1px solid #C0C0C0;
	}
	.wrapper{
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.address-box{
		display: flex;
		align-items: center;
		.tag{
			font-size: 24upx;
			color: #DD524D;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}
		.address{
			font-size: 30upx;
			color: #000000;
		}
	}
	.u-box{
		font-size: 28upx;
		color: #C0C0C0;
		margin-top: 16upx;
		.name{
			margin-right: 30upx;
		}
	}
	
	.add-btn{
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: #DD4A68;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);		
	}
</style>
