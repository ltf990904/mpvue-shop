<template>
  <div>
    <search></search>
    <div class="category-body">
      <div class="body-left">
        <div class="body-left-item" v-for="(item, index) in cates" :key="index">{{item}}</div>
      </div>
      <div class="body-right">
        <div class="body-right-item" v-for="(item, idx) in 4" :key="idx">
          <div class="right-item-title">电视</div>
          <div class="right-item-list">
            <div class="right-item-brand" v-for="(item, index) in 5" :key="index">
              <image
                class="brand-image"
                src="https://img.alicdn.com/imgextra/i1/3107144874/TB2i9NXbwkLL1JjSZFpXXa7nFXa_!!3107144874-0-beehive-scenes.jpg_180x180xzq90.jpg_.webp"
                mode="aspectFill"
              ></image>
              <p class="brand-title">想要的口红</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from "../../components/search";
  export default {
    components: {
      Search
    },
    data() {
      return {
        cates: [
          "大家电",
          "热门推荐",
          "大家电",
          "热门推荐",
          "大家电",
          "热门推荐",
          "大家电",
          "热门推荐",
          "大家电",
          "热门推荐",
          "大家电",
          "热门推荐",
          "大家电",
          "热门推荐",
          "大家电",
          "热门推荐",
          "大家电",
          "热门推荐",
          "大家电",
          "热门推荐"
        ]
      };
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
