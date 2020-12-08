<!-- 浏览器兼容页面 -->
<template>
  <div id='browsers'>
    <p class="text_center browserFloor">温馨提示：您当前的浏览器版本过低，存在安全风险</p>
    <p class="text_center browserFloor tiyan">为了您的良好体验，请升级浏览器</p>
    <ul>
      <li v-for='(item,index) in browsers' :key='index' @click='downloadBorwser(item.download)'>
        <img :src="item.imgs" alt="">
        <p>{{item.text}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title:"浏览器版本过低",
        browsers: [{
            imgs: require('@/assets/browser/google.png'),
            text: '谷歌浏览器',
            download: 'https://dl.softmgr.qq.com/original/Browser/74.0.3724.8_chrome_installer_x64.exe'
          },
          {
            imgs: require('@/assets/browser/firefox.png'),
            text: '火狐浏览器',
            download: 'https://dl.softmgr.qq.com/original/Browser/Firefox_Setup_67.0.4_bzb32.exe'
          },
          {
            imgs: require('@/assets/browser/liebao.png'),
            text: '猎豹浏览器',
            download: 'https://dl.softmgr.qq.com/original/Browser/KSbrowser_home_2019060301-6.5.115.18480.exe'
          },
          {
            imgs: require('@/assets/browser/sougou.png'),
            text: '搜狗浏览器',
            download: 'https://dl.softmgr.qq.com/original/Browser/sogou_explorer_8.5.10.30358_qm0425.exe'
          }
        ]
      };
    },
    components: {},
    computed: {},
    mounted() {},
    methods: {
      downloadBorwser(src) {
        //  浏览器资源下载
        window.open(src, '_blank');
      }
    }
  }

</script>

<style lang='less' scoped>
  #browsers {
    padding-top: 200px;

    .browserFloor {
      font-size: 25px;
      line-height: 50px;
      margin-bottom: 20px;
    }

    .tiyan {
      color: #ff743d;
      font-weight: 900;
    }

    ul {
      margin: auto;
      text-align: center;

      li {
        display: inline-block;
        padding: 15px;
        text-align: center;
        margin: auto 20px;
        cursor: pointer;

        img {
          display: inline-block;
          width: 70px;
          height: 70px;
        }

        p {
          line-height: 31px;
        }
      }
    }
  }

</style>
