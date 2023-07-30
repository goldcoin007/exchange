import app from "@/app.js"
import Cache from "../cache.js"
let settings = {
	method: "get",	// 默认请求方法
	contentType: "application/json", // 传参格式
	dataType: "json", // 返回值类型
	baseUrl: app.baseUrl + '/api/app', // 请求根地址
}

let loadNum = 0; //加载框的数量
let loadingShow = () => {
	loadNum++
	uni.showLoading({
		title: 'loading...'
	});
}
let loadingHide = () => {
	loadNum--
	if (loadNum <= 0) {
		uni.hideLoading();
	}
}
function x(options = null) {

	// 返回当前实例对象 无需手动return
	return new x.fn.init(options);

}

x.fn = x.prototype = {

	constructor: x,

	config(options) {
		// 解构并设置默认值
		let {
			baseUrl,
			url,
			data,
			method,
			contentType,
			dataType
		} = options;

		// 请求头参数 写入token和language
		let auth = null;
		if (uni.getStorageSync('token')) {
			auth = uni.getStorageSync('token');
		}
        
        let lang=uni.getStorageSync('language')
		const header = auth ? {
			'X-Requested-With': 'XMLHttpRequest',
			lang: lang || 'en',
			authorization: `bearer ${auth}`,
            'content-type': 'application/x-www-form-urlencoded'
		} : {
				'X-Requested-With': 'XMLHttpRequest',
				lang: lang || 'en',
                'content-type': 'application/x-www-form-urlencoded'
			};

		this.header = header;

		// 请求地址解析
		if (url.startsWith('http')) { // 外部链接
			this.url = url;
		} else { // 本地相对路径
			this.url = baseUrl + url;
		}

		if (data) this.data = data;
		if (method) this.method = method;
		if (contentType) this.contentType = contentType;
		if (dataType) this.dataType = dataType;
	},

	init(options) {
		// 将用户参数 写入配置信息
		this.config(Object.assign(settings, options));
		let { config = {} } = options
		return new Promise((resolve, reject) => {
            let reg=new RegExp('/','g')//g代表全部
            let newMsg=options.url.replace(reg,'_');
            if(Cache.get(newMsg).data){
				if(newMsg!=="_user_walletImage")
                    resolve(Cache.get(newMsg).data);
                uni.request({
                	url: this.url,
                	data: this.data,
                	method: this.method,
                	header: this.header,
                	dataType: this.dataType,
                	sslVerify: false,
                	success: (res) => {
                		let message = res.data.message
                		let code = res.data.code
                		if (code != 200) {
                			switch (code) {
                				case 1003: // 登陆失效 清除状态 重新登陆
                					// 清除session
                					uni.removeStorageSync('token');
                					uni.redirectTo({
                						url: "/pages/login/index",
                					});
                					break;
                				case 1021:
                					resolve(res.data);
                					break;
                                case 4001:
                                    resolve(res.data);
                                    break;
                				default:
                					reject(message);
                					break;
                			}
                			if (config.toast !== false&&message) {
                				uni.showToast({
                					title: message,
                					duration: 2000,
                					icon: 'none'
                				});
                			}
                		} else {
                            Cache.set(newMsg,res.data);
                			resolve(res.data); // 直接返回数据
                			if (config.toast&&message) {
                				uni.showToast({
                					title: message,
                					duration: 2000,
                					icon: 'none'
                				});
                			}
                		}
                	},
                	fail: (err) => {
                        console.log(err)
                		reject(err)
                		if (config.toast !== false) {
                			// uni.showToast({
                			// 	title: 'error reload！',
                			// 	icon: "none"
                			// });
                		}
                		if (err) {
                			throw new Error();
                		}
                	},
                	complete: (er) => {
                        console.log()
                        reject(er)
                	}
                })
            }else{
                // 提示状态
                if (config.loading) {
                	loadingShow()
                }
                uni.request({
                	url: this.url,
                	data: this.data,
                	method: this.method,
                	header: this.header,
                	dataType: this.dataType,
                	sslVerify: false,
                	success: (res) => {
                		let message = res.data.message
                		let code = res.data.code
                		if (code != 200) {
                			switch (code) {
                				case 1003: // 登陆失效 清除状态 重新登陆
                					// 清除session
                					uni.removeStorageSync('token');
                					uni.redirectTo({
                						url: "/pages/login/index",
                					});
                					break;
                				case 1021:
                					resolve(res.data);
                					break;
                                case 4001:
                                    resolve(res.data);
                                    break;
                				default:
                					reject(message);
                					break;
                			}
                			if (config.toast !== false&&message) {
                				uni.showToast({
                					title: message,
                					duration: 2000,
                					icon: 'none'
                				});
                			}
                		} else {
                            Cache.set(newMsg,res.data);
                			resolve(Cache.get(newMsg).data); // 直接返回数据
                			if (config.toast&&message) {
                				uni.showToast({
                					title: message,
                					duration: 2000,
                					icon: 'none'
                				});
                			}
                		}
                	},
                	fail: (err) => {
                		reject(err)
                		if (config.toast !== false) {
                			uni.showToast({
                				title: 'error reload！',
                				icon: "none"
                			});
                		}
                		if (err) {
                			throw new Error();
                		}
                	},
                	complete: () => {
                		loadingHide()
                	}
                })
            }
            
		})

	},

	// 使用promise封装同步化的确认框
	confirmSync(content, fullfilled, rejected = null) {
		let showCancel = false;
		if (rejected instanceof Function) {
			showCancel = true;
		}
		return new Promise(function (resolve, reject) {
			uni.showModal({
				content,
				showCancel,
				success(res) { // confirm or cancel
					if (res.confirm) {
						resolve(fullfilled()); // 执行动作 需要返回值 则标记到resolve中
					} else if (res.cancel && rejected) {
						reject(rejected()); // 执行动作 需要返回值 则标记到reject中
					}
				}
			})
		})
	},

	get(url, data = null, config = {}) {
		return x({
			method: "get",
			url,
			data,
			config
		})
	},

	post(url, data, config = {}) {
		return x({
			method: "post",
			url,
			data,
			config
		})
	},
	// data 为uni的chooseImage
	uploadFile(url, data, config = {}) {
		let auth = null;
		if (uni.getStorageSync('token')) {
			auth = uni.getStorageSync('token');
		}
        let lang=uni.getStorageSync('language')
		let header = {
			'X-Requested-With': 'XMLHttpRequest',
			lang: lang || "en",
		}
		if (auth) header.authorization = `bearer ${auth}`;
		if (config.loading !== false) {
			loadingShow()
		}
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: settings.baseUrl + url, //仅为示例，非真实的接口地址
				filePath: data.tempFilePaths[0],
				name: 'image',
				formData: {},
				sslVerify: false,
				header,
				success: (res) => {
					resolve(JSON.parse(res.data))
				},
				fail: () => {
					reject()
				},
				complete: () => {
					loadingHide()
				}
			});
		})

	},
	head() {

	},
	put() {

	},
	// ...
}

x.fn.init.prototype = x.fn, x.extend = x.fn.extend = function (obj, prop) {
	if (!prop) { //如果未设置prop 则表示给this扩展一个对象的内容
		prop = obj;
		obj = this;
	}
	for (var i in prop) obj[i] = prop[i];
}, x.extend(x.fn);

export default x;
