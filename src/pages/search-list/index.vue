<template>
  <div>
    <div class="input-wrapper">
      <div class="search-box">
        <!-- mpvue中可以使用原生小程序组件，下面使用icon组件 -->
        <icon type="search" size="16"/>搜索
      </div>
    </div>

    <!-- 搜索tab栏 -->
    <div class="search-tab">
      <div
        class="tab-item"
        :class="currentIndex === index ? 'active' : ''"
        v-for="(item, index) in tabName"
        :key="index"
        @click="handleTabclick(index)"
      >{{item}}</div>
    </div>

    <!-- 搜索列表 -->
    <div class="search-list">
      <div class="brand-item" v-for="(item, index) in goodsList" :key="index">
        <div class="brand-img">
          <image
            :src="item.goods_small_logo"
            mode="aspectFill"
          ></image>
        </div>
        <div class="brand-info">
          <div class="brand-title">{{item.goods_name}}</div>
          <div class="brand-price">￥<span>{{item.goods_price}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import request from '@/utils/request'
  export default {
    data() {
      return {
        tabName: ["综合", "销量", "价格"],
        currentIndex: 0,
        pagenum: 1, // 默认展示第一页
        pagesize: 10, // 每页默认10条
        goodsList: []
      };
    },
    methods: {
      handleTabclick(idx) {
        this.currentIndex = idx;
      }
    },
    // 小程序原生的生命周期函数，照样能在mpvue中使用
    onLoad(options) {
      // console.log(options);
      request.get("https://www.zhengzhicheng.cn/api/public/v1/goods/search", {
        query: options.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        // console.log(res);
        this.goodsList = res.data.message.goods;
      });
    }
  };
</script>

<style lang="scss" scoped>
  .input-wrapper {
    // 文字统一用px，小于5的 单位统一用px
    padding: 20rpx;
    background-color: #efefef;
    .search-box {
      padding-left: 20rpx;
      background-color: #fff;
      display: flex;
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

  .search-tab {
    display: flex;
    .tab-item {
      flex: 1;
      font-size: 16px;
      height: 100rpx;
      line-height: 100rpx;
      text-align: center;
      border-bottom: 1px solid #eee;
    }
    .active {
      color: #ff2d4a;
    }
  }

  .brand-item {
    display: flex;
    border-bottom: 1px solid #eee;
    .brand-img {
      width: 250rpx;
      height: 250rpx;
      padding: 20rpx;
      box-sizing: border-box;
      image {
        width: 190rpx;
        height: 190rpx;
      }
    }
    .brand-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 20rpx 0;
      .brand-title {
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .brand-price {
        color: #ff2b49;
        span {
          font-size: 20px;
        }
      }
    }
  }
</style>