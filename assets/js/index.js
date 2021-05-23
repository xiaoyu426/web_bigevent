$(function () {
	// 调用getUserInfo获取用户基本信息
	getUserInfo()



	var layer = layui.layer

	$('#btnLogout').on('click', function () {
		// 提示用户是否确认退出
		layer.confirm('确定退出登陆?', { icon: 3, title: '提示' }, function (index) {
			// 1.清空本地存储中的token
			localStorage.removeItem('token')
			// 2.重新跳转到登录页
			location.href = 'login.html'

			// 官方给定的方法，关闭弹出层
			layer.close(index);
		});
	})
})






// 获取用户的基本信息
function getUserInfo() {
	$.ajax({
		method: 'get',
		url: '/my/userinfo',
		// headers就是请求头配置对象
		// headers:{
		// 	Authorization: localStorage.getItem('token'||'')
		// },
		success: function (res) {
			console.log(res);
			if (res.status !== 0) {
				return layui.layer.msg('获取用户信息失败！')
			}
			// 调用renderAvatar 渲染用户的头像
			renderAvatar(res.data)
		},
		// 无论请求成功还是失败都会调用complete回调函数
		// complete: function (res) {
		// 	console.log(res);
		// 	// 在complete回调函数中，使用res.responseJSON拿到服务器相应回来的数据
		// 	if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') { 
		// 		// 1.强制清空token
		// 		localStorage.removeItem('token')
		// 		// 2.强制跳转到登录页面
		// 		location.href='login.html'
		// 	}
		// }
	})
}


// 渲染用户头像
function renderAvatar(user) {
	// 1.获取用户名称（nickname优先）
	var name = user.nickname || user.username;
	console.log(name);
	// 2.设置欢迎的文本
	$('#welcome').html('欢迎 ' + name)
	// 3.按需渲染用户头像
	if (user.user_pic !== null) {
		// 渲染图片头像
		$('.layui-nav-img').attr('src', user.user_pic).show()
		$('.text-avatar').hide()
	} else {
		// 渲染文本头像
		$('.layui-nav-img').hide()
		var first = name[0].toUpperCase()
		console.log(first);
		$('.text-avatar').html(first).show()
	}
}