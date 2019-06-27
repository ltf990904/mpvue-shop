<template>
  <div class="container">
    <!-- 头部 -->
    <div class="header">
      <span class="iconfont icontool_brief"></span>
      <div class="profile">
        <!-- 获取头像 -->
        <div class="head-img">
          <!-- 获取头像 -->
          <open-data type="userAvatarUrl"></open-data>
        </div>
        <!-- 昵称 -->
        <open-data type="userNickName"></open-data>
      </div>
      <span class="iconfont iconxiaoxi"></span>
    </div>

    <div class="content">
      <!-- 收藏店铺 -->
      <div class="profile-info">
        <!-- 我的信息列表 -->
        <div class="profile-item" v-for="(item, index) in profileList" :key="index">
          <p>{{item.number}}</p>
          <p>{{item.text}}</p>
        </div>
      </div>

      <!-- 我的订单 -->
      <div class="order-list">
        <div class="order-title">我的订单</div>
        <div class="order-content">
          <div class="order-item" v-for="item in orders" :key="item.index">
            <span class="iconfont" :class="item.className"></span>
            <p>{{item.text}}</p>
          </div>
        </div>
      </div>

      <!-- 管理收货地址 -->
      <div class="manage-list">
        <div class="manage-item" @tap="getAddress">
          <div class="left">收货地址管理</div>
          <span class="arrow"></span>
        </div>

        <div class="manage-item" @tap="makePhoneCall">
          <div class="left">联系客服</div>
          <span>10000</span>
        </div>

        <div class="manage-item">
          <div class="left">意见反馈</div>
          <span class="arrow"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        profileList: [
          { text: "收藏的店铺", number: 0 },
          { text: "收藏的商品", number: 0 },
          { text: "关注的商品", number: 0 },
          { text: "我的足迹", number: 0 }
        ],
        orders: [
          { text: "待付款", className: "icondaifukuan" },
          { text: "待收货", className: "icondaishouhuo" },
          { text: "退货/退款", className: "iconicon5" },
          { text: "全部订单", className: "icondingdan" }
        ]
      };
    },
    methods: {
      makePhoneCall() {
        wx.makePhoneCall({
          phoneNumber: "10000" // 仅为示例，并非真实的电话号码
        });
      },
      getAddress() {
        // 获取收货地址
        wx.chooseAddress({
          // 注意：使用箭头函数
          success: res => {
            // 拼接地址对象
            this.address = {
              name: res.userName,
              telNumber: res.telNumber,
              addr: `${res.provinceName}${res.cityName}${res.countyName}${
                res.detailInfo
              }`
            };

            // 把地址保存到本都
            wx.setStorageSync("address", this.address);
          }
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: auto;
    background: #eee;
  }

  .header {
    background: #ff2d4a;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 80rpx 0 110rpx;
    color: #fff;
    .profile {
      margin: 0 50rpx;
      text-align: center;
      .head-img {
        width: 160rpx;
        height: 160rpx;
        border-radius: 50%;
        border: 4px #fff solid;
        margin-bottom: 10rpx;
        overflow: hidden;
      }
    }
  }

  .content {
    margin: -30rpx 20rpx 0;
    .profile-info {
      display: flex;
      justify-content: space-around;
      background: #fff;
      padding: 20rpx 0;

      p {
        line-height: 1.5;
        text-align: center;
        font-size: 14px;
        &:first-child {
          color: #999;
        }
      }
    }
  }

  .order-list {
    margin-top: 20rpx;
    background: #fff;
    .order-title {
      font-size: 18px;
      padding: 20rpx;
      border-bottom: 1px #eee solid;
    }
    .order-content {
      display: flex;
      justify-content: space-around;
      padding: 20rpx 0;
      .order-item {
        text-align: center;
        line-height: 1.5;
        font-size: 15px;
        span {
          color: red;
          margin-bottom: 10rpx;
          font-size: 32px;
        }
      }
    }
  }

  .manage-list {
    margin-top: 20rpx;
    background: #fff;
    .manage-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;
      border-bottom: 1px #eee solid;
      height: 60rpx;
      line-height: 60rpx;
      span {
        color: #999;
      }

      .arrow {
        display: block;
        width: 12px;
        height: 24rpx;
        border-top: 1px #999 solid;
        border-right: 1px #999 solid;
        transform: rotate(45deg);
      }
    }
  }
</style>
