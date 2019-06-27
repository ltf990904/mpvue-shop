<template>
  <div>
    <!-- 空购物车 -->
    <div class="empty-cart" v-if="cartListPage.length === 0">
      <image src="/static/images/cart_empty@2x.png" mode="aspectFill"></image>
      <div class="empty-cart-text">购物车还是空的</div>
      <div class="shop-btn" @tap="goToIndex">去逛逛</div>
    </div>

    <div class="cart-body" v-else>
      <div class="empty-address" v-if="addressIsEmpty">
        <div class="add-btn" @tap="addAddress">添加地址</div>
      </div>
      <div class="address" v-else>
        <div class="user-info">
          <span>收货人：{{addressPage.userName}}</span>
          <span>{{addressPage.telNumber}}</span>
        </div>
        <div class="user-address">收货地址：{{addressPage.addressDetail}}</div>
      </div>
      <image class="cart-border" src="/static/images/cart_border@2x.png"></image>
      <div class="shop-name">
        <span class="iconfont iconshop"></span>
        <span>优购生活馆</span>
      </div>
      <div class="cart-list">
        <div class="cart-list-item" v-for="(item, index) in cartListPage" :key="index">
          <div class="cart-goods-status" @tap="changeCurrentStatus(index)">
            <!-- 商品的选中与否的状态，必须根据该商品selectStatus动态添加样式 -->
            <span
              class="iconfont"
              :class="item.selectStatus ? 'iconcheckbox-marked-circ active': 'iconcheckbox-blank-circle-outline'"
            ></span>
          </div>
          <div class="cart-goods-info">
            <image :src="item.goods_small_logo" mode="aspectFill"></image>
            <div class="goods-info-box">
              <h3>{{item.goods_name}}</h3>
              <div class="info-box-bottom">
                <span class="goods-price">￥{{item.goods_price}}</span>
                <div class="goods-count">
                  <span class="count-add iconfont iconminus" @tap="handleMinus(index)"></span>
                  <span class="count">{{item.counts}}</span>
                  <span class="count-minus iconfont iconplus" @tap="handlePlus(index)"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- footer -->
    <div class="footer">
      <div class="footer-item item-left" @tap="toggleAllStatus">
        <span class="iconfont" :class="isSelectAll ? 'iconcheckbox-marked-circ active' : 'iconcheckbox-blank-circle-outline'"></span>
        <span>全选</span>
      </div>
      <div class="footer-item item-center">
        <div>
          合计:
          <span class="total-price">{{totalPrice}}</span>
        </div>
        <div class="express">包含运费</div>
      </div>
      <div class="footer-item item-right"  @tap="goToPay">结算({{totalCount}})</div>
    </div>
  </div>
</template>

<script>
  import request from '@/utils/request'
  export default {
    data() {
      return {
        cartListPage: [],
        addressPage: {} // 页面中的地址信息
      };
    },
    // 此处不能些onLoad,因为这个onLoad只会执行一次，如果购物车数据有更新，它不会再次执行，将它改为onShow
    onShow() {
      // 2.1 首先从本地读取购物车数据，根据该数据判断是否有数据，如果有就展示数据，如果没有就显示购物车为空
      this.cartListPage = wx.getStorageSync("cartList") || [];
      this.addressPage = wx.getStorageSync("addressInfo") || {};
    },
    // 在购物车页面隐藏的时候，去设置本地存储中购物车的数据
    onHide () {
      wx.setStorageSync('cartList', this.cartListPage)
    },
    methods: {
      // 跳转到首页
      goToIndex() {
        wx.switchTab({
          url: "/pages/index/main"
        });
      },
      // 点击添加地址
      addAddress() {
        wx.chooseAddress({
          success: res => {
            // 给addressPage添加属性
            this.addressPage = {
              userName: res.userName,
              telNumber: res.telNumber,
              addressDetail:
                res.provinceName + res.cityName + res.countyName + res.detailInfo
            };
            // 将地址保存在本地
            wx.setStorageSync("addressInfo", this.addressPage);
          }
        });
      },
      // 更改商品状态
      changeCurrentStatus(idx) {
        // 对当前点击商品状态取反
        this.cartListPage[idx].selectStatus = !this.cartListPage[idx]
          .selectStatus;
      },
      // 点击减
      handleMinus (idx) {
        // 如果数量为1，弹一个提示框提示用户是否删除
        if (this.cartListPage[idx].counts === 1) {
          wx.showModal({
            title: '提示',
            content: '是否删除该商品？',
            success: (res) => {
              if (res.confirm) {
                // 将商品删除掉
                this.cartListPage.splice(idx, 1)
              } else if (res.cancel) {
                return false
              }
            }
          })
        } else {
          this.cartListPage[idx].counts -= 1
        }
      },
      // 点击加
      handlePlus (idx) {
        this.cartListPage[idx].counts += 1
      },
      // 切换所有商品的状态
      toggleAllStatus () {
        // 获取到当前全选按钮的状态
        let currentAllStatus = this.isSelectAll
        this.cartListPage.map(item => {
          // 对所有商品项状态取反
          item.selectStatus = !currentAllStatus
        })
      },
      // 去结算
      goToPay () {
        request.auth('https://www.zhengzhicheng.cn/api/public/v1/my/orders/create', {
          'order_price': 0.1,
          'consignee_addr': '广州市天河区',
          'order_detail':
      '[{"goods_id":55578,"goods_name":"初语2017秋装新款潮牌女装加绒宽松BF风慵懒卫衣女套头连帽上衣","goods_price":279,"goods_small_logo":"http://image2.suning.cn/uimg/b2c/newcatentries/0070067836-000000000690453616_2_400x400.jpg","counts":1,"selectStatus":true}]',
          'goods': [
            {
              'goods_id': 5,
              'goods_number': 11,
              'goods_price': 15
            }
          ]
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      }      
    },
    computed: {
      // 地址是否为空
      addressIsEmpty() {
        // Object.keys()获取对象中的key，将这些key组成一个数组，类似于['userName', 'telNumber', 'addressDetail']
        return Object.keys(this.addressPage).length === 0;
      },
      // 总数量
      totalCount() {
        let total = 0;
        this.cartListPage.map(item => {
          if (item.selectStatus) {
            total += item.counts;
          }
        });
        return total;
      },
      // 购物车商品总价格
      totalPrice() {
        let total = 0;
        this.cartListPage.map(item => {
          if (item.selectStatus) {
            total += item.counts * item.goods_price;
          }
        });
        return total;
      },
      // 控制全选状态的计算属性
      isSelectAll () {
        let all = true
        this.cartListPage.map(item => {
          // 只要商品数据项中有一个商品的状态是false，那么这个全选按钮的状态就应该是false
          if (!item.selectStatus) {
            all = false
          }
        })
        return all
      }
    }
  };
</script>

<style lang="scss" scoped>
  // 空购物车样式
  .empty-cart {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    image {
      width: 180rpx;
      height: 180rpx;
    }
    .empty-cart-text {
      line-height: 3;
      color: #999;
    }
    .shop-btn {
      background: #ed601b;
      border-radius: 4px;
      padding: 20rpx 30rpx;
      color: #fff;
    }
  }

  .cart-body {
    padding: 20rpx;
    // 空地址
    .empty-address {
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      .add-btn {
        padding: 20rpx 30rpx;
        background: #a7a6a7;
        color: white;
        border-radius: 4px;
        font-size: 16px;
      }
    }
    // 地址
    .address {
      .user-info,
      .user-address {
        height: 60rpx;
        line-height: 60rpx;
        font-size: 16px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .user-info {
        display: flex;
        justify-content: space-between;
      }
    }
    // 图片边框
    .cart-border {
      height: 15rpx;
      width: 750rpx;
      border-bottom: 15rpx solid #eee;
    }
    // 商店名字
    .shop-name {
      font-size: 16px;
      height: 60rpx;
      line-height: 60rpx;
      border-bottom: 1px solid #eee;
      margin-bottom: 20rpx;
    }
    // 购物车商品项
    .cart-list-item {
      display: flex;
      &:last-child {
        padding-bottom: 120rpx;
        & > .cart-goods-info {
          border: none;
        }
      }
      .cart-goods-status {
        width: 60rpx;
        align-self: center;
      }
      .cart-goods-info {
        flex: 1;
        display: flex;
        padding-bottom: 20rpx;
        border-bottom: 1px solid #eee;
        image {
          align-self: center;
          width: 150rpx;
          height: 150rpx;
          flex-shrink: 0;
          margin-right: 20rpx;
        }
        .goods-info-box {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h3 {
            margin-bottom: 20rpx;
            word-break: break-all;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .info-box-bottom {
            display: flex;
            justify-content: space-between;
            height: 60rpx;
            line-height: 60rpx;
            .goods-price {
              color: #ff2d4a;
              font-size: 16px;
            }
            .count-add,
            .count-minus {
              display: inline-block;
              text-align: center;
              border: 1px solid #666666;
              height: 60rpx;
              width: 60rpx;
              box-sizing: border-box;
            }
            .count {
              font-size: 14px;
              margin: 0 20rpx;
              height: 60rpx;
              width: 60rpx;
            }
          }
        }
      }
    }
  }
  // footer
  .footer {
    height: 120rpx;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    .footer-item {
      flex: 1;
      display: flex;
      width: 250rpx;
      font-size: 16px;
      .total-price {
        color: #ff2d4a;
      }
    }

    .item-left {
      align-items: center;
      padding-left: 20rpx;
      & > span + span {
        margin-left: 20rpx;
      }
    }
    .item-center {
      flex-direction: column;
      justify-content: center;
      .express {
        font-size: 14px;
        color: #a6a6a6;
      }
    }
    .item-right {
      justify-content: center;
      align-items: center;
      background: #ff2d4a;
      color: #fff;
    }
  }
  .active {
    color: #ff2d4a;
  }
</style>
