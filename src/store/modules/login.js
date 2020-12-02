export default {
  'namespaced': true,
  'state': {
    'fullLoading': false,
  },
  'mutations': {
    loading(state, val) {
      // 全局loading
      state.fullLoading = val;
    }
  }
};
