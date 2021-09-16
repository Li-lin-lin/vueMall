<template>
  <swiper class="swiper-item">
    <swiper-item v-for="item in topImages"
                 :key="item">
      <img :src="item"
           alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    topImages: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
    };
  },

}

</script>
<style scoped>
.swiper-item {
  height: 300px;
  overflow: hidden;
}
</style>