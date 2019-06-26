<template>
  <div>
    <div class="input-wrapper">
      <div class="search-box">
        <!-- mpvue中可以使用原生小程序组件，下面使用icon组件 -->
        <icon type="search" size="16"/>
        <!-- 原生小程序中input的完成事件为bindconfirm，但是绑定事件的写法需要换成vue绑定事件的写法 -->
        <input
          type="text"
          placeholder="请输入搜索内容"
          v-model="inputVal"
          @input="handleInput"
          @confirm="jumpToSearchList"
        >
      </div>
      <button size="mini" v-if="inputVal" @tap="inputVal=''">取消</button>
    </div>

    <!-- 历史搜索标题 -->
    <div class="history-title">
      <h4>历史搜索</h4>
      <icon type="clear" size="16"/>
    </div>

    <!-- 搜索历史列表 -->
    <div class="history-list">
      <span
        class="history-item"
        v-for="(item, index) in historyData"
        :key="index"
        @tap="handleHistoryClick(item)"
      >{{item}}</span>
    </div>

    <!-- 搜索建议弹框 -->
    <div class="search-modal" v-if="inputVal">
      <div
        class="suggest-item"
        v-for="(item, index) in suggestions"
        :key="index"
        @tap="handleSuggestionClick(item.goods_id)"
      >{{item.goods_name}}</div>
    </div>
  </div>
</template>

<script>
  // @符号是一个别名，代表src目录的绝对路径
  import request from "@/utils/request";
  export default {
    data() {
      return {
        inputVal: "",
        historyData: [], // 存储历史搜索数据
        suggestions: [] // 搜索数据建议列表
      };
    },
    onLoad() {
      // 页面加载先从本地获取数据，没有就给空数组
      this.historyData = wx.getStorageSync("historyData") || [];
    },
    methods: {
      jumpToSearchList() {
        // 跳转到搜索列表页，并携带上参数 query=this.inputVal
        // 非tabBar的页面可以使用wx.navigateTo()跳转，tabBar页面使用wx.switchTab()跳转
        // wx.navigateTo({
        //   url: '/pages/search-list/main?query=' + this.inputVal
        // })
        this.historyData.unshift(this.inputVal);
        // 将数据添加进去之后，需要将数据去重，利用es6的Set类型
        let mySet = new Set(this.historyData);
        this.historyData = [...mySet];
        // 将用户输入的值添加到本地存储中
        wx.setStorageSync("historyData", this.historyData);
      },
      // 用户按键时触发的函数
      handleInput() {
        // console.log("你输入了");
        request
          .get("https://www.zhengzhicheng.cn/api/public/v1/goods/qsearch", {
            query: this.inputVal
          })
          .then(res => {
            // console.log(res);
            this.suggestions = res.data.message;
          });
      },
      // 点击搜索建议跳转到详情
      handleSuggestionClick(id) {
        wx.navigateTo({
          url: "/pages/goods-detail/main?goods_id=" + id
        });
      },
      // 点击搜索历史项
      handleHistoryClick(name) {
        wx.navigateTo({
          url: "/pages/search-list/main?query=" + name
        });
      }
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
    justify-content: flex-start;
    align-content: flex-start;
    .history-item {
      margin-bottom: 20rpx;
      margin-right: 20rpx;
      padding: 20rpx;
      background: #dddddd;
      height: 60rpx;
    }
  }

  .search-modal {
    padding: 0 20rpx;
    background: #fff;
    width: 100%;
    position: absolute;
    top: 100rpx;
    left: 0;
    .suggest-item {
      height: 70rpx;
      line-height: 70rpx;
      border-bottom: 1px solid #eee;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
</style>
