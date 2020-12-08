<!--  -->
<template>
  <div id="login">
    <div class="m_t_100 text_center">
      <el-button type="primary" @click='log'>登录页面 ce- {{ login }}</el-button>
      
      <el-button type="info" @click='getMock' v-if="mockShow">mock接口测试</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        title: 'meta名称',
        mockShow: process.env.MOCK
      };
    },
    components: {},
    computed: {
      login() {
        // 获取store
        return this.$store.getters.login;
        // return this.$store.state.login.fullLoading
      }
    },
    mounted() {},
    methods: {
      log() {
        this.$router.push('/helloworld')
      },
      async getMock() {
        // 获取模拟数据
        let res = await this.$axios.userEvnent()
        console.log('res', res)
      }
    }
  };

</script>

<style scoped></style>
