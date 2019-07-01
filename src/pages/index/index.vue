<template>
  <div>
    <search></search>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" interval="2000" :circular="true">
      <block v-for="(item, index) in sliderList" :key="index">
        <swiper-item>
          <image :src="item.image_src" class="slide-image" mode="aspectFill" />
        </swiper-item>
      </block>
    </swiper>

    <!-- 分类导航 -->
    <div class="cate-nav">
      <image
        :src="item.image_src"
        class="slide-image"
        mode="aspectFill"
        v-for="(item, index) in navList"
        :key="index"
      />
    </div>

    <!-- 楼层 -->
    <div class="floor">
      <!-- 每一个楼层 -->
      <div class="floor-item" v-for="(item, index) in floorList" :key="index">
        <div class="floor-title">
          <image :src="item.floor_title.image_src" class="slide-image" mode="aspectFill" />
        </div>
        <div class="floor-content">
          <div class="content-left">
            <image :src="item.product_list[0].image_src" class="slide-image" mode="aspectFill" />
          </div>
          <div class="content-right">
            <image
              :src="subitem.image_src"
              v-if="idx !== 0"
              class="slide-image"
              mode="aspectFill"
              v-for="(subitem, idx) in item.product_list"
              :key="idx"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 返回顶部 -->
    <div class="go-to-top" @tap="gotoTop" v-if="showTop">
      <span>＿</span>
      <span class="arrow">↑</span>
    </div>
  </div>
</template>

<script>
  import request from "../../utils/request.js";
  import Search from "../../components/search";
  export default {
    components: {
      Search
    },
    data() {
      return {
        sliderList: [], // 轮播图数组
        navList: [], // 导航分类
        floorList: [], // 楼层列表
        showTop: false
      };
    },
    mounted() {
      this.getData();
    },
    onPageScroll(obj) {
      this.showTop = !!(obj.scrollTop > 50);
    },
    methods: {
      gotoTop() {
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        });
      },
      // 获取轮播图/获取分类/获取楼层
      async getData() {
        try {
          let res = await request(
            "https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata"
          );
          this.sliderList = res.data.message;
        } catch (error) {
          console.log(error);
        }
        try {
          let res1 = await request(
            "https://www.zhengzhicheng.cn/api/public/v1/home/catitems"
          );
          this.navList = res1.data.message;
        } catch (error) {
          console.log(error);
        }
        try {
          let res2 = await request(
            "https://www.zhengzhicheng.cn/api/public/v1/home/floordata"
          );
          this.floorList = res2.data.message;
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../styles/val.scss";
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
        flex: 2;
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
  .go-to-top {
    position: fixed;
    bottom: 50rpx;
    right: 0rpx;
    font-size: 16px;
    color: #fff;
    width: 80rpx;
    height: 80rpx;
    border-radius: 8rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);

    .arrow {
      margin-bottom: 30rpx;
    }
  }
</style>
