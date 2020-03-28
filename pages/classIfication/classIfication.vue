<template>
	<view >
		<uni-nav-bar left-icon="back" left-text="返回" title="分类"></uni-nav-bar>
		<view class="list_box">
			<view class="left">
				<scroll-view scroll-y="true" :style="{ 'height':scrollHeight }">
					<view 
						v-for="(item,index) in leftItem"
						:key="item.id" 
						:class='index == leftIndex?"active item":"item"'
						:data-index="index"
						@tap="leftTap"
						@click="changeIndex(index)"
					>{{item.name}}</view>
		        </scroll-view>
			</view>
			<view class="main">
				<scroll-view  scroll-y="true" :style="{ 'height':scrollHeight }" @scroll="mainScroll" :scroll-into-view="scrollInto" scroll-with-animation="true">
						<view class="item" v-for="(item,index) in leftItem"  :key="index"  >
							<view v-for="(item2,index2) in item.childlist" @click="toList()" :key="index2" :id="'item-'+index">
								<view class="title">
									<view>{{item2.name}}</view>
								</view>
								<view class="goosCont">
									<view class="goods" v-for="(item3,index3) in item2.childlist" :key="index3">
										<image :src="item3.image" mode="aspectFill"></image>
										<view>
											<text>{{item3.name}}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
				</scroll-view>
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
				scrollHeight:'500px',
				leftArray:[],
				mainArray:[],
				topArr:[],
				leftIndex:0,
				scrollInto:'',
				leftItem:[],
			}
		},
		components:{
			uniNavBar
		},
		onLoad(){
			uni.getSystemInfo({
				success:(res)=>{
					/* 设置当前滚动容器的高，若非窗口的高度，请自行修改 */
					this.scrollHeight=`${res.windowHeight}px`;
				}
			});
		},
		mounted(){
		},
		created(){
			this.getCategory();
		},
		methods: {
			async getCategory(){
				const res = await this.myRuquest({
					url:'addons/xshop/category'
				})
				console.log(res);
				this.leftItem = res.data.data;
			},
			/* 获取元素顶部信息 */
			getElementTop(){
				/* Promise 对象数组 */
				let p_arr=[];
				
				/* 新建 Promise 方法 */
				let new_p=(selector)=>{
					return new Promise((resolve,reject)=>{
						let view = uni.createSelectorQuery().select(selector);
						view.boundingClientRect(data => {
							resolve(data.top);
						}).exec();
					})
				}
				
				/* 遍历数据，创建相应的 Promise 数组数据 */
				this.mainArray.forEach((item,index)=>{
					p_arr.push(new_p(`#item-${index}`));
				});
				
				/* 所有节点信息返回后调用该方法 */
				Promise.all(p_arr).then((data)=>{
					this.topArr=data;					
				});
			},
			/* 主区域滚动监听 */
			mainScroll(e){
				let top =e.detail.scrollTop;
				let index=0;
				/* 查找当前滚动距离 */
				for(let i = (this.topArr.length-1);i>=0;i--){
					/* 在部分安卓设备上，因手机逻辑分辨率与rpx单位计算不是整数，滚动距离与有误差，增加2px来完善该问题 */
					if((top+2)>=this.topArr[i]){
						index = i;
						break;
					}
				}
				this.leftIndex=(index < 0 ? 0: index);
			},
			/* 左侧导航点击 */
			leftTap(e){
				let index=e.currentTarget.dataset.index;
				this.scrollInto=`item-${index}`;
				this.leftIndex = index;
				console.log(this.leftIndex);
			},
			toList(){
				uni.navigateTo({
					url:'../productsDetail/list'
				})
			},
			changeIndex(index){
				this.leftIndex = index;
				console.log(index);
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100%;
	}
.list_box{
	display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
	font-size: 28rpx;
	
	.left{
		width: 200rpx;
		background-color: #f6f6f6;
		line-height: 80rpx;
		box-sizing: border-box;
		font-size: 32rpx;
		
		.item{
			padding-left: 20rpx;
			position: relative;
			&:not(:first-child) {
				margin-top: 1px;
			
				&::after {
					content: '';
					display: block;
					height: 0;
					border-top: #d6d6d6 solid 1px;
					width: 620upx;
					position: absolute;
					top: -1px;
					right: 0;
					transform:scaleY(0.5);	/* 1px像素 */
				}
			}
			
			&.active{
				color: #42b983 !important;
				background-color: #fff !important;
			}
		}
	}
	.main{
		background-color: #fff;
		padding-left: 20rpx;
		width: 0;
		flex-grow: 1;
		box-sizing: border-box;
		
		
		
		.title{
			line-height: 64rpx;
			font-size: 24rpx;
			font-weight: bold;
			color: #666;
			background-color: #fff;
			position: sticky;
			top: 0;
			z-index: 19;
		}
		
		.item{
			padding-bottom: 10rpx;
			border-bottom: #eee solid 1px;
			
		}
		.goosCont{
			display: flex;
			.goods{
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
				text-align: center;
			margin: 10rpx 20rpx;
			&>image{
				width: 120rpx;
				height: 120rpx;
				margin-right: 16rpx;
			}
		}
		
			
			.describe{
				font-size: 24rpx;
				color: #999;
			}
			
			.money{
				font-size: 24rpx;
				color: #efba21;
			}
		}
	}
}
</style>
