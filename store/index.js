import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		testmsg:"Vuex",
		addressList: [
			{
				name: '刘晓晓',
				mobile: '18666666666',
				addressName: '贵族皇仕牛排(东城店)',
				address: '北京市东城区',
				area: 'B区',
				default: true,
			},{
				name: '刘大大',
				mobile: '18667766666',
				addressName: '龙回1区12号楼',
				address: '山东省济南市历城区',
				area: '西单元302',
				default: false,
			}
		],
	},
	mutations:{
		setAddressList(state,obj){
			if(obj.index === null){
				state.addressList.push(obj.data);
				if(obj.data.default){
					for(let i=0;i<state.addressList.length;i++){
							state.addressList[i].default = false
					}
				}else{
					
				}
			}else{
				state.addressList[obj.index] = obj.data;
				// console.log(state.addressList[index]);
				if(obj.data.default){
					for(let i=0;i<state.addressList.length;i++){
						if(i == obj.index){
							
						}else{
							state.addressList[i].default = false
						}
					}
				}else{
					
				}
			}
		}
	},
	actions:{
		
	}
})

export default store;