<template>
  <view>
    <view class="input-wrapper">
      <view class="search-box">
        <!-- mpvue中可以使用原生小程序组件，下面使用icon组件 -->
        <icon type="search" size="16"/>搜索
      </view>
    </view>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" interval="2000">
      <block v-for="(item, index) in sildeList" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image" mode="aspectFill">
        </swiper-item>
      </block>
    </swiper>
    <!-- 分类导航 -->
    <view class="cate-nav">
      <image
        src="https://api.zbztb.cn/pyg/icon_index_nav_4@2x.png"
        class="slide-image"
        mode="aspectFill"
        v-for="(item, index) in 4"
        :key="index"
      >
    </view>
    <!-- 楼层 -->
    <view class="floor">
      <!-- 每一个楼层 -->
      <view class="floor-item">
        <view class="floor-title">
          <image
            src="https://api.zbztb.cn/pyg/icon_index_nav_2@2x.png"
            class="slide-image"
            mode="aspectFill"
          >
        </view>
        <view class="floor-content">
          <view class="content-left">
            <image
              src="https://api.zbztb.cn/pyg/icon_index_nav_2@2x.png"
              class="slide-image"
              mode="aspectFill"
            >
          </view>
          <view class="content-right">
            <image
              src="https://api.zbztb.cn/pyg/icon_index_nav_2@2x.png"
              class="slide-image"
              mode="aspectFill"
              v-for="(item, index) in 4"
              :key="index"
            >
          </view>
        </view>
      </view>
    </view>
  </view>
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

  .cate-nav {
    display: flex;
    justify-content: space-around;
    padding: 15rpx 0;
    image {
      width: 150rpx;
      height: 180rpx;
    }
  }

  .floor-item {
    .floor-title {
      image {
        width: 750rpx;
        height: 90rpx;
      }
    }
    .floor-content {
      image {
        border-radius: 4px;
      }
      display: flex;
      .content-left {
        display: flex;
        align-items: center;
        image {
          width: 150rpx * $unit;
          height: 250rpx * $unit;
        }
      }
      .content-right {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-between;
        image {
          width: 155rpx * $unit;
          height: 125rpx * $unit;
        }
      }
    }
  }
</style>
