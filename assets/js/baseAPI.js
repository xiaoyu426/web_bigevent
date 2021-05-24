// 每次发起真正的Ajax请求前都会先调用ajaxPrefilter这个函数
// 传递的option是调用Ajax时传递的配置对象
$.ajaxPrefilter(function (options) {
	options.url = 'http://api-breakingnews-web.itheima.net' + options.url
	// console.log(options.url);



	// 统一为有权限的接口(以/my开头的接口)设置headers请求头
	if (options.url.indexOf('/my/') !== -1) {
		options.headers = {
			Authorization: localStorage.getItem('token' || '')
		}
	}



	// 全局统一挂载complete回调函数
	options.complete = function (res) {
		// console.log(res);
		// 在complete回调函数中，使用res.responseJSON拿到服务器相应回来的数据
		if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
			// 1.强制清空token
			localStorage.removeItem('token')
			// 2.强制跳转到登录页面
			location.href = 'login.html'
		}
	}
})