<!-- 案例 -->
<template>
  <div>
    hellow子页面
    <Case></Case>
  </div>
</template>

<script>
  import component from '@/components'
  
  export default {
    data() {
      return {
        title: 'hellow页面'
      };
    },
    components: {
      Case: component.case
    },
    computed: {},
    mounted() {},
    methods: {}
  }

</script>

<style scoped>
</style>
