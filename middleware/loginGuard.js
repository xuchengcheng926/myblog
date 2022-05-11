const guard = (req, res, next) => {
	if (req.url != '/login' && !req.session.user) {
		res.redirect('/admin/login');
	} else {
		// console.log(req.url)
		// 如果用户是登录状态 并且是一个普通用户
		if (req.session.user && req.session.user.role == 'normal') {
			// 当用户为普通用户时，只有用户登出接口允许访问，其他都会跳转至userInfo页面
			if(req.url == '/logout'){
				return next();
			}
			return res.redirect('/userInfo')
		}
		// 用户是登录状态 将请求放行
		next();
	}
}

module.exports = guard;