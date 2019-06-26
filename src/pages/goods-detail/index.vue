<template>
  <div>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" interval="2000">
      <block v-for="(item, index) in 3" :key="index">
        <swiper-item>
          <image
            src="https://img.alicdn.com/bao/uploaded/TB2sNftkpXXXXXvXpXXXXXXXXXX_!!1917052654.jpg_180x180xzq90.jpg_.webp"
            class="slide-image"
            mode="aspectFill"
          ></image>
        </swiper-item>
      </block>
    </swiper>

    <!-- 价格 -->
    <div class="goods-price">
      <span>￥ 666</span>
    </div>

    <!-- 商品标题 -->
    <div class="goods-title">
      <div class="left-title">测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品测试商品</div>
      <div class="right-icon">
        <span class="iconfont iconxingxing"></span>
        <span>收藏</span>
      </div>
    </div>

    <div class="express">快递：免运费</div>

    <!-- 商品详情 -->
    <div class="goods-detail">
      <h3>商品详情</h3>
      <div class="goods-content">xdfsdfsdfsdfsdfsdfdsfafdasd</div>
    </div>

    <!-- footer -->
    <div class="footer">
      <div class="footer-left footer-common kefu">
        <span class="iconfont iconkefu"></span>
        <span>联系客服</span>
      </div>
      <div class="footer-left footer-common">
        <span class="iconfont icongouwuche"></span>
        <span>购物车</span>
      </div>
      <div class="footer-right footer-common">
        <span>加入购物车</span>
      </div>
      <div class="footer-right footer-common">
        <span>立即购买</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped>
  swiper {
    height: 720rpx;
    .slide-image {
      height: 720rpx;
    }
  }
  .goods-price {
    height: 60rpx;
    color: #ff2d4a;
    font-size: 20px;
    padding: 0 20rpx;
  }
  .goods-detail {
    padding-bottom: 120rpx;
  }
  .goods-title {
    display: flex;
    height: 100rpx;
    padding: 0 20rpx;
    .right-icon {
      width: 150rpx;
      font-size: 16px;
      color: #9e9d9e;
      border-left: 1px solid #eee;
      margin-left: 20rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .left-title {
      flex: 1;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .express {
    font-size: 16px;
    color: #9e9d9e;
    padding: 20rpx;
  }
  .goods-detail {
    border-top: 10px solid #f5f5f5;
    h3 {
      padding: 20rpx;
      font-size: 22px;
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120rpx;
    display: flex;
    background: #fff;
    border-top: 1px solid #f4f4f4;
    .footer-common {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .footer-left {
      width: 20%;
      height: 120rpx;
      color: #9a999a;
      font-size: 16px;
    }
    .footer-right {
      width: 30%;
      display: flex;
      color: #fff;
      background: #ffb517;
      &:last-child {
        background: #ff2d4a;
      }
    }
    .iconkefu, .icongouwuche{
      font-size: 24px;
    }
  }
</style>