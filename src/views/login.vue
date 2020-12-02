<!--  -->
<template>
  <div id="login">
    <div class="m_t_100 text_center">
      <el-button type="primary">登录页面 - {{login}}</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {};
    },
    components: {},
    computed: {
      login(){
        // 获取store
        return this.$store.getters.login
        // return this.$store.state.login.fullLoading
      }
    },
    mounted() {},
    methods: {}
  }

</script>

<style scoped>
</style>
