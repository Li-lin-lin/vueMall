<template>
  <swiper>
    <swiper-item v-for="(item,key) in banners"
                 :key="key">
      <a :href="item.link">
        <img :src="item.image"
             @load="imageLoad"
             alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad () {
      // 节流阀 不设置会发出多个事件
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  },
}
</script>

<style scoped>
</style>