<template>
  <div>
    <div class="input-wrapper">
      <div class="search-box">
        <!-- mpvue中可以使用原生小程序组件，下面使用icon组件 -->
        <icon type="search" size="16"/>
        <input type="text" placeholder="请输入搜索内容" v-model="inputVal">
      </div>
      <button size="mini" v-if="inputVal" @click="inputVal=''">取消</button>
    </div>

    <!-- 历史搜索标题 -->
    <div class="history-title">
      <h4>历史搜索</h4>
      <icon type="clear" size="16"/>
    </div>

    <!-- 搜索历史列表 -->
    <div class="history-list">
      <span class="history-item" v-for="(item, index) in 6" :key="index">小米手机</span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        inputVal: ""
      };
    }
  };
</script>

<style lang="scss" scoped>
  .input-wrapper {
    // 文字统一用px，小于5的 单位统一用px
    padding: 20rpx;
    background-color: #efefef;
    display: flex;
    .search-box {
      flex: 1;
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
      input {
        width: 100%;
      }
    }
    button {
      width: 150rpx;
      height: 60rpx;
      margin-left: 20rpx;
    }
  }

  .history-title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
  }
  .history-list {
    height: 400rpx;
    overflow: auto;
    padding: 20rpx;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: flex-start;
    .history-item {
      margin-bottom: 20rpx;
      padding: 20rpx;
      background: #dddddd;
      height: 60rpx;
    }
  }
</style>