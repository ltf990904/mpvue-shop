<template>
  <div>
    <div class="input-wrapper">
      <div class="search-box">
        <!-- mpvue中可以使用原生小程序组件，下面使用icon组件 -->
        <icon type="search" size="16"/>搜索
      </div>
    </div>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" interval="2000">
      <block v-for="(item, index) in sildeList" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image" mode="aspectFill"></image>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sildeList: [
          "https://api.zbztb.cn/pyg/banner1.png",
          "https://api.zbztb.cn/pyg/banner2.png",
          "https://api.zbztb.cn/pyg/banner3.png"
        ]
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/val.scss";
  .input-wrapper {
    // 文字统一用px，小于5的 单位统一用px
    padding: 10rpx * $unit;
    background-color: #ff2d4a;
    .search-box {
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      height: 60rpx;
      border-radius: 4px;
      color: #cecece;
      icon {
        margin-right: 4px;
      }
    }
  }
  .slide-image {
    width: 750rpx;
    height: 230rpx * $unit;
  }
</style>
