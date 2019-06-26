<template>
  <div>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" interval="2000">
      <block v-for="(item, index) in goodsDetail.pics" :key="index">
        <swiper-item>
          <image :src="item.pics_big" class="slide-image" mode="aspectFill"></image>
        </swiper-item>
      </block>
    </swiper>

    <!-- 价格 -->
    <div class="goods-price">
      <span>￥ {{goodsDetail.goods_price}}</span>
    </div>

    <!-- 商品标题 -->
    <div class="goods-title">
      <div class="left-title">{{goodsDetail.goods_name}}</div>
      <div class="right-icon">
        <span class="iconfont iconxingxing"></span>
        <span>收藏</span>
      </div>
    </div>

    <div class="express">快递：免运费</div>

    <!-- 商品详情 -->
    <div class="goods-detail">
      <h3>商品详情</h3>
      <!-- 使用mpvue的时候是通过v-html指令渲染带标签的字符串 -->
      <!-- 如果使用的是原生的话，可以使用wxParse这个第三方的工具 -->
      <div class="goods-content" v-html="goodsDetail.goods_introduce"></div>
    </div>

    <!-- footer -->
    <div class="footer">
      <div class="footer-left footer-common">
        <button open-type="contact">联系客服</button>
        <span class="iconfont iconkefu"></span>
        <span>联系客服</span>
      </div>
      <navigator url="/pages/cart/main" open-type="switchTab" class="footer-left footer-common">
        <span class="iconfont icongouwuche"></span>
        <span>购物车</span>
      </navigator>
      <div class="footer-right footer-common" @tap="addToCart">
        <span>加入购物车</span>
      </div>
      <div class="footer-right footer-common">
        <span>立即购买</span>
      </div>
    </div>
  </div>
</template>

<script>
  import request from "@/utils/request";
  export default {
    data() {
      return {
        goodsDetail: {}, // 商品详情
        cartListPage: [], // 页面获取到的购物车数据
        goods_id: 0
      };
    },
    onLoad(options) {
      this.goods_id = options.goods_id
    },
    onShow () {
      this.getDetail()
      // 1.1 首先先从本地读取购物车的数据
      this.cartListPage = wx.getStorageSync('cartList') || []
    },
    methods: {
      // 获取详情数据
      getDetail(options) {
        request
          .get("https://www.zhengzhicheng.cn/api/public/v1/goods/detail", {
            goods_id: this.goods_id
          })
          .then(res => {
            console.log(res);
            this.goodsDetail = res.data.message;
          });
      },
      // 点击加入购物车
      addToCart() {
        // 需要添加到数组中临时商品数据对象
        let tempObj = {
          goods_id: this.goodsDetail.goods_id,
          selectStatus: true, // 商品选中状态，默认应该被选中
          goods_small_logo: this.goodsDetail.goods_small_logo,
          goods_name: this.goodsDetail.goods_name,
          goods_price: this.goodsDetail.goods_price,
          counts: 1 // 添加商品的数量，默认为1
        };
        // 1.2 点击加入购物的时候，用当前的商品数据和购物车中的对比，判断是否存在该商品，如果存在，就将该商品数量的counts + 1；如果不存在，就将该商品的信息直接push到数组中
        // 这里可以利用数组的findIndex方法查找当前的商品id在数组中所对应的数据项的索引，如果能找到，就返回该索引值，如果找不到就返回 -1
        let idx = this.cartListPage.findIndex(
          item => item.goods_id === this.goodsDetail.goods_id
        );
        console.log(idx);
        if (idx === -1) {
          // 不存在
          this.cartListPage.push(tempObj);
        } else {
          // 不存在
          this.cartListPage[idx].counts += 1;
        }
        // 添加提示信息
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000,
          mask: true
        })
        // 1.3 将新的数据重新保存到本地
        wx.setStorageSync("cartList", this.cartListPage);
      }
    }
  };
</script>

<style lang="scss" scoped>
  swiper {
    height: 720rpx;
    .slide-image {
      height: 720rpx;
      width: 750rpx;
    }
  }
  .goods-price {
    height: 60rpx;
    color: #ff2d4a;
    font-size: 20px;
    padding: 0 20rpx;
  }
  .goods-detail {
    padding-bottom: 120rpx;
  }
  .goods-title {
    display: flex;
    height: 100rpx;
    padding: 0 20rpx;
    .right-icon {
      width: 150rpx;
      font-size: 16px;
      color: #9e9d9e;
      border-left: 1px solid #eee;
      margin-left: 20rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .left-title {
      flex: 1;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .express {
    font-size: 16px;
    color: #9e9d9e;
    padding: 20rpx;
  }
  .goods-detail {
    border-top: 10px solid #f5f5f5;
    h3 {
      padding: 20rpx;
      font-size: 22px;
    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120rpx;
    display: flex;
    background: #fff;
    .footer-common {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .footer-left {
      width: 20%;
      height: 120rpx;
      color: #9a999a;
      font-size: 16px;
      button {
        opacity: 0;
        position: absolute;
        top: 0;
        bottom: 0;
        width: 20%;
      }
    }
    .footer-right {
      width: 30%;
      display: flex;
      color: #fff;
      background: #ffb517;
      &:last-child {
        background: #ff2d4a;
      }
    }
  }
</style>
