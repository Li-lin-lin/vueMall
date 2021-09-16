<template>
  <div class="wrapper"
       ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  // 注意区分mounted和methods 前者是生命周期函数 后者是方法
  mounted () {
    // this.$refs.wrapper 获得ref为wrappe的dom元素
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 开启点击事件
      click: true,
      // 监听滚动位置
      probeType: this.probeType,
      // 监听下拉事件
      pullUpLoad: this.pullUpLoad
    })

    //2.监听滚动的位置
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })

    this.scroll.refresh()

    //3.监听上拉事件
    // pullingUp 是BS属性 用于监听 on传两个参数一个是BS自带的 pullingUp（上拉） 一个是回调函数
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }


  },

  methods: {
    scrollTo (x, y, time = 300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    refresh () {
      console.log('----');
      this.scroll && this.scroll.refresh()
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY () {
      return this.scroll ? this.scroll.y : 0
    }
  },
}
</script>

<style scoped>
</style>