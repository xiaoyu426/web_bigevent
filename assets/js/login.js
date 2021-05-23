$(function () {
	// 点击“去注册账号”的链接
	$('#link_reg').on('click', function () {
		$('.login-box').hide();
		$('.reg-box').show();
	})

	// 点击“去登陆”的链接
	$('#link_login').on('click', function () {
		$('.reg-box').hide();
		$('.login-box').show();
	})


	// 从layUI 中获取form对象
	var form = layui.form
	var layer = layui.layer
	form.verify({
		// 自定义了一个叫做pwd的校验规则 若不匹配输出数组中的字符串
		pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
		// 校验两次密码是否一致
		repwd: function (value) {
			// 通过形参拿到的是确认密码框的内容
			// 获取密码框的内容
			var pwd = $('.reg-box [name=password]').val();
			// 进行判断，若两次密码不一致则return一个提示消息
			if (pwd !== value) {
				return '两次密码不一致！'
			}
		}
	})


	// 监听注册表单的提交事件
	$('#form_reg').on('submit', function (e) {
		// 阻止表单默认提交行为
		e.preventDefault();
		var data = {
			username: $('#form_reg [name=username]').val(),
			password: $('#form_reg [name=password]').val()
		};
		$.post('/api/reguser', data, function (res) {
			if (res.status !== 0) {
				return layer.msg(res.message);
			}
			layer.msg('注册成功，请登录！');
			// 注册成功后模拟点击行为跳转到注册页面
			$('#link_login').click()
		})
	})


	// 监听登录表单的提交事件
	$('#form_login').on('submit', function (e) {
		// 阻止默认提交行为
		e.preventDefault();
		$.ajax({
			url: '/api/login',
			method: 'post',
			// 快速获取表单中的数据
			data: $(this).serialize(),
			success: function (res) {
				if (res.status !== 0) {
					return layer.msg('登录失败！')
				}
				layer.msg('登陆成功！');
				// 将登陆成功后得到的token字符串保存在本地存储中localStorage
				localStorage.setItem('token', res.token)
				// 若登陆成功则跳转到后台主页
				location.href = 'index.html'
			}
		})
	})



})






