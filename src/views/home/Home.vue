<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"></tab-control>

    <!-- 使用Bscroll 封装的滚动 -->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>

      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"></tab-control>

      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>

    <!-- 监听组件的点击事件 需要加上native -->
    <back-top @click.native="backClick"
              v-show="showBackControl"></back-top>

  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'
// 防抖函数 传两个参数一个需要防抖的函数 一个需要等待的时间
import { debounce } from "common/utils"
export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data () {
    return {
      // result: null
      banners: [],
      recommends: [],
      titles: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      currentType: 'pop',
      showBackControl: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null
    }
  },
  created () {
    // 发送网络请求 
    // 1. 请求多个数据
    this.getHomeMultidata()

    //2. 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted () {
    let refresh = debounce(this.$refs.scroll.refresh, 50)
    // 监听item中图片加载完成
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)

  },
  // 活跃时
  activated () {
    this.$refs.scroll.scrollTo(0, this.saveY, 1)
    this.$refs.scroll.refresh()
  },
  // 不活跃
  deactivated () {
    // 保存y值
    this.saveY = this.$refs.scroll.getScrollY()
    // 取消全局时间监听 要传两个参数不然会把所有事件都取消掉 第二个参数是监听的那个函数
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {

    /**
     * 网络相关
     */
    getHomeMultidata () {
      getHomeMultidata().then(res => {
        // 防止垃圾回收 把res保存到result中
        // this.result = res
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // ...可以把res.data.list数组中的数据全部加到数组
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        // 结束一次下拉加载更多操作
        this.$refs.scroll.finishPullUp()
      })
    },
    /**
     * 事件监听相关
     */
    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new';
          break
        case 2:
          this.currentType = 'sell';
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick () {
      // 三个参数 分别是x,y,滚动时间ms
      this.$refs.scroll.scrollTo(0, 0, 400)
    },
    contentScroll (position) {
      // 判断backtop是否显示
      this.showBackControl = position.y < -1200

      //决定是否吸顶
      this.isTabFixed = position.y < -this.tabOffsetTop
    },
    loadMore () {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad () {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }

  },
}
</script>

<style scoped>
#home {
  /* vh css3自适应100vh等同于100% */
  height: 100vh;
  /* position: relative; */
  /* overflow: hidden; */
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.content {
  height: calc(100% - 93px);
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>

