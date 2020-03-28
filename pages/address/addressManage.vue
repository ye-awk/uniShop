<template>
	<view>
		<uni-nav-bar left-icon="back"   :title="title" @clickLeft="goBack"></uni-nav-bar>
		<view class="content">
			<view class="row b-b">
				<text class="tit">联系人</text>
				<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">手机号</text>
				<input class="input" type="number" v-model="addressData.mobile" placeholder="收货人手机号码" placeholder-class="placeholder" />
			</view>
			<view class="row b-b">
				<text class="tit">地址</text>
				<text @click="chooseLocation" class="input">
					{{addressData.addressName}}
				</text>
				<text class="yticon icon-shouhuodizhi"></text>
			</view>
			<view class="row b-b"> 
				<text class="tit">门牌号</text>
				<input class="input" type="text" v-model="addressData.area" placeholder="楼号、门牌" placeholder-class="placeholder" />
			</view>
			
			<view class="row default-row">
				<text class="tit">设为默认</text>
				<switch :checked="addressData.default" color="#fa436a" @change="switchChange" />
			</view>
			<button class="add-btn" @click="confirm">提交</button>
		</view>
	</view>
</template>

<script>
	import {uniNavBar} from "@dcloudio/uni-ui"
	export default {
		data() {
			return {
				addressData: {
					name: '',
					mobile: '',
					addressName: '在地图选择',
					address: '',
					area: '',
					default: false
				},
				title:'新增收货地址',
				index:null,
			}
		},
		onLoad(option){
			let title = '新增收货地址';
			if(option.type==='edit'){
				this.title = '编辑收货地址'
				
				this.addressData = JSON.parse(option.data);
				this.index = option.index;
			}else if(option.type === 'add'){
				this.index = null;
			}
			this.manageType = option.type;
			
		},
		components:{
			uniNavBar,
		},
		methods: {
			switchChange(e){
				this.addressData.default = !this.addressData.default;
			},
			
			//地图选择地址
			chooseLocation(){
				uni.chooseLocation({
					success: (data)=> {
						this.addressData.addressName = data.name;
						this.addressData.address = data.name;
					}
				})
			},
			
			//提交
			confirm(){
					if(this.index === null){
						let data = this.addressData;
						let obj = {
							index : this.index,
							data
						};
						this.$store.commit('setAddressList',obj);
						uni.navigateTo({
							url:'./address'
						})
					}else{
						let data = this.addressData;
						let obj = {
							index : this.index,
							data
						}
						this.$store.commit('setAddressList',obj);
						// setTimeout(()=>{
						// 	uni.navigateBack()
						// }, 800)
						// console.log(this.$store.state.addressList[this.index]);
						uni.navigateTo({
							url:'./address'
						})
					}
					
				
			},
			goBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #F1F1F1;
		padding-top: 16upx;
	}
	.content{
		margin-top: 15rpx;
	}
	.row{
		display: flex;
		align-items: center;
		position: relative;
		padding:0 30upx;
		height: 110upx;
		background: #fff;
		border:1rpx solid #E9E9E9;
		.tit{
			flex-shrink: 0;
			width: 120upx;
			font-size: 30upx;
			color: #000;
		}
		.input{
			flex: 1;
			font-size: 30upx;
			color: #CCCCCC;
		}
		.icon-shouhuodizhi{
			font-size: 36upx;
			color: #999999;
		}
	}
	.default-row{
		margin-top: 16upx;
		.tit{
			flex: 1;
		}
		switch{
			transform: translateX(16upx) scale(.9);
		}
	}
	.add-btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: 40rpx;
		color: #fff;
		background-color: #DD4A68;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>