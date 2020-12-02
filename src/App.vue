<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "App",
    mounted() {
      this.IEVersion();
    },
    methods: {
      IEVersion() {
        //取得浏览器的userAgent字符串
        var userAgent = navigator.userAgent;

        //判断是否IE浏览器
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;

        //判断是否IE的Edge浏览器
        var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE;

        if (isIE) {
          //  是IE浏览器
          this.$router.push({
            path: '/browser'
          })
        }
      }
    },
  };

</script>

<style lang='less'>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: @fontColor;
  }

</style>
