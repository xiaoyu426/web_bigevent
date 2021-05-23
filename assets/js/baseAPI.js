// 每次发起请求都会先调用ajaxPrefilter这个函数
// 传递的option是调用Ajax时传递的配置对象
$.ajaxPrefilter(function (options) {
	options.url = 'http://api-breakingnews-web.itheima.net' + options.url
	console.log(options.url);
})