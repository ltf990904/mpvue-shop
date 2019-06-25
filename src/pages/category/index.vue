<template>
  <div>
    <search></search>
    <div class="category-body">
      <!-- 左边 -->
      <div class="body-left">
        <div
          class="body-left-item"
          :class="currentIndex === index ? 'active' : ''"
          v-for="(item, index) in cates"
          :key="index"
          @click="handleLeftClick(index)"
        >{{item.cat_name}}</div>
      </div>
      <!-- 右边 -->
      <div class="body-right">
        <div class="body-right-item" v-for="(item, idx) in rightList" :key="idx">
          <div class="right-item-title">{{item.cat_name}}</div>
          <div class="right-item-list">
            <div class="right-item-brand" v-for="(subitem, index) in item.children" :key="index">
              <image class="brand-image" :src="subitem.cat_icon" mode="aspectFill"></image>
              <p class="brand-title">{{subitem.cat_name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from "../../components/search";
  import request from "../../utils/request.js";
  export default {
    components: {
      Search
    },
    data() {
      return {
        currentIndex: 0, // 表示当前激活项的索引
        cates: [],
        rightList: [] // 存放右侧商品数据的数       
      };
    },
    mounted() {
      this.initCategory();
    },
    methods: {
      // 点击左侧选项，切换高亮效果
      handleLeftClick(idx) {
        this.currentIndex = idx;
        this.rightList = this.cates[idx].children;
      },
      // 初始化分类数据
      initCategory() {
        request("https://www.zhengzhicheng.cn/api/public/v1/categories").then(
          res => {
            // console.log(res.data.message);
            this.cates = res.data.message;
            // 右侧数据需要第一项的children作为初始值
            this.rightList = this.cates[0].children;
          }
        );
      }
    }
  };
</script>

<style lang="scss" scoped>
  .category-body {
    display: flex;
    position: absolute;
    top: 100rpx;
    bottom: 0;

    .body-left {
      width: 200rpx;
      // 由于图片过大，导致宽度会被挤小，可以设置一个属性防止被缩小
      flex-shrink: 0;
      height: 100%;
      overflow: auto;

      .body-left-item {
        line-height: 100rpx;
        text-align: center;
        font-size: 16px;
        background-color: #f5f5f5;
        position: relative;
      }

      .active {
        background-color: #fff;
        color: #ff2d4a;

        &::before {
          content: "";
          display: block;
          width: 4px;
          height: 60rpx;
          position: absolute;
          top: 20rpx;
          background: #ff2d4a;
        }
      }
    }

    .body-right {
      flex: 1;
      height: 100%;
      overflow: auto;

      .right-item-title {
        line-height: 2;
        text-align: center;
        font-size: 16px;
      }

      .right-item-list {
        display: flex;
        flex-wrap: wrap;

        .right-item-brand {
          width: 33.33%;
          height: 200rpx;
          padding: 20rpx;
          box-sizing: border-box;

          image {
            width: 100%;
            height: 100rpx;
          }

          .brand-title {
            text-align: center;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
