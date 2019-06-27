<template>
  <div>
    <!-- open-type="getUserInfo"获取用户信息,通过bindgetuserinfo回调中获取到用户信息 -->
    <button type="primary" open-type="getUserInfo" @getuserinfo="handleUserInfo">点击登录</button>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  methods: {
    handleUserInfo (e) {
      // mpvue对这个事件对象进行了封装,它新增了一个mp属性,我们可以它来获取用户信息密文等数据
      console.log(e.mp.detail)
      wx.login({
        success: (res) => {
          if (res.code) {
            // 发起网络请求
            request.post('https://www.zhengzhicheng.cn/api/public/v1/users/wxlogin',
              {
                code: res.code,
                iv: e.mp.detail.iv,
                encryptedData: e.mp.detail.encryptedData,
                rawData: e.mp.detail.rawData,
                signature: e.mp.detail.signature
              }
            )
              .then(res => {
                console.log(res.data.message.token)
              })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  }
}
</script>

<style>

</style>