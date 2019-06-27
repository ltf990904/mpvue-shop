<template>
  <div>
    <div class="cart-body">
      <div class="address">
        <div class="user-info">
          <span>收货人：{{addressInfoPage.userName}}</span>
          <span>{{addressInfoPage.telNumber}}</span>
        </div>
        <div class="user-address">收货地址：{{addressInfoPage.addressDetail}}</div>
      </div>
      <image class="cart-border" src="/static/images/cart_border@2x.png"></image>
      <div class="shop-name">
        <span class="iconfont icon-shop"></span>
        <span>优购生活馆</span>
      </div>
      <div class="cart-list">
        <div class="cart-list-item" v-for="(item, index) in selectGoods" :key="index">
          <div class="cart-goods-info">
            <image :src="item.goods_small_logo" mode="aspectFill"></image>
            <div class="goods-info-box">
              <h3>{{item.goods_name}}</h3>
              <div class="info-box-bottom">
                <span class="goods-price">￥{{item.goods_price}}</span>
                <div class="goods-count">
                  <span class="count">{{item.counts}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="total-price">合计：￥{{totalPrice}}</div>
    <button type="primary" @tap="wxPay">微信支付</button>
  </div>
</template>

<script>
  import request from "@/utils/request";
  export default {
    data() {
      return {
        cartListPage: [],
        addressInfoPage: {},
        orderNumber: 0
      };
    },
    methods: {
      wxPay() {
        let header = {
          Authorization: wx.getStorageSync("token") || ""
        };
        // 订单支付生成预付订单
        request
          .auth(
            "https://www.zhengzhicheng.cn/api/public/v1/my/orders/req_unifiedorder",
            { order_number: this.orderNumber },
            header
          )
          .then(res => {
            // 调用wx.requestPayment()发起微信支付
            wx.requestPayment({
              ...res.data.message.pay,
              order_number: this.orderNumber,
              success: res => {
                // 支付成功后弹出支付成功的提示信息
                wx.showToast({
                  title: "支付成功",
                  icon: "success",
                  duration: 1000,
                  mask: true,
                  // 然后跳转到首页
                  success: () => {
                    // 注意首页是tabBar页面,需要使用switchTab跳转
                    setTimeout(() => {
                      wx.switchTab({
                        url: "/pages/index/main"
                      });
                    }, 2000);
                    // 将本地的购物车数据中selectStatus状态true的删掉
                    wx.setStorageSync("cartList", this.notSelectGoods);
                  }
                });
              }
            });
          });
      }
    },
    onLoad(options) {
      // 获取orderNumber
      this.orderNumber = options.order_number;
    },
    onShow() {
      this.cartListPage = wx.getStorageSync("cartList") || [];
      this.addressInfoPage = wx.getStorageSync("addressInfo");
    },
    // 利用属性将上面cartListPage中selectStatus为true的数据过滤出来
    computed: {
      selectGoods() {
        // filter函数的作用是,过滤数组,将满足过滤条件的数组项取出来,放到一个新的数组中
        return this.cartListPage.filter(item => item.selectStatus);
      },
      notSelectGoods() {
        // filter函数的作用是,过滤数组,将满足过滤条件的数组项取出来,放到一个新的数组中
        return this.cartListPage.filter(item => !item.selectStatus);
      },
      totalPrice() {
        let total = 0;
        this.cartListPage.map(item => {
          if (item.selectStatus) {
            total += item.counts * item.goods_price;
          }
        });
        return total;
      }
    }
  };
</script>

<style lang="scss" scoped>
  // 空购物车样式
  .empty-cart {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    image {
      width: 180rpx;
      height: 180rpx;
    }
    .empty-cart-text {
      line-height: 3;
      color: #999;
    }
    .shop-btn {
      background: #ed601b;
      border-radius: 4px;
      padding: 20rpx 30rpx;
      color: #fff;
    }
  }

  .cart-body {
    padding: 20rpx;
    // 空地址
    .empty-address {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      .add-btn {
        padding: 20rpx 30rpx;
        background: #a7a6a7;
        color: white;
        border-radius: 4px;
        font-size: 16px;
      }
    }
    // 地址
    .address {
      .user-info,
      .user-address {
        height: 60rpx;
        line-height: 60rpx;
        font-size: 16px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .user-info {
        display: flex;
        justify-content: space-between;
      }
    }
    // 图片边框
    .cart-border {
      height: 15rpx;
      width: 750rpx;
      border-bottom: 15rpx solid #eee;
    }
    // 商店名字
    .shop-name {
      font-size: 16px;
      height: 60rpx;
      line-height: 60rpx;
      border-bottom: 1px solid #eee;
      margin-bottom: 20rpx;
    }
    // 购物车商品项
    .cart-list-item {
      display: flex;
      &:last-child {
        & > .cart-goods-info {
          border: none;
        }
      }
      .cart-goods-status {
        width: 60rpx;
        align-self: center;
      }
      .cart-goods-info {
        flex: 1;
        display: flex;
        padding-bottom: 20rpx;
        border-bottom: 1px solid #eee;
        image {
          align-self: center;
          width: 150rpx;
          height: 150rpx;
          flex-shrink: 0;
          margin-right: 20rpx;
        }
        .goods-info-box {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h3 {
            margin-bottom: 20rpx;
            word-break: break-all;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .info-box-bottom {
            display: flex;
            justify-content: space-between;
            height: 60rpx;
            line-height: 60rpx;
            .goods-price {
              color: #ff2d4a;
              font-size: 16px;
            }
            .count-add,
            .count-minus {
              display: inline-block;
              text-align: center;
              border: 1px solid #666666;
              height: 60rpx;
              width: 60rpx;
              box-sizing: border-box;
            }
            .count {
              font-size: 14px;
              margin: 0 20rpx;
              height: 60rpx;
              width: 60rpx;
            }
          }
        }
      }
    }
  }

  .total-price {
    height: 60rpx;
    line-height: 60rpx;
    color: #ff2d4a;
    text-align: right;
    margin-bottom: 20rpx;
  }
</style>
