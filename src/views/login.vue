<!--  -->
<template>
  <div id="login">
    <div class="m_t_100 text_center">
      <el-button type="primary" @click='log'>登录页面 ce- {{ login }}</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        title: 'meta名称',
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
      async log() {
        this.$router.push('/helloworld')
      }
    }
  };

</script>

<style scoped></style>
