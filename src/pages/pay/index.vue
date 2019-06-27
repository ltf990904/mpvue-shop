<template>
  <div>
    <div class="cart-body">
      <div class="address">
        <div class="user-info">
          <span>收货人：xxxx</span>
          <span>113232323</span>
        </div>
        <div class="user-address">收货地址：xxxxx</div>
      </div>
      <image class="cart-border" src="/static/images/cart_border@2x.png"></image>
      <div class="shop-name">
        <span class="iconfont icon-shop"></span>
        <span>优购生活馆</span>
      </div>
      <div class="cart-list">
        <div class="cart-list-item" v-for="(item, index) in 5" :key="index">
          <div class="cart-goods-info">
            <image
              src="https://img.alicdn.com/imgextra/i4/47537911/TB2k1lrhmXlpuFjy0FeXXcJbFXa_!!47537911-0-beehive-scenes.jpg_180x180xzq90.jpg_.webp"
              mode="aspectFill"
            ></image>
            <div class="goods-info-box">
              <h3>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</h3>
              <div class="info-box-bottom">
                <span class="goods-price">$232.00</span>
                <div class="goods-count">
                  <span class="count">01</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="total-price">合计：￥ 2222</div>
    <button type="primary">微信支付</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
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
