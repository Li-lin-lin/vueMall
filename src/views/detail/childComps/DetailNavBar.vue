<template>
  <div>
    <nav-bar>
      <div slot="left"
           class="back"
           @click="backClick">
        <img src="~assets/img/common/back.svg"
             alt="">
      </div>
      <div slot="center"
           class="title">
        <div v-for="(item,index) in titles"
             class="title-item"
             :class="{active:currentIndex === index}"
             @click="titleClick(index)"
             :key="item">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    };
  },
  methods: {
    titleClick (index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    backClick () {
      // | this.$route：当前激活的路由的信息对象。
      // 每个对象都是局部的，可以获取当前路由的 path, name, params, query 等属性。
      // | this.$router：全局的 router 实例。通过 vue 根实例中注入 router 实例，
      // 然后再注入到每个子组件，从而让整个应用都有路由功能。
      // 其中包含了很多属性和对象（比如 history 对象），任何页面也都可以调用其 push(), replace(), go() 等方法。
      this.$router.go(-1)
    }
  },

}

</script>
<style scoped>
.title {
  display: flex;
  font-size: 14px;
}
.title-item {
  flex: 1;
  cursor: pointer;
}
.back img {
  /* 居中 */
  vertical-align: middle;
}
.active {
  color: var(--color-high-text);
}
</style>