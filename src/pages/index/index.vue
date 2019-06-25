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
      <block v-for="(item, index) in sliderList" :key="index">
        <swiper-item>
          <img :src="item.image_src" class="slide-image" mode="aspectFill">
        </swiper-item>
      </block>
    </swiper>

    <!-- 分类导航 -->
    <view class="cate-nav">
      <img
        :src="item.image_src"
        class="slide-image"
        mode="aspectFill"
        v-for="(item, index) in navList"
        :key="index"
      >
    </view>

    <!-- 楼层 -->
    <view class="floor">
      <!-- 每一个楼层 -->
      <view class="floor-item" v-for="(item, index) in floorList" :key="index">
        <view class="floor-title">
          <img :src="item.floor_title.image_src" class="slide-image" mode="aspectFill">
        </view>
        <view class="floor-content">
          <view class="content-left">
            <img :src="item.product_list[0].image_src" class="slide-image" mode="aspectFill">
          </view>
          <view class="content-right">
            <img
              :src="subitem.image_src"
              v-if="idx !== 0"
              class="slide-image"
              mode="aspectFill"
              v-for="(subitem, idx) in item.product_list"
              :key="idx"
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import request from "../../utils/request.js";
  export default {
    data() {
      return {
        sliderList: [], // 轮播图数组
        navList: [], // 导航分类
        floorList: [] // 楼层列表
      };
    },
    mounted() {
      this.getSliderList();
      this.getCates();
      this.getFloor();
    },
    methods: {
      // 获取轮播图数据
      getSliderList() {
        request(
          "https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata"
        ).then(res => {
          this.sliderList = res.data.message;
        });
      },
      // 获取导航分类
      getCates() {
        request("https://www.zhengzhicheng.cn/api/public/v1/home/catitems").then(
          res => {
            this.navList = res.data.message;
          }
        );
      },
      // 获取楼层
      getFloor() {
        request("https://www.zhengzhicheng.cn/api/public/v1/home/floordata").then(
          res => {
            this.floorList = res.data.message;
          }
        );
      }
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
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-item {
    .floor-title {
      image {
        width: 750rpx;
        height: 60rpx;
      }
    }
    .floor-content {
      padding: 10rpx 20rpx;
      image {
        border-radius: 4px;
      }
      display: flex;
      .content-left {
        display: flex;
        align-items: center;
        margin-right: 15rpx;
        image {
          width: 150rpx * $unit;
          height: 250rpx * $unit;
        }
      }
      .content-right {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        image {
          width: 155rpx * $unit;
          height: 125rpx * $unit;
        }
      }
    }
  }
</style>
