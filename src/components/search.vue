<template>
  <div class="input-wrapper">
    <div class="search-box" @click="jumpToSearch">
      <!-- mpvue中可以使用原生小程序组件，下面使用icon组件 -->
      <icon type="search" size="16"/>搜索
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      jumpToSearch () {
        wx.navigateTo({
          url: '/pages/search/main'
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .input-wrapper {
    // 文字统一用px，小于5的 单位统一用px
    padding: 20rpx;
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
</style>
