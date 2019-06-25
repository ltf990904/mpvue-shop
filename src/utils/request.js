function request(url, method = 'GET', data = {}) {
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

export default request