export default {
  metaInfo() {
    //   全局meta，设置页面参数title
    return {
      title: this.title,
      meta: [{
          charset: 'utf-8'
        },
        ...this.meta || {}
      ]

    }
  }
}
