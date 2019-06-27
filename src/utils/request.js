function request(url, method = 'GET', data = {}, header = {}) {
  // 在这个函数中，应该调用wx.request方法发送请求，并将请求成功的结果给到promise对象中，目的是为了在其他页面调用这个函数时，能够直接使用.then()获取成功的数据
  return new Promise((resolve, reject) => {
    // 请求数据前先弹出加载框
    wx.showLoading({
      title: '正在加载',
      mask: true
    })
    wx.request({
      url: url,
      method: method,
      data: data,
      header: header,
      success: (res) => {
        // 数据加载成功之后隐藏加载框
        wx.hideLoading()
        // 将成功的数据放进resolve函数中
        resolve(res)
      }
    })
  })
}

// 拓展request函数
request.get = function (url, data = {}) {
  return request(url, 'GET', data)
}
request.post = function (url, data = {}) {
  return request(url, 'POST', data, {})
}

// 封装登录校验的请求
request.auth = function (url, data = {}, header) {
  // 首先判断是否存在token,也就是用户是否登录,如果没有登录的话,就跳转到登录页面
  if (!wx.getStorageSync('token')) {
    wx.navigateTo({
      url: '/pages/login/main'
    })
    // 手动添加一个Promise的错误原因
    return Promise.reject(new Error('请登录'))
  } else {
    return request(url, 'POST', data, header)
  }
}

export default request
