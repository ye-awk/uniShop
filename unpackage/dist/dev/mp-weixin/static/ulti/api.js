
//封装请求
const BASE_URL='http://47.56.173.44/shopdemo/public/index.php/'
export const myRuquest=(options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method:options.method || 'GET',
			data:options.data || {},
			success:(res)=>{
				if(res.statusCode !==200){
					return uni.showToast({
						title:"获取数据失败"
					 })
				}
				resolve(res)
			},
			fail:(err)=>{
				uni.showToast({
					title:"请求接口失败"
				 })
				 reject(err)
			}
		})
	})
}